'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { createUrlWithLocale } from '../lib/url-utils';

/**
 * Hook để tạo links với locale params
 */
export function useLocalizedLink() {
  const { locale } = useLanguage();
  
  /**
   * Tạo link với locale hiện tại
   * @param path - Đường dẫn cơ bản
   * @param additionalParams - Các params khác (optional)
   * @returns URL với locale params
   */
  const createLink = (path: string, additionalParams?: Record<string, string>) => {
    return createUrlWithLocale(path, locale, additionalParams);
  };
  
  return { createLink, locale };
} 