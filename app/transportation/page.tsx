'use client';

import Link from 'next/link';
import { FaBus, FaMotorcycle, FaCar, FaTaxi, FaShip, FaMapMarkedAlt, FaPhone, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { CONTACT_INFO } from '../lib/contact-config';

export default function TransportationPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <FaBus className="inline-block text-4xl mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Di chuyển tại Nha Trang</h1>
            <p className="max-w-3xl mx-auto text-yellow-100 text-lg">
              Tìm hiểu các phương tiện di chuyển và dịch vụ vận chuyển tại Nha Trang, từ thuê xe máy, xe ô tô đến xe buýt công cộng
            </p>
          </div>
        </div>
      </section>
      
      {/* Intro Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Phương tiện di chuyển tại Nha Trang</h2>
            <p className="text-gray-700 mb-4">
              Nha Trang là thành phố du lịch nổi tiếng, có nhiều phương tiện di chuyển đa dạng phục vụ du khách. 
              Tùy vào nhu cầu, ngân sách và lịch trình, bạn có thể lựa chọn phương tiện phù hợp để khám phá thành phố biển xinh đẹp này.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/transportation/rent/moto" className="block group">
                <div className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition-shadow h-full">
                  <div className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <FaMotorcycle className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">Thuê xe máy</h3>
                  <p className="text-gray-600 mb-3">
                    Phương tiện phổ biến và linh hoạt nhất để khám phá Nha Trang. Giá thuê từ 120.000đ - 200.000đ/ngày tùy loại xe.
                  </p>
                  <span className="text-blue-600 font-medium group-hover:underline">Xem dịch vụ thuê xe máy →</span>
                </div>
              </Link>
              
              <Link href="/transportation/rent/oto" className="block group">
                <div className="bg-green-50 rounded-xl p-6 hover:shadow-md transition-shadow h-full">
                  <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                    <FaCar className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-green-600 transition-colors">Thuê xe ô tô</h3>
                  <p className="text-gray-600 mb-3">
                    Thuận tiện cho gia đình hoặc nhóm bạn. Có nhiều loại xe từ 4 chỗ đến 16 chỗ. Đặc biệt có dịch vụ đưa đón sân bay.
                  </p>
                  <span className="text-green-600 font-medium group-hover:underline">Xem dịch vụ thuê xe ô tô →</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Transportation Options */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Các phương tiện di chuyển phổ biến</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center mb-4">
                <FaTaxi className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Taxi</h3>
              <p className="text-gray-600 mb-4">
                Phương tiện thuận tiện để di chuyển trong thành phố. Có nhiều hãng taxi uy tín như Mai Linh, Vinasun, Nha Trang Taxi.
              </p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Giá cước: 15.000 - 20.000đ/km</li>
                <li>• An toàn, tiện lợi</li>
                <li>• Dễ dàng tìm ở các khu du lịch, khách sạn</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4">
                <FaBus className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Xe buýt công cộng</h3>
              <p className="text-gray-600 mb-4">
                Phương tiện giá rẻ để di chuyển trong thành phố. Nha Trang có nhiều tuyến xe buýt đi qua các địa điểm du lịch.
              </p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Giá vé: 7.000 - 10.000đ/lượt</li>
                <li>• Tuyến phổ biến: số 4 (bãi biển), số 3 (chợ Đầm)</li>
                <li>• Hoạt động từ 5:30 - 18:30</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-4">
                <FaShip className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Tàu thuyền</h3>
              <p className="text-gray-600 mb-4">
                Phương tiện lý tưởng để tham quan các đảo xung quanh Nha Trang như Hòn Mun, Hòn Tằm, Hòn Một.
              </p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Tour 4 đảo: 250.000 - 350.000đ/người</li>
                <li>• Cano riêng: từ 1.200.000đ/chiếc</li>
                <li>• Khởi hành từ cảng Cầu Đá hoặc bến du thuyền</li>
              </ul>
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
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Di chuyển từ Sân bay Cam Ranh</h2>
                <p className="text-gray-600">
                  Sân bay quốc tế Cam Ranh cách trung tâm Nha Trang khoảng 30km. Dưới đây là các phương tiện di chuyển từ sân bay về thành phố.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Xe buýt sân bay</h3>
                <p className="text-gray-600 mb-4">
                  Xe buýt số 18 đi từ sân bay về trung tâm thành phố Nha Trang. Giá vé khoảng 50.000đ/lượt.
                </p>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Thời gian di chuyển: khoảng 60 phút</li>
                  <li>• Tần suất: 30 phút/chuyến</li>
                  <li>• Tiết kiệm chi phí nhưng mất nhiều thời gian</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Xe đưa đón chuyên nghiệp</h3>
                <p className="text-gray-600 mb-4">
                  Dịch vụ xe đưa đón sân bay của các công ty vận chuyển, đặt trước và được đón tận nơi.
                </p>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Xe 4 chỗ: từ 250.000đ/lượt</li>
                  <li>• Xe 7 chỗ: từ 300.000đ/lượt</li>
                  <li>• Xe 16 chỗ: từ 500.000đ/lượt</li>
                  <li>• Thời gian di chuyển: 40-45 phút</li>
                </ul>
                <div className="mt-4">
                  <Link href="/transportation/rent/oto" className="text-blue-600 font-medium hover:underline flex items-center">
                    <FaPhone className="mr-2" /> Xem dịch vụ xe đưa đón sân bay
                  </Link>
                </div>
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
  );
} 