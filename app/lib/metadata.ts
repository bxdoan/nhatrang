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

// Viewport configuration - tách riêng theo yêu cầu Next.js
export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

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
  '@type': ['WebPage', 'TransportService'],
  name: `Xe Buýt Nha Trang - Tuyến Đường & Lịch Trình | ${SITE_NAME}`,
  url: `${SITE_URL}/bus`,
  description: 'Thông tin chi tiết về tuyến đường, lịch trình, bản đồ và giá vé xe buýt công cộng Nha Trang. Tuyến nội thành chỉ 7.000đ, tuyến sân bay Cam Ranh 50.000đ.',
  provider: {
    '@type': 'Organization',
    name: 'Trung tâm Điều hành xe buýt Nha Trang',
    telephone: '0258.3810810',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nha Trang',
      addressRegion: 'Khánh Hòa',
      addressCountry: 'VN'
    }
  },
  serviceArea: {
    '@type': 'City',
    name: 'Nha Trang',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Khánh Hòa'
    }
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dịch vụ xe buýt Nha Trang',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Vé xe buýt nội thành',
        description: 'Vé lẻ cho các tuyến xe buýt nội thành Nha Trang',
        price: '7000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        category: 'Nội thành'
      },
      {
        '@type': 'Offer',
        name: 'Vé xe buýt sân bay Cam Ranh',
        description: 'Vé lẻ tuyến xe buýt từ/đến sân bay Cam Ranh',
        price: '50000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        category: 'Sân bay'
      },
      {
        '@type': 'Offer',
        name: 'Vé tháng xe buýt',
        description: 'Vé tháng không giới hạn số lượt đi cho các tuyến nội thành',
        price: '200000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        category: 'Vé tháng'
      }
    ]
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Các tuyến xe buýt tại Nha Trang',
    description: 'Danh sách đầy đủ các tuyến xe buýt công cộng tại Nha Trang với thông tin chi tiết về lộ trình, giá vé và lịch trình',
    numberOfItems: 4,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'BusTrip',
          name: 'Tuyến số 23: Bến du Thuyền Ana Marina - Vinpearl Land Nha Trang',
          description: 'Tuyến xe buýt chính kết nối bến xe phía Nam với trung tâm thành phố và bến cảng du lịch Vinpearl',
          provider: {
            '@type': 'Organization',
            name: 'Trung tâm Điều hành xe buýt Nha Trang'
          },
          tripOrigin: {
            '@type': 'BusStation',
            name: 'Bến du Thuyền Ana Marina'
          },
          tripDestination: {
            '@type': 'BusStation',
            name: 'Vinpearl Land Nha Trang'
          },
          offers: {
            '@type': 'Offer',
            price: '7000',
            priceCurrency: 'VND'
          },
          departureTime: '05:00',
          arrivalTime: '19:00',
          frequency: 'PT15M'
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'BusTrip',
          name: 'Tuyến số 18: Bình Hưng - Diên Khánh',
          description: 'Tuyến xe buýt kết nối huyện Diên Khánh với trung tâm thành phố Nha Trang',
          provider: {
            '@type': 'Organization',
            name: 'Trung tâm Điều hành xe buýt Nha Trang'
          },
          offers: {
            '@type': 'Offer',
            price: '7000',
            priceCurrency: 'VND'
          },
          departureTime: '05:30',
          arrivalTime: '18:30',
          frequency: 'PT20M'
        }
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'BusTrip',
          name: 'Tuyến số 9: Bến xe Phía Nam - Sân bay Cam Ranh',
          description: 'Tuyến xe buýt cao cấp kết nối sân bay quốc tế Cam Ranh với trung tâm Nha Trang',
          provider: {
            '@type': 'Organization',
            name: 'Trung tâm Điều hành xe buýt Nha Trang'
          },
          tripOrigin: {
            '@type': 'BusStation',
            name: 'Bến xe Phía Nam Nha Trang'
          },
          tripDestination: {
            '@type': 'Airport',
            name: 'Sân bay quốc tế Cam Ranh',
            iataCode: 'CXR'
          },
          offers: {
            '@type': 'Offer',
            price: '50000',
            priceCurrency: 'VND'
          },
          departureTime: '04:00',
          arrivalTime: '21:00',
          frequency: 'PT30M'
        }
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'BusTrip',
          name: 'Tuyến số 4: Chợ Đầm - Bến xe Phía Nam',
          description: 'Tuyến xe buýt nội thành kết nối khu vực chợ Đầm với bến xe phía Nam',
          provider: {
            '@type': 'Organization',
            name: 'Trung tâm Điều hành xe buýt Nha Trang'
          },
          offers: {
            '@type': 'Offer',
            price: '7000',
            priceCurrency: 'VND'
          },
          departureTime: '05:15',
          arrivalTime: '19:15',
          frequency: 'PT25M'
        }
      }
    ]
  },
  operatingHours: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    opens: '05:00',
    closes: '19:00'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '0258.3810810',
    contactType: 'customer service',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '07:00',
      closes: '17:00'
    }
  },
  accessibilityFeature: [
    'wheelchairAccessible',
    'audioDescription'
  ],
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Phương thức thanh toán',
      value: 'Tiền mặt, Vé tháng'
    },
    {
      '@type': 'PropertyValue',
      name: 'Đối tượng ưu tiên',
      value: 'Học sinh, sinh viên, người cao tuổi, người khuyết tật'
    },
    {
      '@type': 'PropertyValue',
      name: 'Tần suất trung bình',
      value: '15-30 phút/chuyến'
    }
  ]
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

