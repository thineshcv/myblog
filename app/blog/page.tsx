import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { format } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Browse all blog posts about technology, life, and everything in between.',
  openGraph: {
    title: 'Blog | Personal Blog',
    description: 'Browse all blog posts about technology, life, and everything in between.',
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div 
      className="transition-colors"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            All Posts
          </h1>
          <p 
            className="text-base sm:text-lg transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="pb-6 sm:pb-8 last:border-0 transition-colors"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <time 
                className="text-xs sm:text-sm block mb-2 transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              <h2 
                className="text-xl sm:text-2xl font-light mb-2 sm:mb-3 transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="link-primary"
                >
                  {post.title}
                </Link>
              </h2>
              <p 
                className="text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {post.excerpt}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
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
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs sm:text-sm inline-flex items-center underline underline-offset-2 link-accent"
              >
                Read →
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p 
              className="text-base sm:text-lg transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

