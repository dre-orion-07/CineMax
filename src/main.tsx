import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryProvider } from '@/providers'
import { router } from '@/routes'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </HelmetProvider>
  </StrictMode>
)