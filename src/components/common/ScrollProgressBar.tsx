import { useState, useEffect } from 'react'

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollPercent)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px]"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        className="h-full transition-all duration-150"
        style={{
          width: `${progress}%`,
          backgroundColor: 'var(--color-accent-primary)',
        }}
      />
    </div>
  )
}