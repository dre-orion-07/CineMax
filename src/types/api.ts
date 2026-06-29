export interface ApiError {
  status_code: number
  status_message: string
  success: false
}

export type SortOption =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'release_date.desc'
  | 'release_date.asc'
  | 'title.asc'
  | 'title.desc'

export type TimeWindow = 'day' | 'week'

export interface DiscoverParams {
  page?: number
  sort_by?: SortOption
  with_genres?: string
  'vote_average.gte'?: number
  'vote_average.lte'?: number
  'release_date.gte'?: string
  'release_date.lte'?: string
  with_original_language?: string
  'with_runtime.gte'?: number
  'with_runtime.lte'?: number
}
