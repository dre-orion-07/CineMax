import { useRef } from 'react'
import { ChevronLeft, ChevronRight, UserCircle } from 'lucide-react'
import { getProfileUrl } from '@/utils'
import type { CastMember } from '@/types'

interface CastCarouselProps {
  cast: CastMember[]
}

export const CastCarousel = ({ cast }: CastCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    })
  }

  const topCast = cast.slice(0, 20)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Top Cast
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-full cursor-pointer"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-secondary)' }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-full cursor-pointer"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-secondary)' }}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {topCast.map((member) => (
          <div key={member.id} className="flex-shrink-0 w-28 text-center">
            <div
              className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-2"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              {member.profile_path ? (
                <img
                  src={getProfileUrl(member.profile_path, 'md')}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserCircle size={40} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              )}
            </div>
            <p
              className="text-xs font-semibold leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {member.name}
            </p>
            <p
              className="text-xs mt-0.5 leading-tight"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {member.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}