import Redis from 'ioredis';

// Cấu hình Redis URL
const REDIS_URL = process.env.REDIS_URL;

// Kết nối Redis với xử lý lỗi
let redis: Redis;

try {
  redis = REDIS_URL
    ? new Redis(REDIS_URL, { maxRetriesPerRequest: 1, connectTimeout: 3000, lazyConnect: true })
    : new Redis({ host: '127.0.0.1', port: 6379, maxRetriesPerRequest: 1, connectTimeout: 3000, lazyConnect: true });
  
  // Kiểm tra kết nối Redis
  redis.on('error', (error) => {
    console.error('Lỗi kết nối Redis:', error);
  });

  redis.on('connect', () => {
    console.log('Đã kết nối thành công đến Redis');
  });
} catch (error) {
  console.error('Không thể khởi tạo kết nối Redis:', error);
  // Tạo instance Redis giả để tránh lỗi
  redis = new Redis({
    host: 'localhost',
    port: 6379,
    lazyConnect: true,
  });
}

// Cache config
export const CACHE_TTL_HOURS = parseInt(process.env.CACHE_TTL_HOURS || '10');
export const CACHE_TTL_SECONDS = CACHE_TTL_HOURS * 60 * 60;

// API call limit config
export const NO_LIMIT = process.env.NO_LIMIT === 'true';
export const MAX_API_CALLS_PER_DAY = parseInt(process.env.MAX_API_CALLS_PER_DAY || '3');

// Khóa cho dữ liệu cache
export const FLIGHT_DATA_KEY = 'flight_data';
export const CACHE_TIMESTAMP_KEY = 'flight_data_timestamp';
export const API_CALL_COUNT_KEY = 'api_call_count';
export const API_CALL_DATE_KEY = 'api_call_date';

// Cài đặt API
export const API_KEY = process.env.AVIATIONSTACK_API_KEY || '';

// Kiểm tra xem biến môi trường có được cấu hình đúng không
if (!API_KEY) {
  console.warn('AVIATIONSTACK_API_KEY không được cấu hình. Hãy đảm bảo thiết lập biến môi trường.');
}

if (!REDIS_URL) {
  console.warn('REDIS_URL không được cấu hình. Hãy đảm bảo thiết lập biến môi trường.');
}


export { redis }; 