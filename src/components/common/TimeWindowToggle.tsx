import type { TimeWindow } from '@/types'

interface TimeWindowToggleProps {
  value: TimeWindow
  onChange: (value: TimeWindow) => void
}

export const TimeWindowToggle = ({ value, onChange }: TimeWindowToggleProps) => {
  return (
    <div
      className="inline-flex items-center p-1 rounded-lg"
      style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
    >
      {(['day', 'week'] as TimeWindow[]).map((window) => {
        const isActive = value === window
        return (
          <button
            key={window}
            onClick={() => onChange(window)}
            className="px-4 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: isActive ? 'var(--color-accent-primary)' : 'transparent',
              color: isActive ? 'white' : 'var(--color-text-secondary)',
            }}
          >
            {window === 'day' ? 'Today' : 'This Week'}
          </button>
        )
      })}
    </div>
  )
}