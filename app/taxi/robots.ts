import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/taxi',
      disallow: [],
    },
    sitemap: `${SITE_URL}/taxi/sitemap.xml`,
  };
} 