// Schema.org structured data cho trang Moto
export const MOTO_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['WebPage', 'Service'],
  name: `Thuê Xe Máy Nha Trang - Giá Rẻ & Giao Tận Nơi | ${SITE_NAME}`,
  url: `${SITE_URL}/moto`,
  description: 'Dịch vụ thuê xe máy Nha Trang uy tín, giá từ 100.000đ/ngày. Xe số, xe ga, xe cao cấp đầy đủ. Giao xe tận nơi miễn phí, thủ tục đơn giản.',
  provider: {
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nha Trang',
      addressRegion: 'Khánh Hòa',
      addressCountry: 'VN'
    }
  },
  serviceArea: {
    '@type': 'City',
    name: 'Nha Trang',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Khánh Hòa'
    }
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dịch vụ thuê xe máy Nha Trang',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Thuê xe số',
        description: 'Honda Wave, Yamaha Sirius, Jupiter, Suzuki Viva',
        price: '100000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        category: 'Xe số',
        unitText: 'ngày'
      },
      {
        '@type': 'Offer',
        name: 'Thuê xe ga phổ thông',
        description: 'Honda Vision, Air Blade, Lead, Yamaha Nmax',
        price: '150000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        category: 'Xe ga',
        unitText: 'ngày'
      },
      {
        '@type': 'Offer',
        name: 'Thuê xe ga cao cấp',
        description: 'Honda PCX, SH Mode, Yamaha NVX, Vespa Primavera',
        price: '180000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        category: 'Xe cao cấp',
        unitText: 'ngày'
      }
    ]
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Các loại xe máy cho thuê tại Nha Trang',
    description: 'Đa dạng các loại xe máy cho thuê từ xe số tiết kiệm đến xe ga cao cấp',
    numberOfItems: 12,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Product',
          name: 'Honda Wave Alpha',
          category: 'Xe số',
          offers: {
            '@type': 'Offer',
            price: '100000',
            priceCurrency: 'VND',
            unitText: 'ngày'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Product',
          name: 'Honda Vision 2022',
          category: 'Xe ga phổ thông',
          offers: {
            '@type': 'Offer',
            price: '150000',
            priceCurrency: 'VND',
            unitText: 'ngày'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Product',
          name: 'Honda PCX 2022',
          category: 'Xe ga cao cấp',
          offers: {
            '@type': 'Offer',
            price: '180000',
            priceCurrency: 'VND',
            unitText: 'ngày'
          }
        }
      }
    ]
  },
  operatingHours: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    opens: '07:00',
    closes: '20:00'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT_INFO.phone,
    contactType: 'customer service',
    availableLanguage: ['Vietnamese', 'English']
  },
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Giao xe tận nơi',
      value: 'Miễn phí trong bán kính 3km'
    },
    {
      '@type': 'PropertyValue',
      name: 'Thủ tục',
      value: 'CMND/CCCD hoặc Bằng lái xe'
    },
    {
      '@type': 'PropertyValue',
      name: 'Bảo hiểm',
      value: 'Xe được bảo hiểm đầy đủ'
    },
    {
      '@type': 'PropertyValue',
      name: 'Hỗ trợ',
      value: 'Cứu hộ 24/7 trong thành phố'
    }
  ]
};

