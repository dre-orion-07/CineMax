import { useInfiniteQuery } from '@tanstack/react-query'
import { movieService } from '@/services/movieService'
import { QUERY_KEYS, STALE_TIMES } from '@/constants'
import type { DiscoverParams } from '@/types'

export const useDiscoverMovies = (params: Omit<DiscoverParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.DISCOVER, params],
    queryFn: ({ pageParam }) =>
      movieService.discoverMovies({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: STALE_TIMES.SHORT,
  })
}