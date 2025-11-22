'use client'

import { useEffect } from 'react'

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  useEffect(() => {
    // Add syntax highlighting or other client-side enhancements here if needed
  }, [])

  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="blog-content"
    />
  )
}

