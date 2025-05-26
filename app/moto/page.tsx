'use client';

import Link from 'next/link';
import { FaMotorcycle, FaChevronLeft, FaPhone, FaWhatsapp, FaCheck, FaShieldAlt, FaMapMarkedAlt, FaInfoCircle, FaTelegram, FaExclamationTriangle, FaIdCard, FaCreditCard, FaMoneyBillWave, FaClock, FaTimes } from 'react-icons/fa';
import { CONTACT_INFO } from '../lib/contact-config';
import { useState } from 'react';
import Script from 'next/script';
import { MOTO_PAGE_SCHEMA } from '../lib/metadata';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocalizedLink } from '../hooks/useLocalizedLink';
import ContactSection from '../components/ContactSection';

// Định nghĩa kiểu dữ liệu cho đối tượng xe máy
interface Motorbike {
  imageUrl?: string;
  model: string;
  name: string;
  price: string;
  category: string;
}

// Schema.org JSON-LD cho FAQ
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Giá thuê xe máy tại Nha Trang là bao nhiêu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Giá thuê xe máy tại Nha Trang từ 100.000đ/ngày cho xe số (Wave, Sirius), 150.000đ/ngày cho xe ga phổ thông (Vision, Air Blade), và 180.000đ/ngày cho xe ga cao cấp (PCX, SH Mode).'
      }
    },
    {
      '@type': 'Question',
      name: 'Thủ tục thuê xe máy tại Nha Trang như thế nào?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Thủ tục rất đơn giản, bạn chỉ cần để lại CMND/CCCD hoặc Bằng lái xe gốc. Có thể cọc 5 triệu tiền mặt thay thế. Thuê từ 3 ngày được giảm 10%.'
      }
    },
    {
      '@type': 'Question',
      name: 'Có giao xe máy tận nơi không?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Có, chúng tôi giao xe miễn phí tận nơi trong bán kính 3km từ trung tâm Nha Trang, bao gồm khách sạn, nhà ga, bến xe. Liên hệ trước 2 giờ để đặt xe.'
      }
    },
    {
      '@type': 'Question',
      name: 'Xe máy thuê có bảo hiểm không?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Có, tất cả xe đều được bảo hiểm đầy đủ. Ngoài ra chúng tôi cung cấp dịch vụ cứu hộ miễn phí 24/7 trong phạm vi thành phố Nha Trang nếu xe gặp sự cố.'
      }
    },
    {
      '@type': 'Question',
      name: 'Có những loại xe máy nào cho thuê?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chúng tôi có đa dạng loại xe: Xe số (Honda Wave, Yamaha Sirius, Jupiter), xe ga phổ thông (Honda Vision, Air Blade, Lead, Nmax), xe ga cao cấp (PCX, SH Mode, NVX, Vespa).'
      }
    }
  ]
};

