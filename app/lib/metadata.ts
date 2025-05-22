/**
 * Metadata chung cho toàn bộ trang web
 * Sử dụng cho SEO và các thẻ meta
 */

// Các thông tin cơ bản về website
export const SITE_NAME = 'Nha Trang Insight';
export const SITE_DESCRIPTION = 'Cung cấp thông tin du lịch, chuyến bay, giao thông, ẩm thực và lịch sử Nha Trang - Khánh Hòa giúp bạn có chuyến đi tuyệt vời nhất.';
export const SITE_URL = 'https://nhatranginsight.com';
export const DEFAULT_LOCALE = 'vi-VN';

// Thông tin liên hệ
export const CONTACT_INFO = {
  email: 'info@nhatranginsight.com',
  phone: '+84915670892',
};

// URL ảnh mặc định
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/nhatrang-og-image.jpg`;

// Metadata mặc định
export const DEFAULT_METADATA = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Thông tin du lịch & đời sống Nha Trang`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
    creator: '@nhatranginsight',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/images/logo/nti2.png',
    shortcut: '/images/logo/nti2.png',
    apple: '/images/logo/nti2.png',
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/images/logo/nti2.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/images/logo/nti2.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/images/logo/nti2.png',
      },
    ],
  },
  verification: {
    // Thêm các giá trị xác minh của các công cụ tìm kiếm ở đây
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'vi-VN': SITE_URL,
      'en-US': `${SITE_URL}/en`,
    },
  },
};

// Interface cho tham số của hàm generateMetadata
interface MetadataParams {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  canonicalPath?: string;
}

// Hàm tạo metadata cho từng trang
export function generateMetadata({
  title,
  description,
  ogImage,
  noIndex = false,
  canonicalPath = '',
}: MetadataParams) {
  const fullTitle = title ? title : DEFAULT_METADATA.title.default;
  const fullDescription = description || DEFAULT_METADATA.description;
  const ogImageUrl = ogImage || DEFAULT_OG_IMAGE;
  const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : SITE_URL;

  return {
    ...DEFAULT_METADATA,
    title: fullTitle,
    description: fullDescription,
    robots: noIndex 
      ? { index: false, follow: false } 
      : DEFAULT_METADATA.robots,
    alternates: {
      ...DEFAULT_METADATA.alternates,
      canonical,
    },
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      title: fullTitle,
      description: fullDescription,
      url: canonical,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      ...DEFAULT_METADATA.twitter,
      title: fullTitle,
      description: fullDescription,
      images: [ogImageUrl],
    },
  };
}

// Schema.org structured data cho trang chủ
export const HOMEPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// Schema.org structured data cho trang liên hệ
export const CONTACT_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Liên hệ | ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  description: 'Thông tin liên hệ với Nha Trang Insight',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    contactType: 'customer service',
  },
};

// Schema.org structured data cho trang Transportation
export const TRANSPORTATION_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `Di chuyển tại Nha Trang | ${SITE_NAME}`,
  url: `${SITE_URL}/transportation`,
  description: 'Thông tin về phương tiện di chuyển và dịch vụ vận chuyển tại Nha Trang, từ thuê xe máy, xe ô tô đến xe buýt công cộng',
};

// Schema.org structured data cho trang Bus
export const BUS_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `Xe Buýt Nha Trang | ${SITE_NAME}`,
  url: `${SITE_URL}/bus`,
  description: 'Thông tin tuyến đường, lịch trình và bản đồ các tuyến xe buýt công cộng tại Nha Trang. Giá vé chỉ từ 7.000 VNĐ/lượt, phương tiện tiết kiệm và thuận tiện.',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Các tuyến xe buýt tại Nha Trang',
    description: 'Danh sách các tuyến xe buýt công cộng tại Nha Trang, bao gồm thông tin về lộ trình, giá vé và lịch trình',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Product',
          name: 'Tuyến số 23: Bến du Thuyền Ana Marina - Vinpearl Land Nha Trang',
          description: 'Tuyến xe buýt chính kết nối bến xe phía Nam với trung tâm thành phố và bến cảng du lịch',
          offers: {
            '@type': 'Offer',
            price: '7000',
            priceCurrency: 'VND'
          }
        }
      }
    ]
  }
};

// Schema.org structured data cho trang Taxi
export const TAXI_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `Dịch vụ Taxi Nha Trang | ${SITE_NAME}`,
  url: `${SITE_URL}/taxi`,
  description: 'Thông tin chi tiết về các hãng taxi uy tín tại Nha Trang, giá cước, số điện thoại đặt xe và tuyến đường phổ biến.',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Các hãng taxi uy tín tại Nha Trang',
    description: 'Danh sách các hãng taxi uy tín tại Nha Trang, bao gồm thông tin về giá cước, số điện thoại đặt xe',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'TaxiService',
          name: 'Mai Linh Taxi Nha Trang',
          description: 'Hãng taxi uy tín với đội xe hiện đại, giá cả hợp lý và dịch vụ chuyên nghiệp tại Nha Trang',
          telephone: '0258.3811 811',
          priceRange: '15.000đ - 20.000đ/km'
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'TaxiService',
          name: 'Vinasun Taxi Nha Trang',
          description: 'Dịch vụ taxi chất lượng cao với đội ngũ tài xế chuyên nghiệp, phục vụ khách du lịch tại Nha Trang',
          telephone: '0258.3827 827',
          priceRange: '15.000đ - 20.000đ/km'
        }
      }
    ]
  }
}; 