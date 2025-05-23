'use client';

import Link from 'next/link';
import { 
  FaCar, 
  FaChevronLeft,
  FaPhone, 
  FaWhatsapp, 
  FaCheck, 
  FaMapMarkerAlt,
  FaBus,
  FaInfoCircle, 
  FaTelegram,
  FaTimes 
} from 'react-icons/fa';
import { CONTACT_INFO } from '../lib/contact-config';
import { useState } from 'react';

// Định nghĩa kiểu dữ liệu cho đối tượng xe ô tô
interface Car {
  imageUrl?: string;
  model: string;
  name: string;
  price: string;
  category: string;
  capacity: string;
}

export default function CarRentalPage() {
  const phoneNumber = CONTACT_INFO.phoneNumber;
  const phoneNumber2 = CONTACT_INFO.phoneNumber2;
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [currentImage, setCurrentImage] = useState({ url: '', name: '', price: '', capacity: '' });
  
  // Danh sách xe ô tô cho thuê
  const carList: Car[] = [
    // Xe 4 chỗ
    { 
      imageUrl: '/images/oto/vios.jpg', 
      model: 'Toyota Vios', 
      name: 'Toyota Vios 2022', 
      price: '250.000đ/lượt',
      capacity: '4 chỗ ngồi',
      category: '4-seat'
    },
    { 
      imageUrl: '/images/oto/xpander.jpg', 
      model: 'Mitsubishi Xpander', 
      name: 'Mitsubishi Xpander 2022', 
      price: '300.000đ/lượt',
      capacity: '7 chỗ ngồi',
      category: '7-seat'
    },
    { 
      imageUrl: '/images/oto/inova.jpg', 
      model: 'Toyota Innova', 
      name: 'Toyota Innova 2022', 
      price: '300.000đ/lượt',
      capacity: '7 chỗ ngồi',
      category: '7-seat'
    },
    { 
      imageUrl: '/images/oto/ecosport.jpg', 
      model: 'Ford EcoSport', 
      name: 'Ford EcoSport 2022', 
      price: '300.000đ/lượt',
      capacity: '7 chỗ ngồi',
      category: '7-seat'
    }
  ];

  // Hàm mở popup khi click vào hình ảnh
  const openImagePopup = (car: Car) => {
    setCurrentImage({
      url: car.imageUrl || '/images/oto/placeholder.jpg',
      name: car.name,
      price: car.price,
      capacity: car.capacity
    });
    setShowImagePopup(true);
    // Vô hiệu hóa scroll khi popup đang mở
    document.body.style.overflow = 'hidden';
  };

  // Hàm đóng popup
  const closeImagePopup = () => {
    setShowImagePopup(false);
    // Bật lại scroll khi đóng popup
    document.body.style.overflow = 'auto';
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <FaCar className="inline-block text-4xl mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Dịch vụ đưa đón và thuê xe ô tô Nha Trang</h1>
            <p className="max-w-3xl mx-auto text-green-100 text-lg">
              Dịch vụ xe đưa đón sân bay, đi tour du lịch với giá cả hợp lý, xe đời mới, tài xế chuyên nghiệp
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
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Dịch vụ đưa đón sân bay Cam Ranh</h2>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a 
                      href={`tel:${phoneNumber}`} 
                      className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
                    >
                      <FaPhone className="mr-2" /> {phoneNumber}
                    </a>
                    <a 
                      href={`tel:${phoneNumber2}`} 
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
                    >
                      <FaPhone className="mr-2" /> {phoneNumber2}
                    </a>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-yellow-700 font-medium">Đảm bảo đón đúng giờ - Không ghép khách - Giá trọn gói</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                        <FaCar className="text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-blue-600 mb-2">Xe 4 chỗ</h3>
                    <p className="text-gray-700 font-medium mb-2">250.000đ/lượt</p>
                    <p className="text-gray-500 text-sm">Phù hợp cho 1-4 hành khách</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                        <FaCar className="text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-green-600 mb-2">Xe 7 chỗ</h3>
                    <p className="text-gray-700 font-medium mb-2">300.000đ/lượt</p>
                    <p className="text-gray-500 text-sm">Phù hợp cho 5-7 hành khách</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
                        <FaBus className="text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-purple-600 mb-2">Xe 16 chỗ</h3>
                    <p className="text-gray-700 font-medium mb-2">500.000đ/lượt</p>
                    <p className="text-gray-500 text-sm">Phù hợp cho 8-16 hành khách</p>
                  </div>
                </div>
                
                {/* Gallery xe ô tô cho thuê */}
                <div className="mt-8 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaCar className="mr-2 text-green-600" /> Hình ảnh xe ô tô cho thuê
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {carList.map((car, index) => (
                      <div 
                        key={index} 
                        className="group relative rounded-lg overflow-hidden bg-gray-200 h-48 cursor-pointer"
                        onClick={() => openImagePopup(car)}
                      >
                        {car.imageUrl ? (
                          <img 
                            src={car.imageUrl} 
                            alt={car.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                            <span className="text-gray-600 font-medium">{car.model}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                          <p className="text-white font-medium">{car.name}</p>
                          <p className="text-white/80 text-sm">{car.capacity}</p>
                          <p className="text-white/80 text-sm">{car.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-500 italic text-center">
                    * Hover lên ảnh để xem thông tin chi tiết, click để xem ảnh kích thước lớn. Hình ảnh chỉ mang tính chất minh họa.
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold mb-4">Lưu ý khi sử dụng dịch vụ:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <span>Giá cước cộng thêm 50.000đ cho khu vực xa trung tâm (qua cầu Trần Phú)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <span>Phụ thu 50.000đ cho chuyến đón sau 20h tối</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="font-medium">Tuyệt đối không ghép khách, đưa đón tận nơi</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6">
                <div className="text-center">
                  <p className="font-medium text-blue-800 mb-4">
                    Để đặt xe đón tại sân bay, vui lòng liên hệ trước ít nhất 2 giờ
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <a 
                      href={`tel:${phoneNumber}`}
                      className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md transition-colors"
                    >
                      <FaPhone className="mr-2" /> Gọi để đặt xe: {phoneNumber}
                    </a>
                    <a 
                      href={`tel:${phoneNumber2}`}
                      className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md transition-colors"
                    >
                      <FaPhone className="mr-2" /> Gọi để đặt xe: {phoneNumber2}
                    </a>
                    <a 
                      href={`https://zalo.me/${phoneNumber}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md transition-colors"
                    >
                      <FaWhatsapp className="mr-2" /> Nhắn tin qua Zalo
                    </a>
                    <a 
                      href={`https://t.me/${CONTACT_INFO.telegramUsername}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md transition-colors"
                    >
                      <FaTelegram className="mr-2" /> Nhắn tin qua Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tour Services */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dịch vụ xe du lịch khám phá vùng phụ cận</h2>
              
              <p className="text-gray-700 mb-6">
                Ngoài dịch vụ đưa đón sân bay, chúng tôi còn cung cấp dịch vụ thuê xe ô tô đi du lịch các địa điểm lân cận Nha Trang:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkerAlt />
                    </div>
                    <h3 className="text-lg font-semibold">Nha Trang - Đà Lạt</h3>
                  </div>
                  <p className="text-gray-600">Tour tham quan thành phố ngàn hoa, thời gian di chuyển khoảng 3-4 giờ</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkerAlt />
                    </div>
                    <h3 className="text-lg font-semibold">Nha Trang - Vĩnh Hy</h3>
                  </div>
                  <p className="text-gray-600">Khám phá vịnh đẹp nhất miền Trung, tắm biển trong xanh và ngắm san hô</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkerAlt />
                    </div>
                    <h3 className="text-lg font-semibold">Nha Trang - Bình Ba - Bình Hưng</h3>
                  </div>
                  <p className="text-gray-600">Tour đảo tôm hùm với các bãi biển hoang sơ, tắm biển và ẩm thực hải sản</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkerAlt />
                    </div>
                    <h3 className="text-lg font-semibold">Nha Trang - Ninh Thuận - Phan Rang</h3>
                  </div>
                  <p className="text-gray-600">Tham quan làng chài, vườn nho, tháp Chàm và thưởng thức rượu vang Phan Rang</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                Ngoài ra chúng tôi còn phục vụ các tuyến:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> Nha Trang - Quy Nhơn
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> Nha Trang - Phú Yên
                </li>
              </ul>
              
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h3 className="text-lg font-semibold mb-3">Cam kết dịch vụ</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> Uy tín - Chuyên nghiệp
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> Xe form mới, sạch sẽ, thơm tho
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> Tài xế nhiệt tình, lái xe an toàn
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="bg-green-50 rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-xl font-bold mb-4">Liên hệ đặt xe ngay hôm nay</h2>
              <p className="text-gray-700 mb-6">
                Hãy liên hệ với chúng tôi qua hotline hoặc mạng xã hội để được tư vấn và đặt dịch vụ xe ô tô tại Nha Trang
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md transition-colors"
                >
                  <FaPhone className="mr-2" /> Gọi ngay: {phoneNumber}
                </a>
                <a 
                  href={`tel:${phoneNumber2}`}
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md transition-colors"
                >
                  <FaPhone className="mr-2" /> Gọi ngay: {phoneNumber2}
                </a>
                <a 
                  href={`https://zalo.me/${phoneNumber}`}
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
        </div>
      </section>
      
      {/* Image Popup */}
      {showImagePopup && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl mx-auto">
            <button 
              onClick={closeImagePopup}
              className="absolute top-0 right-0 -mt-12 -mr-12 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-10"
              aria-label="Close"
            >
              <FaTimes className="text-2xl" />
            </button>
            <div className="bg-black relative rounded-lg overflow-hidden">
              <img 
                src={currentImage.url} 
                alt={currentImage.name} 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                <h3 className="text-white font-medium text-lg">{currentImage.name}</h3>
                <p className="text-white/80">{currentImage.capacity}</p>
                <p className="text-white/80">{currentImage.price}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 