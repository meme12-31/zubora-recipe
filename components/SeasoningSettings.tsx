'use client';

import { useState } from 'react';
import { ChevronDown, Utensils } from 'lucide-react';
import { BASE_SEASONINGS, SPECIAL_SEASONINGS } from '@/lib/presets';

interface SeasoningSettingsProps {
  /** ON になっている特殊調味料の id 一覧 */
  selected: string[];
  onToggle: (id: string) => void;
}

export default function SeasoningSettings({
  selected,
  onToggle,
}: SeasoningSettingsProps) {
  const [open, setOpen] = useState(false);
  const selectedSet = new Set(selected);

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-brand-gray">
          <Utensils className="h-4 w-4 text-brand-orange" />
          常備調味料の設定
          {selected.length > 0 ? (
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-brand-orange">
              +{selected.length}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={[
            'h-5 w-5 text-gray-400 transition-transform',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {open ? (
        <div className="mt-3 space-y-3">
          <div>
            <p className="mb-1.5 text-xs text-gray-400">
              基本調味料（常備済みとして扱います）
            </p>
            <div className="flex flex-wrap gap-1.5">
              {BASE_SEASONINGS.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-500"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs text-gray-400">
              自宅にある特殊調味料をタップして追加
            </p>
            <div className="flex flex-wrap gap-2">
              {SPECIAL_SEASONINGS.map((s) => {
                const on = selectedSet.has(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onToggle(s.id)}
                    aria-pressed={on}
                    className={[
                      'rounded-full border px-3 py-1.5 text-sm transition active:scale-95',
                      on
                        ? 'border-brand-orange bg-brand-orange text-white'
                        : 'border-orange-200 bg-white text-brand-gray hover:bg-orange-50',
                    ].join(' ')}
                  >
                    {on ? '✓ ' : ''}
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
