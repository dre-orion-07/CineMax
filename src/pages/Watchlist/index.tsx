import { Bookmark } from 'lucide-react'
import { MovieCard } from '@/components/common/MovieCard'
import { EmptyState } from '@/components/common/EmptyState'
import { useMovieStore } from '@/store'
import { SEOHead } from '@/components/common/SEOHead'

const Watchlist = () => {
  const { watchlist } = useMovieStore()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 min-h-screen">
      <SEOHead title="Watchlist" description="Your personal watchlist on CineMax." />
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Bookmark
          size={28}
          fill="var(--color-accent-secondary)"
          style={{ color: 'var(--color-accent-secondary)' }}
        />
        <h1
          className="text-3xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Watchlist
        </h1>
      </div>
      <p
        className="text-sm mb-8"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} to watch
      </p>

      {/* Grid or Empty State */}
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="Your Watchlist is Empty"
          description="Movies you want to watch later will appear here. Tap the bookmark icon on any movie to add it."
        />
      )}
    </div>
  )
}

export default Watchlist