export default function MotorbikeRentalPage() {
  const { t, isLoading } = useLanguage();
  const { createLink } = useLocalizedLink();
  const phoneNumber = CONTACT_INFO.phoneNumber;
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [currentImage, setCurrentImage] = useState({ url: '', name: '', price: '' });
  
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
  
  // Danh sách xe máy cho thuê
  const motorbikeList: Motorbike[] = [
    // Xe số
    { 
      imageUrl: '/images/moto/wave.jpg', 
      model: 'Honda Wave', 
      name: 'Honda Wave Alpha', 
      price: '100.000đ/ngày',
      category: 'number'
    },
    { 
      imageUrl: '/images/moto/sirius.jpg', 
      model: 'Yamaha Sirius', 
      name: 'Yamaha Sirius Fi', 
      price: '120.000đ/ngày',
      category: 'number'
    },
    { 
      imageUrl: '/images/moto/jupiter.jpg', 
      model: 'Jupiter', 
      name: 'Yamaha Jupiter', 
      price: '120.000đ/ngày',
      category: 'number'
    },
    { 
      imageUrl: '/images/moto/viva.jpg', 
      model: 'Suzuki', 
      name: 'Suzuki Viva', 
      price: '100.000đ/ngày',
      category: 'number'
    },
    
    // Xe ga phổ thông
    { 
      imageUrl: '/images/moto/vision.png', 
      model: 'Honda Vision', 
      name: 'Honda Vision 2022', 
      price: '150.000đ/ngày',
      category: 'scooter'
    },
    { 
      imageUrl: '/images/moto/ab.jpg', 
      model: 'Honda Air Blade', 
      name: 'Honda Air Blade 2021', 
      price: '150.000đ/ngày',
      category: 'scooter'
    },
    { 
      imageUrl: '/images/moto/lead.jpg', 
      model: 'Honda Lead', 
      name: 'Honda Lead 2022', 
      price: '150.000đ/ngày',
      category: 'scooter'
    },
    { 
      imageUrl: '/images/moto/nmax.jpg', 
      model: 'Yamaha Nmax', 
      name: 'Yamaha Nmax 155', 
      price: '150.000đ/ngày',
      category: 'scooter'
    },
    
    // Xe ga cao cấp
    { 
      imageUrl: '/images/moto/pcx.jpg', 
      model: 'Honda PCX', 
      name: 'Honda PCX 2022', 
      price: '180.000đ/ngày',
      category: 'premium'
    },
    { 
      imageUrl: '/images/moto/shmode.jpg', 
      model: 'Honda SH Mode', 
      name: 'Honda SH Mode 2022', 
      price: '180.000đ/ngày',
      category: 'premium'
    },
    { 
      imageUrl: '/images/moto/nvx.jpg', 
      model: 'Yamaha NVX', 
      name: 'Yamaha NVX 155', 
      price: '180.000đ/ngày',
      category: 'premium'
    },
    { 
      imageUrl: '/images/moto/vespa.jpg', 
      model: 'Vespa', 
      name: 'Vespa Primavera', 
      price: '180.000đ/ngày',
      category: 'premium'
    }
  ];

  // Hàm mở popup khi click vào hình ảnh
  const openImagePopup = (bike: Motorbike) => {
    setCurrentImage({
      url: bike.imageUrl || '/images/moto/placeholder.jpg',
      name: bike.name,
      price: bike.price
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <FaMotorcycle className="inline-block text-4xl mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.moto?.hero?.title || 'Dịch vụ thuê xe máy Nha Trang'}</h1>
            <p className="max-w-3xl mx-auto text-blue-100 text-lg">
              {t.moto?.hero?.subtitle || 'Dịch vụ cho thuê xe máy uy tín, giá rẻ, đa dạng loại xe, giao nhận tận nơi tại Nha Trang'}
            </p>
          </div>
        </div>
      </section>
      
      {/* Back to main */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <Link href={createLink('/transportation')} className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FaChevronLeft className="mr-1 text-sm" /> {t.moto?.backToTransportation || 'Quay lại trang Di chuyển'}
          </Link>
        </div>
      </div>

      {/* Contact Section - Moved to top */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ContactSection 
              title={t.moto?.contactSection?.title || 'Liên hệ đặt xe ngay hôm nay'}
              description={t.moto?.contactSection?.description || 'Hãy liên hệ với chúng tôi qua hotline hoặc mạng xã hội để được tư vấn và đặt dịch vụ xe máy tại Nha Trang'}
              bgColor="bg-blue-50"
              phoneNumber={phoneNumber}
              showSecondPhone={true}
            />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">{t.moto?.serviceTitle || 'Dịch vụ thuê xe máy giá rẻ tại Nha Trang'}</h2>
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
                      <p className="text-yellow-700 font-medium">{t.moto?.serviceNote || 'Xe mới, đẹp, an toàn - Giao xe tận nơi - Thủ tục đơn giản'}</p>
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
                    <h3 className="text-xl font-bold text-blue-600 mb-2">{t.moto?.categories?.manual?.title || 'Xe số'}</h3>
                    <p className="text-gray-700 font-medium mb-2">{t.moto?.categories?.manual?.price || '120.000đ/ngày'}</p>
                    <p className="text-gray-500 text-sm">{t.moto?.categories?.manual?.description || 'Wave, Sirius, Jupiter, Suzuki'}</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                        <FaMotorcycle className="text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-green-600 mb-2">{t.moto?.categories?.scooter?.title || 'Xe ga phổ thông'}</h3>
                    <p className="text-gray-700 font-medium mb-2">{t.moto?.categories?.scooter?.price || '150.000đ/ngày'}</p>
                    <p className="text-gray-500 text-sm">{t.moto?.categories?.scooter?.description || 'Vision, Lead, Air Blade, Vario, Nmax'}</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
                        <FaMotorcycle className="text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-purple-600 mb-2">{t.moto?.categories?.premium?.title || 'Xe ga cao cấp'}</h3>
                    <p className="text-gray-700 font-medium mb-2">{t.moto?.categories?.premium?.price || '180.000đ/ngày'}</p>
                    <p className="text-gray-500 text-sm">{t.moto?.categories?.premium?.description || 'SH Mode, Vespa, NVX, PCX'}</p>
                  </div>
                </div>
                
                {/* Gallery xe máy cho thuê */}
                <div className="mt-8 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaMotorcycle className="mr-2 text-blue-600" /> {t.moto?.gallery?.title || 'Hình ảnh xe máy cho thuê'}
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {motorbikeList.map((bike, index) => (
                      <div 
                        key={index} 
                        className="group relative rounded-lg overflow-hidden bg-gray-200 h-48 cursor-pointer"
                        onClick={() => openImagePopup(bike)}
                      >
                        {bike.imageUrl ? (
                          <img 
                            src={bike.imageUrl} 
                            alt={bike.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                            <span className="text-gray-600 font-medium">{bike.model}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                          <p className="text-white font-medium">{bike.name}</p>
                          <p className="text-white/80 text-sm">{bike.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-500 italic text-center">
                    {t.moto?.gallery?.note || '* Hover lên ảnh để xem thông tin chi tiết, click để xem ảnh kích thước lớn. Hình ảnh chỉ mang tính chất minh họa.'}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold mb-4">{t.moto?.procedures?.title || 'Thủ tục và điều kiện thuê xe:'}</h3>
                  
                  <p className="text-gray-700 mb-4">
                    {t.moto?.procedures?.description || 'Thủ tục thuê xe máy rất đơn giản, nhanh chóng. Bạn chỉ cần để lại một trong các giấy tờ sau là có thể thuê xe ngay:'}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 flex items-start">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <FaIdCard className="text-sm" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t.moto?.procedures?.documents?.idCard?.title || 'CMND / CCCD'}</h4>
                        <p className="text-gray-600 text-sm">{t.moto?.procedures?.documents?.idCard?.description || 'Chứng minh nhân dân hoặc căn cước công dân còn hiệu lực'}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 flex items-start">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <FaCreditCard className="text-sm" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t.moto?.procedures?.documents?.license?.title || 'Bằng Lái Xe'}</h4>
                        <p className="text-gray-600 text-sm">{t.moto?.procedures?.documents?.license?.description || 'Bằng lái xe máy hoặc ô tô còn hiệu lực'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 text-blue-600 mr-3 mt-1">
                        <FaMapMarkedAlt className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-gray-700">
                          {t.moto?.procedures?.deliveryNote || 'Dịch vụ giao xe miễn phí tận nơi cho khách hàng tại khu vực trung tâm Nha Trang (khách sạn, nhà ga, bến xe)'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mb-3">{t.moto?.procedures?.conditions?.title || 'Các điều kiện thuê xe:'}</h4>
                  <ul className="space-y-3 mb-5">
                    {t.moto?.procedures?.conditions?.items?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    )) || (
                      <>
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
                      </>
                    )}
                  </ul>
                  
                  <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-semibold mb-2">{t.moto?.procedures?.importantNotes?.title || 'Lưu ý quan trọng:'}</h4>
                    <ul className="space-y-2">
                      {t.moto?.procedures?.importantNotes?.items?.map((note, index) => (
                        <li key={index} className="flex items-start">
                          <FaExclamationTriangle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{note}</span>
                        </li>
                      )) || (
                        <>
                          <li className="flex items-start">
                            <FaExclamationTriangle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                            <span>Không để xe dưới lòng, lề đường. Hãy để xe ở những bãi giữ xe an toàn</span>
                          </li>
                          <li className="flex items-start">
                            <FaExclamationTriangle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                            <span>Tuân thủ luật giao thông: không vượt đèn đỏ, không đi ngược chiều, đội mũ bảo hiểm</span>
                          </li>
                          <li className="flex items-start">
                            <FaExclamationTriangle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                            <span>Thời gian thuê xe máy: 1 ngày = 24h, nếu phát sinh 6h = 1/2 ngày</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6">
                <div className="text-center">
                  <p className="font-medium text-blue-800 mb-4">
                    {t.common?.contactForBooking || 'Để đặt thuê xe máy, vui lòng liên hệ trước ít nhất 2 giờ'}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <a 
                      href={`tel:${phoneNumber}`}
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md transition-colors"
                    >
                      <FaPhone className="mr-2" /> {t.common?.callNow || 'Gọi để đặt xe'}: {phoneNumber}
                    </a>
                    <a 
                      href={`https://zalo.me/${phoneNumber}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md transition-colors"
                    >
                      <FaWhatsapp className="mr-2" /> {t.common?.messageZalo || 'Nhắn tin qua Zalo'}
                    </a>
                    <a 
                      href={`https://t.me/${CONTACT_INFO.telegramUsername}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md transition-colors"
                    >
                      <FaTelegram className="mr-2" /> {t.common?.messageTelegram || 'Nhắn tin qua Telegram'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Touring Information */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.moto?.touring?.title || 'Khám phá Nha Trang bằng xe máy'}</h2>
              
              <p className="text-gray-700 mb-6">
                {t.moto?.touring?.description || 'Thuê xe máy là cách linh hoạt và thuận tiện nhất để khám phá Nha Trang và các vùng lân cận. Dưới đây là một số điểm đến lý tưởng để khám phá bằng xe máy:'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkedAlt />
                    </div>
                    <h3 className="text-lg font-semibold">{t.moto?.touring?.destinations?.baiDai?.title || 'Bãi Dài và Bãi Dốc Lết'}</h3>
                  </div>
                  <p className="text-gray-600">{t.moto?.touring?.destinations?.baiDai?.description || 'Hai bãi biển đẹp, hoang sơ cách trung tâm Nha Trang khoảng 20-30km về phía Bắc'}</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkedAlt />
                    </div>
                    <h3 className="text-lg font-semibold">{t.moto?.touring?.destinations?.ninhVan?.title || 'Vịnh Ninh Vân và Vịnh Lăng Cô'}</h3>
                  </div>
                  <p className="text-gray-600">{t.moto?.touring?.destinations?.ninhVan?.description || 'Cảnh đẹp hoang sơ và yên bình, cách Nha Trang khoảng 60km về phía Bắc'}</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkedAlt />
                    </div>
                    <h3 className="text-lg font-semibold">{t.moto?.touring?.destinations?.ponagar?.title || 'Tháp Bà Ponagar'}</h3>
                  </div>
                  <p className="text-gray-600">{t.moto?.touring?.destinations?.ponagar?.description || 'Di tích lịch sử Chăm Pa cổ, nằm ngay trong thành phố Nha Trang'}</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">
                      <FaMapMarkedAlt />
                    </div>
                    <h3 className="text-lg font-semibold">{t.moto?.touring?.destinations?.daiLanh?.title || 'Bãi biển Đại Lãnh và Mũi Điện'}</h3>
                  </div>
                  <p className="text-gray-600">{t.moto?.touring?.destinations?.daiLanh?.description || 'Cung đường ven biển đẹp, nằm ở ranh giới giữa Khánh Hòa và Phú Yên'}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5 mt-4">
                <h3 className="text-lg font-semibold mb-3">{t.moto?.touring?.tips?.title || 'Lưu ý khi thuê xe máy'}</h3>
                <ul className="space-y-2">
                  {t.moto?.touring?.tips?.items?.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mr-2 mt-1" /> 
                      <span>{tip}</span>
                    </li>
                  )) || (
                    <>
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
                    </>
                  )}
                </ul>
              </div>
            </div>
            
            {/* Benefits */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.moto?.benefits?.title || 'Ưu điểm khi thuê xe tại Nha Trang Insight'}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FaMotorcycle className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t.moto?.benefits?.newBikes?.title || 'Xe đời mới, chất lượng'}</h3>
                    <p className="text-gray-600">
                      {t.moto?.benefits?.newBikes?.description || 'Tất cả xe đều là xe mới, được bảo dưỡng thường xuyên, đảm bảo an toàn và vận hành tốt'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FaShieldAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t.moto?.benefits?.support?.title || 'Hỗ trợ cứu hộ 24/7'}</h3>
                    <p className="text-gray-600">
                      {t.moto?.benefits?.support?.description || 'Dịch vụ cứu hộ miễn phí trong phạm vi thành phố Nha Trang nếu xe gặp sự cố'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">{t.moto?.faq?.title || 'Câu hỏi thường gặp về thuê xe máy Nha Trang'}</h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {t.moto?.faq?.questions?.price?.question || 'Giá thuê xe máy tại Nha Trang là bao nhiêu?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.moto?.faq?.questions?.price?.answer || 'Giá thuê xe máy tại Nha Trang từ 100.000đ/ngày cho xe số (Wave, Sirius), 150.000đ/ngày cho xe ga phổ thông (Vision, Air Blade), và 180.000đ/ngày cho xe ga cao cấp (PCX, SH Mode).'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {t.moto?.faq?.questions?.procedures?.question || 'Thủ tục thuê xe máy tại Nha Trang như thế nào?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.moto?.faq?.questions?.procedures?.answer || 'Thủ tục rất đơn giản, bạn chỉ cần để lại CMND/CCCD hoặc Bằng lái xe gốc. Có thể cọc 5 triệu tiền mặt thay thế. Thuê từ 3 ngày được giảm 10%.'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {t.moto?.faq?.questions?.delivery?.question || 'Có giao xe máy tận nơi không?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.moto?.faq?.questions?.delivery?.answer || 'Có, chúng tôi giao xe miễn phí tận nơi trong bán kính 3km từ trung tâm Nha Trang, bao gồm khách sạn, nhà ga, bến xe. Liên hệ trước 2 giờ để đặt xe.'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {t.moto?.faq?.questions?.insurance?.question || 'Xe máy thuê có bảo hiểm không?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.moto?.faq?.questions?.insurance?.answer || 'Có, tất cả xe đều được bảo hiểm đầy đủ. Ngoài ra chúng tôi cung cấp dịch vụ cứu hộ miễn phí 24/7 trong phạm vi thành phố Nha Trang nếu xe gặp sự cố.'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {t.moto?.faq?.questions?.types?.question || 'Có những loại xe máy nào cho thuê?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.moto?.faq?.questions?.types?.answer || 'Chúng tôi có đa dạng loại xe: Xe số (Honda Wave, Yamaha Sirius, Jupiter), xe ga phổ thông (Honda Vision, Air Blade, Lead, Nmax), xe ga cao cấp (PCX, SH Mode, NVX, Vespa).'}</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
      
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-moto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(MOTO_PAGE_SCHEMA) }}
      />
      
      {/* FAQ Schema */}
      <Script
        id="schema-moto-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      
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
                <p className="text-white/80">{currentImage.price}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 