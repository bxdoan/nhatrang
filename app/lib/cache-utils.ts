import { format } from 'date-fns';
import { redis, 
  FLIGHT_DATA_KEY, 
  CACHE_TIMESTAMP_KEY, 
  CACHE_TTL_SECONDS,
  API_CALL_COUNT_KEY,
  API_CALL_DATE_KEY,
  MAX_API_CALLS_PER_DAY,
  NO_LIMIT
} from './redis-config';

// Global flag để ngăn multiple API calls cùng lúc
let isApiCallInProgress = false;
const apiCallQueue = new Map<string, Promise<any>>();

// Kiểm tra xem dữ liệu cache có khả dụng và còn mới không
export async function getCachedFlightData(cacheKey = 'default') {
  try {
    // Tạo key duy nhất cho dữ liệu và timestamp
    const dataKey = `${FLIGHT_DATA_KEY}:${cacheKey}`;
    const timestampKey = `${CACHE_TIMESTAMP_KEY}:${cacheKey}`;
    
    // Lấy dữ liệu và timestamp
    const dataJson = await redis.get(dataKey);
    const timestampStr = await redis.get(timestampKey);
    
    // Nếu không có dữ liệu hoặc timestamp
    if (!dataJson || !timestampStr) {
      console.log(`Không có dữ liệu cache cho key: ${cacheKey}`);
      return null;
    }

    // Kiểm tra xem dữ liệu có quá cũ không
    const timestamp = parseInt(timestampStr);
    const now = Date.now();
    const cacheAge = now - timestamp;
    
    if (cacheAge > CACHE_TTL_SECONDS * 1000) {
      console.log(`Dữ liệu cache cho key ${cacheKey} đã hết hạn`);
      return null;
    }

    // Tính toán thời gian còn lại của cache
    const cacheExpiryMinutes = Math.round((CACHE_TTL_SECONDS * 1000 - cacheAge) / (60 * 1000));
    console.log(`Dữ liệu cache cho key ${cacheKey} còn hiệu lực trong ${cacheExpiryMinutes} phút`);

    // Parse dữ liệu JSON
    return JSON.parse(dataJson);
  } catch (error) {
    console.error('Lỗi khi đọc dữ liệu cache:', error);
    return null;
  }
}

// Lưu dữ liệu mới vào cache
export async function cacheFlightData(data: any, cacheKey = 'default') {
  try {
    const now = Date.now();
    
    // Tạo key duy nhất cho dữ liệu và timestamp
    const dataKey = `${FLIGHT_DATA_KEY}:${cacheKey}`;
    const timestampKey = `${CACHE_TIMESTAMP_KEY}:${cacheKey}`;
    
    // Lưu dữ liệu và timestamp
    await redis.set(dataKey, JSON.stringify(data));
    await redis.set(timestampKey, now.toString());
    
    // Thiết lập thời gian tự động hết hạn
    await redis.expire(dataKey, CACHE_TTL_SECONDS);
    await redis.expire(timestampKey, CACHE_TTL_SECONDS);
    
    console.log(`Đã lưu dữ liệu vào cache với key ${cacheKey} vào lúc ${new Date(now).toLocaleString()}`);
    return true;
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu cache:', error);
    return false;
  }
}

