'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#282828',
          color: '#ebdbb2',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '1rem' }}>
              Something went wrong
            </h2>
            <button
              onClick={() => reset()}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #504945',
                backgroundColor: 'transparent',
                color: '#ebdbb2',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
