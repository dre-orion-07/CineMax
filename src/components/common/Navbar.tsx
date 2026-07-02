import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, Bookmark, Menu, X, Film } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { label: 'Movies', path: '/' },
  { label: 'TV Shows', path: '/tv' },
  { label: 'Anime', path: '/anime' },
  { label: 'Nollywood', path: '/nollywood' },
  { label: 'Trending', path: '/trending' },
  { label: 'Top Rated', path: '/top-rated' },
  { label: 'Genres', path: '/genres' },
]

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? 'var(--color-bg-secondary)' : 'transparent',
        borderBottom: isScrolled ? '1px solid var(--color-border)' : 'none',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Film
              size={28}
              style={{ color: 'var(--color-accent-primary)' }}
            />
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Cine<span style={{ color: 'var(--color-accent-primary)' }}>Max</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className="text-sm font-medium transition-colors duration-200"
                style={({ isActive }) => ({
                  color: isActive
                    ? 'var(--color-accent-primary)'
                    : 'var(--color-text-secondary)',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/search')}
              className="p-2 rounded-full transition-colors duration-200 cursor-pointer"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/favorites"
              className="p-2 rounded-full transition-colors duration-200"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="Favorites"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/watchlist"
              className="p-2 rounded-full transition-colors duration-200"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="Watchlist"
            >
              <Bookmark size={20} />
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 cursor-pointer"
            style={{ color: 'var(--color-text-primary)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium py-2"
                  style={({ isActive }) => ({
                    color: isActive
                      ? 'var(--color-accent-primary)'
                      : 'var(--color-text-secondary)',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex items-center gap-4 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <Link to="/search" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--color-text-secondary)' }}>
                  <Search size={20} />
                </Link>
                <Link to="/favorites" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--color-text-secondary)' }}>
                  <Heart size={20} />
                </Link>
                <Link to="/watchlist" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--color-text-secondary)' }}>
                  <Bookmark size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}