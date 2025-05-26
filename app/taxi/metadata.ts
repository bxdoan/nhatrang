import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '../lib/metadata';

export const metadata: Metadata = {
  title: `Dịch Vụ Taxi Nha Trang - Số Điện Thoại & Giá Cước | ${SITE_NAME}`,
  description: 'Danh sách các hãng taxi uy tín tại Nha Trang: Mai Linh, Vinasun, Taxi Xanh. Số điện thoại đặt xe, giá cước từ 15.000đ/km, hoạt động 24/7.',
  keywords: [
    'taxi Nha Trang',
    'Mai Linh taxi Nha Trang',
    'Vinasun taxi Nha Trang',
    'Taxi Xanh Nha Trang',
    'số điện thoại taxi Nha Trang',
    'giá cước taxi Nha Trang',
    'taxi sân bay Cam Ranh',
    'đặt taxi Nha Trang',
    'hãng taxi uy tín Nha Trang',
    'taxi 24/7 Nha Trang',
    'Nha Trang taxi service',
    'airport taxi Nha Trang',
    'taxi Khánh Hòa',
    'cước phí taxi Nha Trang',
    'tổng đài taxi Nha Trang'
  ],
  openGraph: {
    title: `Dịch Vụ Taxi Nha Trang - Danh Sách Hãng Taxi Uy Tín | ${SITE_NAME}`,
    description: 'Thông tin đầy đủ về các hãng taxi uy tín tại Nha Trang: số điện thoại, giá cước, dịch vụ. Mai Linh, Vinasun, Taxi Xanh hoạt động 24/7.',
    url: `${SITE_URL}/taxi`,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'vi_VN',
    images: [
      {
        url: `${SITE_URL}/images/taxi/nhatrang-taxi-service-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dịch Vụ Taxi Nha Trang - Hãng taxi uy tín',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nhatranginsight',
    creator: '@nhatranginsight',
    title: `Dịch Vụ Taxi Nha Trang - Hãng Taxi Uy Tín`,
    description: 'Danh sách các hãng taxi uy tín tại Nha Trang với số điện thoại và giá cước chi tiết.',
    images: [{
      url: `${SITE_URL}/images/taxi/nhatrang-taxi-service-og.jpg`,
      alt: 'Dịch Vụ Taxi Nha Trang',
    }],
  },
  alternates: {
    canonical: `${SITE_URL}/taxi`,
    languages: {
      'vi-VN': `${SITE_URL}/taxi`,
      'en-US': `${SITE_URL}/en/taxi`,
      'ko-KR': `${SITE_URL}/kr/taxi`,
      'zh-CN': `${SITE_URL}/zh_CN/taxi`,
      'zh-TW': `${SITE_URL}/zh_TW/taxi`,
      'ru-RU': `${SITE_URL}/ru/taxi`,
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
  classification: 'Taxi Service Directory',
  other: {
    'geo.region': 'VN-56',
    'geo.placename': 'Nha Trang, Khánh Hòa',
    'geo.position': '12.2388;109.1967',
    'ICBM': '12.2388, 109.1967',
    'DC.title': 'Dịch Vụ Taxi Nha Trang - Danh sách hãng taxi uy tín',
    'DC.subject': 'Taxi, Dịch vụ vận chuyển, Nha Trang',
    'DC.description': 'Thông tin về các hãng taxi uy tín tại Nha Trang',
    'DC.creator': SITE_NAME,
    'DC.language': 'vi-VN',
    'DC.coverage': 'Nha Trang, Khánh Hòa, Việt Nam',
  },
}; 