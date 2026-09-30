import type { ArticleEntry } from '@/lib/articles';

interface ArticleJsonLdProps {
  article: ArticleEntry;
}

export default function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const url = `https://hit-tool.com/zubora-recipe/articles/${article.slug}`;
  const imageUrl =
    article.image || 'https://hit-tool.com/zubora-recipe/og-image.png?v=10';
  const datePublished = article.datePublished || '2026-10-01';
  const dateModified = article.dateModified || datePublished;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: imageUrl,
    datePublished,
    dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Organization',
      name: 'HITツールズ',
      url: 'https://hit-tool.com/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HITツールズ',
      url: 'https://hit-tool.com/',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'HITツールズ',
        item: 'https://hit-tool.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '冷蔵庫レスキュー コラム一覧',
        item: 'https://hit-tool.com/zubora-recipe/articles',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
    </>
  );
}
