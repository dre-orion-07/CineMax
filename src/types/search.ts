import type { Movie, TVShow } from '@/types'

export interface MovieResult extends Movie {
  media_type: 'movie'
}

export interface TVResult extends TVShow {
  media_type: 'tv'
}

export interface PersonResult {
  id: number
  name: string
  media_type: 'person'
  profile_path: string | null
  known_for_department: string
}

export type MultiSearchResult = MovieResult | TVResult | PersonResult

export interface MultiSearchResponse {
  page: number
  results: MultiSearchResult[]
  total_pages: number
  total_results: number
}