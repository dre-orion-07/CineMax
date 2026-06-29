import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStore {
  theme: 'dark' | 'light'
  searchHistory: string[]
  isSearchOpen: boolean

  toggleTheme: () => void
  setTheme: (theme: 'dark' | 'light') => void

  addToSearchHistory: (query: string) => void
  removeFromSearchHistory: (query: string) => void
  clearSearchHistory: () => void

  setSearchOpen: (open: boolean) => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      searchHistory: [],
      isSearchOpen: false,

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      setTheme: (theme) => set({ theme }),

      addToSearchHistory: (query) =>
        set((state) => {
          const filtered = state.searchHistory.filter((q) => q !== query)
          return { searchHistory: [query, ...filtered].slice(0, 10) }
        }),

      removeFromSearchHistory: (query) =>
        set((state) => ({
          searchHistory: state.searchHistory.filter((q) => q !== query),
        })),

      clearSearchHistory: () => set({ searchHistory: [] }),

      setSearchOpen: (open) => set({ isSearchOpen: open }),
    }),
    {
      name: 'cinemax-ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        searchHistory: state.searchHistory,
      }),
    }
  )
)