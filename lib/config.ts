// ============================================================
// アプリ共通設定
// ============================================================

/**
 * サブディレクトリ公開用の basePath。
 * next.config.js の basePath と一致させる必要がある。
 * Link / router.push は Next.js が自動で basePath を付与するが、
 * fetch() による API 呼び出しには自動付与されないため、この値を用いる。
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/zubora-recipe';

/** LocalStorage キー */
export const STORAGE_KEYS = {
  settings: 'rescue_settings',
  favorites: 'rescue_favorites',
} as const;
