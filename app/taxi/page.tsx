'use client';

import Link from 'next/link';
import { FaTaxi, FaChevronLeft, FaPhone, FaMapMarkedAlt, FaInfoCircle, FaMoneyBillWave, FaStar, FaClock, FaRoute, FaCarSide, FaCheckCircle, FaMotorcycle, FaCar } from 'react-icons/fa';
import { CONTACT_INFO } from '../lib/contact-config';
import Script from 'next/script';
import { TAXI_PAGE_SCHEMA } from '../lib/metadata';

export default function TaxiPage() {
  const phoneNumber = CONTACT_INFO.phoneNumber;
  
  // Danh sách các hãng taxi tại Nha Trang
  const taxiCompanies = [
    {
        name: 'Mai Linh Taxi',
        phone: '025 83 83 8383',
        baseRate: '15.000đ',
        pricePerKm: '15.000đ - 17.000đ/km',
        waitingRate: '45.000đ/giờ',
        color: 'Xanh lá',
        operatingHours: '24/7',
        website: 'https://mailinh.vn',
        logo: '/images/taxi/mailinh.png',
        rating: 4.5,
        features: ['Đội xe lớn', 'Tài xế chuyên nghiệp', 'Có thẻ thanh toán'],
        description: 'Mai Linh là một trong những hãng taxi lớn nhất và uy tín nhất tại Nha Trang, phục vụ nhiều tuyến du lịch.'
    },
    {
        name: 'Vinasun Taxi',
        phone: '0258 3827 272',
        baseRate: '15.000đ',
        pricePerKm: '16.000đ - 18.000đ/km',
        waitingRate: '47.000đ/giờ',
        color: 'Trắng-xanh',
        operatingHours: '24/7',
        website: 'https://vinasuntaxi.com',
        logo: '/images/taxi/vinasun.png',
        rating: 4.3,
        features: ['App đặt xe', 'Thanh toán qua app', 'Dịch vụ đa dạng', 'Có hóa đơn VAT'],
        description: 'Vinasun là hãng taxi uy tín từ TPHCM, đã mở rộng hoạt động tại Nha Trang để phục vụ du khách.'
    },
    {
        name: 'Taxi Xanh',
        phone: '1900 2088',
        baseRate: '15.000đ',
        pricePerKm: '15.000đ - 16.500đ/km',
        waitingRate: '40.000đ/giờ',
        color: 'Xanh dương',
        operatingHours: '5:00 - 24:00',
        website: 'https://taxi-xanh.vn',
        logo: '/images/taxi/xanhsm.png',
        rating: 4.0,
        features: ['App đặt xe', 'Giá rẻ', 'Phục vụ tận tình', 'Đưa đón sân bay'],
        description: 'Taxi Xanh là hãng taxi địa phương với giá cả phải chăng, phù hợp cho khách du lịch muốn di chuyển tiết kiệm.'
    },
    {
        name: 'Sun Taxi',
        phone: '0258 3 89 89 89',
        baseRate: '16.000đ',
        pricePerKm: '17.000đ - 18.000đ/km',
        waitingRate: '45.000đ/giờ',
        color: 'Vàng',
        operatingHours: '24/7',
        website: 'https://suntaxi.vn',
        logo: '/images/taxi/suntaxi.png',
        rating: 4.2,
        features: ['Xe sang trọng', 'Dịch vụ VIP', 'Đón tiễn sân bay'],
        description: 'Sun Taxi cung cấp dịch vụ taxi cao cấp với các loại xe sang trọng, phù hợp cho khách đoàn và khách VIP.'
    },
    {
        name: 'Maxim Taxi',
        phone: '1900 01585',
        baseRate: '15.000đ',
        pricePerKm: '15.000đ - 16.000đ/km',
        waitingRate: '42.000đ/giờ',
        color: 'Trắng-đỏ',
        operatingHours: '24/7',
        website: 'https://maximtaxi.vn',
        logo: '/images/taxi/maxim.jpg',
        rating: 4.3,
        features: ['App đặt xe', 'Đội xe mới', 'Tài xế am hiểu địa phương', 'Giá cạnh tranh'],
        description: 'Maxim Taxi là hãng taxi địa phương, quen thuộc với các tuyến đường và điểm du lịch nổi tiếng ở Nha Trang.'
    },
    {
        name: 'Grab',
        phone: '',
        baseRate: '15.000đ',
        pricePerKm: '15.000đ - 16.000đ/km',
        waitingRate: '42.000đ/giờ',
        color: 'Xanh lá',
        operatingHours: '24/7',
        website: 'https://grab.com',
        logo: '/images/taxi/grab.jpg',
        rating: 4.3,
        features: ['App đặt xe', 'Đội xe mới', 'Tài xế am hiểu địa phương', 'Giá cạnh tranh'],
        description: 'Grab là hãng taxi địa phương, quen thuộc với các tuyến đường và điểm du lịch nổi tiếng ở Nha Trang.'
    }
  ];
  
  // Thông tin về các loại taxi phổ biến
  const taxiTypes = [
    {
      type: 'Taxi 4 chỗ',
      capacity: '4 người + hành lý vừa phải',
      priceRange: '15.000đ - 17.000đ/km',
      bestFor: 'Cá nhân, cặp đôi, gia đình nhỏ',
      icon: 'FaCarSide'
    },
    {
      type: 'Taxi 7 chỗ',
      capacity: '7 người + hành lý nhiều',
      priceRange: '17.000đ - 20.000đ/km',
      bestFor: 'Gia đình lớn, nhóm bạn',
      icon: 'FaTaxi'
    },
    {
      type: 'Taxi VIP',
      capacity: '4 người + dịch vụ cao cấp',
      priceRange: '20.000đ - 25.000đ/km',
      bestFor: 'Doanh nhân, khách VIP',
      icon: 'FaCarSide'
    }
  ];
  
  // Thông tin các tuyến taxi phổ biến
  const popularRoutes = [
    {
      from: 'Sân bay Cam Ranh',
      to: 'Trung tâm Nha Trang',
      distance: '~30km',
      estimatedPrice: '350.000đ - 400.000đ',
      estimatedTime: '40-45 phút'
    },
    {
      from: 'Trung tâm Nha Trang',
      to: 'Vinpearl Land',
      distance: '~5km',
      estimatedPrice: '80.000đ - 100.000đ',
      estimatedTime: '15-20 phút'
    },
    {
      from: 'Trung tâm Nha Trang',
      to: 'I-Resort',
      distance: '~7km',
      estimatedPrice: '120.000đ - 140.000đ',
      estimatedTime: '20-25 phút'
    },
    {
      from: 'Trung tâm Nha Trang',
      to: 'Tháp Bà Ponagar',
      distance: '~4km',
      estimatedPrice: '70.000đ - 90.000đ',
      estimatedTime: '10-15 phút'
    }
  ];
  
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <FaTaxi className="inline-block text-4xl mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Dịch vụ Taxi Nha Trang</h1>
            <p className="max-w-3xl mx-auto text-yellow-100 text-lg">
              Thông tin chi tiết về các hãng taxi uy tín, giá cước và dịch vụ tại Nha Trang
            </p>
          </div>
        </div>
      </section>
      
      {/* Back to main */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <Link href="/transportation" className="inline-flex items-center text-yellow-600 hover:text-yellow-800">
            <FaChevronLeft className="mr-1 text-sm" /> Quay lại trang Di chuyển
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Taxi tại Nha Trang</h2>
                <p className="text-gray-700 mb-4">
                  Taxi là phương tiện di chuyển phổ biến và thuận tiện tại Nha Trang. Với nhiều hãng taxi uy tín hoạt động trong khu vực, 
                  du khách có thể dễ dàng bắt taxi tại các khu du lịch, khách sạn, nhà hàng và các điểm tham quan.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-yellow-700">Để tránh bị "chặt chém", bạn nên đi các hãng taxi uy tín và yêu cầu tài xế bật đồng hồ tính tiền khi lên xe.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Taxi companies */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Các hãng taxi uy tín tại Nha Trang</h2>
                
                <div className="space-y-6">
                  {taxiCompanies.map((company, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-start">
                        <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md overflow-hidden">
                            {company.logo ? (
                              <img 
                                src={company.logo} 
                                alt={company.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-yellow-200">
                                <FaTaxi className="text-4xl text-yellow-500" />
                              </div>
                            )}
                          </div>
                          <div className="mt-2 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start">
                              <span className="text-yellow-500 mr-1">
                                <FaStar />
                              </span>
                              <span className="font-medium">{company.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-3/4">
                          <h3 className="text-xl font-semibold text-gray-800">{company.name}</h3>
                          <p className="text-gray-600 mt-1">{company.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="flex items-center text-gray-700">
                                <FaPhone className="mr-2 text-yellow-500" /> 
                                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:underline">{company.phone}</a>
                              </p>
                              <p className="flex items-center text-gray-700 mt-2">
                                <FaMoneyBillWave className="mr-2 text-yellow-500" /> 
                                <span>Giá: {company.pricePerKm}/km</span>
                              </p>
                              <p className="flex items-center text-gray-700 mt-2">
                                <FaClock className="mr-2 text-yellow-500" /> 
                                <span>Hoạt động: {company.operatingHours}</span>
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-gray-700 font-medium">Đặc điểm nổi bật:</p>
                              <ul className="mt-1 space-y-1">
                                {company.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" /> 
                                    <span className="text-gray-600">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Taxi types */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Các loại taxi phổ biến</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {taxiTypes.map((type, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                        <FaCarSide className="text-xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{type.type}</h3>
                      <ul className="mt-3 space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          <span>Sức chứa: {type.capacity}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          <span>Giá: {type.priceRange}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          <span>Phù hợp: {type.bestFor}</span>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Popular routes */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Các tuyến taxi phổ biến và giá cước ước tính</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuyến đường</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khoảng cách</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá ước tính</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {popularRoutes.map((route, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaRoute className="text-yellow-500 mr-2" />
                              <span>{route.from} → {route.to}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{route.distance}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{route.estimatedPrice}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{route.estimatedTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <p className="mt-4 text-sm text-gray-500 italic">
                  * Giá cước ước tính dựa trên bảng giá taxi 4 chỗ. Giá thực tế có thể thay đổi tùy thuộc vào hãng taxi, 
                  thời điểm, tình trạng giao thông và các yếu tố khác.
                </p>
              </div>
            </div>
            
            {/* Tips */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Lời khuyên khi đi taxi tại Nha Trang</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaCheckCircle className="text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700"><span className="font-medium">Chỉ đi các hãng taxi uy tín</span> - Ưu tiên các hãng taxi lớn như Mai Linh, Vinasun, Nha Trang Taxi để tránh bị "chặt chém".</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaCheckCircle className="text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700"><span className="font-medium">Yêu cầu bật đồng hồ</span> - Luôn yêu cầu tài xế bật đồng hồ tính tiền khi lên xe.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaCheckCircle className="text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700"><span className="font-medium">Đặt xe qua tổng đài</span> - Nếu có thể, hãy đặt xe qua tổng đài của các hãng taxi để đảm bảo an toàn.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaCheckCircle className="text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700"><span className="font-medium">Xác nhận giá trước</span> - Với các tuyến đường dài như từ sân bay về thành phố, hãy xác nhận giá trọn gói trước khi đi.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaCheckCircle className="text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700"><span className="font-medium">Giữ hóa đơn</span> - Luôn yêu cầu hóa đơn sau khi trả tiền, nhất là khi cần thanh toán công tác phí.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Alternative Transportation */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Phương tiện di chuyển thay thế</h2>
                
                <p className="text-gray-700 mb-4">
                  Ngoài taxi, Nha Trang còn có nhiều phương tiện di chuyển thay thế khác:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Link href="/moto" className="group">
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                          <FaMotorcycle />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition">Thuê xe máy</h3>
                          <p className="text-sm text-gray-600">Từ 100.000đ/ngày, linh hoạt di chuyển</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <Link href="/oto" className="group">
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                          <FaCar />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 group-hover:text-green-600 transition">Thuê xe ô tô</h3>
                          <p className="text-sm text-gray-600">Thuê xe tự lái hoặc có tài xế</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Contact */}
            <div className="bg-yellow-50 rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-xl font-bold mb-4">Cần tư vấn thêm về di chuyển tại Nha Trang?</h2>
              <p className="text-gray-700 mb-6">
                Liên hệ với chúng tôi để được tư vấn và hỗ trợ đặt dịch vụ vận chuyển tại Nha Trang
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md transition-colors"
                >
                  <FaPhone className="mr-2" /> Gọi ngay: {phoneNumber}
                </a>
                <a 
                  href={`https://zalo.me/${phoneNumber}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
                >
                  Nhắn tin qua Zalo
                </a>
                <a 
                  href={`https://t.me/${CONTACT_INFO.telegramUsername}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors"
                >
                  Nhắn tin qua Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-taxi"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TAXI_PAGE_SCHEMA) }}
      />
    </div>
  );
} 