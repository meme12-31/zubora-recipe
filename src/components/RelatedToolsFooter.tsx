import React from "react";
import { Utensils, Calculator, Sun, CheckSquare, ExternalLink } from "lucide-react";

interface ToolItem {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

const ALL_TOOLS: ToolItem[] = [
  {
    id: "recipe-calculator",
    name: "レシピ人数変更・調味料g変換 | ケーキ型サイズ変更",
    url: "https://hit-tool.com/recipe-calculator",
    description: "人数の変更やケーキ型のサイズ変更に伴う調味料・材料の分量を自動計算するツール",
    icon: <Utensils className="w-5 h-5 text-orange-500" />,
    iconBg: "bg-orange-50/70",
  },
  {
    id: "zubora-recipe",
    name: "冷蔵庫レスキュー｜あまり物でズボラ飯",
    url: "https://hit-tool.com/zubora-recipe",
    description: "冷蔵庫に残っている余り物から作れるズボラ飯・簡単レシピを提案するツール",
    icon: <Utensils className="w-5 h-5 text-amber-500" />,
    iconBg: "bg-amber-50/70",
  },
  {
    id: "calcnote",
    name: "CalcNote | メモ＆手書きができる無料Web電卓アプリ",
    url: "https://hit-tool.com/calcnote",
    description: "テキストと一緒に計算式を残して自動計算・保存ができる計算メモツール",
    icon: <Calculator className="w-5 h-5 text-blue-500" />,
    iconBg: "bg-blue-50/70",
  },
  {
    id: "fashion-weather",
    name: "今日の服装ナビ | 天気に合わせた服装提案",
    url: "https://hit-tool.com/fashion-weather",
    description: "気温や天候に合わせた最適なコーディネートや服装を提案できるツール",
    icon: <Sun className="w-5 h-5 text-amber-500" />,
    iconBg: "bg-amber-50/70",
  },
  {
    id: "travel-checklist",
    name: "持ち物チェックリスト | 国内外の旅行・出張・お出かけの準備を効率化",
    url: "https://hit-tool.com/travel-checklist",
    description: "旅行や出張の準備・持ち物を一覧でスマートにチェック・管理できるツール",
    icon: <CheckSquare className="w-5 h-5 text-emerald-500" />,
    iconBg: "bg-emerald-50/70",
  },
];

interface Props {
  currentAppId: string;
}

export const RelatedToolsFooter: React.FC<Props> = ({ currentAppId }) => {
  const relatedTools = ALL_TOOLS.filter((tool) => tool.id !== currentAppId).slice(0, 4);

  return (
    <footer className="w-full bg-transparent border-t border-stone-200/80 mt-12 pt-8 pb-12 px-4 font-sans text-gray-700">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* 見出し：おすすめの関連Webツール */}
        <div className="text-left">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 tracking-wide">
            おすすめの関連Webツール
          </h3>
        </div>

        {/* ツールリスト */}
        <div className="flex flex-col gap-3.5">
          {relatedTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow transition-all duration-200 flex items-center gap-4 text-left no-underline min-h-[104px]"
              style={{ textDecoration: "none" }}
            >
              <div className={`p-3 rounded-xl ${tool.iconBg} flex items-center justify-center flex-shrink-0`}>
                {tool.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                  {tool.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  {tool.description}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 運営者情報・プライバシーポリシー・お問い合わせ */}
        <div className="pt-6 border-t border-stone-200/60 text-center">
          <div className="inline-flex items-center justify-center gap-6 text-xs sm:text-sm text-gray-600 font-medium">
            <a href="https://hit-tool.com/about" target="_blank" rel="noopener noreferrer" className="hover:underline no-underline text-gray-600">
              運営者情報
            </a>
            <a href="https://hit-tool.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline no-underline text-gray-600">
              プライバシーポリシー
            </a>
            <a href="https://hit-tool.com/contact" target="_blank" rel="noopener noreferrer" className="hover:underline no-underline text-gray-600">
              お問い合わせ
            </a>
          </div>
        </div>

        {/* 画像 ＋ 矢印アイコンのみのボタン ＆ コピーライト */}
        <div className="pt-2 flex flex-col items-center gap-4">
          <a
            href="https://hit-tool.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-white border border-stone-300 rounded-full shadow-sm hover:shadow hover:border-stone-400 transition-all no-underline group"
            style={{ textDecoration: "none" }}
          >
            <img
              src="/zubora-recipe/Code_Generated_Image.png"
              alt="HIT Tools Portal"
              className="h-5 w-auto object-contain"
            />
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
          </a>

          <div className="text-[11px] text-gray-400">
            © hit-tool.com All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default RelatedToolsFooter;
