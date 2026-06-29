import axios from 'axios'
import type { ApiError } from '@/types'

const env = import.meta as ImportMeta & {
  env: {
    VITE_TMDB_BASE_URL?: string
    VITE_TMDB_TOKEN?: string
  }
}

const tmdbClient = axios.create({
  baseURL: env.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${env.env.VITE_TMDB_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      status_code: error.response?.status || 500,
      status_message: error.response?.data?.status_message || 'Something went wrong',
      success: false,
    }
    return Promise.reject(apiError)
  }
)

export default tmdbClient