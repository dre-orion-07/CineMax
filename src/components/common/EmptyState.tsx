import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
}

export const EmptyState = ({ icon: Icon, title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <Icon size={28} style={{ color: 'var(--color-text-muted)' }} />
      </div>
      <h3
        className="text-lg font-semibold mb-1"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-sm max-w-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {description}
        </p>
      )}
    </div>
  )
}