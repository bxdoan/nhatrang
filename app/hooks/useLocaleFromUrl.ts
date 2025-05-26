'use client';

import { useSearchParams } from 'next/navigation';
import { Locale, locales, defaultLocale } from '../i18n';

export function useLocaleFromUrl(): Locale {
  const searchParams = useSearchParams();
  const localeParam = searchParams.get('locale') as Locale;
  
  // Kiểm tra xem locale param có hợp lệ không
  if (localeParam && locales.includes(localeParam)) {
    return localeParam;
  }
  
  // Trả về locale mặc định nếu không có param hoặc param không hợp lệ
  return defaultLocale;
} 