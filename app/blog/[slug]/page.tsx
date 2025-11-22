import { notFound } from 'next/navigation'
import { getBlogPosts, getBlogPost } from '@/lib/blog'
import { format } from 'date-fns'
import type { Metadata } from 'next'
import BlogContent from '@/components/BlogContent'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: 'Your Name' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Your Name'],
      tags: post.tags,
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image || '',
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Your Name',
    },
    publisher: {
      '@type': 'Person',
      name: 'Your Name',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article 
        className="transition-colors"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <header className="mb-8 sm:mb-12">
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6 transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {post.title}
            </h1>
            <div 
              className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-4 sm:mb-6 transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs sm:text-sm border transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      borderColor: 'var(--border-light)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {post.image && (
            <div className="mb-8 sm:mb-12">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <BlogContent content={post.content} />
          </div>
        </div>
      </article>
    </>
  )
}

