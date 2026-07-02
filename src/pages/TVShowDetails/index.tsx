import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Heart, Bookmark, Star, ArrowLeft, Tv } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useTVDetails, useTVCredits, useTVVideos, useSimilarTV } from '@/hooks'
import { useMovieStore } from '@/store'
import { getBackdropUrl, getPosterUrl, formatDate, formatRating, formatVoteCount } from '@/utils'
import { TrailerModal } from '@/components/common/TrailerModal'
import { CastCarousel } from '@/components/common/CastCarousel'
import { TVCarousel } from '@/components/common/TVCarousel'
import { SEOHead } from '@/components/common/SEOHead'

const TVShowDetails = () => {
  const { id } = useParams<{ id: string }>()
  const tvId = Number(id)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)

  const { isFavorite, addToFavorites, removeFromFavorites, isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieStore()

  const { data: show, isLoading } = useTVDetails(tvId)
  const { data: credits } = useTVCredits(tvId)
  const { data: videos } = useTVVideos(tvId)
  const { data: similar } = useSimilarTV(tvId)

  if (isLoading) {
    return (
      <div
        className="min-h-screen animate-pulse"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      />
    )
  }

  if (!show) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--color-text-secondary)' }}>TV Show not found.</p>
      </div>
    )
  }

  const trailer = videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  )

  const favorite = isFavorite(show.id)
  const inWatchlist = isInWatchlist(show.id)

  const toMovie = () => ({
    id: show.id,
    title: show.name,
    overview: show.overview,
    poster_path: show.poster_path,
    backdrop_path: show.backdrop_path,
    release_date: show.first_air_date,
    vote_average: show.vote_average,
    vote_count: show.vote_count,
    genre_ids: show.genres.map((g) => g.id),
    popularity: show.popularity,
    adult: false,
    original_language: show.original_language,
    original_title: show.original_name,
    video: false,
  })

  const handleFavorite = () => {
    if (favorite) {
      removeFromFavorites(show.id)
      toast.success('Removed from favorites')
    } else {
      addToFavorites(toMovie())
      toast.success('Added to favorites')
    }
  }

  const handleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(show.id)
      toast.success('Removed from watchlist')
    } else {
      addToWatchlist(toMovie())
      toast.success('Added to watchlist')
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <SEOHead
        title={show.name}
        description={show.overview}
        image={show.backdrop_path ? `https://image.tmdb.org/t/p/w1280${show.backdrop_path}` : undefined}
      />

      {/* Backdrop */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <img
          src={getBackdropUrl(show.backdrop_path, 'original')}
          alt={show.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)] via-transparent to-transparent" />
        <div className="absolute top-20 left-4 sm:left-8">
          <Link
            to="/tv"
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ArrowLeft size={16} />
            Back to TV Shows
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div
            className="flex-shrink-0 w-48 sm:w-56 mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={getPosterUrl(show.poster_path, 'lg')}
              alt={show.name}
              className="w-full rounded-xl shadow-2xl"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1
              className="text-3xl sm:text-4xl font-bold leading-tight mb-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {show.name}
            </h1>

            {show.tagline && (
              <p className="text-base italic mb-4" style={{ color: 'var(--color-text-muted)' }}>
                "{show.tagline}"
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <Star size={16} fill="var(--color-accent-secondary)" style={{ color: 'var(--color-accent-secondary)' }} />
                <span className="font-bold" style={{ color: 'var(--color-accent-secondary)' }}>
                  {formatRating(show.vote_average)}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  ({formatVoteCount(show.vote_count)} votes)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tv size={14} style={{ color: 'var(--color-text-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {show.number_of_seasons} {show.number_of_seasons === 1 ? 'Season' : 'Seasons'}
                </span>
              </div>
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {formatDate(show.first_air_date)}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {show.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p
              className="text-sm sm:text-base leading-relaxed mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {show.overview}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)' }}>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Status</p>
                <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{show.status}</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)' }}>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Episodes</p>
                <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{show.number_of_episodes}</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)' }}>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Last Air Date</p>
                <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{formatDate(show.last_air_date)}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {trailer && (
                <button
                  onClick={() => setTrailerKey(trailer.key)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer"
                  style={{ backgroundColor: 'var(--color-accent-primary)', color: 'white' }}
                >
                  <Play size={16} fill="white" />
                  Watch Trailer
                </button>
              )}
              <button
                onClick={handleFavorite}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  color: favorite ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Heart size={16} fill={favorite ? 'var(--color-accent-primary)' : 'none'} />
                {favorite ? 'Favorited' : 'Favorite'}
              </button>
              <button
                onClick={handleWatchlist}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  color: inWatchlist ? 'var(--color-accent-secondary)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Bookmark size={16} fill={inWatchlist ? 'var(--color-accent-secondary)' : 'none'} />
                {inWatchlist ? 'In Watchlist' : 'Watchlist'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Cast */}
        {credits?.cast && credits.cast.length > 0 && (
          <div className="mt-12">
            <CastCarousel cast={credits.cast} />
          </div>
        )}

        {/* Similar Shows */}
        {similar?.results && similar.results.length > 0 && (
          <div className="mt-12">
            <TVCarousel title="Similar Shows" shows={similar.results} />
          </div>
        )}
      </div>

      {trailerKey && (
        <TrailerModal videoKey={trailerKey} onClose={() => setTrailerKey(null)} />
      )}
    </div>
  )
}

export default TVShowDetails