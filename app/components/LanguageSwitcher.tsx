'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { locales, Locale } from '../i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getLanguageLabel = (lang: Locale) => {
    switch (lang) {
      case 'vi':
        return 'Tiếng Việt';
      case 'en':
        return 'English';
      case 'kr':
        return '한국어';
      case 'zh_CN':
        return '简体中文';
      case 'zh_TW':
        return '繁體中文';
      case 'ru':
        return 'Русский';
      default:
        return lang;
    }
  };

  const getFlag = (lang: Locale) => {
    switch (lang) {
      case 'vi':
        return (
          <img 
            src="https://flagcdn.com/w40/vn.png" 
            alt="Việt Nam" 
            className="w-6 h-4 object-cover rounded-sm"
          />
        );
      case 'en':
        return (
          <img 
            src="https://flagcdn.com/w40/us.png" 
            alt="United States" 
            className="w-6 h-4 object-cover rounded-sm"
          />
        );
      case 'kr':
        return (
          <img 
            src="https://flagcdn.com/w40/kr.png" 
            alt="대한민국" 
            className="w-6 h-4 object-cover rounded-sm"
          />
        );
      case 'zh_CN':
        return (
          <img 
            src="https://flagcdn.com/w40/cn.png" 
            alt="中华人民共和国" 
            className="w-6 h-4 object-cover rounded-sm"
          />
        );
      case 'zh_TW':
        return (
          <img 
            src="https://flagcdn.com/w40/tw.png" 
            alt="中華民國" 
            className="w-6 h-4 object-cover rounded-sm"
          />
        );
      case 'ru':
        return (
          <img 
            src="https://flagcdn.com/w40/ru.png" 
            alt="Россия" 
            className="w-6 h-4 object-cover rounded-sm"
          />
        );
      default:
        return null;
    }
  };

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Flag Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        title={getLanguageLabel(locale)}
      >
        {getFlag(locale)}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {locales.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                  locale === lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <div className="mr-3">{getFlag(lang)}</div>
                <span className="font-medium">{getLanguageLabel(lang)}</span>
                {locale === lang && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 