import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { format } from 'date-fns'

export default function Home() {
  const posts = getBlogPosts().slice(0, 3) // Show latest 3 posts

  return (
    <div 
      className="transition-colors"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="mb-12 sm:mb-16">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            Blog
          </h1>
          <p 
            className="text-base sm:text-lg max-w-2xl transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            Thoughts, ideas, and stories.
          </p>
        </div>

        {/* Latest Posts */}
        <div className="mb-8 sm:mb-12">
          <h2 
            className="text-xl sm:text-2xl font-light mb-6 sm:mb-8 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            Recent
          </h2>
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
                <h3 
                  className="text-xl sm:text-2xl font-light mb-2 sm:mb-3 transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="link-primary"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p 
                  className="text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs sm:text-sm inline-flex items-center underline underline-offset-2 link-accent"
                >
                  Read →
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Link
            href="/blog"
            className="text-sm sm:text-base underline underline-offset-2 link-accent"
          >
            View all posts →
          </Link>
        </div>
      </div>
    </div>
  )
}

