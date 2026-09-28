import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
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

export default function ZuboraRecipePage() {
  return <HomePage />;
}
