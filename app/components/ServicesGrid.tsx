'use client';

import ServiceCard from './ServiceCard';
import { useLanguage } from '../contexts/LanguageContext';

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

interface ServicesGridProps {
  services: Service[];
  onZaloClick?: (serviceName: string) => void;
}

export default function ServicesGrid({ services, onZaloClick }: ServicesGridProps) {
  const { locale } = useLanguage();

  // Hàm lấy văn bản theo ngôn ngữ
  const getText = (textObj: { vi: string; en: string; zh_TW: string; zh_CN?: string; ru?: string; kr?: string }) => {
    return textObj[locale as keyof typeof textObj] || textObj.vi;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.length > 0 ? (
        services.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onZaloClick={onZaloClick}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">
            {getText({ 
              vi: 'Không tìm thấy dịch vụ nào', 
              en: 'No services found', 
              zh_TW: '未找到任何服務',
              zh_CN: '未找到任何服务',
              ru: 'Услуги не найдены',
              kr: '서비스를 찾을 수 없습니다'
            })}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {getText({ 
              vi: 'Thử thay đổi bộ lọc để xem thêm dịch vụ', 
              en: 'Try changing the filters to see more services', 
              zh_TW: '嘗試更改過濾器以查看更多服務',
              zh_CN: '尝试更改过滤器以查看更多服务',
              ru: 'Попробуйте изменить фильтры, чтобы увидеть больше услуг',
              kr: '더 많은 서비스를 보려면 필터를 변경해 보세요'
            })}
          </p>
        </div>
      )}
    </div>
  );
} 