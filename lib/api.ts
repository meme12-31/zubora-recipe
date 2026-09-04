import { BASE_PATH } from './config';

/**
 * basePath を考慮した API URL を生成する。
 * fetch() には basePath が自動付与されないため必須。
 */
export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
