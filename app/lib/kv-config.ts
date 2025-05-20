import { kv } from '@vercel/kv';

// Cache config
export const CACHE_TTL_HOURS = parseInt(process.env.CACHE_TTL_HOURS || '10');
export const CACHE_TTL_SECONDS = CACHE_TTL_HOURS * 60 * 60;

// Khóa cho dữ liệu cache
export const FLIGHT_DATA_KEY = 'flight_data';
export const CACHE_TIMESTAMP_KEY = 'flight_data_timestamp';
export const API_CALL_COUNT_KEY = 'api_call_count';
export const API_CALL_DATE_KEY = 'api_call_date';

// Cài đặt API
export const API_KEY = process.env.AVIATIONSTACK_API_KEY || '';
export const MAX_API_CALLS_PER_DAY = parseInt(process.env.MAX_API_CALLS_PER_DAY || '3');

// Kiểm tra xem biến môi trường có được cấu hình đúng không
if (!API_KEY) {
  console.warn('AVIATIONSTACK_API_KEY không được cấu hình. Hãy đảm bảo thiết lập biến môi trường.');
}

// Export kv instance
export { kv }; 