import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from '@/constants'

type PosterSize = keyof typeof IMAGE_SIZES.poster
type BackdropSize = keyof typeof IMAGE_SIZES.backdrop
type ProfileSize = keyof typeof IMAGE_SIZES.profile

export const getPosterUrl = (
  path: string | null,
  size: PosterSize = 'md'
): string => {
  if (!path) return '/placeholder-poster.svg'
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.poster[size]}${path}`
}

export const getBackdropUrl = (
  path: string | null,
  size: BackdropSize = 'lg'
): string => {
  if (!path) return '/placeholder-backdrop.svg'
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.backdrop[size]}${path}`
}

export const getProfileUrl = (
  path: string | null,
  size: ProfileSize = 'md'
): string => {
  if (!path) return '/placeholder-profile.svg'
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.profile[size]}${path}`
}