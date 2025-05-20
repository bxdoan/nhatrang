'use client';

import { FaPlane } from 'react-icons/fa';
import FlightSection from '../components/FlightSection';

export default function FlightsPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <FaPlane className="inline-block text-4xl mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Chuyến bay đến Cam Ranh (CXR)</h1>
            <p className="max-w-3xl mx-auto text-blue-100 text-lg">
              Kiểm tra thông tin thời gian, trạng thái và chi tiết các chuyến bay sắp đến sân bay Cam Ranh - 
              cửa ngõ hàng không của thành phố biển Nha Trang
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin sân bay Cam Ranh (CXR)</h2>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-3">Giới thiệu</h3>
              <p className="text-gray-700 mb-4">
                Sân bay quốc tế Cam Ranh nằm cách trung tâm thành phố Nha Trang khoảng 30km về phía nam. 
                Đây là cửa ngõ hàng không chính cho du khách đến Nha Trang và các khu vực lân cận thuộc tỉnh Khánh Hòa.
              </p>
              <p className="text-gray-700">
                Sân bay phục vụ cả các chuyến bay nội địa và quốc tế, với nhiều hãng hàng không như Vietnam Airlines, 
                Bamboo Airways, VietJet Air, Pacific Airlines và nhiều hãng quốc tế khác.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Thông tin liên hệ</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-medium">Địa chỉ:</span> Nguyễn Tất Thành, Cam Hải Đông, Cam Lâm, Khánh Hòa</li>
                  <li><span className="font-medium">Điện thoại:</span> +84 258 3983 375</li>
                  <li><span className="font-medium">Email:</span> info@chra.vn</li>
                  <li><span className="font-medium">Website:</span> <a href="http://chra.vn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://chra.vn</a></li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Di chuyển từ sân bay</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-medium">Taxi:</span> Có sẵn bên ngoài nhà ga, thời gian di chuyển khoảng 40-45 phút đến trung tâm Nha Trang.</li>
                  <li><span className="font-medium">Xe buýt:</span> Có tuyến xe buýt số 18 từ sân bay đến trung tâm thành phố.</li>
                  <li><span className="font-medium">Xe đưa đón:</span> Nhiều khách sạn cung cấp dịch vụ đưa đón sân bay, hãy kiểm tra khi đặt phòng.</li>
                  <li><span className="font-medium">Thuê xe:</span> Có các công ty cho thuê xe tại sân bay.</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Tiện ích tại sân bay</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Cửa hàng miễn thuế</li>
                <li>Nhà hàng và quán cà phê</li>
                <li>Đổi tiền và ATM</li>
                <li>Wi-Fi miễn phí</li>
                <li>Dịch vụ hỗ trợ đặc biệt cho hành khách</li>
                <li>Dịch vụ chăm sóc trẻ em</li>
                <li>Phòng chờ VIP</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 