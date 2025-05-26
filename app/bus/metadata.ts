import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '../lib/metadata';

export const metadata: Metadata = {
  title: `Xe Buýt Nha Trang - Tuyến Đường & Lịch Trình | ${SITE_NAME}`,
  description: 'Thông tin chi tiết về tuyến đường, lịch trình, bản đồ và giá vé xe buýt công cộng Nha Trang. Tuyến nội thành chỉ 7.000đ, tuyến sân bay Cam Ranh 50.000đ. Cập nhật mới nhất 2024.',
  keywords: [
    'xe buýt Nha Trang',
    'xe buýt công cộng Nha Trang',
    'tuyến xe buýt Nha Trang',
    'lịch trình xe buýt Nha Trang',
    'bản đồ xe buýt Nha Trang',
    'giá vé xe buýt Nha Trang',
    'xe buýt nội thành Nha Trang',
    'xe buýt sân bay Cam Ranh',
    'giao thông công cộng Nha Trang',
    'di chuyển bằng xe buýt Nha Trang',
    'trạm xe buýt Nha Trang',
    'tần suất xe buýt Nha Trang',
    'xe buýt Khánh Hòa',
    'phương tiện công cộng Nha Trang',
    'bus Nha Trang'
  ],
  openGraph: {
    title: `Xe Buýt Nha Trang - Tuyến Đường & Lịch Trình 2024 | ${SITE_NAME}`,
    description: 'Khám phá hệ thống xe buýt công cộng Nha Trang với bản đồ tương tác, thông tin tuyến đường chi tiết và giá vé cập nhật. Tuyến nội thành 7.000đ, sân bay 50.000đ.',
    url: `${SITE_URL}/bus`,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'vi_VN',
    images: [
      {
        url: `${SITE_URL}/images/nhatrang-bus-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Xe Buýt Nha Trang - Bản đồ tuyến đường và thông tin lịch trình',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nhatranginsight',
    creator: '@nhatranginsight',
    title: `Xe Buýt Nha Trang - Tuyến Đường & Lịch Trình 2024`,
    description: 'Thông tin đầy đủ về xe buýt công cộng Nha Trang: tuyến đường, lịch trình, giá vé và bản đồ tương tác.',
    images: [{
      url: `${SITE_URL}/images/nhatrang-bus-og-image.jpg`,
      alt: 'Xe Buýt Nha Trang - Bản đồ tuyến đường',
    }],
  },
  alternates: {
    canonical: `${SITE_URL}/bus`,
    languages: {
      'vi-VN': `${SITE_URL}/bus`,
      'en-US': `${SITE_URL}/en/bus`,
      'ko-KR': `${SITE_URL}/kr/bus`,
      'zh-CN': `${SITE_URL}/zh_CN/bus`,
      'zh-TW': `${SITE_URL}/zh_TW/bus`,
      'ru-RU': `${SITE_URL}/ru/bus`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Transportation',
  classification: 'Public Transportation Guide',
  other: {
    'geo.region': 'VN-56',
    'geo.placename': 'Nha Trang, Khánh Hòa',
    'geo.position': '12.2388;109.1967',
    'ICBM': '12.2388, 109.1967',
    'DC.title': 'Xe Buýt Nha Trang - Hướng dẫn giao thông công cộng',
    'DC.subject': 'Giao thông công cộng, Xe buýt, Nha Trang',
    'DC.description': 'Thông tin tuyến đường, lịch trình và bản đồ xe buýt công cộng Nha Trang',
    'DC.creator': SITE_NAME,
    'DC.language': 'vi-VN',
    'DC.coverage': 'Nha Trang, Khánh Hòa, Việt Nam',
  },
}; 