import { useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUIStore } from '@/store'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useUIStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full cursor-pointer transition-colors duration-200"
      style={{ color: 'var(--color-text-secondary)' }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  )
}