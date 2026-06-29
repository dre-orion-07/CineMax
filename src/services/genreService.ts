import tmdbClient from './tmdb'
import type { Genre } from '@/types'

export const genreService = {
  getGenres: async () => {
    const { data } = await tmdbClient.get<{ genres: Genre[] }>(
      '/genre/movie/list'
    )
    return data
  },
}