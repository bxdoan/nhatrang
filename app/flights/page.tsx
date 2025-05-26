'use client';

import { FaPlane, FaMotorcycle, FaCar, FaArrowRight } from 'react-icons/fa';
import FlightSection from '../components/FlightSection';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocalizedLink } from '../hooks/useLocalizedLink';

export default function FlightsPage() {
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
  
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <FaPlane className="inline-block text-4xl mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.flights?.hero?.title || 'Chuyến bay đến Cam Ranh (CXR)'}</h1>
            <p className="max-w-3xl mx-auto text-blue-100 text-lg">
              {t.flights?.hero?.subtitle || 'Kiểm tra thông tin thời gian, trạng thái và chi tiết các chuyến bay sắp đến sân bay Cam Ranh - cửa ngõ hàng không của thành phố biển Nha Trang'}
            </p>
          </div>
        </div>
      </section>
      
      {/* Flight Info */}
      <FlightSection showTitle={false} />
      
      {/* Flight Info Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.flights?.airportInfo?.title || 'Thông tin sân bay Cam Ranh (CXR)'}</h2>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-3">{t.flights?.airportInfo?.intro?.title || 'Giới thiệu'}</h3>
              <p className="text-gray-700 mb-4">
                {t.flights?.airportInfo?.intro?.description1 || 'Sân bay quốc tế Cam Ranh nằm cách trung tâm thành phố Nha Trang khoảng 30km về phía nam. Đây là cửa ngõ hàng không chính cho du khách đến Nha Trang và các khu vực lân cận thuộc tỉnh Khánh Hòa.'}
              </p>
              <p className="text-gray-700">
                {t.flights?.airportInfo?.intro?.description2 || 'Sân bay phục vụ cả các chuyến bay nội địa và quốc tế, với nhiều hãng hàng không như Vietnam Airlines, Bamboo Airways, VietJet Air, Pacific Airlines và nhiều hãng quốc tế khác.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">{t.flights?.airportInfo?.contact?.title || 'Thông tin liên hệ'}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-medium">{t.flights?.airportInfo?.contact?.address || 'Địa chỉ'}</span></li>
                  <li><span className="font-medium">{t.flights?.airportInfo?.contact?.phone || 'Điện thoại'}</span></li>
                  <li><span className="font-medium">{t.flights?.airportInfo?.contact?.email || 'Email'}</span></li>
                  <li><span className="font-medium">{t.flights?.airportInfo?.contact?.website || 'Website'}</span> <a href="http://chra.vn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://chra.vn</a></li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">{t.flights?.airportInfo?.transportation?.title || 'Di chuyển từ sân bay'}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-medium">{t.flights?.airportInfo?.transportation?.taxi || 'Taxi'}</span></li>
                  <li><span className="font-medium">{t.flights?.airportInfo?.transportation?.bus || 'Xe buýt'}</span></li>
                  <li><span className="font-medium">{t.flights?.airportInfo?.transportation?.shuttle || 'Xe đưa đón'}</span></li>
                  <li><span className="font-medium">{t.flights?.airportInfo?.transportation?.rental || 'Thuê xe'}</span></li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3">{t.flights?.airportInfo?.facilities?.title || 'Tiện ích tại sân bay'}</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {t.flights?.airportInfo?.facilities?.items?.map((item, index) => (
                  <li key={index}>{item}</li>
                )) || (
                  <>
                    <li>Cửa hàng miễn thuế</li>
                    <li>Nhà hàng và quán cà phê</li>
                    <li>Đổi tiền và ATM</li>
                    <li>Wi-Fi miễn phí</li>
                    <li>Dịch vụ hỗ trợ đặc biệt cho hành khách</li>
                    <li>Dịch vụ chăm sóc trẻ em</li>
                    <li>Phòng chờ VIP</li>
                  </>
                )}
              </ul>
            </div>
            
            {/* Thông tin dịch vụ thuê xe */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.flights?.rentalServices?.title || 'Dịch vụ thuê xe tại Nha Trang'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Thuê xe máy */}
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                    <FaMotorcycle className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold">{t.flights?.rentalServices?.moto?.title || 'Dịch vụ thuê xe máy'}</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  {t.flights?.rentalServices?.moto?.description || 'Khám phá Nha Trang một cách linh hoạt bằng xe máy. Chúng tôi cung cấp dịch vụ thuê xe máy uy tín với:'}
                </p>
                <ul className="mb-4 space-y-1 text-gray-700">
                  {t.flights?.rentalServices?.moto?.features?.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  )) || (
                    <>
                      <li>• Đa dạng loại xe: từ xe số đến xe tay ga cao cấp</li>
                      <li>• Giá thuê từ 100.000đ - 180.000đ/ngày</li>
                      <li>• Thủ tục đơn giản, giao xe tận nơi</li>
                      <li>• Bảo hiểm và hỗ trợ 24/7</li>
                    </>
                  )}
                </ul>
                <Link 
                  href={createLink('/moto')} 
                  className="inline-flex items-center text-blue-600 font-medium hover:underline"
                >
                  {t.flights?.rentalServices?.moto?.link || 'Xem dịch vụ thuê xe máy'} <FaArrowRight className="ml-2 text-sm" />
                </Link>
              </div>
              
              {/* Thuê xe ô tô */}
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mr-4">
                    <FaCar className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold">{t.flights?.rentalServices?.car?.title || 'Dịch vụ thuê xe ô tô'}</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  {t.flights?.rentalServices?.car?.description || 'Di chuyển thoải mái với gia đình hoặc nhóm bạn bằng dịch vụ thuê xe ô tô chất lượng cao:'}
                </p>
                <ul className="mb-4 space-y-1 text-gray-700">
                  {t.flights?.rentalServices?.car?.features?.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  )) || (
                    <>
                      <li>• Đa dạng dòng xe từ 4-16 chỗ</li>
                      <li>• Lựa chọn tự lái hoặc có tài xế</li>
                      <li>• Dịch vụ đón/tiễn sân bay Cam Ranh</li>
                      <li>• Đặt xe trực tuyến hoặc qua điện thoại</li>
                    </>
                  )}
                </ul>
                <Link 
                  href={createLink('/car')} 
                  className="inline-flex items-center text-green-600 font-medium hover:underline"
                >
                  {t.flights?.rentalServices?.car?.link || 'Xem dịch vụ thuê xe ô tô'} <FaArrowRight className="ml-2 text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 