import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@google/genai';
import {
  getGeminiClient,
  hasGeminiKey,
  describeGeminiError,
  GEMINI_MODEL_CANDIDATES,
} from '@/lib/gemini';
import { BASE_SEASONINGS } from '@/lib/presets';
import type {
  EffortLevel,
  Recipe,
  SearchRecipesRequest,
  SearchRecipesResponse,
  ApiErrorResponse,
} from '@/types';

export const runtime = 'nodejs';
export const maxDuration = 60;

/** 調理レベルごとの厳格な制約文 */
function effortConstraints(level: EffortLevel): string {
  switch (level) {
    case 1:
      return [
        '【超ズボラ】最優先制約:',
        '- 包丁を一切使わない（手でちぎる/キッチンばさみ/カット済み食材のみ）',
        '- 電子レンジのみで調理できる（火・フライパン・鍋は使わない）',
        '- 調理時間は5分以内',
        '- 洗い物を最小限にする',
      ].join('\n');
    case 2:
      return [
        '【爆速・時短】制約:',
        '- フライパン1つで完結する',
        '- 調理時間は10分以内',
        '- 手順はできるだけ少なく',
      ].join('\n');
    case 3:
      return [
        '【しっかり】方針:',
        '- 火や包丁を使ってよい',
        '- 余り物の食材をしっかり消費することを重視',
        '- 家庭で作れる範囲の手際よいレシピ',
      ].join('\n');
    default:
      return '';
  }
}

function buildPrompt(req: SearchRecipesRequest): string {
  const seasonings = [...BASE_SEASONINGS, ...req.seasonings];
  return [
    '冷蔵庫のあまり物食材: ' + req.ingredients.join('、'),
    '',
    '使用できる常備調味料: ' + seasonings.join('、'),
    '（上記の常備調味料は自由に使ってよい。それ以外の特殊な材料はできるだけ使わない）',
    '',
    effortConstraints(req.effortLevel),
    '',
    '上記の食材と条件で作れる、実在する簡単な家庭料理・ズボラ飯レシピを3件提案してください。',
    '創作料理ではなく、一般に広く知られている実在のレシピやプロのズボラレシピの手順を模倣・抽出してください。',
    'できるだけ多様な料理を提案し、必ず3件出力してください。',
    '各レシピの effortLevel は必ず ' + req.effortLevel + ' にしてください。',
    '材料リスト(ingredients)には分量の目安も含めてください。手順(instructions)は具体的な番号なしの文の配列にしてください。',
    'prepTimeMinutes は調理時間の目安（分）を整数で入れてください。',
    'description には一言で魅力を伝える短い説明を入れてください。',
  ].join('\n');
}

/** Gemini structured output 用スキーマ */
const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          prepTimeMinutes: { type: Type.INTEGER },
          effortLevel: { type: Type.INTEGER },
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: [
          'title',
          'description',
          'prepTimeMinutes',
          'effortLevel',
          'ingredients',
          'instructions',
        ],
        propertyOrdering: [
          'title',
          'description',
          'prepTimeMinutes',
          'effortLevel',
          'ingredients',
          'instructions',
        ],
      },
    },
  },
  required: ['recipes'],
};

function toEffortLevel(v: unknown): EffortLevel {
  const num = Number(v);
  return num === 2 ? 2 : num === 3 ? 3 : 1;
}

function makeId(): string {
  return 'recipe_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
}

/**
 * 応答テキストから JSON 文字列を安全にクリーンアップ・抽出する。
 */
function cleanJsonString(text: string): string {
  let t = text.trim();

  // マークダウンコードフェンスの抽出
  const fenceMatch = t.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch && fenceMatch[1]) {
    t = fenceMatch[1].trim();
  } else {
    t = t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  }

  // 最初の { または [ から最後の } または ] までを取り出す
  const firstBrace = t.indexOf('{');
  const firstBracket = t.indexOf('[');
  let startIdx = -1;
  if (firstBrace !== -1 && firstBracket !== -1) {
    startIdx = Math.min(firstBrace, firstBracket);
  } else if (firstBrace !== -1) {
    startIdx = firstBrace;
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
  }

  const lastBrace = t.lastIndexOf('}');
  const lastBracket = t.lastIndexOf(']');
  let endIdx = -1;
  if (lastBrace !== -1 && lastBracket !== -1) {
    endIdx = Math.max(lastBrace, lastBracket);
  } else if (lastBrace !== -1) {
    endIdx = lastBrace;
  } else if (lastBracket !== -1) {
    endIdx = lastBracket;
  }

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    t = t.substring(startIdx, endIdx + 1);
  }

  // 末尾カンマの除去
  t = t.replace(/,\s*([}\]])/g, '$1');

  return t;
}

