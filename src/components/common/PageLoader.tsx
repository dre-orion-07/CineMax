import { motion } from 'framer-motion'

export const PageLoader = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-t-transparent"
          style={{ borderColor: 'var(--color-accent-primary)', borderTopColor: 'transparent' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <span
          className="text-sm font-medium tracking-widest uppercase"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Loading...
        </span>
      </motion.div>
    </div>
  )
}