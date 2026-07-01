import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { GenreFilter } from '@/components/common/GenreFilter'
import { SortDropdown } from '@/components/common/SortDropdown'
import { MovieCard } from '@/components/common/MovieCard'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { useDiscoverMovies, useInfiniteScroll } from '@/hooks'
import { GENRES } from '@/constants'
import type { SortOption } from '@/types'
import { SEOHead } from '@/components/common/SEOHead'

const Genres = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<number>(GENRES[0].id)
  const [sortBy, setSortBy] = useState<SortOption>('popularity.desc')

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useDiscoverMovies({
    with_genres: String(selectedGenreId),
    sort_by: sortBy,
  })

  const sentinelRef = useInfiniteScroll({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    },
    enabled: hasNextPage,
  })

  const movies = data?.pages.flatMap((page) => page.results) ?? []
  const selectedGenre = GENRES.find((g) => g.id === selectedGenreId)

  const handleGenreSelect = (id: number) => {
    setSelectedGenreId(id)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 min-h-screen">
      <SEOHead title="Browse by Genre" description="Discover movies across every genre on CineMax." />
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Browse by Genre
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Discover movies across every category
        </p>
      </div>

      {/* Genre Filter */}
      <div className="mb-6">
        <GenreFilter
          selectedGenreId={selectedGenreId}
          onSelect={handleGenreSelect}
        />
      </div>

      {/* Sort + Result Count */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p
          className="text-sm font-medium"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {selectedGenre?.name} Movies
        </p>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {/* Infinite Scroll Sentinel */}
      {hasNextPage && (
        <div ref={sentinelRef} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <Loader2
              size={28}
              className="animate-spin"
              style={{ color: 'var(--color-accent-primary)' }}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Genres