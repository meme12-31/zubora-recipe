import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function UsefulColumnsBanner() {
  return (
    <Link
      href="/articles"
      className="group flex min-h-[56px] items-center justify-between gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-orange-100 transition hover:bg-orange-50 hover:ring-orange-200 active:scale-[0.99]"
    >
      <span className="text-sm font-bold leading-snug text-brand-gray group-hover:text-brand-orange">
        📚 お役立ちコラム 記事一覧へ
      </span>
      <ChevronRight
        className="h-5 w-5 flex-shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-brand-orange"
        aria-hidden
      />
    </Link>
  );
}
