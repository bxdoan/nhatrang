import { NextResponse } from 'next/server';
import axios from 'axios';
import { API_KEY, NO_LIMIT, MAX_API_CALLS_PER_DAY } from '../../lib/redis-config';
import { 
  getCachedFlightData, 
  cacheFlightData, 
  checkAndUpdateApiCallLimit,
  getCacheStats 
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
    const forceRefresh = searchParams.get('refresh') === 'true';
    const limit = parseInt(searchParams.get('limit') || String(DEFAULT_LIMIT));
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Tạo cache key dựa trên params
    const cacheKey = `flights_${limit}_${offset}`;
    
    // Nếu không yêu cầu làm mới, kiểm tra cache trước
    let cachedData = null;
    if (!forceRefresh) {
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
          const cacheStats = await getCacheStats();
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
    
    // Kiểm tra xem còn lượt gọi API không
    let canCallApi = true;
    try {
      canCallApi = await checkAndUpdateApiCallLimit();
    } catch (limitError) {
      console.error('Lỗi khi kiểm tra giới hạn API:', limitError);
      // Nếu không kiểm tra được, vẫn cho phép gọi API
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
        const cacheStats = await getCacheStats();
        if (cacheStats) {
          stats = cacheStats;
        }
      } catch (statsError) {
        console.error('Lỗi khi lấy thông tin cache:', statsError);
      }
      
      return NextResponse.json({
        error: {
          message: 'Đã đạt giới hạn gọi API cho ngày hôm nay',
          details: 'API chỉ được gọi 3 lần mỗi ngày'
        },
        cache: {
          source: 'error',
          ...stats,
          noLimit: NO_LIMIT
        }
      }, { status: 429 });
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
    
    // Lưu dữ liệu vào cache
    try {
      await cacheFlightData(response.data, cacheKey);
    } catch (cacheError) {
      console.error('Lỗi khi lưu cache:', cacheError);
      // Tiếp tục mà không dừng nếu cache không hoạt động
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
      const cacheStats = await getCacheStats();
      if (cacheStats) {
        stats = cacheStats;
      }
    } catch (statsError) {
      console.error('Lỗi khi lấy thông tin cache:', statsError);
    }
    
    // Return the API response with cache info
    return NextResponse.json({
      ...response.data,
      cache: {
        source: 'api',
        ...stats,
        noLimit: NO_LIMIT
      }
    });
  } catch (error: any) {
    console.error('Error fetching flight data:', error);
    
    // Handle error
    return NextResponse.json(
      { 
        error: 'Failed to fetch flight data',
        message: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Endpoint để lấy thông tin cache
export async function HEAD(request: Request) {
  try {
    const stats = await getCacheStats();
    
    return NextResponse.json({ cache: stats });
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return NextResponse.json({ error: 'Failed to get cache stats' }, { status: 500 });
  }
} 