/**
 * あらゆるモデルからの返答テキストを安全に JSON パースする。
 */
function safeParseJson(rawText: string): unknown {
  if (!rawText || rawText.trim().length === 0) {
    return null;
  }

  // 1. そのまま JSON.parse
  try {
    return JSON.parse(rawText);
  } catch {}

  // 2. クリーンアップ後の文字列で JSON.parse
  const cleaned = cleanJsonString(rawText);
  try {
    return JSON.parse(cleaned);
  } catch {}

  // 3. 改行エスケープ破損修復
  try {
    const repaired = cleaned.replace(/\r?\n/g, ' ');
    return JSON.parse(repaired);
  } catch {}

  return null;
}

/**
 * パースされたオブジェクトからレシピ配列を取り出し、正規化する。
 */
function normalizeRecipes(
  parsed: unknown,
  defaultEffortLevel: EffortLevel,
): Recipe[] {
  if (!parsed || typeof parsed !== 'object') {
    return [];
  }

  let rawList: unknown[] = [];
  if (Array.isArray(parsed)) {
    rawList = parsed;
  } else {
    const obj = parsed as Record<string, unknown>;
    if (Array.isArray(obj.recipes)) {
      rawList = obj.recipes;
    } else if (Array.isArray(obj.data)) {
      rawList = obj.data;
    } else if (Array.isArray(obj.items)) {
      rawList = obj.items;
    } else if (obj.title || obj.name || obj.recipeName || obj.料理名) {
      rawList = [obj];
    }
  }

  const nowIso = new Date().toISOString();
  const recipes: Recipe[] = [];

  for (const item of rawList) {
    if (!item || typeof item !== 'object') continue;
    const r = item as Record<string, unknown>;

    // タイトルの抽出
    const titleVal = r.title ?? r.name ?? r.recipeName ?? r.recipe_name ?? r.料理名 ?? r.タイトル ?? r.dish;
    const title = typeof titleVal === 'string' ? titleVal.trim() : '';
    if (!title) continue;

    // 説明文の抽出
    const descVal = r.description ?? r.desc ?? r.summary ?? r.一言 ?? r.説明 ?? r.特徴;
    const description = typeof descVal === 'string' && descVal.trim().length > 0 ? descVal.trim() : undefined;

    // 調理時間の抽出
    let prepTimeMinutes: number;
    const timeVal = r.prepTimeMinutes ?? r.cookingTime ?? r.time ?? r.cookTime ?? r.調理時間 ?? r.所要時間;
    if (typeof timeVal === 'number' && Number.isFinite(timeVal) && timeVal > 0) {
      prepTimeMinutes = Math.round(timeVal);
    } else if (typeof timeVal === 'string') {
      const match = timeVal.match(/\d+/);
      prepTimeMinutes = match ? Math.max(1, parseInt(match[0], 10)) : (defaultEffortLevel === 1 ? 5 : defaultEffortLevel === 2 ? 10 : 20);
    } else {
      prepTimeMinutes = defaultEffortLevel === 1 ? 5 : defaultEffortLevel === 2 ? 10 : 20;
    }

    // 手間レベルの抽出
    const effortVal = r.effortLevel ?? r.level ?? r.手間レベル ?? defaultEffortLevel;
    const effortLevel = toEffortLevel(effortVal);

    // 材料リストの抽出
    const ingVal = r.ingredients ?? r.materials ?? r.材料 ?? r.食材;
    let ingredients: string[] = [];
    if (Array.isArray(ingVal)) {
      ingredients = ingVal
        .map((s) => (typeof s === 'string' ? s.trim() : String(s ?? '').trim()))
        .filter((s) => s.length > 0);
    } else if (typeof ingVal === 'string') {
      ingredients = ingVal
        .split(/\r?\n|、|,/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    }

    // 調理手順の抽出
    const instVal = r.instructions ?? r.steps ?? r.procedures ?? r.手順 ?? r.作り方 ?? r.工程;
    let instructions: string[] = [];
    if (Array.isArray(instVal)) {
      instructions = instVal
        .map((s) => (typeof s === 'string' ? s.trim() : String(s ?? '').trim()))
        .filter((s) => s.length > 0);
    } else if (typeof instVal === 'string') {
      instructions = instVal
        .split(/\r?\n/)
        .map((s) => s.replace(/^\d+[\.\)\]\s:：]*/, '').trim())
        .filter((s) => s.length > 0);
    }

    recipes.push({
      id: makeId(),
      title,
      description,
      prepTimeMinutes,
      effortLevel,
      ingredients,
      instructions,
      createdAt: nowIso,
    });
  }

  return recipes;
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<SearchRecipesResponse | ApiErrorResponse>> {
  if (!hasGeminiKey()) {
    console.error(
      'search-recipes error: GEMINI_API_KEY が読み込めていません。.env.local を確認してください。',
    );
    return NextResponse.json(
      {
        error:
          'サーバーのAPIキーが未設定です。.env.local の GEMINI_API_KEY を確認してください。',
      },
      { status: 500 },
    );
  }

  let body: SearchRecipesRequest;
  try {
    body = (await req.json()) as SearchRecipesRequest;
  } catch {
    return NextResponse.json({ error: 'リクエストが不正です。' }, { status: 400 });
  }

  // バリデーション
  const ingredients = Array.isArray(body.ingredients)
    ? body.ingredients.filter((s) => typeof s === 'string' && s.trim().length > 0)
    : [];
  if (ingredients.length === 0) {
    return NextResponse.json(
      { error: '食材を1つ以上入力してください。' },
      { status: 400 },
    );
  }
  const effortLevel = toEffortLevel(body.effortLevel);
  const seasonings = Array.isArray(body.seasonings)
    ? body.seasonings.filter((s) => typeof s === 'string')
    : [];

  const prompt = buildPrompt({ ingredients, effortLevel, seasonings });
  const ai = getGeminiClient();

  let lastError: unknown = null;

  // モデルの優先順位順にフォールバックしながら試行
  for (let i = 0; i < GEMINI_MODEL_CANDIDATES.length; i++) {
    const model = GEMINI_MODEL_CANDIDATES[i];
    const isPrimary = i === 0;

    console.log(
      '[search-recipes] ' + (isPrimary ? 'メインモデル' : 'フォールバックモデル (' + i + ')') + " '" + model + "' でレシピ生成を試行します...",
    );

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction:
            'あなたは日本の家庭料理・ズボラ飯に詳しいプロの料理研究家です。' +
            '指定された食材と手間レベルの制約を厳密に守り、実在する簡単なレシピを提案します。' +
            '特にレベル1では「包丁を使わない」「電子レンジだけで調理できる」制約を最優先で守ってください。' +
            '出力は必ず指定された JSON スキーマに従ってください。',
          responseMimeType: 'application/json',
          responseSchema: recipeSchema,
        },
      });

      const responseText = response.text ?? '';
      const parsed = safeParseJson(responseText);
      const recipes = normalizeRecipes(parsed, effortLevel);

      if (recipes.length > 0) {
        console.log(
          "[search-recipes] モデル '" + model + "' により " + recipes.length + ' 件のレシピ取得・パースに成功しました。',
        );
        return NextResponse.json({ recipes });
      } else {
        console.warn(
          "[search-recipes] モデル '" + model + "' から有効なレシピをパースできませんでした (生応答長: " + responseText.length + ')。次のモデルへフォールバックします。',
        );
      }
    } catch (err) {
      lastError = err;
      const anyErr = err as { status?: number; message?: unknown };
      const status = anyErr?.status ?? 0;
      const msg = typeof anyErr?.message === 'string' ? anyErr.message : String(err);

      console.warn(
        "[search-recipes] モデル '" + model + "' でのエラー (status=" + status + '): ' + msg + ' → 次のフォールバックモデルへ移行します。',
      );
    }
  }

  // 全モデルで失敗した場合のエラーハンドリング
  console.error(
    '[search-recipes] 全てのGeminiモデル候補での生成に失敗しました。',
    lastError,
  );

  const info = describeGeminiError(
    lastError,
    'レシピが見つかりませんでした。食材の組み合わせを変えて再度お試しください。',
  );

  return NextResponse.json({ error: info.message }, { status: info.status });
}