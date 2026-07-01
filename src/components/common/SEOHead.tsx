import { Helmet } from 'react-helmet-async'
import { APP_NAME, APP_DESCRIPTION } from '@/constants'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export const SEOHead = ({
  title,
  description = APP_DESCRIPTION,
  image,
  url,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME
  const currentUrl = url || window.location.href

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}