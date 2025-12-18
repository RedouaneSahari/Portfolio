/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [],
  },
  // Utiliser basePath uniquement en production (pour GitHub Pages)
  basePath: isProd ? '/Portfolio' : '',
  assetPrefix: isProd ? '/Portfolio/' : '',
  // Désactiver les routes API pour l'export statique
  trailingSlash: true,
}

module.exports = nextConfig
