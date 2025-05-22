import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '../lib/metadata';

export const metadata: Metadata = {
  title: `Xe Buýt Nha Trang | ${SITE_NAME}`,
  description: 'Thông tin tuyến đường, lịch trình và bản đồ các tuyến xe buýt công cộng tại Nha Trang. Giá vé chỉ từ 7.000 VNĐ/lượt, phương tiện tiết kiệm và thuận tiện.',
  keywords: ['xe buýt Nha Trang', 'tuyến xe buýt', 'lịch trình xe buýt', 'bản đồ xe buýt', 'Nha Trang', 'giao thông công cộng', 'giá vé xe buýt'],
  openGraph: {
    title: `Xe Buýt Nha Trang | ${SITE_NAME}`,
    description: 'Thông tin tuyến đường, lịch trình và bản đồ các tuyến xe buýt công cộng tại Nha Trang với giá vé chỉ từ 7.000 VNĐ/lượt.',
    url: `${SITE_URL}/bus`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/nhatrang-bus-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Xe Buýt Nha Trang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Xe Buýt Nha Trang | ${SITE_NAME}`,
    description: 'Thông tin tuyến đường, lịch trình và bản đồ các tuyến xe buýt công cộng tại Nha Trang.',
    images: [`${SITE_URL}/images/nhatrang-bus-og-image.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/bus`,
    languages: {
      'vi-VN': `${SITE_URL}/bus`,
      'en-US': `${SITE_URL}/en/bus`,
    },
  },
}; 