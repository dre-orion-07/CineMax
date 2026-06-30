import { useState } from 'react'
import { Star, ChevronDown, ChevronUp } from 'lucide-react'
import { formatDate, truncateText } from '@/utils'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.content.length > 300

  return (
    <div
      className="p-5 rounded-xl"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p
            className="font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {review.author}
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {formatDate(review.created_at)}
          </p>
        </div>
        {review.author_details.rating && (
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-lg flex-shrink-0"
            style={{ backgroundColor: 'var(--color-bg-elevated)' }}
          >
            <Star
              size={12}
              fill="var(--color-accent-secondary)"
              style={{ color: 'var(--color-accent-secondary)' }}
            />
            <span
              className="text-xs font-semibold"
              style={{ color: 'var(--color-accent-secondary)' }}
            >
              {review.author_details.rating}/10
            </span>
          </div>
        )}
      </div>

      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {expanded ? review.content : truncateText(review.content, 300)}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-3 text-xs font-medium cursor-pointer transition-colors duration-200"
          style={{ color: 'var(--color-accent-primary)' }}
        >
          {expanded ? (
            <>
              Show Less <ChevronUp size={14} />
            </>
          ) : (
            <>
              Read More <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </div>
  )
}