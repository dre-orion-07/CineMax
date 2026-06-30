import { ArrowUpDown } from 'lucide-react'
import type { SortOption } from '@/types'

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'release_date.desc', label: 'Newest' },
  { value: 'release_date.asc', label: 'Oldest' },
  { value: 'title.asc', label: 'Alphabetical (A-Z)' },
]

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <ArrowUpDown size={16} style={{ color: 'var(--color-text-muted)' }} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="bg-transparent outline-none text-sm cursor-pointer"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="Sort movies by"
      >
        {SORT_OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-primary)' }}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}