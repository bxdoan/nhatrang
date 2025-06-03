import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/metadata';
import servicesData from '../data/services.json';

export default function sitemap(): MetadataRoute.Sitemap {
  // Trang chính services
  const mainPage = {
    url: `${SITE_URL}/services`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  };

  // Các trang service detail
  const servicePages = servicesData.map((service: any) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [mainPage, ...servicePages];
} 