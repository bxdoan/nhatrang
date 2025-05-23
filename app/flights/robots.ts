import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/flights',
      disallow: [],
    },
    sitemap: `${SITE_URL}/flights/sitemap.xml`,
  };
} 