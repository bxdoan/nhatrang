'use client';

import Link from 'next/link';
import { 
  FaMotorcycle, 
  FaChevronLeft,
  FaPhone, 
  FaWhatsapp, 
  FaCheck, 
  FaMapMarkerAlt,
  FaInfoCircle, 
  FaTelegram,
  FaArrowRight,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaMoneyBillWave,
  FaMobileAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaDownload,
  FaUsers,
  FaRoute
} from 'react-icons/fa';
import { CONTACT_INFO } from '../lib/contact-config';
import { useState } from 'react';
import Script from 'next/script';
import { RIDE_HAILING_PAGE_SCHEMA } from '../lib/metadata';
import { 
  trackPhoneCall, 
  trackZaloClick, 
  trackTelegramClick 
} from '../lib/analytics';
import { useLanguage } from '../contexts/LanguageContext';
import ContactSection from '../components/ContactSection';

// Định nghĩa kiểu dữ liệu cho ứng dụng xe ôm
interface RideHailingApp {
  name: string;
  logo: string;
  rating: number;
  priceRange: string;
  features: string[];
  downloadLinks: {
    android: string;
    ios: string;
  };
  description: string;
  pros: string[];
  cons: string[];
  availability: '24/7' | 'Limited';
}

// Schema.org JSON-LD cho FAQ
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ứng dụng xe ôm nào phổ biến nhất tại Nha Trang?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Grab và Maxim là hai ứng dụng xe ôm chính tại Nha Trang. Grab có mạng lưới tài xế rộng và nhiều khuyến mãi, trong khi Maxim có giá cước cạnh tranh và dịch vụ địa phương.'
      }
    },
    {
      '@type': 'Question',
      name: 'Giá xe ôm tại Nha Trang là bao nhiêu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Xe ôm công nghệ: 12.000-18.000đ/km. Xe ôm truyền thống: 15.000-25.000đ/km tùy khoảng cách. Giá có thể tăng vào giờ cao điểm hoặc thời tiết xấu.'
      }
    },
    {
      '@type': 'Question',
      name: 'Làm thế nào để đi xe ôm an toàn tại Nha Trang?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Luôn đội mũ bảo hiểm, kiểm tra thông tin tài xế và biển số xe, chia sẻ hành trình với người thân. Với xe ôm truyền thống, thống nhất giá trước khi đi.'
      }
    },
    {
      '@type': 'Question',
      name: 'Xe ôm có hoạt động 24/7 không?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ứng dụng xe ôm công nghệ như Grab, Maxim hoạt động 24/7 nhưng số lượng tài xế ít vào ban đêm. Xe ôm truyền thống thường hoạt động từ 5:00-23:00.'
      }
    },
    {
      '@type': 'Question',
      name: 'Nên chọn xe ôm truyền thống hay xe ôm công nghệ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Xe ôm công nghệ an toàn hơn với giá cố định, theo dõi hành trình. Xe ôm truyền thống linh hoạt hơn, có thể thương lượng giá cho đoạn đường ngắn.'
      }
    }
  ]
};

