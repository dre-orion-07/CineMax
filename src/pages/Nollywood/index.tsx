import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { SEOHead } from '@/components/common/SEOHead'
import { MovieCard } from '@/components/common/MovieCard'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { SortDropdown } from '@/components/common/SortDropdown'
import { useInfiniteScroll } from '@/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { movieService } from '@/services/movieService'
import { STALE_TIMES } from '@/constants'
import type { SortOption } from '@/types'

const Nollywood = () => {
  const [sortBy, setSortBy] = useState<SortOption>('popularity.desc')

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['nollywood', sortBy],
    queryFn: ({ pageParam }) =>
      movieService.discoverMovies({
        with_origin_country: 'NG',
        sort_by: sortBy,
        page: pageParam,
      } as never),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: STALE_TIMES.SHORT,
  })

  const sentinelRef = useInfiniteScroll({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    },
    enabled: hasNextPage,
  })

  const movies = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 min-h-screen">
      <SEOHead
        title="Nollywood"
        description="Discover the best Nigerian movies on CineMax."
      />

      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          🎬 Nollywood
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          The best Nigerian movies and series
        </p>
      </div>

      <div className="flex items-center justify-end mb-6">
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)
          : movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </div>

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

export default Nollywood