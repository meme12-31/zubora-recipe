'use client';

import { useEffect, useState } from 'react';
import { Refrigerator } from 'lucide-react';

const MESSAGES = [
  'レスキュー隊（AI）がレシピを検索中…',
  'あまり物で作れる一皿を探しています…',
  '絶品ズボラ飯を捜索中…',
  '手間なしレシピを厳選しています…',
];

export default function LoadingState() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center gap-5 py-16"
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <span className="flex h-20 w-20 animate-bounce-slow items-center justify-center rounded-full bg-brand-orange text-white shadow-lg">
          <Refrigerator className="h-10 w-10" />
        </span>
        <span className="absolute -right-1 -top-1 flex h-6 w-6 animate-ping items-center justify-center rounded-full bg-brand-yellow" />
      </div>
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-brand-orange [animation-delay:-0.3s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-brand-orange [animation-delay:-0.15s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-brand-orange" />
      </div>
      <p className="px-6 text-center text-sm font-bold text-brand-gray">
        {MESSAGES[idx]}
      </p>
    </div>
  );
}
