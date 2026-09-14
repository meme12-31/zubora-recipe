import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';

interface ArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: '記事が見つかりません | 冷蔵庫レスキュー' };
  }
  return {
    title: `${article.title} | 冷蔵庫レスキュー`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <>
      <Header showBack subtitle="お役立ちコラム" />
      <main className="flex-1 px-4 pb-16 pt-4">
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </main>
    </>
  );
}
