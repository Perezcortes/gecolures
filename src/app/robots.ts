import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Aquí puedes ocultar cosas en el futuro, ej: disallow: '/admin/'
    },
    sitemap: 'https://www.gecolures.com/sitemap.xml',
  }
}