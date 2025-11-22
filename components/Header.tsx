import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header 
      className="sticky top-0 z-50 border-b transition-colors"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border)'
      }}
    >
      <nav className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link 
            href="/" 
            className="text-lg sm:text-xl font-light link-primary"
          >
            Blog
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex gap-4 sm:gap-6 text-sm sm:text-base">
              <Link
                href="/"
                className="font-light link-secondary"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="font-light link-secondary"
              >
                Posts
              </Link>
              <Link
                href="/cv"
                className="font-light link-secondary"
              >
                CV
              </Link>
              <Link
                href="/about"
                className="font-light link-secondary"
              >
                About
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}

