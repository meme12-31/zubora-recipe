'use client';

import type { EffortLevel } from '@/types';
import { EFFORT_LEVELS } from '@/lib/presets';

interface EffortLevelSelectorProps {
  value: EffortLevel;
  onChange: (level: EffortLevel) => void;
}

export default function EffortLevelSelector({
  value,
  onChange,
}: EffortLevelSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold text-brand-gray">
        調理レベル（手間）
      </legend>
      <div
        role="radiogroup"
        aria-label="調理レベル"
        className="grid grid-cols-3 gap-2"
      >
        {EFFORT_LEVELS.map((lv) => {
          const selected = value === lv.level;
          return (
            <button
              key={lv.level}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(lv.level)}
              className={[
                'flex min-h-[88px] flex-col items-center justify-center gap-1 rounded-2xl border-2 p-2 text-center transition active:scale-95',
                selected
                  ? 'border-brand-orange bg-orange-50 shadow-sm'
                  : 'border-transparent bg-white text-gray-500 shadow-sm hover:border-orange-200',
              ].join(' ')}
            >
              <span className="text-2xl" aria-hidden>
                {lv.emoji}
              </span>
              <span
                className={[
                  'text-xs font-bold',
                  selected ? 'text-brand-orange' : 'text-brand-gray',
                ].join(' ')}
              >
                Lv.{lv.level} {lv.title}
              </span>
              <span className="text-[10px] leading-tight text-gray-400">
                {lv.description}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
