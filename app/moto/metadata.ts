import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '../lib/metadata';

export const metadata: Metadata = {
  title: `Thuê Xe Máy Nha Trang - Giá Rẻ & Giao Tận Nơi | ${SITE_NAME}`,
  description: 'Dịch vụ thuê xe máy Nha Trang uy tín, giá từ 100.000đ/ngày. Xe số, xe ga, xe cao cấp đầy đủ. Giao xe tận nơi miễn phí, thủ tục đơn giản. Đặt xe ngay!',
  keywords: [
    'thuê xe máy Nha Trang',
    'cho thuê xe máy Nha Trang',
    'xe máy Nha Trang giá rẻ',
    'thuê xe ga Nha Trang',
    'thuê xe số Nha Trang',
    'thuê Honda Vision Nha Trang',
    'thuê Yamaha Nmax Nha Trang',
    'thuê Honda PCX Nha Trang',
    'xe máy giao tận nơi Nha Trang',
    'thuê xe máy theo ngày Nha Trang',
    'dịch vụ thuê xe máy Khánh Hòa',
    'motorbike rental Nha Trang',
    'scooter rental Nha Trang',
    'xe máy du lịch Nha Trang',
    'rental bike Nha Trang'
  ],
  openGraph: {
    title: `Thuê Xe Máy Nha Trang - Giá Chỉ Từ 100K/Ngày | ${SITE_NAME}`,
    description: 'Dịch vụ thuê xe máy Nha Trang uy tín với đa dạng loại xe từ xe số đến xe ga cao cấp. Giao xe tận nơi miễn phí, thủ tục đơn giản, giá cả hợp lý.',
    url: `${SITE_URL}/moto`,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'vi_VN',
    images: [
      {
        url: `${SITE_URL}/images/moto/nhatrang-motorbike-rental-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Thuê Xe Máy Nha Trang - Dịch vụ uy tín giá rẻ',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nhatranginsight',
    creator: '@nhatranginsight',
    title: `Thuê Xe Máy Nha Trang - Giá Chỉ Từ 100K/Ngày`,
    description: 'Dịch vụ thuê xe máy Nha Trang với đa dạng loại xe, giao tận nơi miễn phí, thủ tục đơn giản.',
    images: [{
      url: `${SITE_URL}/images/moto/nhatrang-motorbike-rental-og.jpg`,
      alt: 'Thuê Xe Máy Nha Trang - Dịch vụ uy tín',
    }],
  },
  alternates: {
    canonical: `${SITE_URL}/moto`,
    languages: {
      'vi-VN': `${SITE_URL}/moto`,
      'en-US': `${SITE_URL}/en/moto`,
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
  classification: 'Motorcycle Rental Service',
  other: {
    'geo.region': 'VN-56',
    'geo.placename': 'Nha Trang, Khánh Hòa',
    'geo.position': '12.2388;109.1967',
    'ICBM': '12.2388, 109.1967',
    'DC.title': 'Thuê Xe Máy Nha Trang - Dịch vụ cho thuê xe máy uy tín',
    'DC.subject': 'Thuê xe máy, Du lịch, Nha Trang',
    'DC.description': 'Dịch vụ thuê xe máy Nha Trang với giá cả hợp lý và chất lượng tốt',
    'DC.creator': SITE_NAME,
    'DC.language': 'vi-VN',
    'DC.coverage': 'Nha Trang, Khánh Hòa, Việt Nam',
  },
}; 