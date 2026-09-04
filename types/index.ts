// ============================================================
// 型定義 (Recipe, Ingredient 等)
// any 型の使用は禁止 / テキストのみ（画像機能なし）
// ============================================================

/** 食材カテゴリ */
export type IngredientCategory = 'vegetable' | 'meat_fish' | 'other';

/** 食材データ */
export interface Ingredient {
  id: string;
  name: string;
  category?: IngredientCategory;
}

/**
 * 調理レベル（手間）
 * 1: 超ズボラ（包丁不要・レンジのみ・5分以内）
 * 2: 爆速・時短（フライパン1つ・10分以内）
 * 3: しっかり（火や包丁を使用・余り物消費重視）
 */
export type EffortLevel = 1 | 2 | 3;

/** レシピデータ（テキストのみ） */
export interface Recipe {
  id: string;
  title: string;
  description?: string;
  prepTimeMinutes: number;
  effortLevel: EffortLevel;
  /** 必要な材料リスト */
  ingredients: string[];
  /** 調理手順ステップ */
  instructions: string[];
  /** ISO8601フォーマット */
  createdAt: string;
}

/** 常備調味料・特殊調味料設定などのユーザー設定 */
export interface RescueSettings {
  /** ON になっている特殊調味料の id 一覧 */
  specialSeasonings: string[];
  /** 最後に使った調理レベル */
  lastEffortLevel: EffortLevel;
}

/** 調味料プリセット項目 */
export interface SeasoningItem {
  id: string;
  name: string;
}

// ---- API 入出力型 ----

/** /api/search-recipes のリクエスト */
export interface SearchRecipesRequest {
  ingredients: string[];
  effortLevel: EffortLevel;
  seasonings: string[];
}

/** /api/search-recipes のレスポンス */
export interface SearchRecipesResponse {
  recipes: Recipe[];
}

/** API エラー共通レスポンス */
export interface ApiErrorResponse {
  error: string;
}
