import type { Metadata } from 'next';
import Header from '@/components/Header';
import UsefulColumnsSection from '@/components/UsefulColumnsSection';

export const metadata: Metadata = {
  title: 'お役立ちコラム',
  description:
    'あまり物活用やズボラ飯のコツを、読みやすい記事でまとめています。',
  alternates: {
    canonical: '/zubora-recipe/articles',
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

const breadcrumbListJsonLd = {
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
  ],
};

export default function ArticlesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListJsonLd),
        }}
      />
      <Header showBack subtitle="お役立ちコラム" />
      <main className="flex-1 px-4 pb-16 pt-4">
        <UsefulColumnsSection />
      </main>
    </>
  );
}