export default function RideHailingPage() {
  const { t, isLoading } = useLanguage();
  const phoneNumber = CONTACT_INFO.phoneNumber;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Danh sách ứng dụng xe ôm công nghệ
  const rideHailingApps: RideHailingApp[] = [
    {
      name: t.rideHailing?.apps?.grab?.name || 'Grab',
      logo: '/images/ride-hailing/grab.jpg',
      rating: 4.5,
      priceRange: t.rideHailing?.apps?.grab?.priceRange || '12.000-18.000đ/km',
      features: t.rideHailing?.apps?.grab?.features || ['Đặt xe nhanh', 'Nhiều khuyến mãi', 'Thanh toán đa dạng', 'Theo dõi hành trình'],
      downloadLinks: {
        android: 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger',
        ios: 'https://apps.apple.com/app/grab-app/id647268330'
      },
      description: t.rideHailing?.apps?.grab?.description || 'Ứng dụng xe ôm hàng đầu tại Đông Nam Á với mạng lưới tài xế rộng khắp.',
      pros: t.rideHailing?.apps?.grab?.pros || ['Mạng lưới tài xế rộng nhất', 'Nhiều chương trình khuyến mãi', 'Dịch vụ đa dạng (GrabBike, GrabCar)', 'Thanh toán linh hoạt'],
      cons: t.rideHailing?.apps?.grab?.cons || ['Giá có thể cao vào giờ rush', 'Thời gian chờ lâu vào peak time'],
      availability: '24/7'
    },
    {
      name: t.rideHailing?.apps?.maxim?.name || 'Maxim',
      logo: '/images/ride-hailing/maxim.jpg',
      rating: 4.2,
      priceRange: t.rideHailing?.apps?.maxim?.priceRange || '11.000-16.000đ/km',
      features: t.rideHailing?.apps?.maxim?.features || ['Giá cạnh tranh', 'Tài xế địa phương', 'Giao diện đơn giản', 'Hỗ trợ tiếng Việt'],
      downloadLinks: {
        android: 'https://play.google.com/store/apps/details?id=com.taxicaller.maxim',
        ios: 'https://apps.apple.com/app/maxim-taxi-food-delivery/id1200613559'
      },
      description: t.rideHailing?.apps?.maxim?.description || 'Ứng dụng xe ôm với tài xế địa phương, giá cước hợp lý và dịch vụ thân thiện.',
      pros: t.rideHailing?.apps?.maxim?.pros || ['Giá cước rẻ hơn Grab', 'Tài xế am hiểu địa phương', 'Hỗ trợ khách hàng tốt', 'Không phụ thu cao điểm'],
      cons: t.rideHailing?.apps?.maxim?.cons || ['Số lượng tài xế ít hơn Grab', 'Tính năng ít hơn', 'Thời gian chờ có thể lâu'],
      availability: '24/7'
    }
  ];

  // Handler cho phone call clicks
  const handlePhoneClick = (phone: string) => {
    trackPhoneCall(phone, 'ride-hailing');
  };

  // Handler cho Zalo click
  const handleZaloClick = () => {
    trackZaloClick('ride-hailing');
  };

  // Handler cho Telegram click
  const handleTelegramClick = () => {
    trackTelegramClick('ride-hailing');
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <FaMotorcycle className="inline-block text-4xl mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.rideHailing?.hero?.title || 'Xe Ôm & Xe Ôm Công Nghệ Nha Trang'}</h1>
            <p className="max-w-3xl mx-auto text-orange-100 text-lg">
              {t.rideHailing?.hero?.subtitle || 'Hướng dẫn đầy đủ về dịch vụ xe ôm truyền thống và xe ôm công nghệ tại Nha Trang. So sánh Grab, Maxim và tips đi xe ôm an toàn'}
            </p>
          </div>
        </div>
      </section>
      
      {/* Back to main */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <Link href="/transportation" className="inline-flex items-center text-orange-600 hover:text-orange-800">
            <FaChevronLeft className="mr-1 text-sm" /> {t.rideHailing?.backToTransportation || 'Quay lại trang Di chuyển'}
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Contact Section */}
            <ContactSection 
              title={t.rideHailing?.contactSection?.title || 'Cần tư vấn thêm về di chuyển tại Nha Trang?'}
              description={t.rideHailing?.contactSection?.description || 'Liên hệ với chúng tôi để được tư vấn và hỗ trợ về các phương tiện di chuyển phù hợp tại Nha Trang'}
              bgColor="bg-orange-50"
              phoneNumber={phoneNumber}
            />
            
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.rideHailing?.intro?.title || 'Xe ôm tại Nha Trang'}</h2>
                
                <p className="text-gray-700 mb-6">
                  {t.rideHailing?.intro?.description || 'Xe ôm là phương tiện di chuyển phổ biến và nhanh chóng tại Nha Trang, đặc biệt phù hợp cho những quãng đường ngắn trong thành phố. Hiện tại có hai loại chính: xe ôm truyền thống và xe ôm công nghệ qua ứng dụng.'}
                </p>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-yellow-700 font-medium">{t.rideHailing?.intro?.warning || 'Xe ôm công nghệ an toàn hơn với giá cố định - Xe ôm truyền thống linh hoạt và có thể thương lượng'}</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.rideHailing?.types?.title || 'Các loại xe ôm tại Nha Trang'}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                        <FaMobileAlt className="text-xl" />
                      </div>
                      <h4 className="text-lg font-semibold">{t.rideHailing?.types?.app?.title || 'Xe ôm công nghệ'}</h4>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm">
                      {t.rideHailing?.types?.app?.description || 'Xe ôm công nghệ hoạt động thông qua ứng dụng di động, cung cấp dịch vụ tiện lợi và minh bạch.'}
                    </p>
                    <div className="mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                        {t.rideHailing?.types?.app?.priceRange || '12.000 - 18.000đ/km'}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Ưu điểm:</h5>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        {(t.rideHailing?.types?.app?.advantages || [
                          'Giá cước minh bạch, tính sẵn trên app',
                          'Theo dõi được hành trình di chuyển',
                          'Thanh toán tiện lợi (tiền mặt hoặc thẻ)',
                          'Đánh giá tài xế và chất lượng dịch vụ'
                        ]).map((advantage, index) => (
                          <li key={index} className="flex items-start">
                            <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                        <FaUsers className="text-xl" />
                      </div>
                      <h4 className="text-lg font-semibold">{t.rideHailing?.types?.traditional?.title || 'Xe ôm truyền thống'}</h4>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm">
                      {t.rideHailing?.types?.traditional?.description || 'Xe ôm truyền thống thường tập trung tại các điểm cố định như chợ, bến xe, trước cổng khách sạn, nhà hàng.'}
                    </p>
                    <div className="mb-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        {t.rideHailing?.types?.traditional?.priceRange || '15.000 - 25.000đ/km'}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Ưu điểm:</h5>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        {(t.rideHailing?.types?.traditional?.advantages || [
                          'Có sẵn tại nhiều điểm trong thành phố',
                          'Không cần ứng dụng, có thể đặt trực tiếp',
                          'Tài xế am hiểu địa phương',
                          'Có thể thương lượng giá cho quãng đường dài'
                        ]).map((advantage, index) => (
                          <li key={index} className="flex items-start">
                            <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ride-hailing Apps Comparison */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.rideHailing?.apps?.title || 'So sánh các ứng dụng xe ôm công nghệ'}</h2>
                
                <div className="space-y-6">
                  {rideHailingApps.map((app, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-start">
                        <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md overflow-hidden h-20">
                            {app.logo ? (
                              <img 
                                src={app.logo} 
                                alt={app.name} 
                                className="w-full h-full object-contain p-2"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-orange-200">
                                <FaMotorcycle className="text-4xl text-orange-500" />
                              </div>
                            )}
                          </div>
                          <div className="mt-2 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start">
                              <span className="text-yellow-500 mr-1">
                                <FaStar />
                              </span>
                              <span className="font-medium">{app.rating}/5</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {app.availability === '24/7' ? (
                                <span className="text-green-600">{t.rideHailing?.apps?.grab?.availability || 'Hoạt động 24/7'}</span>
                              ) : (
                                <span className="text-orange-600">Giờ giới hạn</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-3/4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-semibold text-gray-800">{app.name}</h3>
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                              {app.priceRange}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{app.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium text-gray-800 mb-2">{t.rideHailing?.apps?.featuresTitle || 'Tính năng nổi bật:'}</h4>
                              <ul className="space-y-1">
                                {app.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600 text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-800 mb-2">{t.rideHailing?.apps?.prosConsTitle || 'Ưu điểm & Nhược điểm:'}</h4>
                              <div className="space-y-2">
                                {app.pros.slice(0, 2).map((pro, idx) => (
                                  <div key={idx} className="flex items-start">
                                    <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600 text-sm">{pro}</span>
                                  </div>
                                ))}
                                {app.cons.slice(0, 1).map((con, idx) => (
                                  <div key={idx} className="flex items-start">
                                    <FaExclamationTriangle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600 text-sm">{con}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2">
                            <a 
                              href={app.downloadLinks.android}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
                            >
                              <FaDownload className="mr-2" /> Android
                            </a>
                            <a 
                              href={app.downloadLinks.ios}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition-colors text-sm"
                            >
                              <FaDownload className="mr-2" /> iOS
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.rideHailing?.tips?.title || 'Tips đi xe ôm an toàn tại Nha Trang'}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                      <FaShieldAlt className="mr-2" /> {t.rideHailing?.tips?.appBased?.title || 'Với xe ôm công nghệ'}
                    </h3>
                    <ul className="space-y-3">
                      {(t.rideHailing?.tips?.appBased?.items || [
                        'Kiểm tra thông tin tài xế và biển số xe trước khi lên',
                        'Chia sẻ hành trình với gia đình, bạn bè',
                        'Luôn đội mũ bảo hiểm được cung cấp',
                        'Theo dõi hành trình trên app',
                        'Đánh giá tài xế sau chuyến đi'
                      ]).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center">
                      <FaUsers className="mr-2" /> {t.rideHailing?.tips?.traditional?.title || 'Với xe ôm truyền thống'}
                    </h3>
                    <ul className="space-y-3">
                      {(t.rideHailing?.tips?.traditional?.items || [
                        'Thỏa thuận giá cước rõ ràng trước khi đi',
                        'Chọn tài xế ở các điểm chờ chính thức',
                        'Yêu cầu mũ bảo hiểm và kiểm tra chất lượng',
                        'Ghi nhớ biển số xe và thông báo cho người thân',
                        'Tránh đi vào ban đêm nếu không cần thiết'
                      ]).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold mb-3 flex items-center text-red-700">
                    <FaExclamationTriangle className="mr-2" /> {t.rideHailing?.tips?.importantNotes?.title || 'Lưu ý quan trọng'}
                  </h4>
                  <ul className="space-y-2 text-red-700">
                    {(t.rideHailing?.tips?.importantNotes?.items || [
                      'Không sử dụng điện thoại khi đang di chuyển',
                      'Giữ chặt túi xách và đồ đạc cá nhân',
                      'Chuẩn bị tiền lẻ để thanh toán',
                      'Từ chối nếu tài xế có dấu hiệu say xỉn hoặc bất thường'
                    ]).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="font-medium mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Popular Routes and Pricing */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.rideHailing?.routes?.title || 'Tuyến đường phổ biến và giá cước ước tính'}</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.rideHailing?.routes?.headers?.route || 'Tuyến đường'}</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.rideHailing?.routes?.headers?.distance || 'Khoảng cách'}</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.rideHailing?.routes?.headers?.appBased || 'Xe ôm công nghệ'}</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.rideHailing?.routes?.headers?.traditional || 'Xe ôm truyền thống'}</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.rideHailing?.routes?.headers?.time || 'Thời gian'}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(t.rideHailing?.routes?.data || [
                        {
                          route: "Trung tâm → Vinpearl",
                          distance: "~5km",
                          appBased: "60.000-90.000đ",
                          traditional: "75.000-125.000đ",
                          time: "15-20 phút"
                        },
                        {
                          route: "Sân bay Cam Ranh → Trung tâm",
                          distance: "~30km",
                          appBased: "360.000-540.000đ",
                          traditional: "450.000-750.000đ",
                          time: "40-50 phút"
                        },
                        {
                          route: "Trung tâm → Tháp Bà",
                          distance: "~4km",
                          appBased: "48.000-72.000đ",
                          traditional: "60.000-100.000đ",
                          time: "12-18 phút"
                        },
                        {
                          route: "Trung tâm → Bãi Dài",
                          distance: "~25km",
                          appBased: "300.000-450.000đ",
                          traditional: "375.000-625.000đ",
                          time: "35-45 phút"
                        }
                      ]).map((routeData, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaRoute className="text-orange-500 mr-2" />
                              <span>{routeData.route}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{routeData.distance}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">{routeData.appBased}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">{routeData.traditional}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{routeData.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <p className="mt-4 text-sm text-gray-500 italic">
                  {t.rideHailing?.routes?.note || '* Giá cước có thể thay đổi tùy theo thời điểm, tình trạng giao thông và các yếu tố khác. Giá xe ôm công nghệ đã bao gồm các loại phí, trong khi xe ôm truyền thống có thể thương lượng.'}
                </p>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">{t.rideHailing?.faq?.title || 'Câu hỏi thường gặp về xe ôm Nha Trang'}</h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-orange-600">
                  {t.rideHailing?.faq?.questions?.popularApps?.question || 'Ứng dụng xe ôm nào phổ biến nhất tại Nha Trang?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.rideHailing?.faq?.questions?.popularApps?.answer || 'Grab và Maxim là hai ứng dụng xe ôm chính tại Nha Trang. Grab có mạng lưới tài xế rộng và nhiều khuyến mãi, trong khi Maxim có giá cước cạnh tranh và dịch vụ địa phương.'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-orange-600">
                  {t.rideHailing?.faq?.questions?.pricing?.question || 'Giá xe ôm tại Nha Trang là bao nhiêu?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.rideHailing?.faq?.questions?.pricing?.answer || 'Xe ôm công nghệ: 12.000-18.000đ/km. Xe ôm truyền thống: 15.000-25.000đ/km tùy khoảng cách. Giá có thể tăng vào giờ cao điểm hoặc thời tiết xấu.'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-orange-600">
                  {t.rideHailing?.faq?.questions?.safety?.question || 'Làm thế nào để đi xe ôm an toàn tại Nha Trang?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.rideHailing?.faq?.questions?.safety?.answer || 'Luôn đội mũ bảo hiểm, kiểm tra thông tin tài xế và biển số xe, chia sẻ hành trình với người thân. Với xe ôm truyền thống, thống nhất giá trước khi đi.'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-orange-600">
                  {t.rideHailing?.faq?.questions?.availability?.question || 'Xe ôm có hoạt động 24/7 không?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.rideHailing?.faq?.questions?.availability?.answer || 'Ứng dụng xe ôm công nghệ như Grab, Maxim hoạt động 24/7 nhưng số lượng tài xế ít vào ban đêm. Xe ôm truyền thống thường hoạt động từ 5:00-23:00.'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-orange-600">
                  {t.rideHailing?.faq?.questions?.choice?.question || 'Nên chọn xe ôm truyền thống hay xe ôm công nghệ?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.rideHailing?.faq?.questions?.choice?.answer || 'Xe ôm công nghệ an toàn hơn với giá cố định, theo dõi hành trình. Xe ôm truyền thống linh hoạt hơn, có thể thương lượng giá cho đoạn đường ngắn.'}</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <Script
        id="schema-ride-hailing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RIDE_HAILING_PAGE_SCHEMA) }}
      />
      
      {/* FAQ Schema */}
      <Script
        id="schema-ride-hailing-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
    </div>
  );
} 