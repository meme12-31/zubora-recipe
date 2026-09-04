/** @type {import('next').NextConfig} */
const BASE_PATH = '/zubora-recipe';

const nextConfig = {
  reactStrictMode: true,
  // アプリはサブディレクトリ /zubora-recipe 配下で公開される
  basePath: BASE_PATH,
  // クライアント側の fetch などで basePath を参照できるように公開
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    // DALL-E 3 / OpenAI が返す画像ドメインを許可
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;
