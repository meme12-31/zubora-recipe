import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { getAllArticles } from '@/lib/articles';

export default function UsefulColumnsSection() {
  const articles = getAllArticles();

  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="useful-columns-heading"
      className="space-y-3"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-brand-orange">
          <BookOpen className="h-5 w-5" aria-hidden />
        </span>
        <h2
          id="useful-columns-heading"
          className="text-lg font-bold text-brand-gray"
        >
          お役立ちコラム
        </h2>
      </div>
      <p className="text-sm leading-relaxed text-gray-500">
        あまり物活用やズボラ飯のコツを、読みやすい記事でまとめています。
      </p>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}`}
              className="group block rounded-2xl bg-white p-4 shadow-sm transition hover:bg-orange-50/80 active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <h3 className="text-sm font-bold leading-snug text-brand-gray group-hover:text-brand-orange">
                    {article.title}
                  </h3>
                  <p className="line-clamp-3 text-xs leading-relaxed text-gray-500">
                    {article.excerpt}
                  </p>
                </div>
                <ChevronRight
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-300 transition group-hover:text-brand-orange"
                  aria-hidden
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
