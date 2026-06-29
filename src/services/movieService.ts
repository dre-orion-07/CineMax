import tmdbClient from './tmdb'
import type {
  MovieListResult,
  MovieDetails,
  Credits,
  Video,
  Review,
  PaginatedResponse,
} from '@/types'
import type { TimeWindow, DiscoverParams } from '@/types'

export const movieService = {
  getTrending: async (timeWindow: TimeWindow = 'week', page = 1) => {
    const { data } = await tmdbClient.get<MovieListResult>(
      `/trending/movie/${timeWindow}`,
      { params: { page } }
    )
    return data
  },

  getPopular: async (page = 1) => {
    const { data } = await tmdbClient.get<MovieListResult>('/movie/popular', {
      params: { page },
    })
    return data
  },

  getTopRated: async (page = 1) => {
    const { data } = await tmdbClient.get<MovieListResult>('/movie/top_rated', {
      params: { page },
    })
    return data
  },

  getUpcoming: async (page = 1) => {
    const { data } = await tmdbClient.get<MovieListResult>('/movie/upcoming', {
      params: { page },
    })
    return data
  },

  getNowPlaying: async (page = 1) => {
    const { data } = await tmdbClient.get<MovieListResult>('/movie/now_playing', {
      params: { page },
    })
    return data
  },

  getMovieDetails: async (id: number) => {
    const { data } = await tmdbClient.get<MovieDetails>(`/movie/${id}`)
    return data
  },

  getMovieCredits: async (id: number) => {
    const { data } = await tmdbClient.get<Credits>(`/movie/${id}/credits`)
    return data
  },

  getMovieVideos: async (id: number) => {
    const { data } = await tmdbClient.get<{ id: number; results: Video[] }>(
      `/movie/${id}/videos`
    )
    return data
  },

  getMovieReviews: async (id: number, page = 1) => {
    const { data } = await tmdbClient.get<PaginatedResponse<Review>>(
      `/movie/${id}/reviews`,
      { params: { page } }
    )
    return data
  },

  getSimilarMovies: async (id: number, page = 1) => {
    const { data } = await tmdbClient.get<MovieListResult>(
      `/movie/${id}/similar`,
      { params: { page } }
    )
    return data
  },

  getRecommendations: async (id: number, page = 1) => {
    const { data } = await tmdbClient.get<MovieListResult>(
      `/movie/${id}/recommendations`,
      { params: { page } }
    )
    return data
  },

  discoverMovies: async (params: DiscoverParams = {}) => {
    const { data } = await tmdbClient.get<MovieListResult>('/discover/movie', {
      params,
    })
    return data
  },
}