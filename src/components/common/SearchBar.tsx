import { Search as SearchIcon, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  placeholder?: string
  autoFocus?: boolean
}

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search movies...',
  autoFocus = false,
}: SearchBarProps) => {
  return (
    <div
      className="relative flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <SearchIcon size={20} style={{ color: 'var(--color-text-muted)' }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="flex-1 bg-transparent outline-none text-base"
        style={{ color: 'var(--color-text-primary)' }}
        aria-label="Search movies"
      />
      {value && (
        <button
          onClick={onClear}
          className="p-1 rounded-full cursor-pointer transition-colors duration-200"
          style={{ color: 'var(--color-text-muted)' }}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}