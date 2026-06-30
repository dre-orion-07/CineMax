import { GENRES } from '@/constants'

interface GenreFilterProps {
  selectedGenreId: number
  onSelect: (id: number) => void
}

export const GenreFilter = ({ selectedGenreId, onSelect }: GenreFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {GENRES.map((genre) => {
        const isActive = genre.id === selectedGenreId
        return (
          <button
            key={genre.id}
            onClick={() => onSelect(genre.id)}
            className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: isActive
                ? 'var(--color-accent-primary)'
                : 'var(--color-bg-card)',
              color: isActive ? 'white' : 'var(--color-text-secondary)',
              border: `1px solid ${isActive ? 'var(--color-accent-primary)' : 'var(--color-border)'}`,
            }}
          >
            {genre.name}
          </button>
        )
      })}
    </div>
  )
}