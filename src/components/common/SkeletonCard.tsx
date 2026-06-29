export const SkeletonCard = () => {
  return (
    <div
      className="flex-shrink-0 w-40 sm:w-44 rounded-lg overflow-hidden animate-pulse"
      style={{ backgroundColor: 'var(--color-bg-card)' }}
    >
      <div
        className="w-full h-60 sm:h-64"
        style={{ backgroundColor: 'var(--color-border)' }}
      />
      <div className="p-3 flex flex-col gap-2">
        <div
          className="h-3 rounded w-3/4"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
        <div
          className="h-3 rounded w-1/2"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
      </div>
    </div>
  )
}