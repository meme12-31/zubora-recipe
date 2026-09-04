/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/zubora-recipe',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/zubora-recipe',
        basePath: false,
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