// Kiểm tra và cập nhật số lần gọi API trong ngày với debounce
export async function checkAndUpdateApiCallLimit() {
  try {
    // Nếu NO_LIMIT=true, bỏ qua giới hạn API
    if (NO_LIMIT) {
      console.log('Bỏ qua kiểm tra giới hạn API do NO_LIMIT=true');
      return true;
    }
    
    // Kiểm tra nếu đang có API call khác đang thực hiện
    if (isApiCallInProgress) {
      console.log('API call đang trong tiến trình, từ chối request mới');
      return false;
    }
    
    const today = format(new Date(), 'yyyy-MM-dd');
    const savedDate = await redis.get(API_CALL_DATE_KEY);
    
    // Reset counter nếu ngày mới
    if (savedDate !== today) {
      await redis.set(API_CALL_COUNT_KEY, '1');
      await redis.set(API_CALL_DATE_KEY, today);
      console.log(`Bắt đầu đếm API call cho ngày mới: ${today}`);
      isApiCallInProgress = true;
      return true;
    }
    
    // Kiểm tra số lần gọi API trong ngày
    const callCountStr = await redis.get(API_CALL_COUNT_KEY);
    const callCount = callCountStr ? parseInt(callCountStr) : 0;
    
    if (callCount >= MAX_API_CALLS_PER_DAY) {
      console.log(`Đã đạt giới hạn ${MAX_API_CALLS_PER_DAY} lần gọi API trong ngày`);
      return false;
    }
    
    // Tăng số lần gọi API
    await redis.set(API_CALL_COUNT_KEY, (callCount + 1).toString());
    console.log(`Đã sử dụng ${callCount + 1}/${MAX_API_CALLS_PER_DAY} lần gọi API trong ngày`);
    isApiCallInProgress = true;
    return true;
  } catch (error) {
    console.error('Lỗi khi kiểm tra giới hạn API:', error);
    // Cho phép gọi API trong trường hợp lỗi để đảm bảo dịch vụ vẫn hoạt động
    return true;
  }
}

// Reset API call flag sau khi hoàn thành
export function resetApiCallFlag() {
  isApiCallInProgress = false;
}

// Debounced API call để tránh multiple calls
export async function debouncedApiCall<T>(
  key: string, 
  apiCallFunction: () => Promise<T>,
  debounceMs: number = 1000
): Promise<T> {
  // Kiểm tra xem có API call nào đang pending cho cùng key không
  if (apiCallQueue.has(key)) {
    console.log(`API call cho key ${key} đang pending, sử dụng promise hiện tại`);
    return apiCallQueue.get(key)!;
  }
  
  // Tạo promise mới cho API call
  const apiPromise = new Promise<T>(async (resolve, reject) => {
    try {
      // Debounce delay
      await new Promise(r => setTimeout(r, debounceMs));
      
      // Kiểm tra lại xem có API call khác đã hoàn thành không
      if (apiCallQueue.has(key)) {
        const result = await apiCallFunction();
        resolve(result);
      } else {
        resolve(await apiCallFunction());
      }
    } catch (error) {
      reject(error);
    } finally {
      // Cleanup
      apiCallQueue.delete(key);
      resetApiCallFlag();
    }
  });
  
  // Lưu promise vào queue
  apiCallQueue.set(key, apiPromise);
  
  return apiPromise;
}

// Lấy thông tin về số lần gọi API và thời gian cache với cache key mặc định
export async function getCacheStats(cacheKey = 'flights_100_0') {
  try {
    // Sử dụng cacheKey giống như trong các function khác
    const timestampKey = `${CACHE_TIMESTAMP_KEY}:${cacheKey}`;
    const timestampStr = await redis.get(timestampKey);
    const callCountStr = await redis.get(API_CALL_COUNT_KEY);
    const callDate = await redis.get(API_CALL_DATE_KEY) || format(new Date(), 'yyyy-MM-dd');
    
    const timestamp = timestampStr ? parseInt(timestampStr) : 0;
    const callCount = callCountStr ? parseInt(callCountStr) : 0;
    
    const cacheTime = timestamp ? new Date(timestamp).toLocaleString() : 'Chưa có';
    const cacheAge = timestamp ? Math.round((Date.now() - timestamp) / (60 * 1000)) : 0;
    const cacheExpiryMinutes = timestamp ? 
      Math.max(0, Math.round((CACHE_TTL_SECONDS * 1000 - (Date.now() - timestamp)) / (60 * 1000))) : 0;
    
    return {
      lastUpdate: cacheTime,
      cacheAgeMinutes: cacheAge,
      cacheExpiryMinutes,
      apiCallCount: callCount,
      apiCallDate: callDate,
      maxApiCalls: MAX_API_CALLS_PER_DAY
    };
  } catch (error) {
    console.error('Lỗi khi lấy thông tin cache:', error);
    return null;
  }
} 