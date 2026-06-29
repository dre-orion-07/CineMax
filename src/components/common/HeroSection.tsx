import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Info, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { getBackdropUrl, formatYear, formatRating, truncateText } from '@/utils'
import type { Movie } from '@/types'

interface HeroSectionProps {
  movies: Movie[]
}

export const HeroSection = ({ movies }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const featured = movies.slice(0, 8)

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % featured.length)
  }, [featured.length])

  const goToPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length)
  }

  useEffect(() => {
    const interval = setInterval(goToNext, 6000)
    return () => clearInterval(interval)
  }, [goToNext])

  if (!featured.length) return null

  const movie = featured[currentIndex]

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[750px] overflow-hidden">
      {/* Backdrop */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={movie.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={getBackdropUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={movie.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-xl"
            >
              {/* Meta */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star
                    size={14}
                    fill="var(--color-accent-secondary)"
                    style={{ color: 'var(--color-accent-secondary)' }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'var(--color-accent-secondary)' }}
                  >
                    {formatRating(movie.vote_average)}
                  </span>
                </div>
                <span
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {formatYear(movie.release_date)}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {movie.title}
              </h1>

              {/* Overview */}
              <p
                className="text-sm sm:text-base leading-relaxed mb-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {truncateText(movie.overview, 160)}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Link
                  to={`/movie/${movie.id}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-accent-primary)',
                    color: 'white',
                  }}
                >
                  <Play size={16} fill="white" />
                  View Details
                </Link>
                <Link
                  to={`/movie/${movie.id}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Info size={16} />
                  More Info
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full cursor-pointer transition-all duration-200"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        aria-label="Previous movie"
      >
        <ChevronLeft size={20} color="white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full cursor-pointer transition-all duration-200"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        aria-label="Next movie"
      >
        <ChevronRight size={20} color="white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1)
              setCurrentIndex(i)
            }}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === currentIndex ? '24px' : '8px',
              height: '8px',
              backgroundColor:
                i === currentIndex
                  ? 'var(--color-accent-primary)'
                  : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}