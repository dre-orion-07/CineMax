import { Heart } from 'lucide-react'
import { MovieCard } from '@/components/common/MovieCard'
import { EmptyState } from '@/components/common/EmptyState'
import { SEOHead } from '@/components/common/SEOHead'
import { useMovieStore } from '@/store'

const Favorites = () => {
  const { favorites } = useMovieStore()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 min-h-screen">
      <SEOHead title="Favorites" />
      <div className="flex items-center gap-3 mb-2">
        <Heart size={28} fill="var(--color-accent-primary)" style={{ color: 'var(--color-accent-primary)' }} />
        <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Favorites</h1>
      </div>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
        {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
      </p>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      ) : (
        <EmptyState icon={Heart} title="No Favorites Yet" description="Movies you mark as favorites will appear here." />
      )}
    </div>
  )
}

export default Favorites