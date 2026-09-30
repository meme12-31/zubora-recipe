import type { Metadata } from 'next';
import RecipeSearchClient from '@/components/RecipeSearchClient';
import HomeSeoContent from '@/components/HomeSeoContent';
import { getAllArticles } from '@/lib/articles';
import { FAQS } from '@/lib/faq';

export const metadata: Metadata = {
  metadataBase: new URL('https://hit-tool.com'),
  alternates: {
    canonical: '/zubora-recipe',
  },
  title: {
    absolute: 'ズボラレシピ | 手間なし・簡単時短のレシピ検索ツール',
  },
  description:
    '冷蔵庫のあまり物を入力して、調理レベルを選ぶだけ。AIが実在する簡単レシピを提案します。',
  openGraph: {
    title: 'ズボラレシピ | 手間なし・簡単時短のレシピ検索ツール',
    description:
      '冷蔵庫のあまり物を入力して、調理レベルを選ぶだけ。AIが実在する簡単レシピを提案します。',
    url: 'https://hit-tool.com/zubora-recipe?v=10',
    siteName: 'hit-tool.com',
    images: [
      {
        url: 'https://hit-tool.com/zubora-recipe/og-image.png?v=10',
        width: 1200,
        height: 630,
        alt: 'ズボラレシピ OGP画像',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ズボラレシピ | 手間なし・簡単時短のレシピ検索ツール',
    description:
      '冷蔵庫のあまり物を入力して、調理レベルを選ぶだけ。AIが実在する簡単レシピを提案します。',
    images: ['https://hit-tool.com/zubora-recipe/og-image.png?v=10'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ズボラレシピ',
      url: 'https://hit-tool.com/zubora-recipe',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'All',
      description:
        '冷蔵庫のあまり物を入力して、調理レベルを選ぶだけ。AIが実在する簡単レシピを提案します。',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'JPY',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function ZuboraRecipePage() {
  const articles = getAllArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecipeSearchClient>
        <HomeSeoContent articles={articles} />
      </RecipeSearchClient>
    </>
  );
}
