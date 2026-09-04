/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/zubora-recipe',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
