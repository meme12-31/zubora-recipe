import type { Metadata } from 'next';
import Header from '@/components/Header';
import UsefulColumnsSection from '@/components/UsefulColumnsSection';

export const metadata: Metadata = {
  title: 'お役立ちコラム | 冷蔵庫レスキュー',
  description:
    'あまり物活用やズボラ飯のコツを、読みやすい記事でまとめています。',
};

export default function ArticlesIndexPage() {
  return (
    <>
      <Header showBack subtitle="お役立ちコラム" />
      <main className="flex-1 px-4 pb-16 pt-4">
        <UsefulColumnsSection />
      </main>
    </>
  );
}
