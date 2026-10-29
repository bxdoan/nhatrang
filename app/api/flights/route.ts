import { NextResponse } from 'next/server';
import axios from 'axios';
import { API_KEY, NO_LIMIT, MAX_API_CALLS_PER_DAY } from '../../lib/redis-config';
import { 
  getCachedFlightData, 
  cacheFlightData, 
  checkAndUpdateApiCallLimit,
  getCacheStats,
  resetApiCallFlag,
  debouncedApiCall
} from '../../lib/cache-utils';

// Đánh dấu route này là động
export const dynamic = 'force-dynamic';

// API configuration
const AIRPORT_CODE = 'CXR';  // Mã IATA sân bay Cam Ranh
const BASE_URL = 'https://api.aviationstack.com/v1/flights';
const DEFAULT_LIMIT = 100;  // Giới hạn mặc định số lượng chuyến bay

// Get flights API route
export async function GET(request: Request) {
  try {
    // Lấy tham số từ URL
    const { searchParams } = new URL(request.url);
    if (searchParams.has('date')) return NextResponse.json({error: 'Gói miễn phí không hỗ trợ lịch sử chuyến bay.'}, {status: 400});
    const limit = 100;
    const offset = 0;
    if (!API_KEY) return NextResponse.json({error: 'Chưa cấu hình dữ liệu chuyến bay.'}, {status: 503});
    
    // Tạo cache key dựa trên params
    const cacheKey = `flights_live_${limit}_${offset}`;
    
    // Nếu không yêu cầu làm mới, kiểm tra cache trước
    let cachedData = null;
    {
      try {
        cachedData = await getCachedFlightData(cacheKey);
      } catch (cacheError) {
        console.error('Lỗi khi đọc cache:', cacheError);
        // Tiếp tục mà không cần dừng nếu cache không hoạt động
      }
      
      // Nếu có dữ liệu cache hợp lệ, trả về luôn
      if (cachedData) {
        // Lấy thông tin về cache cho client
        let stats = { 
          lastUpdate: '',
          cacheAgeMinutes: 0,
          cacheExpiryMinutes: 0,
          apiCallCount: 0,
          apiCallDate: '',
          maxApiCalls: MAX_API_CALLS_PER_DAY
        };
        
        try {
          const cacheStats = await getCacheStats(cacheKey);
          if (cacheStats) {
            stats = cacheStats;
          }
        } catch (statsError) {
          console.error('Lỗi khi lấy thông tin cache:', statsError);
        }
        
        // Trả về dữ liệu từ cache với thông tin thêm
        return NextResponse.json({
          ...cachedData,
          cache: {
            source: 'cache',
            ...stats,
            noLimit: NO_LIMIT
          }
        });
      }
    }
    
    // Sử dụng debounced API call để tránh multiple calls
    const apiCallResult = await debouncedApiCall(
      `flight_api_${cacheKey}`,
      async () => {
        // Kiểm tra xem còn lượt gọi API không
        let canCallApi = true;
        try {
          canCallApi = await checkAndUpdateApiCallLimit();
        } catch (limitError) {
          console.error('Lỗi khi kiểm tra giới hạn API:', limitError);
          return Promise.reject(new Error('QUOTA_STORAGE_UNAVAILABLE'));
        }
        
        if (!canCallApi) {
          // Nếu hết lượt gọi API, trả về lỗi
          let stats = { 
            lastUpdate: '',
            cacheAgeMinutes: 0,
            cacheExpiryMinutes: 0, 
            apiCallCount: 0,
            apiCallDate: '',
            maxApiCalls: MAX_API_CALLS_PER_DAY
          };
          
          try {
            const cacheStats = await getCacheStats(cacheKey);
            if (cacheStats) {
              stats = cacheStats;
            }
          } catch (statsError) {
            console.error('Lỗi khi lấy thông tin cache:', statsError);
          }
          
          throw new Error('API_LIMIT_REACHED');
        }
        
        // Set up request parameters
        const params = {
          access_key: API_KEY,
          arr_iata: AIRPORT_CODE,
          limit: limit,
          offset: offset
        };

        // Make request to AviationStack API
        const response = await axios.get(BASE_URL, { params });
        
        if (response.data.error) throw new Error('PROVIDER_ERROR');
        // Lưu dữ liệu vào cache
        try {
          await cacheFlightData(response.data, cacheKey);
        } catch (cacheError) {
          console.error('Lỗi khi lưu cache:', cacheError);
          // Tiếp tục mà không dừng nếu cache không hoạt động
        }
        
        return response.data;
      },
      500  // 500ms debounce
    );
    
    // Kiểm tra nếu là lỗi giới hạn API
    if (apiCallResult instanceof Error && apiCallResult.message === 'API_LIMIT_REACHED') {
      let stats = { 
        lastUpdate: '',
        cacheAgeMinutes: 0,
        cacheExpiryMinutes: 0, 
        apiCallCount: 0,
        apiCallDate: '',
        maxApiCalls: MAX_API_CALLS_PER_DAY
      };
      
      try {
        const cacheStats = await getCacheStats(cacheKey);
        if (cacheStats) {
          stats = cacheStats;
        }
      } catch (statsError) {
        console.error('Lỗi khi lấy thông tin cache:', statsError);
      }
      
      return NextResponse.json({
        error: {
          message: 'Đã đạt hạn mức cập nhật dữ liệu trong tháng',
          details: 'Dữ liệu sẽ được cập nhật khi hạn mức được đặt lại.'
        },
        cache: {
          source: 'error',
          ...stats,
          noLimit: NO_LIMIT
        }
      }, { status: 429 });
    }
    
    // Lấy thông tin về cache cho client
    let stats = { 
      lastUpdate: '',
      cacheAgeMinutes: 0,
      cacheExpiryMinutes: 0,
      apiCallCount: 0,
      apiCallDate: '',
      maxApiCalls: MAX_API_CALLS_PER_DAY
    };
    
    try {
      const cacheStats = await getCacheStats(cacheKey);
      if (cacheStats) {
        stats = cacheStats;
      }
    } catch (statsError) {
      console.error('Lỗi khi lấy thông tin cache:', statsError);
    }
    
    // Return the API response with cache info
    return NextResponse.json({
      ...apiCallResult,
      cache: {
        source: 'api',
        ...stats,
        noLimit: NO_LIMIT
      }
    });
  } catch (error: any) {
    console.error('Error fetching flight data');
    
    // Reset API call flag trong trường hợp lỗi
    resetApiCallFlag();
    
    // Handle error
    return NextResponse.json(
      { 
        error: 'Failed to fetch flight data',
        message: 'Không thể cập nhật dữ liệu chuyến bay. Vui lòng thử lại sau.'
      },
      { status: 500 }
    );
  }
}

// Endpoint để lấy thông tin cache
export async function HEAD(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const cacheKey = `flights_${limit}_${offset}`;
    
    const stats = await getCacheStats(cacheKey);
    
    return NextResponse.json({ cache: stats });
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return NextResponse.json({ error: 'Failed to get cache stats' }, { status: 500 });
  }
} 