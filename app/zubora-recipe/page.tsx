import type { Metadata } from 'next';
import RecipeSearchClient from '@/components/RecipeSearchClient';
import HomeSeoContent from '@/components/HomeSeoContent';
import { FAQS } from '@/lib/faq';

export const metadata: Metadata = {
  metadataBase: new URL('https://hit-tool.com'),
  alternates: {
    canonical: '/zubora-recipe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  title: {
    absolute: '冷蔵庫レスキュー｜あまり物でズボラ飯・簡単レシピ検索 - ズボラレシピ',
  },
  description:
    '冷蔵庫にあるあまり物を入力して、調理レベルを選ぶだけで、AIが手軽に作れる簡単・時短レシピを提案します。献立に迷ったときや料理の手間を減らしたい忙しい日にも便利。無料・登録不要で、毎日の料理に役立ちます。',
  openGraph: {
    title: '冷蔵庫レスキュー｜あまり物でズボラ飯・簡単レシピ検索 - ズボラレシピ',
    description:
      '冷蔵庫にあるあまり物を入力して、調理レベルを選ぶだけで、AIが手軽に作れる簡単・時短レシピを提案します。献立に迷ったときや料理の手間を減らしたい忙しい日にも便利。無料・登録不要で、毎日の料理に役立ちます。',
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
    title: '冷蔵庫レスキュー｜あまり物でズボラ飯・簡単レシピ検索 - ズボラレシピ',
    description:
      '冷蔵庫にあるあまり物を入力して、調理レベルを選ぶだけで、AIが手軽に作れる簡単・時短レシピを提案します。献立に迷ったときや料理の手間を減らしたい忙しい日にも便利。無料・登録不要で、毎日の料理に役立ちます。',
    images: ['https://hit-tool.com/zubora-recipe/og-image.png?v=10'],
  },
};

// 1. WebApplication 構造化データ
const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '冷蔵庫レスキュー｜あまり物でズボラ飯',
  url: 'https://hit-tool.com/zubora-recipe',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  description:
    '冷蔵庫に残った食材を選ぶだけで、簡単に作れるズボラ飯レシピを提案する便利Webツールです。',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
  },
};

// 2. BreadcrumbList 構造化データ（パンくずリスト）
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
      name: '冷蔵庫レスキュー',
      item: 'https://hit-tool.com/zubora-recipe',
    },
  ],
};

// 3. FAQPage 構造化データ
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function ZuboraRecipePage() {
  return (
    <>
      {/* 構造化データ: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd),
        }}
      />
      {/* 構造化データ: BreadcrumbList (パンくずリスト) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListJsonLd),
        }}
      />
      {/* 構造化データ: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <RecipeSearchClient>
        <HomeSeoContent />
      </RecipeSearchClient>
    </>
  );
}
