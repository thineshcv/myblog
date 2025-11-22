/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  // If deploying to GitHub Pages with a custom domain, set basePath to ''
  // If deploying to username.github.io/repo-name, set basePath to '/repo-name'
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig

