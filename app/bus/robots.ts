import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/bus',
      disallow: [],
    },
    sitemap: `${SITE_URL}/bus/sitemap.xml`,
  };
} 