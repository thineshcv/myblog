import Link from 'next/link'

export default function NotFound() {
  return (
    <div 
      className="transition-colors"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h1 
          className="text-5xl sm:text-6xl font-light mb-4 transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          404
        </h1>
        <h2 
          className="text-2xl sm:text-3xl font-light mb-4 transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          Page Not Found
        </h2>
        <p 
          className="text-sm sm:text-base mb-8 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="text-sm sm:text-base underline underline-offset-2 link-accent"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

