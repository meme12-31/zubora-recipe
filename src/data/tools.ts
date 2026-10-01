export interface ToolItem {
  id: string;
  name: string;
  url: string;
  description: string;
}

export const ALL_TOOLS: ToolItem[] = [
  {
    id: "recipe-calculator",
    name: "レシピ人数変更・調味料g変換 | ケーキ型サイズ変更",
    url: "https://hit-tool.com/recipe-calculator",
    description: "人数の変更やケーキ型のサイズ変更に伴う調味料・材料の分量を自動計算するツール",
  },
  {
    id: "zubora-recipe",
    name: "冷蔵庫レスキュー｜あまり物でズボラ飯",
    url: "https://hit-tool.com/zubora-recipe",
    description: "冷蔵庫に残っている余り物から作れるズボラ飯・簡単レシピを提案するツール",
  },
  {
    id: "calcnote",
    name: "CalcNote | メモ＆手書きができる無料Web電卓アプリ",
    url: "https://hit-tool.com/calcnote",
    description: "テキストと一緒に計算式を残して自動計算・保存ができる計算メモツール",
  },
  {
    id: "fashion-weather",
    name: "今日の服装ナビ | 天気に合わせた服装提案",
    url: "https://hit-tool.com/fashion-weather",
    description: "気温や天候に合わせた最適なコーディネートや服装を提案できるツール",
  },
  {
    id: "travel-checklist",
    name: "持ち物チェックリスト | 国内外の旅行・出張・お出かけの準備を効率化",
    url: "https://hit-tool.com/travel-checklist",
    description: "旅行や出張の準備・持ち物を一覧でスマートにチェック・管理できるツール",
  },
];
