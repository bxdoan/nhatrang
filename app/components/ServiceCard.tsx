'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  FaStar, 
  FaCheck, 
  FaRocket,
  FaFire,
  FaWhatsapp
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocalizedLink } from '../hooks/useLocalizedLink';
import { CONTACT_INFO } from '../lib/contact-config';

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

interface ServiceCardProps {
  service: Service;
  onZaloClick?: (serviceName: string) => void;
}

export default function ServiceCard({ service, onZaloClick }: ServiceCardProps) {
  const { locale } = useLanguage();
  const { createLink } = useLocalizedLink();
  const [imageError, setImageError] = useState(false);

  // Hàm format giá
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  // Hàm tính phần trăm giảm giá
  const calculateDiscount = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Hàm lấy văn bản theo ngôn ngữ
  const getText = (textObj: { vi: string; en: string; zh_TW: string; zh_CN?: string; ru?: string; kr?: string }) => {
    return textObj[locale as keyof typeof textObj] || textObj.vi;
  };

  // Hàm lấy features array theo ngôn ngữ
  const getFeatures = (featuresObj: { vi: string[]; en: string[]; zh_TW: string[]; zh_CN?: string[]; ru?: string[]; kr?: string[] }) => {
    return featuresObj[locale as keyof typeof featuresObj] || featuresObj.vi;
  };

  const handleZaloClick = (e: React.MouseEvent, serviceName: string) => {
    e.stopPropagation(); // Ngăn event bubble up tới card
    if (onZaloClick) {
      onZaloClick(serviceName);
    }
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

  return (
    <Link href={createLink(`/services/${service.slug}`)}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
        {/* Service Image */}
        <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100">
          {/* Hiển thị hình ảnh nếu có và không bị lỗi */}
          {service.image && !imageError ? (
            <Image
              src={service.image}
              alt={getText(service.name)}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Fallback về icon nếu không có image hoặc bị lỗi */
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl opacity-30">
                {getServiceIcon(service.categories)}
              </div>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {service.auto_delivery && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <FaRocket className="mr-1" />
                {getText({ vi: 'Tự động', en: 'Auto', zh_TW: '自動' })}
              </span>
            )}
            {calculateDiscount(service.price, service.price_original) > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <FaFire className="mr-1" />
                -{calculateDiscount(service.price, service.price_original)}%
              </span>
            )}
          </div>
          
          {/* Rating */}
          <div className="absolute top-2 right-2">
            <div className="bg-white rounded-full px-2 py-1 flex items-center">
              <FaStar className="text-yellow-400 mr-1 text-xs" />
              <span className="text-xs font-medium">{service.rating}</span>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {getText(service.name)}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {getText(service.description)}
          </p>

          {/* Features */}
          <div className="mb-3">
            <ul className="space-y-1">
              {getFeatures(service.features).slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <FaCheck className="text-green-500 mr-2 text-xs" />
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-purple-600">
                {formatPrice(service.price)}
              </span>
              {service.price_original > service.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(service.price_original)}
                </span>
              )}
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>
                {getText({ vi: 'Đã bán', en: 'Sold', zh_TW: '已售', zh_CN: '已售', ru: 'Продано', kr: '판매됨' })}: {service.sold}
              </span>
              <span>
                {getText({ vi: 'Bảo hành', en: 'Warranty', zh_TW: '保固', zh_CN: '保固', ru: 'Гарантия', kr: '보증' })}: {service.warranty} {getText({ vi: 'ngày', en: 'days', zh_TW: '天', zh_CN: '天', ru: 'дней', kr: '일' })}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <a
              href={`https://zalo.me/${CONTACT_INFO.phoneNumber}?text=${encodeURIComponent(`Tôi muốn mua dịch vụ: ${getText(service.name)}`)}`}
              onClick={(e) => handleZaloClick(e, getText(service.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
            >
              <FaWhatsapp className="mr-2" />
              {getText({ vi: 'Chat Zalo', en: 'Chat Zalo', zh_TW: 'Zalo聊天' })}
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
} 