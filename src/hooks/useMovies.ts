import { useQuery } from '@tanstack/react-query'
import { movieService } from '@/services/movieService'
import { QUERY_KEYS, STALE_TIMES } from '@/constants'
import type { TimeWindow } from '@/types'

export const useTrending = (timeWindow: TimeWindow = 'week') => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRENDING, timeWindow],
    queryFn: () => movieService.getTrending(timeWindow),
    staleTime: STALE_TIMES.SHORT,
  })
}

export const usePopular = (page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POPULAR, page],
    queryFn: () => movieService.getPopular(page),
    staleTime: STALE_TIMES.SHORT,
  })
}

export const useTopRated = (page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TOP_RATED, page],
    queryFn: () => movieService.getTopRated(page),
    staleTime: STALE_TIMES.MEDIUM,
  })
}

export const useUpcoming = (page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.UPCOMING, page],
    queryFn: () => movieService.getUpcoming(page),
    staleTime: STALE_TIMES.MEDIUM,
  })
}

export const useNowPlaying = (page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.NOW_PLAYING, page],
    queryFn: () => movieService.getNowPlaying(page),
    staleTime: STALE_TIMES.SHORT,
  })
}

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_DETAILS, id],
    queryFn: () => movieService.getMovieDetails(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  })
}

export const useMovieCredits = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_CREDITS, id],
    queryFn: () => movieService.getMovieCredits(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  })
}

export const useMovieVideos = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_VIDEOS, id],
    queryFn: () => movieService.getMovieVideos(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  })
}

export const useSimilarMovies = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_SIMILAR, id],
    queryFn: () => movieService.getSimilarMovies(id),
    staleTime: STALE_TIMES.MEDIUM,
    enabled: !!id,
  })
}