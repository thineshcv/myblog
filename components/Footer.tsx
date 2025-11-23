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
          {/* <p>&copy; {currentYear} Thinesh C V</p> */}
          <p></p>
          <div className="flex gap-4">
            <a
              href="https://x.com/thineshcv"
              target="_blank"
              rel="noopener noreferrer"
              className="link-secondary"
              aria-label="X (formerly Twitter)"
              title="X"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="sr-only">X</span>
            </a>

            <a
              href="https://github.com/thineshcv"
              target="_blank"
              rel="noopener noreferrer"
              className="link-secondary"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.33-1.77-1.33-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.81 5.61-5.49 5.9.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0012 .5z" />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>

            <a
              href="https://bsky.app/profile/thineshcv"
              target="_blank"
              rel="noopener noreferrer"
              className="link-secondary"
              aria-label="Bluesky"
              title="Bluesky"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 3c3.866 0 7 3.134 7 7 0 4.418-7 11-7 11S5 14.418 5 10c0-3.866 3.134-7 7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.5 11.5c1 1 3 1 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="sr-only">Bluesky</span>
            </a>

            <a
              href="https://www.linkedin.com/in/thineshcv"
              target="_blank"
              rel="noopener noreferrer"
              className="link-secondary"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.8-1.8 3.6-1.8 3.8 0 4.5 2.5 4.5 5.8V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.4-2 2.7V21H9V9z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>

            <a
              href="mailto:your.email@example.com"
              className="link-secondary"
              aria-label="Email"
              title="Email"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 8.5v7A2.5 2.5 0 005.5 18h13a2.5 2.5 0 002.5-2.5v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 6.5a2.5 2.5 0 00-2.5-2.5h-13A2.5 2.5 0 003 6.5v.5l9 5.5 9-5.5v-.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

