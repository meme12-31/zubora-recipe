'use client';

import { useState } from 'react';
import { Heart, Clock, ChevronDown, Trash2 } from 'lucide-react';
import type { Recipe } from '@/types';
import { EFFORT_LEVELS } from '@/lib/presets';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  /** 削除モード（お気に入り一覧）でゴミ箱ボタンを表示 */
  onDelete?: (recipe: Recipe) => void;
  /** 初期状態で手順を開いておく */
  defaultOpen?: boolean;
}

const effortMeta = (level: Recipe['effortLevel']) =>
  EFFORT_LEVELS.find((l) => l.level === level) ?? EFFORT_LEVELS[0];

export default function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onDelete,
  defaultOpen = false,
}: RecipeCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const meta = effortMeta(recipe.effortLevel);

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="space-y-3 p-4">
        {/* バッジ + お気に入り */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-brand-orange">
              {meta.emoji} Lv.{recipe.effortLevel} {meta.title}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-bold text-yellow-700">
              <Clock className="h-3.5 w-3.5" />
              {recipe.prepTimeMinutes}分
            </span>
          </div>
          <button
            type="button"
            onClick={() => onToggleFavorite(recipe)}
            aria-label={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
            aria-pressed={isFavorite}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 transition active:scale-90"
          >
            <Heart
              className={[
                'h-6 w-6 transition',
                isFavorite
                  ? 'fill-brand-orange text-brand-orange'
                  : 'text-gray-400',
              ].join(' ')}
            />
          </button>
        </div>

        <h3 className="text-base font-bold leading-snug text-brand-gray">
          {recipe.title}
        </h3>
        {recipe.description ? (
          <p className="text-sm leading-relaxed text-gray-500">
            {recipe.description}
          </p>
        ) : null}

        {/* 開閉トグル */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-xl bg-orange-50 px-3 py-2.5 text-sm font-bold text-brand-orange transition hover:bg-orange-100 active:scale-[0.99]"
        >
          <span>材料と作り方をみる</span>
          <ChevronDown
            className={[
              'h-5 w-5 transition-transform',
              open ? 'rotate-180' : '',
            ].join(' ')}
          />
        </button>

        {open ? (
          <div className="space-y-4 pt-1">
            <div>
              <h4 className="mb-1.5 text-sm font-bold text-brand-gray">材料（目安：1〜2人前）</h4>
              <ul className="space-y-1">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-gray-600 before:content-['・']"
                  >
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-1.5 text-sm font-bold text-brand-gray">作り方</h4>
              <ol className="space-y-2">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}

        {/* 削除ボタン（お気に入り一覧のみ） */}
        {onDelete ? (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => onDelete(recipe)}
              aria-label="お気に入りから削除"
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-red-200 px-3 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50 active:scale-95"
            >
              <Trash2 className="h-4 w-4" />
              お気に入りから削除
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}