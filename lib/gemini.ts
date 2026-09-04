import { GoogleGenAI } from '@google/genai';

/**
 * サーバーサイド専用の Google Gemini クライアント。
 * API キーは NEXT_PUBLIC_ を付けず、サーバーからのみ読み込む。
 * このモジュールをクライアントコンポーネントから import してはいけない。
 */
let client: GoogleGenAI | null = null;

/**
 * メインで使用するレシピ生成モデル。
 */
export const PRIMARY_GEMINI_MODEL = 'gemini-3.6-flash';

/**
 * 503 (アクセス集中/過負荷) や 429 (レート制限) 等のエラー発生時に
 * 自動的にフォールバックしてリクエストを試行する代替モデル一覧。
 */
export const FALLBACK_GEMINI_MODELS = [
  'gemini-3.7-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
  'gemini-3-flash-preview',
  'gemini-2.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash',
  'gemini-1.5-flash',
];

/**
 * 試行する全モデル候補の優先順序リスト。
 */
export const GEMINI_MODEL_CANDIDATES = [
  PRIMARY_GEMINI_MODEL,
  ...FALLBACK_GEMINI_MODELS,
];

/** 後方互換用エイリアス */
export const GEMINI_MODEL = PRIMARY_GEMINI_MODEL;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY が設定されていません。');
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

/** Gemini API キーが設定されているか */
export function hasGeminiKey(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

/** ユーザー向けに整形した Gemini エラー */
export interface GeminiErrorInfo {
  /** クライアントへ返す HTTP ステータス */
  status: number;
  /** 画面に表示するメッセージ */
  message: string;
  /** ログ用の内部コード */
  code: string;
}

/**
 * Gemini 由来のエラーを判別し、原因が分かるメッセージへ変換する。
 * fallbackMessage は上記に該当しない場合の既定文言。
 */
export function describeGeminiError(
  err: unknown,
  fallbackMessage: string,
): GeminiErrorInfo {
  const anyErr = err as { status?: number; message?: unknown };
  const message = typeof anyErr?.message === 'string' ? anyErr.message : '';
  const status = typeof anyErr?.status === 'number' ? anyErr.status : 0;

  // API キー無効
  if (status === 400 && /API key not valid|API_KEY_INVALID/i.test(message)) {
    return {
      status: 500,
      code: 'invalid_api_key',
      message:
        'Gemini APIキーが無効です。.env.local の GEMINI_API_KEY を確認してください。',
    };
  }

  // モデルが存在しない・提供終了
  if (status === 404 || /NOT_FOUND|no longer available|is not found/i.test(message)) {
    return {
      status: 502,
      code: 'model_not_found',
      message:
        '指定のAIモデルを利用できませんでした。時間をおいて再度お試しください。',
    };
  }

  // 権限なし（API 未有効化など）
  if (status === 403 || /PERMISSION_DENIED/i.test(message)) {
    return {
      status: 500,
      code: 'permission_denied',
      message:
        'APIキーの権限がありません。Google AI Studio で Gemini API が有効か確認してください。',
    };
  }

  // モデル過負荷・一時的なサーバーエラー
  if (
    status === 503 ||
    status === 500 ||
    /UNAVAILABLE|overloaded|high demand|internal error/i.test(message)
  ) {
    return {
      status: 503,
      code: 'model_overloaded',
      message:
        'AIが一時的に混み合っています。数秒おいて「再試行」を押してください。',
    };
  }

  // レート制限・クォータ超過
  if (status === 429 || /RESOURCE_EXHAUSTED|quota|rate limit/i.test(message)) {
    return {
      status: 429,
      code: 'rate_limit',
      message:
        '現在アクセスが集中しています。少し時間をおいて再度お試しください。',
    };
  }

  return { status: 502, code: 'unknown', message: fallbackMessage };
}