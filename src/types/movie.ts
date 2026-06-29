export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  adult: boolean
  original_language: string
  original_title: string
  video: boolean
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[]
  runtime: number | null
  budget: number
  revenue: number
  status: string
  tagline: string
  homepage: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  imdb_id: string | null
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
  english_name: string
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
  known_for_department: string
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface Credits {
  cast: CastMember[]
  crew: CrewMember[]
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
  published_at: string
}

export interface Review {
  id: string
  author: string
  content: string
  created_at: string
  updated_at: string
  url: string
  author_details: {
    name: string
    username: string
    avatar_path: string | null
    rating: number | null
  }
}

export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface MovieListResult extends PaginatedResponse<Movie> {}