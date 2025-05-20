import { format } from 'date-fns';
import { kv, 
  FLIGHT_DATA_KEY, 
  CACHE_TIMESTAMP_KEY, 
  CACHE_TTL_SECONDS,
  API_CALL_COUNT_KEY,
  API_CALL_DATE_KEY,
  MAX_API_CALLS_PER_DAY
} from './kv-config';

// Kiểm tra xem dữ liệu cache có khả dụng và còn mới không
export async function getCachedFlightData() {
  try {
    // Lấy dữ liệu và timestamp
    const data = await kv.get(FLIGHT_DATA_KEY);
    const timestamp = await kv.get<number>(CACHE_TIMESTAMP_KEY);

    // Nếu không có dữ liệu hoặc timestamp
    if (!data || !timestamp) {
      console.log('Không có dữ liệu cache');
      return null;
    }

    // Kiểm tra xem dữ liệu có quá cũ không
    const now = Date.now();
    const cacheAge = now - timestamp;
    
    if (cacheAge > CACHE_TTL_SECONDS * 1000) {
      console.log('Dữ liệu cache đã hết hạn');
      return null;
    }

    // Tính toán thời gian còn lại của cache
    const cacheExpiryMinutes = Math.round((CACHE_TTL_SECONDS * 1000 - cacheAge) / (60 * 1000));
    console.log(`Dữ liệu cache còn hiệu lực trong ${cacheExpiryMinutes} phút`);

    return data;
  } catch (error) {
    console.error('Lỗi khi đọc dữ liệu cache:', error);
    return null;
  }
}

// Lưu dữ liệu mới vào cache
export async function cacheFlightData(data: any) {
  try {
    const now = Date.now();
    
    // Lưu dữ liệu và timestamp
    await kv.set(FLIGHT_DATA_KEY, data);
    await kv.set(CACHE_TIMESTAMP_KEY, now);
    
    console.log(`Đã lưu dữ liệu vào cache vào lúc ${new Date(now).toLocaleString()}`);
    return true;
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu cache:', error);
    return false;
  }
}

// Kiểm tra và cập nhật số lần gọi API trong ngày
export async function checkAndUpdateApiCallLimit() {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');
    const savedDate = await kv.get<string>(API_CALL_DATE_KEY);
    
    // Reset counter nếu ngày mới
    if (savedDate !== today) {
      await kv.set(API_CALL_COUNT_KEY, 1);
      await kv.set(API_CALL_DATE_KEY, today);
      console.log(`Bắt đầu đếm API call cho ngày mới: ${today}`);
      return true;
    }
    
    // Kiểm tra số lần gọi API trong ngày
    const callCount = await kv.get<number>(API_CALL_COUNT_KEY) || 0;
    
    if (callCount >= MAX_API_CALLS_PER_DAY) {
      console.log(`Đã đạt giới hạn ${MAX_API_CALLS_PER_DAY} lần gọi API trong ngày`);
      return false;
    }
    
    // Tăng số lần gọi API
    await kv.set(API_CALL_COUNT_KEY, callCount + 1);
    console.log(`Đã sử dụng ${callCount + 1}/${MAX_API_CALLS_PER_DAY} lần gọi API trong ngày`);
    return true;
  } catch (error) {
    console.error('Lỗi khi kiểm tra giới hạn API:', error);
    // Cho phép gọi API trong trường hợp lỗi để đảm bảo dịch vụ vẫn hoạt động
    return true;
  }
}

// Lấy thông tin về số lần gọi API và thời gian cache
export async function getCacheStats() {
  try {
    const timestamp = await kv.get<number>(CACHE_TIMESTAMP_KEY) || 0;
    const callCount = await kv.get<number>(API_CALL_COUNT_KEY) || 0;
    const callDate = await kv.get<string>(API_CALL_DATE_KEY) || format(new Date(), 'yyyy-MM-dd');
    
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