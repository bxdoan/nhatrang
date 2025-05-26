'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Locale, defaultLocale, TranslationStructure, locales } from '../i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationStructure;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Lấy locale từ URL params, mặc định là 'vi'
  const getLocaleFromUrl = (): Locale => {
    const localeParam = searchParams.get('locale') as Locale;
    if (localeParam && locales.includes(localeParam)) {
      return localeParam;
    }
    return defaultLocale;
  };

  const [locale, setLocaleState] = useState<Locale>(getLocaleFromUrl());
  const [translations, setTranslations] = useState<TranslationStructure | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cập nhật locale khi URL params thay đổi
  useEffect(() => {
    const newLocale = getLocaleFromUrl();
    if (newLocale !== locale) {
      setLocaleState(newLocale);
    }
  }, [searchParams]);

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const response = await import(`../locales/${locale}.json`);
        setTranslations(response.default);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to default locale
        if (locale !== defaultLocale) {
          const fallbackResponse = await import(`../locales/${defaultLocale}.json`);
          setTranslations(fallbackResponse.default);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    // Tạo URL mới với locale param
    const params = new URLSearchParams(searchParams.toString());
    
    if (newLocale === defaultLocale) {
      // Nếu là locale mặc định, xóa param locale
      params.delete('locale');
    } else {
      // Nếu không phải locale mặc định, set param locale
      params.set('locale', newLocale);
    }
    
    // Tạo URL mới
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    
    // Navigate đến URL mới
    router.push(newUrl);
    
    // Cập nhật state
    setLocaleState(newLocale);
  };

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations || {} as TranslationStructure,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 