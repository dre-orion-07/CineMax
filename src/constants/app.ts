export const APP_NAME = 'CineMax'
export const APP_DESCRIPTION = 'Discover, explore, and track your favourite movies.'

export const ROUTES = {
  HOME: '/',
  MOVIE_DETAILS: '/movie/:id',
  SEARCH: '/search',
  GENRES: '/genres',
  TRENDING: '/trending',
  TOP_RATED: '/top-rated',
  UPCOMING: '/upcoming',
  FAVORITES: '/favorites',
  WATCHLIST: '/watchlist',
  NOT_FOUND: '*',
} as const

export const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 99, name: 'Documentary' },
] as const

export const ITEMS_PER_PAGE = 20
export const DEBOUNCE_DELAY = 400
export const MAX_SEARCH_HISTORY = 10