// ============================================================
// LocalStorage 操作ユーティリティ
// save / load / update / delete / reset + 破損データ耐性
// ============================================================
import type { Recipe, RescueSettings, EffortLevel } from '@/types';
import { STORAGE_KEYS } from '@/lib/config';

const DEFAULT_SETTINGS: RescueSettings = {
  specialSeasonings: [],
  lastEffortLevel: 1,
};

/** SSR 安全に localStorage を取得 */
function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    // 破損データ
    return null;
  }
}

// ---- 設定 (rescue_settings) ----

function isValidEffortLevel(v: unknown): v is EffortLevel {
  return v === 1 || v === 2 || v === 3;
}

export function loadSettings(): RescueSettings {
  const storage = getStorage();
  if (!storage) return { ...DEFAULT_SETTINGS };

  const parsed = safeParse<Partial<RescueSettings>>(
    storage.getItem(STORAGE_KEYS.settings),
  );
  if (!parsed || typeof parsed !== 'object') {
    return { ...DEFAULT_SETTINGS };
  }

  // 破損耐性: フィールドごとに検証しつつ復元
  const specialSeasonings = Array.isArray(parsed.specialSeasonings)
    ? parsed.specialSeasonings.filter((s): s is string => typeof s === 'string')
    : [];
  const lastEffortLevel = isValidEffortLevel(parsed.lastEffortLevel)
    ? parsed.lastEffortLevel
    : 1;

  return { specialSeasonings, lastEffortLevel };
}

export function saveSettings(settings: RescueSettings): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  } catch {
    // 保存失敗（容量超過など）は無視
  }
}

// ---- お気に入り (rescue_favorites) ----

function isValidRecipe(v: unknown): v is Recipe {
  if (!v || typeof v !== 'object') return false;
  const r = v as Record<string, unknown>;
  return (
    typeof r.id === 'string' &&
    typeof r.title === 'string' &&
    typeof r.prepTimeMinutes === 'number' &&
    (r.effortLevel === 1 || r.effortLevel === 2 || r.effortLevel === 3) &&
    Array.isArray(r.ingredients) &&
    Array.isArray(r.instructions) &&
    typeof r.createdAt === 'string'
  );
}

export function loadFavorites(): Recipe[] {
  const storage = getStorage();
  if (!storage) return [];

  const parsed = safeParse<unknown>(storage.getItem(STORAGE_KEYS.favorites));
  if (!Array.isArray(parsed)) return [];

  // 破損耐性: 妥当なレシピのみ残す
  return parsed.filter(isValidRecipe);
}

export function saveFavorites(recipes: Recipe[]): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEYS.favorites, JSON.stringify(recipes));
  } catch {
    // 無視
  }
}

export function addFavorite(recipe: Recipe): Recipe[] {
  const current = loadFavorites();
  if (current.some((r) => r.id === recipe.id)) {
    return current;
  }
  const next = [recipe, ...current];
  saveFavorites(next);
  return next;
}

export function removeFavorite(recipeId: string): Recipe[] {
  const next = loadFavorites().filter((r) => r.id !== recipeId);
  saveFavorites(next);
  return next;
}

export function isFavorite(recipeId: string): boolean {
  return loadFavorites().some((r) => r.id === recipeId);
}

export function resetAll(): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(STORAGE_KEYS.settings);
    storage.removeItem(STORAGE_KEYS.favorites);
  } catch {
    // 無視
  }
}
