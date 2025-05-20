import { SITE_NAME, SITE_DESCRIPTION } from './lib/metadata';

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: 'NhaTrangInsight',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    orientation: 'portrait',
    lang: 'vi-VN',
  };
} 