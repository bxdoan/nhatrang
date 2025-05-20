'use client';

import Link from 'next/link';
import { FaMotorcycle, FaChevronLeft, FaPhone, FaWhatsapp, FaCheck, FaShieldAlt, FaMapMarkedAlt, FaInfoCircle } from 'react-icons/fa';
import { CONTACT_INFO } from '../../../lib/contact-config';

export default function MotorbikeRentalPage() {
  const phoneNumber = CONTACT_INFO.phoneNumber;
  
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <FaMotorcycle className="inline-block text-4xl mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Dịch vụ thuê xe máy Nha Trang</h1>
            <p className="max-w-3xl mx-auto text-blue-100 text-lg">
              Dịch vụ cho thuê xe máy uy tín, giá rẻ, đa dạng loại xe, giao nhận tận nơi tại Nha Trang
            </p>
          </div>
        </div>
      </section>
      
      {/* Back to main */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <Link href="/transportation" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FaChevronLeft className="mr-1 text-sm" /> Quay lại trang Di chuyển
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Dịch vụ thuê xe máy giá rẻ tại Nha Trang</h2>
                  <a 
                    href={`tel:${phoneNumber}`} 
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-colors"
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
                      <p className="text-yellow-700 font-medium">Xe mới, đẹp, an toàn - Giao xe tận nơi - Thủ tục đơn giản</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                        <FaMotorcycle className="text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-blue-600 mb-2">Xe số</h3>
                    <p className="text-gray-700 font-medium mb-2">120.000đ/ngày</p>
                    <p className="text-gray-500 text-sm">Wave, Sirius, Jupiter</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                        <FaMotorcycle className="text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-green-600 mb-2">Xe ga phổ thông</h3>
                    <p className="text-gray-700 font-medium mb-2">150.000đ/ngày</p>
                    <p className="text-gray-500 text-sm">Vision, Lead, Air Blade</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
                        <FaMotorcycle className="text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-purple-600 mb-2">Xe ga cao cấp</h3>
                    <p className="text-gray-700 font-medium mb-2">200.000đ/ngày</p>
                    <p className="text-gray-500 text-sm">SH Mode, Vespa, NVX</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold mb-4">Điều kiện thuê xe:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span>Cọc CMND/CCCD/Hộ chiếu gốc hoặc 5 triệu tiền mặt</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span>Thuê từ 3 ngày trở lên được giảm 10% tổng hóa đơn</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span>Bao gồm miễn phí: mũ bảo hiểm, áo mưa, giao xe tận nơi (trong bán kính 3km)</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6">
                <div className="text-center">
                  <p className="font-medium text-blue-800 mb-4">
                    Để đặt thuê xe máy, vui lòng liên hệ trước ít nhất 2 giờ
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <a 
                      href={`tel:${phoneNumber}`}
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md transition-colors"
                    >
                      <FaPhone className="mr-2" /> Gọi để đặt xe: {phoneNumber}
                    </a>
                    <a 
                      href={`https://zalo.me/${phoneNumber}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md transition-colors"
                    >
                      <FaWhatsapp className="mr-2" /> Nhắn tin qua Zalo
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Touring Information */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Khám phá Nha Trang bằng xe máy</h2>
              
              <p className="text-gray-700 mb-6">
                Thuê xe máy là cách linh hoạt và thuận tiện nhất để khám phá Nha Trang và các vùng lân cận. Dưới đây là một số điểm đến lý tưởng để khám phá bằng xe máy:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkedAlt />
                    </div>
                    <h3 className="text-lg font-semibold">Bãi Dài và Bãi Dốc Lết</h3>
                  </div>
                  <p className="text-gray-600">Hai bãi biển đẹp, hoang sơ cách trung tâm Nha Trang khoảng 20-30km về phía Bắc</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkedAlt />
                    </div>
                    <h3 className="text-lg font-semibold">Vịnh Ninh Vân và Vịnh Lăng Cô</h3>
                  </div>
                  <p className="text-gray-600">Cảnh đẹp hoang sơ và yên bình, cách Nha Trang khoảng 60km về phía Bắc</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkedAlt />
                    </div>
                    <h3 className="text-lg font-semibold">Tháp Bà Ponagar</h3>
                  </div>
                  <p className="text-gray-600">Di tích lịch sử Chăm Pa cổ, nằm ngay trong thành phố Nha Trang</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkedAlt />
                    </div>
                    <h3 className="text-lg font-semibold">Bãi biển Đại Lãnh và Mũi Điện</h3>
                  </div>
                  <p className="text-gray-600">Cung đường ven biển đẹp, nằm ở ranh giới giữa Khánh Hòa và Phú Yên</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5 mt-4">
                <h3 className="text-lg font-semibold mb-3">Lưu ý khi thuê xe máy</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mr-2 mt-1" /> 
                    <span>Luôn mang theo giấy tờ cá nhân và đội mũ bảo hiểm khi lái xe</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mr-2 mt-1" /> 
                    <span>Kiểm tra xe kỹ trước khi nhận (thắng, đèn, còi, xăng)</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mr-2 mt-1" /> 
                    <span>Nên chụp ảnh xe trước khi nhận để tránh tranh chấp</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mr-2 mt-1" /> 
                    <span>Tuân thủ luật giao thông và chạy với tốc độ an toàn</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Benefits */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Ưu điểm khi thuê xe tại Nha Trang Insight</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FaMotorcycle className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Xe đời mới, chất lượng</h3>
                    <p className="text-gray-600">
                      Tất cả xe đều là xe mới, được bảo dưỡng thường xuyên, đảm bảo an toàn và vận hành tốt
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FaShieldAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Hỗ trợ cứu hộ 24/7</h3>
                    <p className="text-gray-600">
                      Dịch vụ cứu hộ miễn phí trong phạm vi thành phố Nha Trang nếu xe gặp sự cố
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FaMapMarkedAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Giao nhận tận nơi</h3>
                    <p className="text-gray-600">
                      Miễn phí giao và nhận xe tại khách sạn hoặc điểm hẹn trong khu vực trung tâm Nha Trang
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FaCheck className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Thủ tục đơn giản</h3>
                    <p className="text-gray-600">
                      Chỉ cần CMND/CCCD/Hộ chiếu, không cần bằng lái xe (tuy nhiên khuyến khích có bằng lái cho an toàn)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-xl font-bold mb-4">Liên hệ thuê xe máy ngay hôm nay</h2>
              <p className="text-gray-700 mb-6">
                Hãy liên hệ với chúng tôi qua hotline hoặc Zalo để được tư vấn và đặt dịch vụ thuê xe máy tại Nha Trang
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
                >
                  <FaPhone className="mr-2" /> Gọi ngay: {phoneNumber}
                </a>
                <a 
                  href={`https://zalo.me/${phoneNumber}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
                >
                  <FaWhatsapp className="mr-2" /> Nhắn tin qua Zalo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 