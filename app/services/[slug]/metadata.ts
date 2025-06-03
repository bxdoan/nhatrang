import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '../../lib/metadata';
import servicesData from '../../data/services.json';

interface GenerateMetadataProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const service = servicesData.find((s: any) => s.slug === params.slug);
  
  if (!service) {
    return {
      title: `Dịch vụ không tìm thấy | ${SITE_NAME}`,
      description: 'Dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị xóa.',
    };
  }

  const serviceName = service.name.vi;
  const serviceDescription = service.description.vi;
  const price = service.price.toLocaleString();
  const originalPrice = service.price_original.toLocaleString();
  const discount = Math.round(((service.price_original - service.price) / service.price_original) * 100);
  
  const title = `${serviceName} - Giá ${price}đ | ${SITE_NAME}`;
  const description = `${serviceDescription} Giá chỉ ${price}đ${service.price_original > service.price ? ` (Giảm ${discount}% từ ${originalPrice}đ)` : ''}. ${service.auto_delivery ? 'Giao tự động 24/7' : 'Hỗ trợ tận tình'}. Bảo hành ${service.warranty} tháng. ⭐ ${service.rating}/5 (${service.sold} đánh giá).`;

  const keywords = [
    serviceName,
    `${serviceName} Nha Trang`,
    `mua ${serviceName}`,
    `${serviceName} giá rẻ`,
    `${serviceName} chính hãng`,
    ...service.categories.map((cat: string) => `${cat} Nha Trang`),
    ...service.features.vi.slice(0, 3),
    'dịch vụ số Nha Trang',
    'tài khoản premium Nha Trang',
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/services/${service.slug}`,
      type: 'website',
      siteName: SITE_NAME,
      locale: 'vi_VN',
      images: [
        {
          url: service.image || `${SITE_URL}/images/services/default-service.jpg`,
          width: 800,
          height: 600,
          alt: serviceName,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@nhatranginsight',
      creator: '@nhatranginsight',
      title,
      description,
      images: [{
        url: service.image || `${SITE_URL}/images/services/default-service.jpg`,
        alt: serviceName,
      }],
    },
    alternates: {
      canonical: `${SITE_URL}/services/${service.slug}`,
      languages: {
        'vi-VN': `${SITE_URL}/services/${service.slug}`,
        'en-US': `${SITE_URL}/services/${service.slug}?lang=en`,
        'ko-KR': `${SITE_URL}/services/${service.slug}?lang=kr`,
        'zh-CN': `${SITE_URL}/services/${service.slug}?lang=zh-CN`,
        'zh-TW': `${SITE_URL}/services/${service.slug}?lang=zh-TW`,
        'ru-RU': `${SITE_URL}/services/${service.slug}?lang=ru`,
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
    category: service.categories[0] || 'Digital Services',
    classification: 'Product Page',
    other: {
      'geo.region': 'VN-56',
      'geo.placename': 'Nha Trang, Khánh Hòa',
      'geo.position': '12.2388;109.1967',
      'ICBM': '12.2388, 109.1967',
      'DC.title': serviceName,
      'DC.subject': `${service.categories.join(', ')}, Nha Trang`,
      'DC.description': serviceDescription,
      'DC.creator': SITE_NAME,
      'DC.language': 'vi-VN',
      'DC.coverage': 'Nha Trang, Khánh Hòa, Việt Nam',
      'product.price.amount': service.price.toString(),
      'product.price.currency': 'VND',
      'product.availability': service.auto_delivery ? 'InStock' : 'PreOrder',
      'product.condition': 'New',
      'product.brand': service.categories[0],
      'product.category': service.categories.join(' > '),
      'business.contactdata.street_address': '2/18 Ngô Đến, Vĩnh Phước',
      'business.contactdata.locality': 'Nha Trang',
      'business.contactdata.region': 'Khánh Hòa',
      'business.contactdata.postal_code': '650000',
      'business.contactdata.country_name': 'Vietnam',
      'rating.value': service.rating.toString(),
      'rating.best': '5',
      'rating.count': service.sold.toString(),
    },
  };
} 