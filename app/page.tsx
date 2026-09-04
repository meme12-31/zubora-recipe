'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, RefreshCw, AlertTriangle, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import IngredientInput from '@/components/IngredientInput';
import EffortLevelSelector from '@/components/EffortLevelSelector';
import SeasoningSettings from '@/components/SeasoningSettings';
import LoadingState from '@/components/LoadingState';
import RecipeCard from '@/components/RecipeCard';
import Toast, { type ToastData, type ToastType } from '@/components/Toast';
import type { EffortLevel, Ingredient, Recipe } from '@/types';
import { SPECIAL_SEASONINGS } from '@/lib/presets';
import { apiUrl } from '@/lib/api';
import {
  loadSettings,
  saveSettings,
  loadFavorites,
  addFavorite,
  removeFavorite,
} from '@/utils/storage';
import type { SearchRecipesResponse, ApiErrorResponse } from '@/types';

type View = 'input' | 'loading' | 'results' | 'error';

function makeId(): string {
  return `ing_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/** 食材名の正規化（前後空白除去・全角空白除去） */
function normalize(name: string): string {
  return name.trim().replace(/\u3000/g, '').replace(/\s+/g, ' ');
}

export default function HomePage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [effortLevel, setEffortLevel] = useState<EffortLevel>(1);
  const [specialSeasonings, setSpecialSeasonings] = useState<string[]>([]);
  const [view, setView] = useState<View>('input');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<ToastData | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // 初期ロード: 設定・お気に入りを復元
  useEffect(() => {
    const settings = loadSettings();
    setSpecialSeasonings(settings.specialSeasonings);
    setEffortLevel(settings.lastEffortLevel);
    setFavoriteIds(new Set(loadFavorites().map((r) => r.id)));
    setHydrated(true);
  }, []);

  // 設定変更時に保存
  useEffect(() => {
    if (!hydrated) return;
    saveSettings({ specialSeasonings, lastEffortLevel: effortLevel });
  }, [specialSeasonings, effortLevel, hydrated]);

  const showToast = (message: string, type: ToastType = 'error') => {
    setToast({ id: Date.now(), type, message });
  };

  const addIngredient = (name: string, category?: Ingredient['category']) => {
    const normalized = normalize(name);
    if (!normalized) return;
    // 重複チェック
    if (ingredients.some((i) => i.name === normalized)) {
      showToast('すでに追加されています。', 'info');
      return;
    }
    setIngredients((prev) => [
      ...prev,
      { id: makeId(), name: normalized, category },
    ]);
  };

  const removeIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  };

  const seasoningNames = useMemo(
    () =>
      SPECIAL_SEASONINGS.filter((s) => specialSeasonings.includes(s.id)).map(
        (s) => s.name,
      ),
    [specialSeasonings],
  );

  const toggleSeasoning = (id: string) => {
    setSpecialSeasonings((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const runSearch = async () => {
    if (ingredients.length === 0) {
      showToast('食材を1つ以上入力してください');
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      showToast('ネットワークに接続されていません。');
      return;
    }

    setView('loading');
    setErrorMsg('');
    try {
      const res = await fetch(apiUrl('/api/search-recipes'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: ingredients.map((i) => i.name),
          effortLevel,
          seasonings: seasoningNames,
        }),
      });
      if (!res.ok) {
        const data = (await res.json()) as ApiErrorResponse;
        console.error(
          `[search-recipes] APIエラー status=${res.status}:`,
          data.error,
        );
        throw new Error(
          data.error ||
            'レシピが見つかりませんでした。食材の組み合わせを変えて再度お試しください。',
        );
      }
      const data = (await res.json()) as SearchRecipesResponse;
      if (!data.recipes || data.recipes.length === 0) {
        throw new Error(
          'レシピが見つかりませんでした。食材の組み合わせを変えて再度お試しください。',
        );
      }
      setRecipes(data.recipes);
      setView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('[search-recipes] 検索に失敗しました:', err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'レシピが見つかりませんでした。食材の組み合わせを変えて再度お試しください。',
      );
      setView('error');
    }
  };

  const toggleFavorite = (recipe: Recipe) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(recipe.id)) {
        removeFavorite(recipe.id);
        next.delete(recipe.id);
        showToast('お気に入りから削除しました。', 'info');
      } else {
        addFavorite(recipe);
        next.add(recipe.id);
        showToast('お気に入りに保存しました！', 'success');
      }
      return next;
    });
  };

  const backToInput = () => {
    setView('input');
    setRecipes([]);
  };

  return (
    <>
      <Header showFavorites subtitle="あまり物でズボラ飯" />
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      <main className="flex-1 px-4 pb-32 pt-4">
        {view === 'loading' && <LoadingState />}

        {view === 'error' && (
          <div className="flex flex-col items-center gap-5 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
              <AlertTriangle className="h-8 w-8" />
            </span>
            <p className="px-4 text-sm font-medium text-brand-gray">{errorMsg}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={backToInput}
                className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-bold text-brand-orange transition hover:bg-orange-50 active:scale-95"
              >
                <ArrowLeft className="h-4 w-4" />
                条件を変える
              </button>
              <button
                type="button"
                onClick={runSearch}
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 active:scale-95"
              >
                <RefreshCw className="h-4 w-4" />
                再試行
              </button>
            </div>
          </div>
        )}

        {view === 'results' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-brand-gray">
                レスキュー結果 🎉
              </h2>
              <button
                type="button"
                onClick={backToInput}
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-3 py-2 text-sm font-bold text-brand-orange transition hover:bg-orange-50 active:scale-95"
              >
                <RefreshCw className="h-4 w-4" />
                再検索
              </button>
            </div>
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favoriteIds.has(recipe.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {view === 'input' && (
          <div className="space-y-5">
            <p className="rounded-2xl bg-white/70 px-4 py-3 text-sm leading-relaxed text-gray-500">
              冷蔵庫のあまり物を入力して、手間レベルを選ぶだけ。AIが実在する簡単レシピを提案します🍳
            </p>

            <IngredientInput
              selected={ingredients}
              onAdd={addIngredient}
              onRemove={removeIngredient}
            />

            <EffortLevelSelector value={effortLevel} onChange={setEffortLevel} />

            <SeasoningSettings
              selected={specialSeasonings}
              onToggle={toggleSeasoning}
            />
          </div>
        )}
      </main>

      {/* 画面下部固定の検索ボタン（入力画面のみ） */}
      {view === 'input' && (
        <div className="sticky bottom-0 z-20 border-t border-orange-100 bg-brand-cream/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto max-w-md">
            <button
              type="button"
              onClick={runSearch}
              className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-brand-orange text-lg font-bold text-white shadow-lg transition hover:bg-orange-600 active:scale-[0.98]"
            >
              <Search className="h-6 w-6" />
              レシピを探す
            </button>
          </div>
        </div>
      )}
    </>
  );
}
