import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  message?: string
  onRetry: () => void
}

export const ErrorState = ({
  message = 'Failed to load content. Please try again.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <AlertCircle size={24} style={{ color: 'var(--color-accent-primary)' }} />
      </div>
      <p
        className="text-sm mb-4 max-w-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {message}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
        }}
      >
        <RefreshCw size={14} />
        Retry
      </button>
    </div>
  )
}