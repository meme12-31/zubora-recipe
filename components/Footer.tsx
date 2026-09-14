const footerLinks = [
  { label: '運営者情報', href: '#' },
  { label: 'プライバシーポリシー', href: '#' },
  { label: 'お問い合わせ', href: '#' },
] as const;

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-orange-100/90 bg-brand-cream/95 px-4 pb-8 pt-8">
      <nav
        aria-label="フッターナビゲーション"
        className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-2"
      >
        {footerLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-xs font-medium text-gray-500 transition hover:text-brand-orange"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <p className="mt-5 text-center text-xs text-gray-400">
        © 2026 冷蔵庫レスキュー
      </p>
    </footer>
  );
}
