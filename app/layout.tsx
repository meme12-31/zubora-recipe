import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Footer from '@/components/Footer';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-KXFP18WL67';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hit-tool.com/zubora-recipe'),
  title: {
    default: '冷蔵庫レスキュー',
    template: '%s | 冷蔵庫レスキュー',
  },
  description:
    '冷蔵庫のあまり物と手間レベルを指定するだけで、AIが実在する簡単レシピを提案します。',
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
