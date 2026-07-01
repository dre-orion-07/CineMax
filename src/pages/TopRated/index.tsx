import { Loader2, Award } from 'lucide-react'
import { MovieCard } from '@/components/common/MovieCard'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { useInfiniteTopRated, useInfiniteScroll } from '@/hooks'
import { SEOHead } from '@/components/common/SEOHead'

const TopRated = () => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteTopRated()

  const sentinelRef = useInfiniteScroll({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    },
    enabled: hasNextPage,
  })

  const movies = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 min-h-screen">
      <SEOHead title="Top Rated" description="The highest rated movies of all time on CineMax." />
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Award size={28} style={{ color: 'var(--color-accent-secondary)' }} />
        <h1
          className="text-3xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Top Rated
        </h1>
      </div>
      <p
        className="text-sm mb-6"
        style={{ color: 'var(--color-text-muted)' }}
      >
        The highest rated movies of all time
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {/* Sentinel */}
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

export default TopRated