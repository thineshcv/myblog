# Personal Blog - SEO Optimized

A modern, SEO-optimized personal blogging site built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Next.js 14** with App Router
- 📝 **Markdown Support** for blog posts
- 🔍 **SEO Optimized** with metadata, structured data, sitemap, and robots.txt
- 🎨 **Modern UI** with Tailwind CSS
- 📱 **Fully Responsive** design
- ⚡ **Fast Performance** with static generation
- 🏷️ **Tag Support** for blog posts
- 📊 **Reading Time** calculation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file (optional):

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Creating Blog Posts

Blog posts are written in Markdown and stored in the `content/posts` directory.

Each post should have frontmatter with the following fields:

```markdown
---
title: Your Post Title
date: 2024-01-15
excerpt: A brief description of your post
tags:
  - Tag1
  - Tag2
image: /images/your-image.jpg
---

Your post content here...
```

## SEO Features

- **Metadata API**: Dynamic metadata for each page
- **Open Graph Tags**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: JSON-LD for blog posts
- **Sitemap**: Automatically generated XML sitemap
- **Robots.txt**: Search engine crawler instructions
- **Canonical URLs**: Prevent duplicate content issues

## Customization

### Update Site Information

Edit `app/layout.tsx` to update:
- Site title and description
- Author information
- Social media links
- SEO verification codes

### Styling

The site uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles and prose styling

### Components

- `components/Header.tsx` - Navigation header
- `components/Footer.tsx` - Site footer
- `components/BlogContent.tsx` - Blog post content renderer

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

Build the production version:

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── blog/            # Blog pages
│   ├── about/           # About page
│   ├── layout.tsx       # Root layout with SEO
│   ├── page.tsx         # Home page
│   ├── sitemap.ts       # Sitemap generation
│   └── robots.ts        # Robots.txt generation
├── components/          # React components
├── content/            # Blog posts (Markdown)
│   └── posts/
├── lib/                # Utility functions
│   └── blog.ts         # Blog post parsing
└── public/             # Static assets
```

## License

MIT

## Contributing

Feel free to fork this project and customize it for your own use!

