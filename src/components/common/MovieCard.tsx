import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Bookmark, ImageOff } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getPosterUrl, formatYear, truncateText } from '@/utils'
import { useMovieStore } from '@/store'
import { RatingBadge } from './RatingBadge'
import type { Movie } from '@/types'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [imgError, setImgError] = useState(false)
  const { isFavorite, addToFavorites, removeFromFavorites, isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieStore()

  const favorite = isFavorite(movie.id)
  const inWatchlist = isInWatchlist(movie.id)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFromFavorites(movie.id)
      toast.success('Removed from favorites')
    } else {
      addToFavorites(movie)
      toast.success('Added to favorites')
    }
  }

  const handleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWatchlist) {
      removeFromWatchlist(movie.id)
      toast.success('Removed from watchlist')
    } else {
      addToWatchlist(movie)
      toast.success('Added to watchlist')
    }
  }

  return (
    <motion.div
      className="flex-shrink-0 w-40 sm:w-44 group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <div
          className="relative rounded-lg overflow-hidden"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        >
          {/* Poster */}
          {imgError ? (
            <div
              className="w-full h-60 sm:h-64 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              <ImageOff size={32} style={{ color: 'var(--color-text-muted)' }} />
            </div>
          ) : (
            <img
              src={getPosterUrl(movie.poster_path, 'md')}
              alt={movie.title}
              className="w-full h-60 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

          {/* Rating */}
          <div className="absolute top-2 left-2">
            <RatingBadge rating={movie.vote_average} />
          </div>

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              className="p-1.5 rounded-full cursor-pointer"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                size={14}
                fill={favorite ? 'var(--color-accent-primary)' : 'none'}
                style={{ color: favorite ? 'var(--color-accent-primary)' : 'white' }}
              />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWatchlist}
              className="p-1.5 rounded-full cursor-pointer"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
              aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              <Bookmark
                size={14}
                fill={inWatchlist ? 'var(--color-accent-secondary)' : 'none'}
                style={{ color: inWatchlist ? 'var(--color-accent-secondary)' : 'white' }}
              />
            </motion.button>
          </div>
        </div>

        {/* Info */}
        <div className="pt-2 px-1">
          <p
            className="text-sm font-medium leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {truncateText(movie.title, 30)}
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {formatYear(movie.release_date)}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}