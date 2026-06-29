import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Movie } from '@/types'

interface MovieStore {
  favorites: Movie[]
  watchlist: Movie[]
  recentlyViewed: Movie[]

  addToFavorites: (movie: Movie) => void
  removeFromFavorites: (id: number) => void
  isFavorite: (id: number) => boolean

  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (id: number) => void
  isInWatchlist: (id: number) => boolean

  addToRecentlyViewed: (movie: Movie) => void
  clearRecentlyViewed: () => void
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],
      recentlyViewed: [],

      addToFavorites: (movie) =>
        set((state) => ({
          favorites: state.favorites.some((m) => m.id === movie.id)
            ? state.favorites
            : [movie, ...state.favorites],
        })),

      removeFromFavorites: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== id),
        })),

      isFavorite: (id) => get().favorites.some((m) => m.id === id),

      addToWatchlist: (movie) =>
        set((state) => ({
          watchlist: state.watchlist.some((m) => m.id === movie.id)
            ? state.watchlist
            : [movie, ...state.watchlist],
        })),

      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== id),
        })),

      isInWatchlist: (id) => get().watchlist.some((m) => m.id === id),

      addToRecentlyViewed: (movie) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((m) => m.id !== movie.id)
          return { recentlyViewed: [movie, ...filtered].slice(0, 20) }
        }),

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
    }),
    {
      name: 'cinemax-storage',
    }
  )
)