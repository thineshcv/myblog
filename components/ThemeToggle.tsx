'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  if (!mounted) {
    return (
      <button
        className="w-8 h-8 flex items-center justify-center transition-colors"
        style={{ color: 'var(--text-secondary)' }}
        aria-label="Toggle theme"
      >
        <span className="text-sm">☀</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 flex items-center justify-center link-secondary"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <span className="text-base">☀</span>
      ) : (
        <span className="text-base">🌙</span>
      )}
    </button>
  )
}

