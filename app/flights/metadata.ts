import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '../lib/metadata';

export const metadata: Metadata = {
  title: `Chuyến Bay Cam Ranh (CXR) - Thông Tin Sân Bay Nha Trang | ${SITE_NAME}`,
  description: 'Thông tin chuyến bay đến sân bay Cam Ranh (CXR), lịch trình bay, cách di chuyển từ sân bay về Nha Trang. Cập nhật theo thời gian thực.',
  keywords: [
    'chuyến bay Cam Ranh',
    'sân bay Cam Ranh CXR',
    'flight to Nha Trang',
    'Cam Ranh airport',
    'lịch trình bay Nha Trang',
    'chuyến bay đến Nha Trang',
    'Vietnam Airlines CXR',
    'VietJet Air Cam Ranh',
    'Bamboo Airways Nha Trang',
    'từ sân bay Cam Ranh về Nha Trang',
    'thông tin sân bay Nha Trang',
    'di chuyển sân bay Cam Ranh',
    'đặt vé máy bay Nha Trang',
    'bay đến Khánh Hòa',
    'flight schedule CXR'
  ],
  openGraph: {
    title: `Chuyến Bay Cam Ranh (CXR) - Sân Bay Nha Trang | ${SITE_NAME}`,
    description: 'Thông tin đầy đủ về chuyến bay đến sân bay Cam Ranh, cách di chuyển về Nha Trang và các dịch vụ tại sân bay. Cập nhật theo thời gian thực.',
    url: `${SITE_URL}/flights`,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'vi_VN',
    images: [
      {
        url: `${SITE_URL}/images/flights/cam-ranh-airport-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Sân Bay Cam Ranh - Thông tin chuyến bay đến Nha Trang',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nhatranginsight',
    creator: '@nhatranginsight',
    title: `Chuyến Bay Cam Ranh (CXR) - Sân Bay Nha Trang`,
    description: 'Thông tin chuyến bay đến sân bay Cam Ranh và cách di chuyển về trung tâm Nha Trang.',
    images: [{
      url: `${SITE_URL}/images/flights/cam-ranh-airport-og.jpg`,
      alt: 'Sân Bay Cam Ranh - Nha Trang',
    }],
  },
  alternates: {
    canonical: `${SITE_URL}/flights`,
    languages: {
      'vi-VN': `${SITE_URL}/flights`,
      'en-US': `${SITE_URL}/en/flights`,
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
  category: 'Travel',
  classification: 'Airport Information & Flight Guide',
  other: {
    'geo.region': 'VN-56',
    'geo.placename': 'Cam Ranh, Khánh Hòa',
    'geo.position': '11.9981;109.2191',
    'ICBM': '11.9981, 109.2191',
    'DC.title': 'Sân Bay Cam Ranh - Thông tin chuyến bay đến Nha Trang',
    'DC.subject': 'Chuyến bay, Sân bay, Nha Trang, Du lịch',
    'DC.description': 'Thông tin về chuyến bay và sân bay Cam Ranh phục vụ Nha Trang',
    'DC.creator': SITE_NAME,
    'DC.language': 'vi-VN',
    'DC.coverage': 'Cam Ranh, Nha Trang, Khánh Hòa, Việt Nam',
  },
}; 