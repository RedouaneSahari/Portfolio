/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [],
  },
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
}

module.exports = nextConfig
