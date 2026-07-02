import tmdbClient from './tmdb'
import type { TVShowDetails, PaginatedTVResponse } from '@/types'
import type { Credits, Video, Review } from '@/types'

export const tvService = {
  getPopular: async (page = 1) => {
    const { data } = await tmdbClient.get<PaginatedTVResponse>('/tv/popular', {
      params: { page },
    })
    return data
  },

  getTopRated: async (page = 1) => {
    const { data } = await tmdbClient.get<PaginatedTVResponse>('/tv/top_rated', {
      params: { page },
    })
    return data
  },

  getAiringToday: async (page = 1) => {
    const { data } = await tmdbClient.get<PaginatedTVResponse>('/tv/airing_today', {
      params: { page },
    })
    return data
  },

  getOnTheAir: async (page = 1) => {
    const { data } = await tmdbClient.get<PaginatedTVResponse>('/tv/on_the_air', {
      params: { page },
    })
    return data
  },

  getTVDetails: async (id: number) => {
    const { data } = await tmdbClient.get<TVShowDetails>(`/tv/${id}`)
    return data
  },

  getTVCredits: async (id: number) => {
    const { data } = await tmdbClient.get<Credits>(`/tv/${id}/credits`)
    return data
  },

  getTVVideos: async (id: number) => {
    const { data } = await tmdbClient.get<{ id: number; results: Video[] }>(
      `/tv/${id}/videos`
    )
    return data
  },

  getTVReviews: async (id: number, page = 1) => {
    const { data } = await tmdbClient.get<{ page: number; results: Review[] }>(
      `/tv/${id}/reviews`,
      { params: { page } }
    )
    return data
  },

  getSimilarTV: async (id: number, page = 1) => {
    const { data } = await tmdbClient.get<PaginatedTVResponse>(
      `/tv/${id}/similar`,
      { params: { page } }
    )
    return data
  },

  getTrending: async (timeWindow: 'day' | 'week' = 'week', page = 1) => {
    const { data } = await tmdbClient.get<PaginatedTVResponse>(
      `/trending/tv/${timeWindow}`,
      { params: { page } }
    )
    return data
  },

  discoverTV: async (params: Record<string, string | number> = {}) => {
    const { data } = await tmdbClient.get<PaginatedTVResponse>('/discover/tv', {
      params,
    })
    return data
  },
}