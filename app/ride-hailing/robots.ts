import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/ride-hailing',
    },
    sitemap: 'https://nhatranginsight.com/ride-hailing/sitemap.xml',
  }
} 