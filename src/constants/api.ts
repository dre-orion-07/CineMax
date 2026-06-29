export const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const IMAGE_SIZES = {
  poster: {
    sm: 'w185',
    md: 'w342',
    lg: 'w500',
    xl: 'w780',
    original: 'original',
  },
  backdrop: {
    sm: 'w300',
    md: 'w780',
    lg: 'w1280',
    original: 'original',
  },
  profile: {
    sm: 'w45',
    md: 'w185',
    lg: 'h632',
    original: 'original',
  },
} as const

export const QUERY_KEYS = {
  TRENDING: 'trending',
  POPULAR: 'popular',
  TOP_RATED: 'top_rated',
  UPCOMING: 'upcoming',
  NOW_PLAYING: 'now_playing',
  MOVIE_DETAILS: 'movie_details',
  MOVIE_CREDITS: 'movie_credits',
  MOVIE_VIDEOS: 'movie_videos',
  MOVIE_REVIEWS: 'movie_reviews',
  MOVIE_SIMILAR: 'movie_similar',
  MOVIE_RECOMMENDATIONS: 'movie_recommendations',
  SEARCH: 'search',
  GENRES: 'genres',
  DISCOVER: 'discover',
} as const

export const STALE_TIMES = {
  SHORT: 1000 * 60 * 5,       // 5 minutes
  MEDIUM: 1000 * 60 * 30,     // 30 minutes
  LONG: 1000 * 60 * 60 * 24,  // 24 hours
} as const