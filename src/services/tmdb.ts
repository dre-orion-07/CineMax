import axios from 'axios'
import type { ApiError } from '@/types'

const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
})

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      status_code: error.response?.status || 500,
      status_message:
        error.response?.data?.status_message || 'Something went wrong',
      success: false,
    }
    return Promise.reject(apiError)
  }
)

export default tmdbClient