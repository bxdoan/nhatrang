import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/services', '/services/*'],
      disallow: [],
    },
    sitemap: `${SITE_URL}/services/sitemap.xml`,
  };
} 