import { Star } from 'lucide-react'
import { formatRating } from '@/utils'

interface RatingBadgeProps {
  rating: number
  size?: 'sm' | 'md'
}

export const RatingBadge = ({ rating, size = 'sm' }: RatingBadgeProps) => {
  const isSmall = size === 'sm'

  return (
    <div
      className={`flex items-center gap-1 ${isSmall ? 'px-1.5 py-0.5' : 'px-2 py-1'} rounded`}
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
    >
      <Star
        size={isSmall ? 10 : 13}
        fill="var(--color-accent-secondary)"
        style={{ color: 'var(--color-accent-secondary)' }}
      />
      <span
        className={`font-semibold ${isSmall ? 'text-xs' : 'text-sm'}`}
        style={{ color: 'var(--color-accent-secondary)' }}
      >
        {formatRating(rating)}
      </span>
    </div>
  )
}