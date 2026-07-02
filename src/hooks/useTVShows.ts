import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { tvService } from '@/services/tvService'
import { STALE_TIMES } from '@/constants'

const TV_KEYS = {
  POPULAR: 'tv_popular',
  TOP_RATED: 'tv_top_rated',
  AIRING_TODAY: 'tv_airing_today',
  ON_THE_AIR: 'tv_on_the_air',
  TRENDING: 'tv_trending',
  DETAILS: 'tv_details',
  CREDITS: 'tv_credits',
  VIDEOS: 'tv_videos',
  SIMILAR: 'tv_similar',
  DISCOVER: 'tv_discover',
} as const

export const useTVPopular = () =>
  useQuery({
    queryKey: [TV_KEYS.POPULAR],
    queryFn: () => tvService.getPopular(),
    staleTime: STALE_TIMES.SHORT,
  })

export const useTVTopRated = () =>
  useQuery({
    queryKey: [TV_KEYS.TOP_RATED],
    queryFn: () => tvService.getTopRated(),
    staleTime: STALE_TIMES.MEDIUM,
  })

export const useTVAiringToday = () =>
  useQuery({
    queryKey: [TV_KEYS.AIRING_TODAY],
    queryFn: () => tvService.getAiringToday(),
    staleTime: STALE_TIMES.SHORT,
  })

export const useTVOnTheAir = () =>
  useQuery({
    queryKey: [TV_KEYS.ON_THE_AIR],
    queryFn: () => tvService.getOnTheAir(),
    staleTime: STALE_TIMES.SHORT,
  })

export const useTVTrending = (timeWindow: 'day' | 'week' = 'week') =>
  useQuery({
    queryKey: [TV_KEYS.TRENDING, timeWindow],
    queryFn: () => tvService.getTrending(timeWindow),
    staleTime: STALE_TIMES.SHORT,
  })

export const useTVDetails = (id: number) =>
  useQuery({
    queryKey: [TV_KEYS.DETAILS, id],
    queryFn: () => tvService.getTVDetails(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  })

export const useTVCredits = (id: number) =>
  useQuery({
    queryKey: [TV_KEYS.CREDITS, id],
    queryFn: () => tvService.getTVCredits(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  })

export const useTVVideos = (id: number) =>
  useQuery({
    queryKey: [TV_KEYS.VIDEOS, id],
    queryFn: () => tvService.getTVVideos(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  })

export const useSimilarTV = (id: number) =>
  useQuery({
    queryKey: [TV_KEYS.SIMILAR, id],
    queryFn: () => tvService.getSimilarTV(id),
    staleTime: STALE_TIMES.MEDIUM,
    enabled: !!id,
  })

export const useInfiniteTV = (params: Record<string, string | number> = {}) =>
  useInfiniteQuery({
    queryKey: [TV_KEYS.DISCOVER, params],
    queryFn: ({ pageParam }) =>
      tvService.discoverTV({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: STALE_TIMES.SHORT,
  })