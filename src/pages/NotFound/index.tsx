import { Link } from 'react-router-dom'
import { Home, Film } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEOHead } from '@/components/common/SEOHead'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <SEOHead title="404 - Page Not Found" description="The page you're looking for doesn't exist." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        >
          <Film size={36} style={{ color: 'var(--color-accent-primary)' }} />
        </div>
        <h1
          className="text-7xl font-bold mb-2"
          style={{ color: 'var(--color-accent-primary)' }}
        >
          404
        </h1>
        <h2
          className="text-2xl font-bold mb-3"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Scene Not Found
        </h2>
        <p
          className="text-sm mb-8 max-w-md"
          style={{ color: 'var(--color-text-muted)' }}
        >
          The page you're looking for doesn't exist or may have been moved. Let's get you back to the movies.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm"
          style={{ backgroundColor: 'var(--color-accent-primary)', color: 'white' }}
        >
          <Home size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound