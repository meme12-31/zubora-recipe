import type { IngredientCategory, SeasoningItem } from '@/types';

/** クイック選択用定番食材タグ */
export interface QuickIngredientGroup {
  category: IngredientCategory;
  label: string;
  items: string[];
}

export const QUICK_INGREDIENTS: QuickIngredientGroup[] = [
  {
    category: 'vegetable',
    label: '野菜',
    items: ['にんじん', '玉ねぎ', 'キャベツ', 'もやし', '長ねぎ', 'ピーマン', 'トマト'],
  },
  {
    category: 'meat_fish',
    label: '肉・魚',
    items: ['豚肉', '鶏肉', '牛肉', 'ウインナー', '卵', '豆腐', '納豆', 'ツナ缶'],
  },
  {
    category: 'other',
    label: 'その他',
    items: ['うどん', 'ごはん', 'チーズ', 'ちくわ'],
  },
];

/**
 * 基本調味料（デフォルトで常備しているとみなす）。
 * 検索プロンプトで「常備」として扱う。
 */
export const BASE_SEASONINGS: string[] = [
  '醤油',
  '塩',
  '砂糖',
  '酒',
  'みりん',
  '酢',
  '油',
];

/** 特殊調味料（ユーザーが ON/OFF 設定できる） */
export const SPECIAL_SEASONINGS: SeasoningItem[] = [
  { id: 'mentsuyu', name: 'めんつゆ' },
  { id: 'yakiniku', name: '焼肉のタレ' },
  { id: 'ponzu', name: 'ポン酢' },
  { id: 'weipa', name: 'ウェイパー' },
  { id: 'mayo', name: 'マヨネーズ' },
  { id: 'ketchup', name: 'ケチャップ' },
  { id: 'oyster', name: 'オイスターソース' },
  { id: 'consomme', name: 'コンソメ' },
  { id: 'curry_roux', name: 'カレールー' },
  { id: 'sesame_oil', name: 'ごま油' },
];

/** 調理レベルのメタ情報 */
export const EFFORT_LEVELS = [
  {
    level: 1 as const,
    title: '超ズボラ',
    description: '包丁不要・レンジのみ・5分以内',
    emoji: '😴',
  },
  {
    level: 2 as const,
    title: '爆速・時短',
    description: 'フライパン1つ・10分以内',
    emoji: '⚡',
  },
  {
    level: 3 as const,
    title: 'しっかり',
    description: '火や包丁を使用・余り物消費重視',
    emoji: '🔥',
  },
];
