'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaShoppingCart, 
  FaChevronLeft, 
  FaSearch, 
  FaShieldAlt,
  FaRocket,
  FaTags,
} from 'react-icons/fa';
import Script from 'next/script';
import servicesData from '../data/services.json';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocalizedLink } from '../hooks/useLocalizedLink';
import ContactSection from '../components/ContactSection';
import ServicesGrid from '../components/ServicesGrid';
import { CONTACT_INFO } from '../lib/contact-config';

// Định nghĩa kiểu dữ liệu cho service
interface Service {
  id: string;
  slug: string;
  name: {
    vi: string;
    en: string;
    zh_TW: string;
    zh_CN?: string;
    ru?: string;
    kr?: string;
  };
  description: {
    vi: string;
    en: string;
    zh_TW: string;
    zh_CN?: string;
    ru?: string;
    kr?: string;
  };
  features: {
    vi: string[];
    en: string[];
    zh_TW: string[];
    zh_CN?: string[];
    ru?: string[];
    kr?: string[];
  };
  price: number;
  price_original: number;
  categories: string[];
  image: string;
  rating: number;
  sold: number;
  warranty: number;
  auto_delivery: boolean;
}

export default function ServicesPage() {
  const { t, locale } = useLanguage();
  const { createLink } = useLocalizedLink();
  const [services] = useState<Service[]>(servicesData);
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high, newest

  // Lọc và sắp xếp services
  useEffect(() => {
    let filtered = services;

    // Lọc theo category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.categories.includes(selectedCategory));
    }

    // Lọc theo search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(service => 
        service.name[locale as keyof typeof service.name]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description[locale as keyof typeof service.description]?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo giá
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'under-100k':
          filtered = filtered.filter(service => service.price < 100000);
          break;
        case '100k-500k':
          filtered = filtered.filter(service => service.price >= 100000 && service.price <= 500000);
          break;
        case 'over-500k':
          filtered = filtered.filter(service => service.price > 500000);
          break;
      }
    }

    // Sắp xếp
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.sold - a.sold);
        break;
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory, priceFilter, sortBy, services, locale]);

  // Danh sách categories - lấy tất cả categories unique từ services
  const categories = Array.from(new Set(services.flatMap(service => service.categories)));
  
  // Category labels với đa ngôn ngữ
  const categoryLabels: Record<string, { vi: string; en: string; zh_TW: string; zh_CN?: string; ru?: string; kr?: string }> = {
    entertainment: {
      vi: 'Giải trí',
      en: 'Entertainment', 
      zh_TW: '娛樂',
      zh_CN: '娱乐',
      ru: 'Развлечения',
      kr: '엔터테인먼트'
    },
    storage: {
      vi: 'Lưu trữ',
      en: 'Storage',
      zh_TW: '儲存',
      zh_CN: '存储',
      ru: 'Хранилище',
      kr: '스토리지'
    },
    marketing: {
      vi: 'Marketing',
      en: 'Marketing',
      zh_TW: '行銷',
      zh_CN: '营销',
      ru: 'Маркетинг',
      kr: '마케팅'
    },
    design: {
      vi: 'Thiết kế',
      en: 'Design',
      zh_TW: '設計',
      zh_CN: '设计',
      ru: 'Дизайн',
      kr: '디자인'
    },
    ai: {
      vi: 'Trí tuệ nhân tạo',
      en: 'Artificial Intelligence',
      zh_TW: '人工智慧',
      zh_CN: '人工智能',
      ru: 'Искусственный интеллект',
      kr: '인공지능'
    },
    productivity: {
      vi: 'Năng suất',
      en: 'Productivity',
      zh_TW: '生產力',
      zh_CN: '生产力',
      ru: 'Продуктивность',
      kr: '생산성'
    },
    google: {
      vi: 'Google',
      en: 'Google',
      zh_TW: 'Google',
      zh_CN: 'Google',
      ru: 'Google',
      kr: 'Google'
    },
    facebook: {
      vi: 'Facebook',
      en: 'Facebook',
      zh_TW: 'Facebook',
      zh_CN: 'Facebook',
      ru: 'Facebook',
      kr: 'Facebook'
    },
    instagram: {
      vi: 'Instagram',
      en: 'Instagram',
      zh_TW: 'Instagram',
      zh_CN: 'Instagram',
      ru: 'Instagram',
      kr: 'Instagram'
    }
  };
  // Hàm lấy văn bản theo ngôn ngữ
  const getText = (textObj: { vi: string; en: string; zh_TW: string; zh_CN?: string; ru?: string; kr?: string }) => {
    return textObj[locale as keyof typeof textObj] || textObj.vi;
  };

  const handleZaloClick = (serviceName: string) => {
    // Analytics tracking có thể thêm ở đây
    console.log('Zalo clicked for service:', serviceName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <FaShoppingCart className="inline-block text-4xl mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {getText({ vi: 'Dịch vụ số uy tín', en: 'Trusted Digital Services', zh_TW: '可信的數位服務' })}
            </h1>
            <p className="max-w-3xl mx-auto text-purple-100 text-lg">
              {getText({ 
                vi: 'Tài khoản và dịch vụ chính hãng YouTube, Google, TikTok với giá tốt nhất', 
                en: 'Genuine YouTube, Google, TikTok accounts and services at the best prices',
                zh_TW: '正版YouTube、Google、TikTok帳戶和服務，價格最優惠'
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Back to main */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <Link href={createLink('/')} className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FaChevronLeft className="mr-1 text-sm" /> 
            {getText({ vi: 'Quay lại trang chủ', en: 'Back to homepage', zh_TW: '返回首頁' })}
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <ContactSection 
            title={getText({ 
              vi: 'Liên hệ để đặt dịch vụ', 
              en: 'Contact for service booking', 
              zh_TW: '聯繫預訂服務' 
            })}
            description={getText({ 
              vi: 'Liên hệ với chúng tôi để được tư vấn và hỗ trợ dịch vụ tài khoản số tại Nha Trang', 
              en: 'Contact us for consultation and support for digital account services in Nha Trang',
              zh_TW: '聯繫我們諮詢和支持芽莊的數位帳戶服務'
            })}
            bgColor="bg-purple-50"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-grow py-6">
        <div className="container mx-auto px-4">
          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={getText({ vi: 'Tìm kiếm dịch vụ...', en: 'Search services...', zh_TW: '搜尋服務...' })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Price Filter */}
              <div className="lg:w-48">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">{getText({ vi: 'Tất cả giá', en: 'All prices', zh_TW: '所有價格' })}</option>
                  <option value="under-100k">{getText({ vi: 'Dưới 100k', en: 'Under 100k', zh_TW: '低於10萬' })}</option>
                  <option value="100k-500k">{getText({ vi: '100k - 500k', en: '100k - 500k', zh_TW: '10萬至50萬' })}</option>
                  <option value="over-500k">{getText({ vi: 'Trên 500k', en: 'Over 500k', zh_TW: '超過50萬' })}</option>
                </select>
              </div>

              {/* Sort */}
              <div className="lg:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="popular">{getText({ vi: 'Phổ biến nhất', en: 'Most popular', zh_TW: '最受歡迎' })}</option>
                  <option value="price-low">{getText({ vi: 'Giá thấp đến cao', en: 'Price low to high', zh_TW: '價格由低到高' })}</option>
                  <option value="price-high">{getText({ vi: 'Giá cao đến thấp', en: 'Price high to low', zh_TW: '價格由高到低' })}</option>
                  <option value="rating">{getText({ vi: 'Đánh giá cao nhất', en: 'Highest rated', zh_TW: '評分最高' })}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {['all', ...categories].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' 
                    ? getText({ vi: 'Tất cả', en: 'All', zh_TW: '全部', zh_CN: '全部', ru: 'Все', kr: '모든' })
                    : getText(categoryLabels[category] || { vi: category, en: category, zh_TW: category })
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <ServicesGrid 
            services={filteredServices} 
            onZaloClick={handleZaloClick}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            {getText({ vi: 'Tại sao chọn chúng tôi?', en: 'Why choose us?', zh_TW: '為什麼選擇我們？' })}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="font-semibold mb-2">
                {getText({ vi: 'Uy tín đảm bảo', en: 'Guaranteed reliability', zh_TW: '保證可靠' })}
              </h3>
              <p className="text-gray-600 text-sm">
                {getText({ vi: 'Tài khoản chính hãng, bảo hành dài hạn', en: 'Genuine accounts, long-term warranty', zh_TW: '正版帳戶，長期保固' })}
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-green-600 text-2xl" />
              </div>
              <h3 className="font-semibold mb-2">
                {getText({ vi: 'Giao hàng nhanh', en: 'Fast delivery', zh_TW: '快速交付' })}
              </h3>
              <p className="text-gray-600 text-sm">
                {getText({ vi: 'Giao tài khoản tự động 24/7', en: 'Automatic account delivery 24/7', zh_TW: '24/7自動帳戶交付' })}
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaTags className="text-purple-600 text-2xl" />
              </div>
              <h3 className="font-semibold mb-2">
                {getText({ vi: 'Giá tốt nhất', en: 'Best prices', zh_TW: '最優價格' })}
              </h3>
              <p className="text-gray-600 text-sm">
                {getText({ vi: 'Cam kết giá rẻ nhất thị trường', en: 'Committed to the lowest market prices', zh_TW: '承諾市場最低價格' })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <Script
        id="schema-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: getText({ vi: 'Dịch vụ số uy tín', en: 'Trusted Digital Services', zh_TW: '可信的數位服務' }),
          description: getText({ 
            vi: 'Tài khoản và dịch vụ chính hãng YouTube, Google, TikTok với giá tốt nhất', 
            en: 'Genuine YouTube, Google, TikTok accounts and services at the best prices',
            zh_TW: '正版YouTube、Google、TikTok帳戶和服務，價格最優惠'
          }),
          url: `https://yourwebsite.com/services`,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: services.length,
            itemListElement: services.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Service',
                name: getText(service.name),
                description: getText(service.description),
                offers: {
                  '@type': 'Offer',
                  price: service.price,
                  priceCurrency: 'VND'
                }
              }
            }))
          }
        }) }}
      />
    </div>
  );
} 