import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollProps {
  onIntersect: () => void
  enabled?: boolean
}

export const useInfiniteScroll = ({ onIntersect, enabled = true }: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!enabled) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onIntersect()
          }
        },
        { threshold: 0.1 }
      )

      if (node) observerRef.current.observe(node)
    },
    [onIntersect, enabled]
  )

  useEffect(() => {
    return () => observerRef.current?.disconnect()
  }, [])

  return sentinelRef
}