'use client';

import { FaPhone, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { CONTACT_INFO } from '../lib/contact-config';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactSectionProps {
  title?: string;
  description?: string;
  bgColor?: string;
  phoneNumber?: string;
  showSecondPhone?: boolean;
}

export default function ContactSection({ 
  title, 
  description, 
  bgColor = 'bg-blue-50',
  phoneNumber = CONTACT_INFO.phoneNumber,
  showSecondPhone = false
}: ContactSectionProps) {
  const { t } = useLanguage();

  const handlePhoneClick = (phone: string) => {
    // Analytics tracking có thể thêm ở đây
    console.log('Phone clicked:', phone);
  };

  const handleZaloClick = () => {
    // Analytics tracking có thể thêm ở đây
    console.log('Zalo clicked');
  };

  const handleTelegramClick = () => {
    // Analytics tracking có thể thêm ở đây
    console.log('Telegram clicked');
  };

  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-sm text-center`}>
      <h2 className="text-xl font-bold mb-4">
        {title || t.common?.contactForBooking || 'Liên hệ để đặt dịch vụ'}
      </h2>
      <p className="text-gray-700 mb-6">
        {description || 'Liên hệ với chúng tôi để được tư vấn và hỗ trợ dịch vụ tại Nha Trang'}
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a 
          href={`tel:${phoneNumber}`}
          onClick={() => handlePhoneClick(phoneNumber)}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
        >
          <FaPhone className="mr-2" /> {t.common?.callNow || 'Gọi ngay'}: {phoneNumber}
        </a>
        {showSecondPhone && CONTACT_INFO.phoneNumber2 && (
          <a 
            href={`tel:${CONTACT_INFO.phoneNumber2}`}
            onClick={() => handlePhoneClick(CONTACT_INFO.phoneNumber2)}
            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <FaPhone className="mr-2" /> {t.common?.callNow || 'Gọi ngay'}: {CONTACT_INFO.phoneNumber2}
          </a>
        )}
        <a 
          href={`https://zalo.me/${phoneNumber}`}
          onClick={handleZaloClick}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
        >
          <FaWhatsapp className="mr-2" /> {t.common?.messageZalo || 'Nhắn tin qua Zalo'}
        </a>
        <a 
          href={`https://t.me/${CONTACT_INFO.telegramUsername}`}
          onClick={handleTelegramClick}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors"
        >
          <FaTelegram className="mr-2" /> {t.common?.messageTelegram || 'Nhắn tin qua Telegram'}
        </a>
      </div>
    </div>
  );
} 