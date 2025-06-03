import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '../lib/metadata';

export const metadata: Metadata = {
  title: `Thuê Xe Ô Tô Nha Trang - Đưa Đón Sân Bay | ${SITE_NAME}`,
  description: 'Dịch vụ thuê xe ô tô và đưa đón sân bay Cam Ranh Nha Trang. Xe 4-16 chỗ, tài xế chuyên nghiệp, giá từ 250.000đ. Không ghép khách, đúng giờ.',
  keywords: [
    'thuê xe ô tô Nha Trang',
    'đưa đón sân bay Cam Ranh',
    'xe đưa đón sân bay Nha Trang',
    'thuê xe 4 chỗ Nha Trang',
    'thuê xe 7 chỗ Nha Trang',
    'thuê xe 16 chỗ Nha Trang',
    'taxi sân bay Cam Ranh',
    'dịch vụ đưa đón Nha Trang',
    'thuê xe có tài xế Nha Trang',
    'car rental Nha Trang',
    'airport transfer Nha Trang',
    'xe du lịch Nha Trang',
    'thuê xe theo ngày Nha Trang',
    'xe đi tour Nha Trang',
    'dịch vụ vận chuyển Nha Trang'
  ],
  openGraph: {
    title: `Thuê Xe Ô Tô Nha Trang - Đưa Đón Sân Bay Cam Ranh | ${SITE_NAME}`,
    description: 'Dịch vụ thuê xe ô tô chuyên nghiệp tại Nha Trang. Đưa đón sân bay Cam Ranh, xe tour du lịch với tài xế kinh nghiệm. Đặt xe ngay!',
    url: `${SITE_URL}/car`,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'vi_VN',
    images: [
      {
        url: `${SITE_URL}/images/car/inova.jpg`,
        width: 1200,
        height: 630,
        alt: 'Thuê Xe Ô Tô Nha Trang - Dịch vụ đưa đón sân bay',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nhatranginsight',
    creator: '@nhatranginsight',
    title: `Thuê Xe Ô Tô Nha Trang - Đưa Đón Sân Bay`,
    description: 'Dịch vụ thuê xe ô tô và đưa đón sân bay Cam Ranh với tài xế chuyên nghiệp, xe đời mới.',
    images: [{
      url: `${SITE_URL}/images/car/inova.jpg`,
      alt: 'Thuê Xe Ô Tô Nha Trang',
    }],
  },
  alternates: {
    canonical: `${SITE_URL}/car`,
    languages: {
      'vi-VN': `${SITE_URL}/car`,
      'en-US': `${SITE_URL}/car?lang=en`,
      'ko-KR': `${SITE_URL}/car?lang=kr`,
      'zh-CN': `${SITE_URL}/car?lang=zh_CN`,
      'zh-TW': `${SITE_URL}/car?lang=zh_TW`,
      'ru-RU': `${SITE_URL}/car?lang=ru`,
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
  classification: 'Car Rental & Airport Transfer Service',
  other: {
    'geo.region': 'VN-56',
    'geo.placename': 'Nha Trang, Khánh Hòa',
    'geo.position': '12.2388;109.1967',
    'ICBM': '12.2388, 109.1967',
    'DC.title': 'Thuê Xe Ô Tô Nha Trang - Dịch vụ đưa đón sân bay',
    'DC.subject': 'Thuê xe ô tô, Đưa đón sân bay, Nha Trang',
    'DC.description': 'Dịch vụ thuê xe ô tô và đưa đón sân bay Cam Ranh chuyên nghiệp',
    'DC.creator': SITE_NAME,
    'DC.language': 'vi-VN',
    'DC.coverage': 'Nha Trang, Khánh Hòa, Việt Nam',
  },
}; 