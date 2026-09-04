'use client';

import Link from 'next/link';
import { Refrigerator, Heart, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  /** お気に入り画面など、戻るリンクを表示する場合 */
  showBack?: boolean;
  /** お気に入りアイコンを表示するか（メイン画面用） */
  showFavorites?: boolean;
  /** サブタイトル */
  subtitle?: string;
}

export default function Header({
  showBack = false,
  showFavorites = false,
  subtitle,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-100 bg-brand-cream/90 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          {showBack ? (
            <Link
              href="/"
              aria-label="メイン画面へ戻る"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-gray transition hover:bg-orange-100 active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white shadow-sm">
              <Refrigerator className="h-5 w-5" />
            </span>
          )}
          <div className="leading-tight">
            <h1 className="text-lg font-bold text-brand-gray">冷蔵庫レスキュー</h1>
            {subtitle ? (
              <p className="text-xs text-gray-500">{subtitle}</p>
            ) : null}
          </div>
        </div>

        {showFavorites ? (
          <Link
            href="/favorites"
            aria-label="お気に入り一覧"
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand-orange transition hover:bg-orange-100 active:scale-95"
          >
            <Heart className="h-6 w-6" />
          </Link>
        ) : null}
      </div>
    </header>
  );
}
