import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      className="border-t transition-colors"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border)'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div 
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <p>&copy; {currentYear}</p>
          <div className="flex gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-secondary"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-secondary"
            >
              GitHub
            </a>
            <a
              href="mailto:your.email@example.com"
              className="link-secondary"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

