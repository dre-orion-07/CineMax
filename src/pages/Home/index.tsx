import { HeroSection } from '@/components/common/HeroSection'
import { MovieCarousel } from '@/components/common/MovieCarousel'
import {
  useTrending,
  usePopular,
  useTopRated,
  useNowPlaying,
  useUpcoming,
} from '@/hooks'

const Home = () => {
  const { data: trending, isLoading: trendingLoading } = useTrending('week')
  const { data: popular, isLoading: popularLoading } = usePopular()
  const { data: topRated, isLoading: topRatedLoading } = useTopRated()
  const { data: nowPlaying, isLoading: nowPlayingLoading } = useNowPlaying()
  const { data: upcoming, isLoading: upcomingLoading } = useUpcoming()

  return (
    <div>
      {/* Hero */}
      {trendingLoading ? (
        <div
          className="w-full h-[70vh] min-h-[500px] animate-pulse"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        />
      ) : (
        <HeroSection movies={trending?.results ?? []} />
      )}

      {/* Sections */}
      <div className="pb-12">
        <MovieCarousel
          title="Trending This Week"
          movies={trending?.results ?? []}
          isLoading={trendingLoading}
          viewAllPath="/trending"
        />
        <MovieCarousel
          title="Now Playing"
          movies={nowPlaying?.results ?? []}
          isLoading={nowPlayingLoading}
        />
        <MovieCarousel
          title="Popular Movies"
          movies={popular?.results ?? []}
          isLoading={popularLoading}
        />
        <MovieCarousel
          title="Top Rated"
          movies={topRated?.results ?? []}
          isLoading={topRatedLoading}
          viewAllPath="/top-rated"
        />
        <MovieCarousel
          title="Upcoming"
          movies={upcoming?.results ?? []}
          isLoading={upcomingLoading}
        />
      </div>
    </div>
  )
}

export default Home