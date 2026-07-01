import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { SearchX, History, Film, X } from 'lucide-react'
import { SearchBar } from '@/components/common/SearchBar'
import { MovieCard } from '@/components/common/MovieCard'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { EmptyState } from '@/components/common/EmptyState'
import { useDebounce } from '@/hooks'
import { useUIStore } from '@/store'
import { searchService } from '@/services/searchService'
import { QUERY_KEYS, STALE_TIMES } from '@/constants'
import { SEOHead } from '@/components/common/SEOHead'

const Search = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)

  const { searchHistory, addToSearchHistory, removeFromSearchHistory, clearSearchHistory } = useUIStore()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH, debouncedQuery],
    queryFn: () => searchService.searchMovies(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: STALE_TIMES.SHORT,
  })

  const handleClear = () => setQuery('')

  const handleHistoryClick = (term: string) => {
    setQuery(term)
  }

  const handleSearchCommit = () => {
    if (debouncedQuery.trim().length > 1) {
      addToSearchHistory(debouncedQuery.trim())
    }
  }

  const showResults = debouncedQuery.trim().length > 0
  const hasResults = (data?.results?.length ?? 0) > 0

  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 min-h-screen">
      <SEOHead
  title={debouncedQuery ? `Search: ${debouncedQuery}` : 'Search'}
  description="Search for your favourite movies on CineMax."
/>
      {/* Search Input */}
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          onClear={handleClear}
          autoFocus
          placeholder="Search for movies, titles, or keywords..."
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
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Recent Searches
              </span>
            </div>
            <button
              onClick={clearSearchHistory}
              className="text-xs cursor-pointer transition-colors duration-200"
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
                  aria-label={`Remove ${term} from history`}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty / Welcome State */}
      {!showResults && searchHistory.length === 0 && (
        <EmptyState
          icon={Film}
          title="Search for Movies"
          description="Find your favourite movies by title, actor, or keyword."
        />
      )}

      {/* Results */}
      {showResults && (
        <div>
          {(isLoading || isFetching) ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : hasResults ? (
            <>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {data?.total_results} results for "{debouncedQuery}"
              </p>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                onMouseEnter={handleSearchCommit}
              >
                {data?.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon={SearchX}
              title="No Results Found"
              description={`We couldn't find any movies matching "${debouncedQuery}". Try a different search term.`}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Search
