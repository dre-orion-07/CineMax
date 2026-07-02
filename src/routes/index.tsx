import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { PageLoader } from '@/components/common/PageLoader'

const Home = lazy(() => import('@/pages/Home'))
const MovieDetails = lazy(() => import('@/pages/MovieDetails'))
const Search = lazy(() => import('@/pages/Search'))
const Genres = lazy(() => import('@/pages/Genres'))
const Trending = lazy(() => import('@/pages/Trending'))
const TopRated = lazy(() => import('@/pages/TopRated'))
const Favorites = lazy(() => import('@/pages/Favorites'))
const Watchlist = lazy(() => import('@/pages/Watchlist'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const TVShows = lazy(() => import('@/pages/TVShows'))
const TVShowDetails = lazy(() => import('@/pages/TVShowDetails'))
const Anime = lazy(() => import('@/pages/Anime'))
const Nollywood = lazy(() => import('@/pages/Nollywood'))

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: 'movie/:id', element: withSuspense(MovieDetails) },
      { path: 'search', element: withSuspense(Search) },
      { path: 'genres', element: withSuspense(Genres) },
      { path: 'trending', element: withSuspense(Trending) },
      { path: 'top-rated', element: withSuspense(TopRated) },
      { path: 'favorites', element: withSuspense(Favorites) },
      { path: 'watchlist', element: withSuspense(Watchlist) },
      { path: 'tv', element: withSuspense(TVShows) },
      { path: 'tv/:id', element: withSuspense(TVShowDetails) },
      { path: 'anime', element: withSuspense(Anime) },
      { path: 'nollywood', element: withSuspense(Nollywood) },
      { path: '*', element: withSuspense(NotFound) },
    ],
  },
])