import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/moto',
      disallow: [],
    },
    sitemap: `${SITE_URL}/moto/sitemap.xml`,
  };
} 