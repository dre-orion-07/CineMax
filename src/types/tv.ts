export interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  original_language: string
  original_name: string
  origin_country: string[]
}

export interface TVShowDetails extends Omit<TVShow, 'genre_ids'> {
  genres: { id: number; name: string }[]
  number_of_seasons: number
  number_of_episodes: number
  episode_run_time: number[]
  status: string
  tagline: string
  homepage: string
  networks: { id: number; name: string; logo_path: string | null }[]
  created_by: { id: number; name: string; profile_path: string | null }[]
  seasons: Season[]
  last_air_date: string
  in_production: boolean
}

export interface Season {
  id: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
  episode_count: number
  air_date: string
}

export interface PaginatedTVResponse {
  page: number
  results: TVShow[]
  total_pages: number
  total_results: number
}