import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.hit-tool.com/zubora-recipe';
  const now = new Date();

  const articleEntries = getAllArticles().map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articleEntries,
  ];
}
