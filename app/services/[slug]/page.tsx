'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaArrowLeft, 
  FaStar, 
  FaCheck, 
  FaRocket,
  FaFire,
  FaWhatsapp,
  FaShieldAlt,
  FaGift,
  FaUsers,
  FaClock
} from 'react-icons/fa';
import { useParams } from 'next/navigation';
import servicesData from '../../data/services.json';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLocalizedLink } from '../../hooks/useLocalizedLink';
import ContactSection from '../../components/ContactSection';
import { CONTACT_INFO } from '../../lib/contact-config';

// Định nghĩa kiểu dữ liệu cho service
interface Service {
  id: string;
  slug: string;
  name: {
    vi: string;
    en: string;
    zh_TW: string;
    zh_CN?: string;
    ru?: string;
    kr?: string;
  };
  description: {
    vi: string;
    en: string;
    zh_TW: string;
    zh_CN?: string;
    ru?: string;
    kr?: string;
  };
  features: {
    vi: string[];
    en: string[];
    zh_TW: string[];
    zh_CN?: string[];
    ru?: string[];
    kr?: string[];
  };
  price: number;
  price_original: number;
  categories: string[];
  image: string;
  rating: number;
  sold: number;
  warranty: number;
  auto_delivery: boolean;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const { t, locale } = useLanguage();
  const { createLink } = useLocalizedLink();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const slug = params.slug as string;
    const foundService = servicesData.find((s: any) => s.slug === slug);
    setService(foundService || null);
    setLoading(false);
  }, [params.slug]);

  // Hàm format giá
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  // Hàm tính phần trăm giảm giá
  const calculateDiscount = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Hàm lấy văn bản theo ngôn ngữ với fallback đầy đủ
  const getText = (textObj: { vi: string; en: string; zh_TW: string; zh_CN?: string; ru?: string; kr?: string }) => {
    const currentLocale = locale as keyof typeof textObj;
    return textObj[currentLocale] || textObj.zh_CN || textObj.ru || textObj.kr || textObj.en || textObj.vi;
  };

  // Hàm lấy features array theo ngôn ngữ với fallback đầy đủ
  const getFeatures = (featuresObj: { vi: string[]; en: string[]; zh_TW: string[]; zh_CN?: string[]; ru?: string[]; kr?: string[] }) => {
    const currentLocale = locale as keyof typeof featuresObj;
    return featuresObj[currentLocale] || featuresObj.zh_CN || featuresObj.ru || featuresObj.kr || featuresObj.en || featuresObj.vi;
  };

  const handleZaloClick = () => {
    console.log('Zalo clicked for service:', service ? getText(service.name) : '');
  };

  // Function để lấy icon theo categories
  const getServiceIcon = (categories: string[]) => {
    if (categories.includes('youtube')) return '📺';
    if (categories.includes('google')) return '🌐';
    if (categories.includes('tiktok')) return '🎵';
    if (categories.includes('facebook')) return '📘';
    if (categories.includes('instagram')) return '📸';
    if (categories.includes('netflix')) return '🎬';
    if (categories.includes('spotify')) return '🎵';
    if (categories.includes('canva')) return '🎨';
    if (categories.includes('ai')) return '🤖';
    if (categories.includes('productivity')) return '⚡';
    return '⚡';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {getText({ 
              vi: 'Đang tải...', 
              en: 'Loading...', 
              zh_TW: '載入中...',
              zh_CN: '加载中...',
              ru: 'Загрузка...',
              kr: '로딩 중...'
            })}
          </p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">
            {getText({ 
              vi: 'Không tìm thấy dịch vụ', 
              en: 'Service not found', 
              zh_TW: '找不到服務',
              zh_CN: '未找到服务',
              ru: 'Услуга не найдена',
              kr: '서비스를 찾을 수 없습니다'
            })}
          </h1>
          <p className="text-gray-600 mb-6">
            {getText({ 
              vi: 'Dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị xóa.', 
              en: 'The service you are looking for does not exist or has been removed.',
              zh_TW: '您尋找的服務不存在或已被刪除。',
              zh_CN: '您寻找的服务不存在或已被删除。',
              ru: 'Услуга, которую вы ищете, не существует или была удалена.',
              kr: '찾고 있는 서비스가 존재하지 않거나 삭제되었습니다.'
            })}
          </p>
          <Link 
            href={createLink('/services')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md inline-flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            {getText({ 
              vi: 'Quay lại dịch vụ', 
              en: 'Back to services', 
              zh_TW: '返回服務',
              zh_CN: '返回服务',
              ru: 'Вернуться к услугам',
              kr: '서비스로 돌아가기'
            })}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link href={createLink('/')} className="text-purple-600 hover:text-purple-800">
              {getText({ 
                vi: 'Trang chủ', 
                en: 'Home', 
                zh_TW: '首頁',
                zh_CN: '首页',
                ru: 'Главная',
                kr: '홈'
              })}
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href={createLink('/services')} className="text-purple-600 hover:text-purple-800">
              {getText({ 
                vi: 'Dịch vụ', 
                en: 'Services', 
                zh_TW: '服務',
                zh_CN: '服务',
                ru: 'Услуги',
                kr: '서비스'
              })}
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700">{getText(service.name)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Service Image & Info */}
            <div>
              {/* Service Image */}
              <div className="relative h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-6">
                {/* Hiển thị hình ảnh nếu có và không bị lỗi */}
                {service.image && !imageError ? (
                  <Image
                    src={service.image}
                    alt={getText(service.name)}
                    fill
                    className="object-cover rounded-lg"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  /* Fallback về icon nếu không có image hoặc bị lỗi */
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-40">
                      {getServiceIcon(service.categories)}
                    </div>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {service.auto_delivery && (
                    <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center">
                      <FaRocket className="mr-2" />
                      {getText({ 
                        vi: 'Giao hàng tự động', 
                        en: 'Auto Delivery', 
                        zh_TW: '自動交付',
                        zh_CN: '自动交付',
                        ru: 'Автодоставка',
                        kr: '자동 배송'
                      })}
                    </span>
                  )}
                  {calculateDiscount(service.price, service.price_original) > 0 && (
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full flex items-center">
                      <FaFire className="mr-2" />
                      {getText({ 
                        vi: 'Giảm giá', 
                        en: 'Sale', 
                        zh_TW: '促銷',
                        zh_CN: '促销',
                        ru: 'Скидка',
                        kr: '할인'
                      })} -{calculateDiscount(service.price, service.price_original)}%
                    </span>
                  )}
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white rounded-lg px-3 py-2 flex items-center shadow-sm">
                    <FaStar className="text-yellow-400 mr-2" />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  {getText({ 
                    vi: 'Tính năng nổi bật', 
                    en: 'Key Features', 
                    zh_TW: '主要功能',
                    zh_CN: '主要功能',
                    ru: 'Основные функции',
                    kr: '주요 기능'
                  })}
                </h3>
                <ul className="space-y-3">
                  {getFeatures(service.features).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Service Details & Purchase */}
            <div>
              {/* Service Info */}
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <h1 className="text-3xl font-bold mb-4">{getText(service.name)}</h1>
                
                <p className="text-gray-600 text-lg mb-6">{getText(service.description)}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-4xl font-bold text-purple-600">
                      {formatPrice(service.price)}
                    </span>
                    {service.price_original > service.price && (
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(service.price_original)}
                      </span>
                    )}
                  </div>
                  {service.price_original > service.price && (
                    <p className="text-green-600 font-medium">
                      {getText({ 
                        vi: 'Tiết kiệm', 
                        en: 'Save', 
                        zh_TW: '節省',
                        zh_CN: '节省',
                        ru: 'Экономия',
                        kr: '절약'
                      })}: {formatPrice(service.price_original - service.price)} (-{calculateDiscount(service.price, service.price_original)}%)
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <FaUsers className="text-purple-600 text-xl mb-2 mx-auto" />
                    <div className="font-semibold">{service.sold}</div>
                    <div className="text-xs text-gray-600">
                      {getText({ 
                        vi: 'Đã bán', 
                        en: 'Sold', 
                        zh_TW: '已售',
                        zh_CN: '已售',
                        ru: 'Продано',
                        kr: '판매됨'
                      })}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <FaShieldAlt className="text-green-600 text-xl mb-2 mx-auto" />
                    <div className="font-semibold">{service.warranty}</div>
                    <div className="text-xs text-gray-600">
                      {getText({ 
                        vi: 'Ngày bảo hành', 
                        en: 'Days warranty', 
                        zh_TW: '天保固',
                        zh_CN: '天保修',
                        ru: 'Дней гарантии',
                        kr: '일 보증'
                      })}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <FaClock className="text-blue-600 text-xl mb-2 mx-auto" />
                    <div className="font-semibold">24/7</div>
                    <div className="text-xs text-gray-600">
                      {getText({ 
                        vi: 'Hỗ trợ', 
                        en: 'Support', 
                        zh_TW: '支援',
                        zh_CN: '支持',
                        ru: 'Поддержка',
                        kr: '지원'
                      })}
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <a
                  href={`https://zalo.me/${CONTACT_INFO.phoneNumber}?text=${encodeURIComponent(`Tôi muốn mua dịch vụ: ${getText(service.name)} - Giá: ${formatPrice(service.price)}`)}`}
                  onClick={handleZaloClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg flex items-center justify-center text-lg font-semibold transition-colors mb-4"
                >
                  <FaWhatsapp className="mr-3 text-xl" />
                  {getText({ 
                    vi: 'Đặt mua qua Zalo', 
                    en: 'Order via Zalo', 
                    zh_TW: '透過Zalo訂購',
                    zh_CN: '通过Zalo订购',
                    ru: 'Заказать через Zalo',
                    kr: 'Zalo로 주문하기'
                  })}
                </a>

                <p className="text-center text-sm text-gray-600">
                  {getText({ 
                    vi: 'Bấm để mở Zalo và nhắn tin trực tiếp cho chúng tôi', 
                    en: 'Click to open Zalo and message us directly', 
                    zh_TW: '點擊打開Zalo並直接給我們發消息',
                    zh_CN: '点击打开Zalo并直接给我们发消息',
                    ru: 'Нажмите, чтобы открыть Zalo и написать нам напрямую',
                    kr: 'Zalo를 열고 직접 메시지를 보내려면 클릭하세요'
                  })}
                </p>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 text-blue-900">
                  {getText({ 
                    vi: 'Thông tin quan trọng', 
                    en: 'Important Information', 
                    zh_TW: '重要資訊',
                    zh_CN: '重要信息',
                    ru: 'Важная информация',
                    kr: '중요한 정보'
                  })}
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <FaGift className="mr-2 mt-1 flex-shrink-0" />
                    {getText({ 
                      vi: 'Tài khoản chính hãng, không chia sẻ', 
                      en: 'Genuine account, not shared', 
                      zh_TW: '正版帳戶，不共享',
                      zh_CN: '正版账户，不共享',
                      ru: 'Подлинный аккаунт, не общий',
                      kr: '정품 계정, 공유되지 않음'
                    })}
                  </li>
                  <li className="flex items-start">
                    <FaShieldAlt className="mr-2 mt-1 flex-shrink-0" />
                    {getText({ 
                      vi: 'Bảo hành đổi mới khi có lỗi từ nhà cung cấp', 
                      en: 'Warranty replacement for provider errors', 
                      zh_TW: '供應商錯誤保固更換',
                      zh_CN: '供应商错误保修更换',
                      ru: 'Гарантийная замена при ошибках поставщика',
                      kr: '공급업체 오류 시 보증 교체'
                    })}
                  </li>
                  <li className="flex items-start">
                    <FaRocket className="mr-2 mt-1 flex-shrink-0" />
                    {getText({ 
                      vi: 'Giao hàng tự động 24/7 sau khi thanh toán', 
                      en: 'Automatic delivery 24/7 after payment', 
                      zh_TW: '付款後24/7自動交付',
                      zh_CN: '付款后24/7自动交付',
                      ru: 'Автоматическая доставка 24/7 после оплаты',
                      kr: '결제 후 24/7 자동 배송'
                    })}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <ContactSection 
            title={getText({ 
              vi: 'Cần hỗ trợ thêm?', 
              en: 'Need additional support?', 
              zh_TW: '需要額外支援？',
              zh_CN: '需要额外支持？',
              ru: 'Нужна дополнительная поддержка?',
              kr: '추가 지원이 필요하신가요?'
            })}
            description={getText({ 
              vi: 'Liên hệ với chúng tôi để được tư vấn chi tiết về dịch vụ', 
              en: 'Contact us for detailed consultation about the service',
              zh_TW: '聯繫我們獲得服務的詳細諮詢',
              zh_CN: '联系我们获得服务的详细咨询',
              ru: 'Свяжитесь с нами для подробной консультации по услуге',
              kr: '서비스에 대한 자세한 상담을 위해 저희에게 연락하세요'
            })}
            bgColor="bg-purple-50"
          />
        </div>
      </section>
    </div>
  );
} 