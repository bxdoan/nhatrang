import { SITE_URL } from './lib/metadata';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/cache/',
          '/bus-collect',
          '/bus-review',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
} 