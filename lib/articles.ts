import { budgetHighProteinRecipesHtml } from '@/lib/article-content/budget-high-protein-recipes';
import { kitchenScissorsRecipesHtml } from '@/lib/article-content/kitchen-scissors-recipes';
import { onePanRecipesHtml } from '@/lib/article-content/one-pan-recipes';
import { microwaveBowlRecipesHtml } from '@/lib/article-content/microwave-bowl-recipes';
import { easyDonburiOneplateRecipesHtml } from '@/lib/article-content/easy-donburi-oneplate-recipes';
import { easySeasoningsRecipesHtml } from '@/lib/article-content/easy-seasonings-recipes';
import { frozenAndPrepRecipesHtml } from '@/lib/article-content/frozen-and-prep-recipes';
import { fridgeOrganizationTipsHtml } from '@/lib/article-content/fridge-organization-tips';
import { versatileVegetablesRecipesHtml } from '@/lib/article-content/versatile-vegetables-recipes';
import { zuboraHanBasicsHtml } from '@/lib/article-content/zubora-han-basics';

export interface ArticleEntry {
  slug: string;
  title: string;
  excerpt: string;
  html: string;
}

const ARTICLES: ArticleEntry[] = [
  {
    slug: 'zubora-han-basics',
    title:
      '冷蔵庫の余り物で作る「ズボラ飯」の基本！食材を無駄にしない組み合わせ術',
    excerpt:
      '「たんぱく質＋野菜＋万能調味料」の黄金公式と、和風・マヨポン・中華風の失敗しない味付けルールを解説。あまり物を無駄にしない自炊の基本をまとめました。',
    html: zuboraHanBasicsHtml,
  },
  {
    slug: 'fridge-organization-tips',
    title:
      '【一人暮らし必見】賞味期限切れを防ぐ！冷蔵庫の整理術と「見せる化」のコツ',
    excerpt:
      '食材を余らせる原因と、早め消費トレイ・定位置・7割収納など「見せる化」で賞味期限切れを防ぐ整理術。買った当日の3分下処理も紹介します。',
    html: fridgeOrganizationTipsHtml,
  },
  {
    slug: 'versatile-vegetables-recipes',
    title:
      '玉ねぎ・人参・キャベツ！使い回し抜群の「万能野菜」使い切りレシピアイデア',
    excerpt:
      '玉ねぎ・人参・キャベツを無駄にしない切り方と使い回し。スープ・レンチン・蒸し焼き、ミックス野菜の作り置きまで、ズボラでも使い切れるアイデアをまとめました。',
    html: versatileVegetablesRecipesHtml,
  },
  {
    slug: 'easy-seasonings-recipes',
    title:
      'ズボラ調味料の最適解！「めんつゆ・ポン酢・焼肉のタレ」で味が決まる絶品レシピ',
    excerpt:
      'めんつゆ・ポン酢・焼肉のタレで味付けを一発決着。和風炒め・ポン酢照り焼き・スタミナ炒めなど、計量不要のズボラレシピと使い方のコツをまとめました。',
    html: easySeasoningsRecipesHtml,
  },
  {
    slug: 'budget-high-protein-recipes',
    title:
      'もやし・豆腐・卵で乗り切る！節約＆時短を両立する高タンパクズボラ飯',
    excerpt:
      'もやし・豆腐・卵を10分以内で大満足のおかずに。レンチン・水切りなし・包丁不要の節約テクニックと高タンパクズボラレシピをまとめました。',
    html: budgetHighProteinRecipesHtml,
  },
  {
    slug: 'microwave-bowl-recipes',
    title:
      '【火を使わない料理】電子レンジだけで完結する「耐熱ボウル」超時短おかず',
    excerpt:
      '耐熱ボウル1つと電子レンジで10分以内のおかず。蒸し炒め・ワンボウルパスタ・レンジ肉じゃがと、失敗しない加熱のコツをまとめました。',
    html: microwaveBowlRecipesHtml,
  },
  {
    slug: 'kitchen-scissors-recipes',
    title:
      '包丁・まな板不要！「キッチンハサミ」と手だけで作る爆速おかずレシピ',
    excerpt:
      '包丁・まな板なしで下準備から完成まで。キッチンハサミの直投入炒め・手ちぎり和え・鶏ももポン酢照り焼きなど、後片付け最小のノーカット調理術をまとめました。',
    html: kitchenScissorsRecipesHtml,
  },
  {
    slug: 'one-pan-recipes',
    title:
      '【洗い物を最小限に】フライパン1つで完結する「ワンパン」絶品ズボラ飯アイデア',
    excerpt:
      '別茹で・別炒め不要のワンパン調理。クリームパスタ・蒸し焼き・ビビンバ風ご飯と、深型フライパンで失敗しない3つの鉄則をまとめました。',
    html: onePanRecipesHtml,
  },
  {
    slug: 'easy-donburi-oneplate-recipes',
    title:
      '【包丁なし・レンジで完結】一皿で大満足！手軽に作れる「ズボラ丼＆ワンプレート」アイデア',
    excerpt:
      'レンジとハサミだけで5〜10分のズボラ丼。親子丼・ツナマヨキムチ・ねぎ豚・さば缶あんかけと、一皿で満足できるワンプレートのコツをまとめました。',
    html: easyDonburiOneplateRecipesHtml,
  },
  {
    slug: 'frozen-and-prep-recipes',
    title:
      '【自炊の手間を徹底削減】冷凍食材・作り置きをフル活用するズボラ時短テクニック',
    excerpt:
      '冷凍カット野菜・パラパラ肉・冷凍うどんの活用法と、ついで作り置き3ルール。下処理ゼロで5〜10分の夕食を実現するズボラ時短術をまとめました。',
    html: frozenAndPrepRecipesHtml,
  },
];

export function getAllArticles(): ArticleEntry[] {
  return ARTICLES;
}

export function getArticleBySlug(slug: string): ArticleEntry | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
