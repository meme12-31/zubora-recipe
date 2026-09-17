import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Footer from '@/components/Footer';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-KXFP18WL67';

export const metadata: Metadata = {
  title: 'ズボラレシピ | 手間なし・簡単時短のレシピ検索ツール',
  description:
    '毎日のご飯作りをラクにする簡単ズボラレシピツール。包丁いらず、レンジで完結、洗い物最小限など、面倒くさがり屋さんのための時短料理アイデアをサクッと見つけて、おうちごはんをもっと気軽に！',
  openGraph: {
    title: 'ズボラレシピ | 手間なし・簡単時短のレシピ検索ツール',
    description:
      '毎日のご飯作りをラクにする簡単ズボラレシピツール。包丁いらず、レンジで完結、洗い物最小限など、面倒くさがり屋さんのための時短料理アイデアをサクッと見つけて、おうちごはんをもっと気軽に！',
    url: 'https://www.hit-tool.com/zubora-recipe?v=2',
    siteName: 'hit-tool.com',
    images: [
      {
        url: 'https://www.hit-tool.com/zubora-recipe/og-image-v2.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ズボラレシピ | 手間なし・簡単時短のレシピ検索ツール',
    description:
      '毎日のご飯作りをラクにする簡単ズボラレシピツール。包丁いらず、レンジで完結、洗い物最小限など、面倒くさがり屋さんのための時短料理アイデアをサクッと見つけて、おうちごはんをもっと気軽に！',
    images: ['https://www.hit-tool.com/zubora-recipe/og-image-v2.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#F97316',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-brand-cream text-brand-gray">
        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* モバイルライクな中央寄せコンテナ */}
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-brand-cream shadow-sm">
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
