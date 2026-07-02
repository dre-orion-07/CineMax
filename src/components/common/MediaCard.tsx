import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Bookmark, ImageOff } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getPosterUrl, truncateText } from '@/utils'
import { useMovieStore } from '@/store'
import { RatingBadge } from './RatingBadge'
import type { Movie } from '@/types'
import type { TVShow } from '@/types'

type MediaItem = Movie | TVShow

const isMovie = (item: MediaItem): item is Movie => 'title' in item

interface MediaCardProps {
  item: MediaItem
  type: 'movie' | 'tv'
}

export const MediaCard = ({ item, type }: MediaCardProps) => {
  const [imgError, setImgError] = useState(false)
  const { isFavorite, addToFavorites, removeFromFavorites, isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieStore()

  const title = isMovie(item) ? item.title : item.name
  const releaseDate = isMovie(item) ? item.release_date : item.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'
  const linkPath = type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`

  const favorite = isFavorite(item.id)
  const inWatchlist = isInWatchlist(item.id)

  const toMovie = (): Movie => ({
    id: item.id,
    title,
    overview: item.overview,
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    release_date: releaseDate || '',
    vote_average: item.vote_average,
    vote_count: item.vote_count,
    genre_ids: item.genre_ids,
    popularity: item.popularity,
    adult: false,
    original_language: item.original_language,
    original_title: isMovie(item) ? item.original_title : item.original_name,
    video: false,
  })

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFromFavorites(item.id)
      toast.success('Removed from favorites')
    } else {
      addToFavorites(toMovie())
      toast.success('Added to favorites')
    }
  }

  const handleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWatchlist) {
      removeFromWatchlist(item.id)
      toast.success('Removed from watchlist')
    } else {
      addToWatchlist(toMovie())
      toast.success('Added to watchlist')
    }
  }

  return (
    <motion.div
      className="flex-shrink-0 w-40 sm:w-44 group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={linkPath} className="block">
        <div
          className="relative rounded-lg overflow-hidden"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        >
          {imgError ? (
            <div
              className="w-full h-60 sm:h-64 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              <ImageOff size={32} style={{ color: 'var(--color-text-muted)' }} />
            </div>
          ) : (
            <img
              src={getPosterUrl(item.poster_path, 'md')}
              alt={title}
              className="w-full h-60 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

          <div className="absolute top-2 left-2">
            <RatingBadge rating={item.vote_average} />
          </div>

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

          {type === 'tv' && (
            <div
              className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-xs font-bold"
              style={{ backgroundColor: 'var(--color-accent-secondary)', color: 'black' }}
            >
              TV
            </div>
          )}
        </div>

        <div className="pt-2 px-1">
          <p
            className="text-sm font-medium leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {truncateText(title, 30)}
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {year}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}