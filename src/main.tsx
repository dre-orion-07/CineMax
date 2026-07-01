import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryProvider } from '@/providers'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { OfflineBanner } from '@/components/common/OfflineBanner'
import { router } from '@/routes'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <QueryProvider>
          <OfflineBanner />
          <RouterProvider router={router} />
        </QueryProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
)