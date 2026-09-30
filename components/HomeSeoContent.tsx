import { ChefHat, HelpCircle, ChevronDown } from 'lucide-react';
import UsefulColumnsBanner from '@/components/UsefulColumnsBanner';
import { FAQS } from '@/lib/faq';

export default function HomeSeoContent() {
  return (
    <div className="space-y-10 pt-2">
      {/* お役立ちコラム 記事一覧へバナー */}
      <div>
        <UsefulColumnsBanner />
      </div>

      {/* ズボラレシピの使い方（3ステップガイド） */}
      <section aria-labelledby="how-to-use-heading" className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-brand-orange">
            <ChefHat className="h-4 w-4" aria-hidden />
          </span>
          <h2 id="how-to-use-heading" className="text-base font-bold text-brand-gray">
            ズボラレシピの使い方
          </h2>
        </div>
        <p className="text-xs leading-relaxed text-gray-500">
          冷蔵庫に残った食材を入力するだけ！3ステップで簡単に今夜のメニューが決まります。
        </p>

        <div className="space-y-2.5">
          <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 shadow-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              1
            </span>
            <div>
              <h3 className="text-xs font-bold text-brand-gray">余っている食材を入力</h3>
              <p className="mt-0.5 text-xs text-gray-500">
                キャベツや豚肉、卵など、家にある食材を入力または候補からタップして選択します。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 shadow-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              2
            </span>
            <div>
              <h3 className="text-xs font-bold text-brand-gray">調理レベル（手間）を選択</h3>
              <p className="mt-0.5 text-xs text-gray-500">
                包丁不要の「超ズボラ」、10分以内の「爆速・時短」、しっかりおかずの3段階から指定できます。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 shadow-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              3
            </span>
            <div>
              <h3 className="text-xs font-bold text-brand-gray">レシピを探すをタップ</h3>
              <p className="mt-0.5 text-xs text-gray-500">
                AIが食材を無駄なく使い切る簡単美味しい実用レシピを即座に提案します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問（FAQ）アコーディオン */}
      <section aria-labelledby="faq-heading" className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-brand-orange">
            <HelpCircle className="h-4 w-4" aria-hidden />
          </span>
          <h2 id="faq-heading" className="text-base font-bold text-brand-gray">
            よくある質問（FAQ）
          </h2>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl bg-white p-3.5 shadow-sm transition"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-left text-xs font-bold text-brand-gray select-none">
                <span className="flex items-center gap-2 pr-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[11px] font-bold text-brand-orange">
                    Q
                  </span>
                  <span>{faq.question}</span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="mt-2.5 border-t border-orange-50 pt-2.5 text-xs leading-relaxed text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
