import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { BackToTop } from '@/components/common/BackToTop'
import { ScrollProgressBar } from '@/components/common/ScrollProgressBar'

export const RootLayout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--color-bg-elevated)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
          },
          duration: 3000,
        }}
      />
    </div>
  )
}