// Schema.org structured data cho trang Oto
export const OTO_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['WebPage', 'Service'],
  name: `Thuê Xe Ô Tô Nha Trang - Đưa Đón Sân Bay | ${SITE_NAME}`,
  url: `${SITE_URL}/car`,
  description: 'Dịch vụ thuê xe ô tô và đưa đón sân bay Cam Ranh Nha Trang. Xe 4-16 chỗ, tài xế chuyên nghiệp, giá từ 250.000đ. Không ghép khách, đúng giờ.',
  provider: {
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nha Trang',
      addressRegion: 'Khánh Hòa',
      addressCountry: 'VN'
    }
  },
  serviceArea: [
    {
      '@type': 'City',
      name: 'Nha Trang',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Khánh Hòa'
      }
    },
    {
      '@type': 'Airport',
      name: 'Sân bay quốc tế Cam Ranh',
      iataCode: 'CXR'
    }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dịch vụ thuê xe ô tô Nha Trang',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Đưa đón sân bay xe 4 chỗ',
        description: 'Dịch vụ đưa đón sân bay Cam Ranh bằng xe 4 chỗ',
        price: '250000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        category: 'Airport Transfer',
        unitText: 'lượt'
      },
      {
        '@type': 'Offer',
        name: 'Đưa đón sân bay xe 7 chỗ',
        description: 'Dịch vụ đưa đón sân bay Cam Ranh bằng xe 7 chỗ',
        price: '300000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        category: 'Airport Transfer',
        unitText: 'lượt'
      },
      {
        '@type': 'Offer',
        name: 'Đưa đón sân bay xe 16 chỗ',
        description: 'Dịch vụ đưa đón sân bay Cam Ranh bằng xe 16 chỗ',
        price: '500000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        category: 'Airport Transfer',
        unitText: 'lượt'
      }
    ]
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Các dịch vụ xe ô tô tại Nha Trang',
    description: 'Dịch vụ thuê xe ô tô đa dạng từ đưa đón sân bay đến tour du lịch',
    numberOfItems: 6,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: 'Đưa đón sân bay Cam Ranh',
          description: 'Dịch vụ đưa đón từ/đến sân bay quốc tế Cam Ranh',
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '250000',
            highPrice: '500000',
            priceCurrency: 'VND'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: 'Tour Nha Trang - Đà Lạt',
          description: 'Dịch vụ xe đi tour thành phố ngàn hoa Đà Lạt',
          offers: {
            '@type': 'Offer',
            price: 'Theo thỏa thuận',
            priceCurrency: 'VND'
          }
        }
      }
    ]
  },
  operatingHours: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    opens: '06:00',
    closes: '22:00'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT_INFO.phone,
    contactType: 'customer service',
    availableLanguage: ['Vietnamese', 'English']
  },
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Không ghép khách',
      value: 'Dịch vụ riêng tư, không ghép khách'
    },
    {
      '@type': 'PropertyValue',
      name: 'Tài xế chuyên nghiệp',
      value: 'Tài xế kinh nghiệm, am hiểu địa phương'
    },
    {
      '@type': 'PropertyValue',
      name: 'Đặt xe trước',
      value: 'Liên hệ trước ít nhất 2 giờ'
    }
  ]
};

