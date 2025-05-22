import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '../lib/metadata';

export const metadata: Metadata = {
  title: `Dịch vụ Taxi Nha Trang | ${SITE_NAME}`,
  description: 'Thông tin chi tiết về các hãng taxi uy tín tại Nha Trang, giá cước từ 15.000 - 20.000đ/km, số điện thoại đặt xe và tuyến đường phổ biến.',
  keywords: ['taxi Nha Trang', 'đặt taxi', 'giá cước taxi', 'hãng taxi uy tín', 'Mai Linh taxi', 'Vinasun taxi', 'Nha Trang taxi'],
  openGraph: {
    title: `Dịch vụ Taxi Nha Trang | ${SITE_NAME}`,
    description: 'Thông tin chi tiết về các hãng taxi uy tín tại Nha Trang, giá cước, số điện thoại đặt xe và tuyến đường phổ biến.',
    url: `${SITE_URL}/taxi`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/nhatrang-taxi-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dịch vụ Taxi Nha Trang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Dịch vụ Taxi Nha Trang | ${SITE_NAME}`,
    description: 'Thông tin chi tiết về các hãng taxi uy tín tại Nha Trang.',
    images: [`${SITE_URL}/images/nhatrang-taxi-og-image.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/taxi`,
    languages: {
      'vi-VN': `${SITE_URL}/taxi`,
      'en-US': `${SITE_URL}/en/taxi`,
    },
  },
}; 