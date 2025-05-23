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
  const phoneNumber = CONTACT_INFO.phoneNumber;
  
  // Danh sách ứng dụng xe ôm công nghệ
  const rideHailingApps: RideHailingApp[] = [
    {
      name: 'Grab',
      logo: '/images/ride-hailing/grab.jpg',
      rating: 4.5,
      priceRange: '12.000-18.000đ/km',
      features: ['Đặt xe nhanh', 'Nhiều khuyến mãi', 'Thanh toán đa dạng', 'Theo dõi hành trình'],
      downloadLinks: {
        android: 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger',
        ios: 'https://apps.apple.com/app/grab-app/id647268330'
      },
      description: 'Ứng dụng xe ôm hàng đầu tại Đông Nam Á với mạng lưới tài xế rộng khắp.',
      pros: ['Mạng lưới tài xế rộng nhất', 'Nhiều chương trình khuyến mãi', 'Dịch vụ đa dạng (GrabBike, GrabCar)', 'Thanh toán linh hoạt'],
      cons: ['Giá có thể cao vào giờ rush', 'Thời gian chờ lâu vào peak time'],
      availability: '24/7'
    },
    {
      name: 'Maxim',
      logo: '/images/ride-hailing/maxim.jpg',
      rating: 4.2,
      priceRange: '11.000-16.000đ/km',
      features: ['Giá cạnh tranh', 'Tài xế địa phương', 'Giao diện đơn giản', 'Hỗ trợ tiếng Việt'],
      downloadLinks: {
        android: 'https://play.google.com/store/apps/details?id=com.taxicaller.maxim',
        ios: 'https://apps.apple.com/app/maxim-taxi-food-delivery/id1200613559'
      },
      description: 'Ứng dụng xe ôm với tài xế địa phương, giá cước hợp lý và dịch vụ thân thiện.',
      pros: ['Giá cước rẻ hơn Grab', 'Tài xế am hiểu địa phương', 'Hỗ trợ khách hàng tốt', 'Không phụ thu cao điểm'],
      cons: ['Số lượng tài xế ít hơn Grab', 'Tính năng ít hơn', 'Thời gian chờ có thể lâu'],
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Xe Ôm & Xe Ôm Công Nghệ Nha Trang</h1>
            <p className="max-w-3xl mx-auto text-orange-100 text-lg">
              Hướng dẫn đầy đủ về dịch vụ xe ôm truyền thống và xe ôm công nghệ tại Nha Trang. 
              So sánh Grab, Maxim và tips đi xe ôm an toàn
            </p>
          </div>
        </div>
      </section>
      
      {/* Back to main */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <Link href="/transportation" className="inline-flex items-center text-orange-600 hover:text-orange-800">
            <FaChevronLeft className="mr-1 text-sm" /> Quay lại trang Di chuyển
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Xe ôm tại Nha Trang - Lựa chọn thông minh cho di chuyển</h2>
                  <a 
                    href={`tel:${phoneNumber}`} 
                    onClick={() => handlePhoneClick(phoneNumber)}
                    className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
                  >
                    <FaPhone className="mr-2" /> {phoneNumber}
                  </a>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-yellow-700 font-medium">Xe ôm công nghệ an toàn hơn với giá cố định - Xe ôm truyền thống linh hoạt và có thể thương lượng</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                        <FaMobileAlt className="text-xl" />
                      </div>
                      <h3 className="text-lg font-semibold">Xe ôm công nghệ</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        <span>Giá cố định: 12.000-18.000đ/km</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        <span>Theo dõi hành trình real-time</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        <span>Thanh toán đa dạng (tiền mặt/thẻ/ví điện tử)</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        <span>Thông tin tài xế và xe rõ ràng</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                        <FaUsers className="text-xl" />
                      </div>
                      <h3 className="text-lg font-semibold">Xe ôm truyền thống</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        <span>Có mặt tại các điểm cố định</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        <span>Có thể thương lượng giá: 15.000-25.000đ/km</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        <span>Linh hoạt với đường đi</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        <span>Thanh toán tiền mặt</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ride-hailing Apps Comparison */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">So sánh các ứng dụng xe ôm công nghệ</h2>
                
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
                                <span className="text-green-600">Hoạt động 24/7</span>
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
                              <h4 className="font-medium text-gray-800 mb-2">Tính năng nổi bật:</h4>
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
                              <h4 className="font-medium text-gray-800 mb-2">Ưu điểm & Nhược điểm:</h4>
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tips đi xe ôm an toàn tại Nha Trang</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                      <FaShieldAlt className="mr-2" /> Với xe ôm công nghệ
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Kiểm tra thông tin tài xế và biển số xe trước khi lên</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Chia sẻ hành trình với gia đình, bạn bè</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Luôn đội mũ bảo hiểm được cung cấp</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Theo dõi hành trình trên app</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Đánh giá tài xế sau chuyến đi</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center">
                      <FaUsers className="mr-2" /> Với xe ôm truyền thống
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Thỏa thuận giá cước rõ ràng trước khi đi</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Chọn tài xế ở các điểm chờ chính thức</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Yêu cầu mũ bảo hiểm và kiểm tra chất lượng</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Ghi nhớ biển số xe và thông báo cho người thân</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Tránh đi vào ban đêm nếu không cần thiết</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold mb-3 flex items-center text-red-700">
                    <FaExclamationTriangle className="mr-2" /> Lưu ý quan trọng
                  </h4>
                  <ul className="space-y-2 text-red-700">
                    <li className="flex items-start">
                      <span className="font-medium mr-2">•</span>
                      <span>Không sử dụng điện thoại khi đang di chuyển</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">•</span>
                      <span>Giữ chặt túi xách và đồ đạc cá nhân</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">•</span>
                      <span>Chuẩn bị tiền lẻ để thanh toán</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">•</span>
                      <span>Từ chối nếu tài xế có dấu hiệu say xỉn hoặc bất thường</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Popular Routes and Pricing */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tuyến đường phổ biến và giá cước ước tính</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuyến đường</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khoảng cách</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xe ôm công nghệ</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xe ôm truyền thống</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaRoute className="text-orange-500 mr-2" />
                            <span>Trung tâm → Vinpearl</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">~5km</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">60.000-90.000đ</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">75.000-125.000đ</td>
                        <td className="px-6 py-4 whitespace-nowrap">15-20 phút</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaRoute className="text-orange-500 mr-2" />
                            <span>Sân bay Cam Ranh → Trung tâm</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">~30km</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">360.000-540.000đ</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">450.000-750.000đ</td>
                        <td className="px-6 py-4 whitespace-nowrap">40-50 phút</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaRoute className="text-orange-500 mr-2" />
                            <span>Trung tâm → Tháp Bà</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">~4km</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">48.000-72.000đ</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">60.000-100.000đ</td>
                        <td className="px-6 py-4 whitespace-nowrap">12-18 phút</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaRoute className="text-orange-500 mr-2" />
                            <span>Trung tâm → Bãi Dài</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">~25km</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">300.000-450.000đ</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">375.000-625.000đ</td>
                        <td className="px-6 py-4 whitespace-nowrap">35-45 phút</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="mt-4 text-sm text-gray-500 italic">
                  * Giá cước có thể thay đổi tùy theo thời điểm, tình trạng giao thông và các yếu tố khác. 
                  Giá xe ôm công nghệ đã bao gồm các loại phí, trong khi xe ôm truyền thống có thể thương lượng.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-orange-50 rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-xl font-bold mb-4">Cần tư vấn thêm về di chuyển tại Nha Trang?</h2>
              <p className="text-gray-700 mb-6">
                Liên hệ với chúng tôi để được tư vấn và hỗ trợ về các phương tiện di chuyển phù hợp tại Nha Trang
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href={`tel:${phoneNumber}`}
                  onClick={() => handlePhoneClick(phoneNumber)}
                  className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-md transition-colors"
                >
                  <FaPhone className="mr-2" /> Gọi ngay: {phoneNumber}
                </a>
                <a 
                  href={`https://zalo.me/${phoneNumber}`}
                  onClick={handleZaloClick}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
                >
                  <FaWhatsapp className="mr-2" /> Nhắn tin qua Zalo
                </a>
                <a 
                  href={`https://t.me/${CONTACT_INFO.telegramUsername}`}
                  onClick={handleTelegramClick}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors"
                >
                  <FaTelegram className="mr-2" /> Nhắn tin qua Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Câu hỏi thường gặp về xe ôm Nha Trang</h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-orange-600">
                  Ứng dụng xe ôm nào phổ biến nhất tại Nha Trang?
                </summary>
                <div className="mt-3 text-gray-700">
                  <p><strong>Grab và Maxim</strong> là hai ứng dụng xe ôm chính tại Nha Trang. Grab có mạng lưới tài xế rộng và nhiều khuyến mãi, trong khi Maxim có giá cước cạnh tranh và dịch vụ địa phương.</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-orange-600">
                  Giá xe ôm tại Nha Trang là bao nhiêu?
                </summary>
                <div className="mt-3 text-gray-700">
                  <p><strong>Xe ôm công nghệ:</strong> 12.000-18.000đ/km. <strong>Xe ôm truyền thống:</strong> 15.000-25.000đ/km tùy khoảng cách. Giá có thể tăng vào giờ cao điểm hoặc thời tiết xấu.</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-orange-600">
                  Làm thế nào để đi xe ôm an toàn tại Nha Trang?
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>Luôn <strong>đội mũ bảo hiểm</strong>, kiểm tra thông tin tài xế và biển số xe, chia sẻ hành trình với người thân. Với xe ôm truyền thống, thống nhất giá trước khi đi.</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-orange-600">
                  Xe ôm có hoạt động 24/7 không?
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>Ứng dụng xe ôm công nghệ như <strong>Grab, Maxim hoạt động 24/7</strong> nhưng số lượng tài xế ít vào ban đêm. Xe ôm truyền thống thường hoạt động từ 5:00-23:00.</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-orange-600">
                  Nên chọn xe ôm truyền thống hay xe ôm công nghệ?
                </summary>
                <div className="mt-3 text-gray-700">
                  <p><strong>Xe ôm công nghệ</strong> an toàn hơn với giá cố định, theo dõi hành trình. <strong>Xe ôm truyền thống</strong> linh hoạt hơn, có thể thương lượng giá cho đoạn đường ngắn.</p>
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