import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import ArticleJsonLd from '@/components/ArticleJsonLd';
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
    return { title: '記事が見つかりません' };
  }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/zubora-recipe/articles/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <>
      <ArticleJsonLd article={article} />
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
