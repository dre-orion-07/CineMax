import tmdbClient from './tmdb'
import type { MovieListResult } from '@/types'
import type { MultiSearchResponse } from '@/types'

export const searchService = {
  searchMovies: async (query: string, page = 1) => {
    const { data } = await tmdbClient.get<MovieListResult>('/search/movie', {
      params: { query, page, include_adult: false },
    })
    return data
  },

  searchMulti: async (query: string, page = 1) => {
    const { data } = await tmdbClient.get<MultiSearchResponse>('/search/multi', {
      params: { query, page, include_adult: false },
    })
    return data
  },
}