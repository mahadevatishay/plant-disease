import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { getInitialTheme, toggleTheme, type Theme } from '../utils/theme'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(getInitialTheme())
  }, [])

  const handleToggle = () => {
    setTheme(prev => toggleTheme(prev))
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative w-14 h-7 rounded-full bg-bark-200 dark:bg-forest-800 border border-bark-300 dark:border-forest-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-500"
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-forest-900 shadow-sm"
        animate={{ x: theme === 'dark' ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.div
          animate={{ rotate: theme === 'dark' ? 0 : 180, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'dark'
            ? <Moon size={13} className="text-forest-400" />
            : <Sun size={13} className="text-soil-light" />
          }
        </motion.div>
      </motion.div>
    </button>
  )
}
