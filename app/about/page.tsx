import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me and this blog.',
  openGraph: {
    title: 'About | Personal Blog',
    description: 'Learn more about me and this blog.',
  },
}

export default function AboutPage() {
  return (
    <div 
      className="transition-colors"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8 transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          About
        </h1>
        <div className="prose prose-lg max-w-none">
          <p 
            className="text-base sm:text-lg mb-4 sm:mb-6 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome to my personal blog! I'm passionate about technology, writing, and sharing knowledge.
          </p>
          <p 
            className="text-sm sm:text-base mb-4 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            This blog is a space where I share my thoughts, experiences, and insights on various topics
            that interest me. From web development and programming to life lessons and personal growth,
            you'll find a mix of technical and personal content here.
          </p>
          <p 
            className="text-sm sm:text-base mb-4 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            I believe in continuous learning and sharing knowledge with the community. Through this blog,
            I hope to contribute to the collective wisdom and help others on their journey.
          </p>
          <h2 
            className="text-2xl sm:text-3xl font-light mt-8 sm:mt-10 mb-4 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            Get in Touch
          </h2>
          <p 
            className="text-sm sm:text-base mb-4 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            I'd love to hear from you! Feel free to reach out through social media or email.
          </p>
        </div>
      </div>
    </div>
  )
}

