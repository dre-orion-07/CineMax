import { Link } from 'react-router-dom'
import { Film } from 'lucide-react'
import { APP_NAME } from '@/constants'

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Trending', path: '/trending' },
  { label: 'Top Rated', path: '/top-rated' },
  { label: 'Genres', path: '/genres' },
  { label: 'Favorites', path: '/favorites' },
  { label: 'Watchlist', path: '/watchlist' },
]

export const Footer = () => {
  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Film size={24} style={{ color: 'var(--color-accent-primary)' }} />
              <span className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Cine<span style={{ color: 'var(--color-accent-primary)' }}>Max</span>
              </span>
            </Link>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Discover, explore, and track your favourite movies and TV shows.
            </p>
          </div>

          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Navigate
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Data
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Movie data provided by{' '}
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-accent-secondary)' }}
              >
                TMDB
              </a>
              . This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </div>

        <div
          className="mt-8 pt-8 text-center text-sm"
          style={{
            borderTop: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
          }}
        >
          © {new Date().getFullYear()} {APP_NAME}. Built by Dre — Ogunyeye Damilare.
        </div>
      </div>
    </footer>
  )
}