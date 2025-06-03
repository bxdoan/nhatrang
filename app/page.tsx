'use client';

import {
  FaBus,
  FaMotorcycle,
  FaCar,
  FaTaxi,
  FaShoppingCart
} from 'react-icons/fa';
import Link from 'next/link';
import Script from 'next/script';
import { HOMEPAGE_SCHEMA } from './lib/metadata';
import { useLanguage } from './contexts/LanguageContext';
import { useLocalizedLink } from './hooks/useLocalizedLink';

export default function Home() {
  const { t, isLoading } = useLanguage();
  const { createLink } = useLocalizedLink();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Danh sách thông tin du lịch
  const tourismInfoList = [
    {
      id: 'services',
      icon: FaShoppingCart,
      bgColor: 'bg-purple-50',
      iconBgColor: 'bg-purple-600',
      textColor: 'text-purple-600',
      hoverColor: 'hover:text-purple-700',
      title: t.homepage?.sections?.services?.title || 'Dịch vụ số Premium',
      description: t.homepage?.sections?.services?.description || 'Marketplace dịch vụ số cao cấp với các gói subscription, tài khoản premium từ Netflix, Spotify, YouTube đến AI tools như ChatGPT, Gemini Ultra với giá ưu đãi.',
      link: createLink('/services'),
      linkText: t.homepage?.sections?.services?.link || 'Xem dịch vụ premium →'
    },
    {
      id: 'transportation',
      icon: FaBus,
      bgColor: 'bg-yellow-50',
      iconBgColor: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      hoverColor: 'hover:text-yellow-700',
      title: t.homepage?.sections?.transportation?.title || 'Di chuyển & Giao thông',
      description: t.homepage?.sections?.transportation?.description || 'Thông tin về cách di chuyển đến Nha Trang và phương tiện đi lại trong thành phố: taxi, xe buýt, thuê xe máy và nhiều lựa chọn khác.',
      link: createLink('/transportation'),
      linkText: t.homepage?.sections?.transportation?.link || 'Xem chi tiết →'
    },
    {
      id: 'moto',
      icon: FaMotorcycle,
      bgColor: 'bg-blue-50',
      iconBgColor: 'bg-blue-600',
      textColor: 'text-blue-600',
      hoverColor: 'hover:text-blue-700',
      title: t.homepage?.sections?.moto?.title || 'Thuê xe máy',
      description: t.homepage?.sections?.moto?.description || 'Dịch vụ cho thuê xe máy uy tín, giá rẻ từ 100.000đ - 180.000đ/ngày, đa dạng loại xe từ xe số đến xe ga cao cấp, giao xe tận nơi tại Nha Trang.',
      link: createLink('/moto'),
      linkText: t.homepage?.sections?.moto?.link || 'Xem dịch vụ thuê xe máy →'
    },
    {
      id: 'car',
      icon: FaCar,
      bgColor: 'bg-green-50',
      iconBgColor: 'bg-green-600',
      textColor: 'text-green-600',
      hoverColor: 'hover:text-green-700',
      title: t.homepage?.sections?.car?.title || 'Thuê xe ô tô',
      description: t.homepage?.sections?.car?.description || 'Dịch vụ thuê xe ô tô tự lái hoặc có tài, đa dạng dòng xe từ 4-16 chỗ, giá cả hợp lý, thủ tục đơn giản, phục vụ đưa đón sân bay.',
      link: createLink('/car'),
      linkText: t.homepage?.sections?.car?.link || 'Xem dịch vụ thuê xe ô tô →'
    },
    {
      id: 'bus',
      icon: FaBus,
      bgColor: 'bg-blue-50',
      iconBgColor: 'bg-blue-500',
      textColor: 'text-blue-600',
      hoverColor: 'hover:text-blue-700',
      title: t.homepage?.sections?.bus?.title || 'Xe Buýt Nha Trang',
      description: t.homepage?.sections?.bus?.description || 'Thông tin tuyến đường, lịch trình và bản đồ các tuyến xe buýt công cộng tại Nha Trang. Giá vé chỉ từ 7.000 VNĐ/lượt, phương tiện tiết kiệm và thuận tiện.',
      link: createLink('/bus'),
      linkText: t.homepage?.sections?.bus?.link || 'Xem thông tin xe buýt →'
    },
    {
      id: 'taxi',
      icon: FaTaxi,
      bgColor: 'bg-yellow-50',
      iconBgColor: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      hoverColor: 'hover:text-yellow-700',
      title: t.homepage?.sections?.taxi?.title || 'Dịch vụ Taxi',
      description: t.homepage?.sections?.taxi?.description || 'Thông tin chi tiết về các hãng taxi uy tín tại Nha Trang, giá cước từ 15.000 - 20.000đ/km, số điện thoại đặt xe và tuyến đường phổ biến.',
      link: createLink('/taxi'),
      linkText: t.homepage?.sections?.taxi?.link || 'Xem thông tin dịch vụ taxi →'
    }
  ];

  return (
    <>
      <div>
        {/* Hero Section */}
        <section className="relative bg-blue-600 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
              alt="Nha Trang Beach"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-600/60 z-0"></div>
          
          <div className="container mx-auto px-4 py-20 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.homepage?.hero?.title || 'Khám phá'} <span className="text-yellow-300">{t.homepage?.hero?.highlightedTitle || 'Nha Trang'}</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
              {t.homepage?.hero?.subtitle || 'Thông tin du lịch, giao thông và các dịch vụ tại thiên đường biển Nha Trang'}
            </p>
          </div>
        </section>
        
        {/* Tourism Info Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">{t.homepage?.sections?.exploreTitle || 'Khám phá Nha Trang'}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.homepage?.sections?.exploreSubtitle || 'Thông tin hữu ích giúp bạn lên kế hoạch cho chuyến du lịch hoàn hảo tới thành phố biển xinh đẹp'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tourismInfoList.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link key={item.id} href={item.link} className="block group">
                    <div className={`${item.bgColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group-hover:scale-105 transform transition-transform duration-200`}>
                      <div className={`w-14 h-14 ${item.iconBgColor} text-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="text-2xl" />
                      </div>
                      <h3 className={`text-xl font-semibold mb-3 ${item.textColor} group-hover:${item.hoverColor.replace('hover:', '')} transition-colors`}>{item.title}</h3>
                      <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">
                        {item.description}
                      </p>
                      <span className={`${item.textColor} font-medium ${item.hoverColor} inline-flex items-center`}>
                        {item.linkText}
                        <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_SCHEMA) }}
      />
    </>
  );
} 