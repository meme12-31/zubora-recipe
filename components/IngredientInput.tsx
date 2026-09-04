'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Ingredient } from '@/types';
import { QUICK_INGREDIENTS } from '@/lib/presets';

interface IngredientInputProps {
  selected: Ingredient[];
  onAdd: (name: string, category?: Ingredient['category']) => void;
  onRemove: (id: string) => void;
}

export default function IngredientInput({
  selected,
  onAdd,
  onRemove,
}: IngredientInputProps) {
  const [text, setText] = useState('');

  const selectedNames = new Set(selected.map((i) => i.name));

  const handleSubmit = () => {
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText('');
  };

  return (
    <section className="space-y-4">
      {/* 自由テキスト入力 */}
      <div>
        <label
          htmlFor="ingredient-text"
          className="mb-2 block text-sm font-bold text-brand-gray"
        >
          食材・キーワードを入力
        </label>
        <div className="flex gap-2">
          <input
            id="ingredient-text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="例: キャベツ"
            className="min-h-[48px] flex-1 rounded-2xl border border-orange-200 bg-white px-4 text-base text-brand-gray outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-orange-200"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!text.trim()}
            aria-label="食材を追加"
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl bg-brand-orange text-white shadow-sm transition hover:bg-orange-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* 選択中の食材タグ */}
      <div>
        <p className="mb-2 text-sm font-bold text-brand-gray">
          選択中の食材{' '}
          <span className="text-brand-orange">{selected.length}</span> 個
        </p>
        {selected.length === 0 ? (
          <p className="rounded-2xl bg-white/60 px-4 py-3 text-sm text-gray-400">
            下の定番食材をタップするか、上のフォームに入力してね！
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {selected.map((ing) => (
              <li key={ing.id} className="animate-pop-in">
                <span className="flex items-center gap-1 rounded-full bg-brand-orange px-3 py-1.5 text-sm font-medium text-white shadow-sm">
                  {ing.name}
                  <button
                    type="button"
                    onClick={() => onRemove(ing.id)}
                    aria-label={`${ing.name} を削除`}
                    className="flex h-5 w-5 items-center justify-center rounded-full transition hover:bg-white/25 active:scale-90"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* クイックタグ */}
      <div className="space-y-3">
        {QUICK_INGREDIENTS.map((group) => (
          <div key={group.category}>
            <p className="mb-1.5 text-xs font-semibold text-gray-500">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((name) => {
                const isSelected = selectedNames.has(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() =>
                      isSelected ? undefined : onAdd(name, group.category)
                    }
                    disabled={isSelected}
                    className={[
                      'rounded-full border px-3 py-1.5 text-sm transition active:scale-95',
                      isSelected
                        ? 'cursor-not-allowed border-orange-200 bg-orange-100 text-orange-400'
                        : 'border-orange-200 bg-white text-brand-gray hover:border-brand-orange hover:bg-orange-50',
                    ].join(' ')}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
