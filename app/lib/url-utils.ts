import { Locale, defaultLocale } from '../i18n';

/**
 * Tạo URL với locale param
 * @param path - Đường dẫn cơ bản (ví dụ: '/car', '/moto')
 * @param locale - Locale hiện tại
 * @param additionalParams - Các params khác (optional)
 * @returns URL đầy đủ với locale param
 */
export function createUrlWithLocale(
  path: string, 
  locale: Locale, 
  additionalParams?: Record<string, string>
): string {
  const params = new URLSearchParams();
  
  // Chỉ thêm locale param nếu không phải locale mặc định
  if (locale !== defaultLocale) {
    params.set('locale', locale);
  }
  
  // Thêm các params khác nếu có
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      params.set(key, value);
    });
  }
  
  // Tạo URL cuối cùng
  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
}

/**
 * Lấy locale từ URL search params
 * @param searchParams - URLSearchParams object
 * @returns Locale hoặc default locale
 */
export function getLocaleFromSearchParams(searchParams: URLSearchParams): Locale {
  const localeParam = searchParams.get('locale') as Locale;
  
  // Import locales để kiểm tra
  const { locales } = require('../i18n');
  
  if (localeParam && locales.includes(localeParam)) {
    return localeParam;
  }
  
  return defaultLocale;
}

/**
 * Cập nhật URL hiện tại với locale mới
 * @param currentUrl - URL hiện tại
 * @param newLocale - Locale mới
 * @returns URL mới với locale được cập nhật
 */
export function updateUrlWithLocale(currentUrl: string, newLocale: Locale): string {
  const url = new URL(currentUrl, window.location.origin);
  const params = new URLSearchParams(url.search);
  
  if (newLocale === defaultLocale) {
    params.delete('locale');
  } else {
    params.set('locale', newLocale);
  }
  
  const queryString = params.toString();
  return queryString ? `${url.pathname}?${queryString}` : url.pathname;
} 