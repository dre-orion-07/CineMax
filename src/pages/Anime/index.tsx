import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { SEOHead } from '@/components/common/SEOHead'
import { MediaCard } from '@/components/common/MediaCard'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { SortDropdown } from '@/components/common/SortDropdown'
import { useInfiniteTV, useInfiniteScroll } from '@/hooks'
import type { SortOption } from '@/types'

const Anime = () => {
  const [sortBy, setSortBy] = useState<SortOption>('popularity.desc')

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteTV({
    with_genres: '16',
    with_origin_country: 'JP',
    sort_by: sortBy,
  })

  const sentinelRef = useInfiniteScroll({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    },
    enabled: hasNextPage,
  })

  const shows = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 min-h-screen">
      <SEOHead
        title="Anime"
        description="Discover the best anime series and movies on CineMax."
      />

      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          🎌 Anime
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          The best anime series and movies from Japan
        </p>
      </div>

      <div className="flex items-center justify-end mb-6">
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)
          : shows.map((show) => (
              <MediaCard key={show.id} item={show} type="tv" />
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

export default Anime