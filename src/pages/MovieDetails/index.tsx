import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Play,
  Heart,
  Bookmark,
  Star,
  Clock,
  Calendar,
  ArrowLeft,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useSimilarMovies,
} from '@/hooks'
import { useMovieStore } from '@/store'
import {
  getBackdropUrl,
  getPosterUrl,
  formatDate,
  formatRuntime,
  formatRating,
  formatCurrency,
  formatVoteCount,
} from '@/utils'
import { TrailerModal } from '@/components/common/TrailerModal'
import { CastCarousel } from '@/components/common/CastCarousel'
import { ReviewCard } from '@/components/common/ReviewCard'
import { MovieCarousel } from '@/components/common/MovieCarousel'
import { useQuery } from '@tanstack/react-query'
import { movieService } from '@/services/movieService'
import { QUERY_KEYS, STALE_TIMES } from '@/constants'
import { SEOHead } from '@/components/common/SEOHead'

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = Number(id)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)

  const { isFavorite, addToFavorites, removeFromFavorites, isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieStore()

  const { data: movie, isLoading } = useMovieDetails(movieId)
  const { data: credits } = useMovieCredits(movieId)
  const { data: videos } = useMovieVideos(movieId)
  const { data: similar } = useSimilarMovies(movieId)
  const { data: reviews } = useQuery({
    queryKey: [QUERY_KEYS.MOVIE_REVIEWS, movieId],
    queryFn: () => movieService.getMovieReviews(movieId),
    staleTime: STALE_TIMES.LONG,
    enabled: !!movieId,
  })

  if (isLoading) {
    return (
      <div
        className="min-h-screen animate-pulse"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      />
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--color-text-secondary)' }}>Movie not found.</p>
      </div>
    )
  }

  <SEOHead
  title={movie.title}
  description={movie.overview}
  image={movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : undefined}
/>

  const trailer = videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  )

  const favorite = isFavorite(movie.id)
  const inWatchlist = isInWatchlist(movie.id)

  const handleFavorite = () => {
    if (favorite) {
      removeFromFavorites(movie.id)
      toast.success('Removed from favorites')
    } else {
      addToFavorites({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        genre_ids: movie.genres.map((g) => g.id),
        popularity: movie.popularity,
        adult: movie.adult,
        original_language: movie.original_language,
        original_title: movie.original_title,
        video: movie.video,
      })
      toast.success('Added to favorites')
    }
  }

  const handleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id)
      toast.success('Removed from watchlist')
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        genre_ids: movie.genres.map((g) => g.id),
        popularity: movie.popularity,
        adult: movie.adult,
        original_language: movie.original_language,
        original_title: movie.original_title,
        video: movie.video,
      })
      toast.success('Added to watchlist')
    }
  }

  const director = credits?.crew?.find((c) => c.job === 'Director')

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Backdrop */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <img
          src={getBackdropUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)] via-transparent to-transparent" />

        {/* Back Button */}
        <div className="absolute top-20 left-4 sm:left-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ArrowLeft size={16} />
            Back
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
              src={getPosterUrl(movie.poster_path, 'lg')}
              alt={movie.title}
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
            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl font-bold leading-tight mb-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {movie.title}
            </h1>

            {movie.tagline && (
              <p
                className="text-base italic mb-4"
                style={{ color: 'var(--color-text-muted)' }}
              >
                "{movie.tagline}"
              </p>
            )}

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <Star
                  size={16}
                  fill="var(--color-accent-secondary)"
                  style={{ color: 'var(--color-accent-secondary)' }}
                />
                <span
                  className="font-bold"
                  style={{ color: 'var(--color-accent-secondary)' }}
                >
                  {formatRating(movie.vote_average)}
                </span>
                <span
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  ({formatVoteCount(movie.vote_count)} votes)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} style={{ color: 'var(--color-text-muted)' }} />
                <span
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {formatRuntime(movie.runtime)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
                <span
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {formatDate(movie.release_date)}
                </span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres.map((genre) => (
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
              {movie.overview}
            </p>

            {/* Director */}
            {director && (
              <p
                className="text-sm mb-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span style={{ color: 'var(--color-text-muted)' }}>Director: </span>
                <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  {director.name}
                </span>
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {trailer && (
                <button
                  onClick={() => setTrailerKey(trailer.key)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-accent-primary)',
                    color: 'white',
                  }}
                >
                  <Play size={16} fill="white" />
                  Watch Trailer
                </button>
              )}
              <button
                onClick={handleFavorite}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  color: favorite ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Heart
                  size={16}
                  fill={favorite ? 'var(--color-accent-primary)' : 'none'}
                />
                {favorite ? 'Favorited' : 'Favorite'}
              </button>
              <button
                onClick={handleWatchlist}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  color: inWatchlist ? 'var(--color-accent-secondary)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Bookmark
                  size={16}
                  fill={inWatchlist ? 'var(--color-accent-secondary)' : 'none'}
                />
                {inWatchlist ? 'In Watchlist' : 'Watchlist'}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {movie.budget > 0 && (
                <div
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: 'var(--color-bg-card)' }}
                >
                  <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Budget</p>
                  <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {formatCurrency(movie.budget)}
                  </p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: 'var(--color-bg-card)' }}
                >
                  <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Revenue</p>
                  <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {formatCurrency(movie.revenue)}
                  </p>
                </div>
              )}
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: 'var(--color-bg-card)' }}
              >
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Status</p>
                <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {movie.status}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cast */}
        {credits?.cast && credits.cast.length > 0 && (
          <div className="mt-12">
            <CastCarousel cast={credits.cast} />
          </div>
        )}

        {/* Reviews */}
        {reviews?.results && reviews.results.length > 0 && (
          <div className="mt-12">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Reviews
            </h2>
            <div className="flex flex-col gap-4">
              {reviews.results.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {similar?.results && similar.results.length > 0 && (
          <div className="mt-12">
            <MovieCarousel
              title="Similar Movies"
              movies={similar.results}
            />
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {trailerKey && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setTrailerKey(null)}
        />
      )}
    </div>
  )
}

export default MovieDetails