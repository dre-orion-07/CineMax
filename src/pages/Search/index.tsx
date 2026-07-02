import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { SearchX, History, Film, X } from 'lucide-react'
import { SearchBar } from '@/components/common/SearchBar'
import { MovieCard } from '@/components/common/MovieCard'
import { MediaCard } from '@/components/common/MediaCard'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { EmptyState } from '@/components/common/EmptyState'
import { useDebounce } from '@/hooks'
import { useUIStore } from '@/store'
import { searchService } from '@/services/searchService'
import { QUERY_KEYS, STALE_TIMES } from '@/constants'
import type { MovieResult, TVResult } from '@/types'

const Search = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)

  const { searchHistory, addToSearchHistory, removeFromSearchHistory, clearSearchHistory } = useUIStore()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH, debouncedQuery],
    queryFn: () => searchService.searchMulti(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: STALE_TIMES.SHORT,
  })

  const handleClear = () => setQuery('')

  const handleHistoryClick = (term: string) => setQuery(term)

  const handleSearchCommit = () => {
    if (debouncedQuery.trim().length > 1) {
      addToSearchHistory(debouncedQuery.trim())
    }
  }

  const showResults = debouncedQuery.trim().length > 0

  const filteredResults = data?.results.filter(
    (r) => r.media_type === 'movie' || r.media_type === 'tv'
  ) ?? []

  const hasResults = filteredResults.length > 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 min-h-screen">
      {/* Search Input */}
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          onClear={handleClear}
          autoFocus
          placeholder="Search movies, TV shows, anime, Nollywood..."
        />
      </div>

      {/* Search History */}
      {!showResults && searchHistory.length > 0 && (
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <History size={16} style={{ color: 'var(--color-text-muted)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Recent Searches
              </span>
            </div>
            <button
              onClick={clearSearchHistory}
              className="text-xs cursor-pointer"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((term) => (
              <div
                key={term}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <span onClick={() => handleHistoryClick(term)}>{term}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFromSearchHistory(term)
                  }}
                  className="cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Welcome State */}
      {!showResults && searchHistory.length === 0 && (
        <EmptyState
          icon={Film}
          title="Search Everything"
          description="Find movies, TV shows, anime, and Nollywood content all in one place."
        />
      )}

      {/* Results */}
      {showResults && (
        <div>
          {(isLoading || isFetching) ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : hasResults ? (
            <>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                {filteredResults.length} results for "{debouncedQuery}"
              </p>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                onMouseEnter={handleSearchCommit}
              >
                {filteredResults.map((result) => {
                  if (result.media_type === 'movie') {
                    return <MovieCard key={`movie-${result.id}`} movie={result as MovieResult} />
                  }
                  if (result.media_type === 'tv') {
                    return <MediaCard key={`tv-${result.id}`} item={result as TVResult} type="tv" />
                  }
                  return null
                })}
              </div>
            </>
          ) : (
            <EmptyState
              icon={SearchX}
              title="No Results Found"
              description={`We couldn't find anything matching "${debouncedQuery}". Try a different search term.`}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Search