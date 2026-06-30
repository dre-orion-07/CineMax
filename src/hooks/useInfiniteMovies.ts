import { useInfiniteQuery } from '@tanstack/react-query'
import { movieService } from '@/services/movieService'
import { QUERY_KEYS, STALE_TIMES } from '@/constants'
import type { TimeWindow } from '@/types'

export const useInfiniteTrending = (timeWindow: TimeWindow) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.TRENDING, 'infinite', timeWindow],
    queryFn: ({ pageParam }) => movieService.getTrending(timeWindow, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: STALE_TIMES.SHORT,
  })
}

export const useInfiniteTopRated = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.TOP_RATED, 'infinite'],
    queryFn: ({ pageParam }) => movieService.getTopRated(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: STALE_TIMES.MEDIUM,
  })
}