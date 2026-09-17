import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'ズボラレシピ | 手間なし・簡単時短のレシピ検索ツール',
  description:
    '毎日のご飯作りをラクにする簡単ズボラレシピツール。包丁いらず、レンジで完結、洗い物最小限など、面倒くさがり屋さんのための時短料理アイデアをサクッと見つけて、おうちごはんをもっと気軽に！',
  openGraph: {
    title: 'ズボラレシピ | 手間なし・簡単時短のレシピ検索ツール',
    description:
      '毎日のご飯作りをラクにする簡単ズボラレシピツール。包丁いらず、レンジで完結、洗い物最小限など、面倒くさがり屋さんのための時短料理アイデアをサクッと見つけて、おうちごはんをもっと気軽に！',
    url: 'https://www.hit-tool.com/zubora-recipe?v=3',
    siteName: 'hit-tool.com',
    images: [
      {
        url: 'https://www.hit-tool.com/og-image-v2.png',
        width: 1200,
        height: 630,
        alt: 'ズボラレシピ OGP画像',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function ZuboraRecipePage() {
  return <HomePage />;
}
