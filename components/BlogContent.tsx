'use client'

import { useEffect, useRef } from 'react'

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    const codeBlocks = contentRef.current.querySelectorAll('pre')

    codeBlocks.forEach((pre) => {
      // Skip if already has a copy button
      if (pre.querySelector('.copy-btn')) return

      // Wrap in a relative container
      const wrapper = document.createElement('div')
      wrapper.className = 'code-block-wrapper'
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)

      // Create copy button
      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.setAttribute('aria-label', 'Copy code')
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`

      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent || pre.textContent || ''
        try {
          await navigator.clipboard.writeText(code)
          btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
          btn.classList.add('copied')
          setTimeout(() => {
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
            btn.classList.remove('copied')
          }, 2000)
        } catch {
          // Fallback for older browsers
          const textarea = document.createElement('textarea')
          textarea.value = code
          document.body.appendChild(textarea)
          textarea.select()
          document.execCommand('copy')
          document.body.removeChild(textarea)
          btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
          btn.classList.add('copied')
          setTimeout(() => {
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
            btn.classList.remove('copied')
          }, 2000)
        }
      })

      wrapper.appendChild(btn)
    })
  }, [content])

  return (
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: content }}
      className="blog-content"
    />
  )
}
