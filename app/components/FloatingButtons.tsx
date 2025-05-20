'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaPhone, FaArrowUp, FaArrowDown, FaTelegram, FaComment, FaTimes, FaSlack } from 'react-icons/fa';
import { CONTACT_INFO } from '../lib/contact-config';

type ButtonType = 'contact' | 'top' | 'bottom';

export default function FloatingButtons() {
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [showTooltip, setShowTooltip] = useState({ contact: false, top: false, bottom: false });
  const [showContactMenu, setShowContactMenu] = useState(false);
  const contactMenuRef = useRef<HTMLDivElement>(null);
  
  // Xử lý hiển thị nút scroll khi cuộn xuống
  useEffect(() => {
    const handleScroll = () => {
      // Hiển thị các nút cuộn khi người dùng đã cuộn xuống dưới
      if (window.scrollY > 300) {
        setShowScrollButtons(true);
      } else {
        setShowScrollButtons(false);
      }
    };
    
    // Gắn sự kiện scroll
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Xử lý đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target as Node)) {
        setShowContactMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Hàm cuộn xuống cuối trang
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };
  
  // Xử lý hiển thị tooltip
  const handleMouseEnter = (button: ButtonType) => {
    setShowTooltip({ ...showTooltip, [button]: true });
  };
  
  const handleMouseLeave = (button: ButtonType) => {
    setShowTooltip({ ...showTooltip, [button]: false });
  };
  
  // Xử lý đóng/mở menu liên hệ
  const toggleContactMenu = () => {
    setShowContactMenu(!showContactMenu);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Nút liên hệ nhanh - luôn hiển thị */}
      <div className="relative" ref={contactMenuRef}
        onMouseEnter={() => handleMouseEnter('contact')} 
        onMouseLeave={() => handleMouseLeave('contact')}
      >
        <button 
          onClick={toggleContactMenu}
          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Liên hệ nhanh"
        >
          {showContactMenu ? (
            <FaTimes className="text-xl group-hover:scale-110 transition-transform" />
          ) : (
            <FaPhone className="text-xl group-hover:scale-110 transition-transform" />
          )}
        </button>
        
        {/* Tooltip cho nút liên hệ */}
        {showTooltip.contact && !showContactMenu && (
          <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap animate-fade-in">
            Liên hệ nhanh
            <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        )}
        
        {/* Menu liên hệ dropdown */}
        {showContactMenu && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl py-2 w-48 animate-fade-in">
            <div className="px-3 py-2 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-700">Liên hệ nhanh</h3>
            </div>
            
            <a href={`tel:${CONTACT_INFO.phoneNumber}`} className="flex items-center px-3 py-2.5 hover:bg-gray-50 text-gray-700">
              <FaPhone className="mr-2 text-green-600" />
              <span className="text-sm">Gọi điện thoại</span>
            </a>
            
            <a href={`https://zalo.me/${CONTACT_INFO.phoneNumber}`} target="_blank" rel="noreferrer" className="flex items-center px-3 py-2.5 hover:bg-gray-50 text-gray-700">
              <div className="mr-2 flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-sm text-xs font-bold">Z</div>
              <span className="text-sm">Nhắn tin Zalo</span>
            </a>
            
            <a href={`https://t.me/${CONTACT_INFO.telegramUsername}`} target="_blank" rel="noreferrer" className="flex items-center px-3 py-2.5 hover:bg-gray-50 text-gray-700">
              <FaTelegram className="mr-2 text-blue-500" />
              <span className="text-sm">Nhắn tin Telegram</span>
            </a>
            
            <Link href="/contact" className="flex items-center px-3 py-2.5 hover:bg-gray-50 text-gray-700 border-t border-gray-100">
              <FaComment className="mr-2 text-blue-600" />
              <span className="text-sm">Trang liên hệ</span>
            </Link>
          </div>
        )}
      </div>
      
      {/* Nút cuộn lên đầu trang - chỉ hiển thị khi đã cuộn */}
      {showScrollButtons && (
        <div className="relative"
          onMouseEnter={() => handleMouseEnter('top')} 
          onMouseLeave={() => handleMouseLeave('top')}
        >
          <button
            onClick={scrollToTop}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-fade-in"
            aria-label="Cuộn lên trên"
          >
            <FaArrowUp className="text-xl group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Tooltip cho nút cuộn lên */}
          {showTooltip.top && (
            <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap animate-fade-in">
              Lên đầu trang
              <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
            </div>
          )}
        </div>
      )}
      
      {/* Nút cuộn xuống cuối trang - chỉ hiển thị khi đã cuộn */}
      {showScrollButtons && (
        <div className="relative"
          onMouseEnter={() => handleMouseEnter('bottom')} 
          onMouseLeave={() => handleMouseLeave('bottom')}
        >
          <button
            onClick={scrollToBottom}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-fade-in"
            aria-label="Cuộn xuống cuối trang"
          >
            <FaArrowDown className="text-xl group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Tooltip cho nút cuộn xuống */}
          {showTooltip.bottom && (
            <div className="absolute -left-28 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap animate-fade-in">
              Xuống cuối trang
              <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 