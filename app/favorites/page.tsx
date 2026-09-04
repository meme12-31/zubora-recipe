'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeartCrack, Search } from 'lucide-react';
import Header from '@/components/Header';
import RecipeCard from '@/components/RecipeCard';
import Toast, { type ToastData, type ToastType } from '@/components/Toast';
import type { Recipe } from '@/types';
import { loadFavorites, removeFavorite } from '@/utils/storage';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(loadFavorites());
    setHydrated(true);
  }, []);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ id: Date.now(), type, message });
  };

  const handleDelete = (recipe: Recipe) => {
    const next = removeFavorite(recipe.id);
    setFavorites(next);
    showToast('お気に入りから削除しました。', 'info');
  };

  return (
    <>
      <Header showBack subtitle="お気に入りレシピ" />
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      <main className="flex-1 px-4 pb-16 pt-4">
        <h2 className="mb-4 text-lg font-bold text-brand-gray">
          お気に入りレシピ
          {hydrated ? (
            <span className="ml-2 text-sm font-normal text-gray-400">
              {favorites.length} 件
            </span>
          ) : null}
        </h2>

        {hydrated && favorites.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-16 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-brand-orange">
              <HeartCrack className="h-10 w-10" />
            </span>
            <p className="px-6 text-sm leading-relaxed text-gray-500">
              お気に入りのレシピはまだありません。
              <br />
              検索結果のハートマークを押して保存しよう！
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 active:scale-95"
            >
              <Search className="h-4 w-4" />
              レシピを探しに行く
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite
                onToggleFavorite={handleDelete}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
