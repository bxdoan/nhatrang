'use client';

import Link from 'next/link';
import { FaBus, FaMotorcycle, FaCar, FaTaxi, FaShip, FaMapMarkedAlt, FaPhone, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { CONTACT_INFO } from '../lib/contact-config';
import Script from 'next/script';
import { TRANSPORTATION_PAGE_SCHEMA } from '../lib/metadata';
import { useLanguage } from '../contexts/LanguageContext';

export default function TransportationPage() {
  const { t, isLoading } = useLanguage();
  
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

  return (
    <>
      <div>
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <FaBus className="inline-block text-4xl mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.transportation?.hero?.title || 'Di chuyển tại Nha Trang'}</h1>
              <p className="max-w-3xl mx-auto text-yellow-100 text-lg">
                {t.transportation?.hero?.subtitle || 'Tìm hiểu các phương tiện di chuyển và dịch vụ vận chuyển tại Nha Trang, từ thuê xe máy, xe ô tô đến xe buýt công cộng'}
              </p>
            </div>
          </div>
        </section>
        
        {/* Intro Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.transportation?.intro?.title || 'Phương tiện di chuyển tại Nha Trang'}</h2>
              <p className="text-gray-700 mb-6">
                {t.transportation?.intro?.description || 'Nha Trang là thành phố du lịch nổi tiếng, có nhiều phương tiện di chuyển đa dạng phục vụ du khách. Tùy vào nhu cầu, ngân sách và lịch trình, bạn có thể lựa chọn phương tiện phù hợp để khám phá thành phố biển xinh đẹp này.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/moto" className="block group"> 
                  <div className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition-shadow h-full">
                    <div className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                      <FaMotorcycle className="text-2xl" />
                    </div>                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                      {t.transportation?.moto?.title || 'Thuê xe máy'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {t.transportation?.moto?.description || 'Phương tiện phổ biến và linh hoạt nhất để khám phá Nha Trang. Giá thuê từ 100.000đ - 170.000đ/ngày tùy loại xe.'}
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm mb-4">
                      {(t.transportation?.moto?.features || [
                        'Các loại xe: Xe số, xe ga, xe côn tay',
                        'Ưu điểm: Linh hoạt, tiết kiệm, dễ dàng đỗ xe',
                        'Có dịch vụ giao xe tận nơi, miễn phí mũ bảo hiểm'
                      ]).map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>                    
                    <span className="text-blue-600 font-medium group-hover:underline">
                      {t.transportation?.moto?.link || 'Xem dịch vụ thuê xe máy →'}
                    </span>
                  </div>
                </Link>
                <Link href="/car" className="block group">                 
                  <div className="bg-green-50 rounded-xl p-6 hover:shadow-md transition-shadow h-full">
                    <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                      <FaCar className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-green-600 transition-colors">
                      {t.transportation?.car?.title || 'Thuê xe ô tô'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {t.transportation?.car?.description || 'Thuận tiện cho gia đình hoặc nhóm bạn. Có nhiều loại xe từ 4 chỗ đến 16 chỗ. Đặc biệt có dịch vụ đưa đón sân bay.'}
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm mb-4">
                      {(t.transportation?.car?.features || [
                        'Giá thuê: từ 700.000đ/ngày tùy loại xe',
                        'Có dịch vụ thuê kèm tài xế hoặc tự lái',
                        'Thủ tục đơn giản, yêu cầu CMND/CCCD và bằng lái'
                      ]).map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                    <span className="text-green-600 font-medium group-hover:underline">
                      {t.transportation?.car?.link || 'Xem dịch vụ thuê xe ô tô →'}
                    </span>
                  </div>
                </Link>
                <Link href="/taxi" className="block group">                 
                  <div className="bg-yellow-50 rounded-xl p-6 hover:shadow-md transition-shadow h-full">
                    <div className="w-14 h-14 bg-yellow-500 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-600 transition-colors">
                      <FaTaxi className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-600 transition-colors">
                      {t.transportation?.taxi?.title || 'Dịch vụ Taxi'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {t.transportation?.taxi?.description || 'Phương tiện thuận tiện để di chuyển trong thành phố. Có nhiều hãng taxi uy tín như Mai Linh, Vinasun, Nha Trang Taxi.'}
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm mb-4">
                      {(t.transportation?.taxi?.features || [
                        'Giá cước: 15.000 - 20.000đ/km',
                        'An toàn, tiện lợi, có thể đặt qua ứng dụng',
                        'Dễ dàng tìm ở các khu du lịch, khách sạn'
                      ]).map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                    <span className="text-yellow-600 font-medium group-hover:underline">
                      {t.transportation?.taxi?.link || 'Xem thông tin dịch vụ taxi →'}
                    </span>
                  </div>
                </Link>
                <Link href="/bus" className="block group">                 
                  <div className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition-shadow h-full">
                    <div className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                      <FaBus className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                      {t.transportation?.bus?.title || 'Xe Buýt Nha Trang'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {t.transportation?.bus?.description || 'Phương tiện giá rẻ để di chuyển trong thành phố. Nha Trang có nhiều tuyến xe buýt đi qua các địa điểm du lịch.'}
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm mb-4">
                      {(t.transportation?.bus?.features || [
                        'Giá vé: 7.000 - 10.000đ/lượt',
                        'Tuyến phổ biến: số 4 (bãi biển), số 3 (chợ Đầm)',
                        'Hoạt động từ 5:30 - 18:30'
                      ]).map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                    <span className="text-blue-600 font-medium group-hover:underline">
                      {t.transportation?.bus?.link || 'Xem thông tin xe buýt →'}
                    </span>
                  </div>
                </Link>
                <div className="bg-green-50 rounded-xl p-6 hover:shadow-md transition-shadow h-full">
                  <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mb-4">
                    <FaShip className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {t.transportation?.boat?.title || 'Tàu thuyền'}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {t.transportation?.boat?.description || 'Phương tiện lý tưởng để tham quan các đảo xung quanh Nha Trang như Hòn Mun, Hòn Tằm, Hòn Một.'}
                  </p>
                  <ul className="text-gray-600 space-y-1 text-sm mb-4">
                    {(t.transportation?.boat?.features || [
                      'Tour 4 đảo: 250.000 - 350.000đ/người',
                      'Cano riêng: từ 1.200.000đ/chiếc',
                      'Khởi hành từ cảng Cầu Đá hoặc bến du thuyền'
                    ]).map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <Link href="/ride-hailing" className="block group">
                  <div className="bg-purple-50 rounded-xl p-6 hover:shadow-md transition-shadow h-full">
                    <div className="w-14 h-14 bg-purple-500 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                      <FaMotorcycle className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">
                      {t.transportation?.rideHailing?.title || 'Xe ôm / Xe ôm công nghệ'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {t.transportation?.rideHailing?.description || 'Phương tiện linh hoạt, nhanh chóng cho quãng đường ngắn. So sánh Grab, Maxim và xe ôm truyền thống.'}
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm mb-4">
                      {(t.transportation?.rideHailing?.features || [
                        'Xe ôm công nghệ: 12.000-18.000đ/km',
                        'Xe ôm truyền thống: 15.000-25.000đ/km',
                        'Có thể đặt qua app Grab, Maxim',
                        'Phù hợp cho 1-2 người di chuyển nhanh'
                      ]).map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                    <span className="text-purple-600 font-medium group-hover:underline">
                      {t.transportation?.rideHailing?.link || 'Xem hướng dẫn xe ôm →'}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Airport Transfer */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                  <FaMapMarkedAlt className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.transportation?.airport?.title || 'Di chuyển từ Sân bay Cam Ranh'}</h2>
                  <p className="text-gray-600">
                    {t.transportation?.airport?.description || 'Sân bay quốc tế Cam Ranh cách trung tâm Nha Trang khoảng 30km. Dưới đây là các phương tiện di chuyển từ sân bay về thành phố.'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">{t.transportation?.airport?.busTitle || 'Xe buýt sân bay'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t.transportation?.airport?.busDescription || 'Xe buýt số 18 đi từ sân bay về trung tâm thành phố Nha Trang. Giá vé khoảng 50.000đ/lượt.'}
                  </p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    {(t.transportation?.airport?.busFeatures || [
                      'Thời gian di chuyển: khoảng 60 phút',
                      'Tần suất: 30 phút/chuyến',
                      'Tiết kiệm chi phí nhưng mất nhiều thời gian'
                    ]).map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">{t.transportation?.airport?.transferTitle || 'Xe đưa đón chuyên nghiệp'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t.transportation?.airport?.transferDescription || 'Dịch vụ xe đưa đón sân bay của các công ty vận chuyển, đặt trước và được đón tận nơi.'}
                  </p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    {(t.transportation?.airport?.transferFeatures || [
                      'Xe 4 chỗ: từ 250.000đ/lượt',
                      'Xe 7 chỗ: từ 300.000đ/lượt'
                    ]).map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                    <li>• Xe 16 chỗ: từ 500.000đ/lượt</li>
                    <li>• Thời gian di chuyển: 40-45 phút</li>
                  </ul>
                  <div className="mt-4">
                    <Link href="/car" className="text-blue-600 font-medium hover:underline flex items-center">                      <FaPhone className="mr-2" /> Xem dịch vụ xe đưa đón sân bay                    </Link>                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  * Giá có thể thay đổi theo thời điểm. Vui lòng kiểm tra trước khi đặt dịch vụ.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Liên hệ đặt dịch vụ vận chuyển</h2>
              <p className="text-gray-600 mb-8">
                Cần tư vấn thêm về các phương tiện di chuyển hoặc đặt dịch vụ xe đưa đón tại Nha Trang? Liên hệ với chúng tôi ngay!
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href={`tel:${CONTACT_INFO.phoneNumber}`}
                  className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md transition-colors"
                >
                  <FaPhone className="mr-2" /> Gọi ngay: {CONTACT_INFO.phoneNumber}
                </a>
                <a 
                  href={`https://zalo.me/${CONTACT_INFO.phoneNumber}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
                >
                  <FaWhatsapp className="mr-2" /> Nhắn tin qua Zalo
                </a>
                <a 
                  href={`https://t.me/${CONTACT_INFO.telegramUsername}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors"
                >
                  <FaTelegram className="mr-2" /> Nhắn tin qua Telegram
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-transportation"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TRANSPORTATION_PAGE_SCHEMA) }}
      />
    </>
  );
} 