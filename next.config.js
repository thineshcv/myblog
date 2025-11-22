/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  // basePath / assetPrefix
  // For GitHub Pages (username.github.io/repo-name) set NEXT_PUBLIC_BASE_PATH='/repo-name'
  // For example, NEXT_PUBLIC_BASE_PATH='/myblog'
  // When empty, defaults to root '/'
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // assetPrefix ensures static assets are emitted and referenced from the same subpath
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

module.exports = nextConfig

