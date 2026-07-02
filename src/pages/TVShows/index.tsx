import { SEOHead } from '@/components/common/SEOHead'
import { TVCarousel } from '@/components/common/TVCarousel'
import { HeroSection } from '@/components/common/HeroSection'
import {
  useTVTrending,
  useTVPopular,
  useTVTopRated,
  useTVAiringToday,
  useTVOnTheAir,
} from '@/hooks'

const TVShows = () => {
  const { data: trending, isLoading: trendingLoading } = useTVTrending('week')
  const { data: popular, isLoading: popularLoading } = useTVPopular()
  const { data: topRated, isLoading: topRatedLoading } = useTVTopRated()
  const { data: airingToday, isLoading: airingLoading } = useTVAiringToday()
  const { data: onTheAir, isLoading: onAirLoading } = useTVOnTheAir()

  const heroMovies = (trending?.results ?? []).map((show) => ({
    id: show.id,
    title: show.name,
    overview: show.overview,
    poster_path: show.poster_path,
    backdrop_path: show.backdrop_path,
    release_date: show.first_air_date,
    vote_average: show.vote_average,
    vote_count: show.vote_count,
    genre_ids: show.genre_ids,
    popularity: show.popularity,
    adult: false,
    original_language: show.original_language,
    original_title: show.original_name,
    video: false,
  }))

  return (
    <div>
      <SEOHead
        title="TV Shows"
        description="Discover the best TV shows — trending series, top rated, and airing today on CineMax."
      />

      {/* Hero */}
      {trendingLoading ? (
        <div
          className="w-full h-[85vh] min-h-[600px] animate-pulse"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        />
      ) : (
        <HeroSection movies={heroMovies} />
      )}

      {/* Sections */}
      <div className="pb-12">
        <TVCarousel
          title="Trending TV Shows"
          shows={trending?.results ?? []}
          isLoading={trendingLoading}
        />
        <TVCarousel
          title="Airing Today"
          shows={airingToday?.results ?? []}
          isLoading={airingLoading}
        />
        <TVCarousel
          title="Popular Shows"
          shows={popular?.results ?? []}
          isLoading={popularLoading}
        />
        <TVCarousel
          title="Top Rated"
          shows={topRated?.results ?? []}
          isLoading={topRatedLoading}
        />
        <TVCarousel
          title="On The Air"
          shows={onTheAir?.results ?? []}
          isLoading={onAirLoading}
        />
      </div>
    </div>
  )
}

export default TVShows