// Schema.org structured data cho trang Ride-hailing
export const RIDE_HAILING_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['WebPage', 'Service'],
  name: `Xe Ôm & Xe Ôm Công Nghệ Nha Trang | ${SITE_NAME}`,
  url: `${SITE_URL}/ride-hailing`,
  description: 'Hướng dẫn đầy đủ về dịch vụ xe ôm truyền thống và xe ôm công nghệ tại Nha Trang. So sánh Grab, Maxim và tips đi xe ôm an toàn.',
  provider: {
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nha Trang',
      addressRegion: 'Khánh Hòa',
      addressCountry: 'VN'
    }
  },
  serviceArea: [
    {
      '@type': 'City',
      name: 'Nha Trang',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Khánh Hòa'
      }
    }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dịch vụ xe ôm tại Nha Trang',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Xe ôm truyền thống',
        description: 'Dịch vụ xe ôm truyền thống tại các điểm cố định',
        priceRange: '15000-25000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        category: 'Traditional Motorbike Taxi',
        unitText: 'km'
      },
      {
        '@type': 'Offer',
        name: 'Grab Bike',
        description: 'Dịch vụ xe ôm công nghệ qua ứng dụng Grab',
        priceRange: '12000-18000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        category: 'Tech-based Ride Hailing',
        unitText: 'km'
      },
      {
        '@type': 'Offer',
        name: 'Maxim Bike',
        description: 'Dịch vụ xe ôm công nghệ qua ứng dụng Maxim',
        priceRange: '11000-16000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        category: 'Tech-based Ride Hailing',
        unitText: 'km'
      }
    ]
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Các ứng dụng xe ôm công nghệ tại Nha Trang',
    description: 'Danh sách các ứng dụng xe ôm công nghệ phổ biến và dịch vụ xe ôm truyền thống',
    numberOfItems: 3,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'MobileApplication',
          name: 'Grab',
          applicationCategory: 'Transportation',
          operatingSystem: ['Android', 'iOS'],
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '12000',
            highPrice: '18000',
            priceCurrency: 'VND',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              unitText: 'km'
            }
          },
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Khuyến mãi',
              value: 'Có chương trình khuyến mãi thường xuyên'
            },
            {
              '@type': 'PropertyValue',
              name: 'Thanh toán',
              value: 'Tiền mặt, thẻ, ví điện tử'
            }
          ]
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'MobileApplication',
          name: 'Maxim',
          applicationCategory: 'Transportation',
          operatingSystem: ['Android', 'iOS'],
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '11000',
            highPrice: '16000',
            priceCurrency: 'VND'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: 'Xe ôm truyền thống',
          description: 'Dịch vụ xe ôm tại các điểm chờ cố định',
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '15000',
            highPrice: '25000',
            priceCurrency: 'VND'
          }
        }
      }
    ]
  },
  operatingHours: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    opens: '05:00',
    closes: '23:00'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT_INFO.phone,
    contactType: 'customer service',
    availableLanguage: ['Vietnamese', 'English']
  },
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'An toàn',
      value: 'Đội mũ bảo hiểm, kiểm tra thông tin tài xế'
    },
    {
      '@type': 'PropertyValue',
      name: 'Tiện lợi',
      value: 'Đặt xe qua app, theo dõi hành trình'
    },
    {
      '@type': 'PropertyValue',
      name: 'Giá cả',
      value: 'Giá cố định, không lo bị chặt chém'
    },
    {
      '@type': 'PropertyValue',
      name: 'Thời gian',
      value: '24/7 với ứng dụng, 05:00-23:00 xe ôm truyền thống'
    }
  ]
}; 