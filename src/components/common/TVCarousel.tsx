import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { MediaCard } from './MediaCard'
import { SkeletonCard } from './SkeletonCard'
import type { TVShow } from '@/types'

interface TVCarouselProps {
  title: string
  shows: TVShow[]
  isLoading?: boolean
  viewAllPath?: string
}

export const TVCarousel = ({
  title,
  shows,
  isLoading = false,
  viewAllPath,
}: TVCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2
          className="text-xl sm:text-2xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h2>
        <div className="flex items-center gap-2">
          {viewAllPath && (
            <a
              href={viewAllPath}
              className="text-sm font-medium mr-2 transition-colors duration-200"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              View All
            </a>
          )}
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-full transition-colors duration-200 cursor-pointer"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-secondary)' }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-full transition-colors duration-200 cursor-pointer"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-secondary)' }}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : shows.map((show) => (
              <MediaCard key={show.id} item={show} type="tv" />
            ))}
      </div>
    </section>
  )
}