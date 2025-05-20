import { NextResponse } from 'next/server';
import axios from 'axios';
import { API_KEY } from '../../lib/redis-config';
import { 
  getCachedFlightData, 
  cacheFlightData, 
  checkAndUpdateApiCallLimit,
  getCacheStats 
} from '../../lib/cache-utils';

// API configuration
const AIRPORT_CODE = 'CXR';  // Mã IATA sân bay Cam Ranh
const BASE_URL = 'https://api.aviationstack.com/v1/flights';

// Get flights API route
export async function GET(request: Request) {
  try {
    // Kiểm tra có yêu cầu làm mới cache không
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';
    
    // Nếu không yêu cầu làm mới, kiểm tra cache trước
    if (!forceRefresh) {
      const cachedData = await getCachedFlightData();
      
      // Nếu có dữ liệu cache hợp lệ, trả về luôn
      if (cachedData) {
        // Lấy thông tin về cache cho client
        const stats = await getCacheStats();
        
        // Trả về dữ liệu từ cache với thông tin thêm
        return NextResponse.json({
          ...cachedData,
          cache: {
            source: 'cache',
            ...stats
          }
        });
      }
    }
    
    // Kiểm tra xem còn lượt gọi API không
    const canCallApi = await checkAndUpdateApiCallLimit();
    
    if (!canCallApi) {
      // Nếu hết lượt gọi API, trả về lỗi
      const stats = await getCacheStats();
      return NextResponse.json({
        error: {
          message: 'Đã đạt giới hạn gọi API cho ngày hôm nay',
          details: 'API chỉ được gọi 3 lần mỗi ngày'
        },
        cache: {
          source: 'error',
          ...stats
        }
      }, { status: 429 });
    }
    
    // Set up request parameters
    const params = {
      access_key: API_KEY,
      arr_iata: AIRPORT_CODE,
      limit: 100  // Giới hạn số lượng chuyến bay
    };

    // Make request to AviationStack API
    const response = await axios.get(BASE_URL, { params });
    
    // Lưu dữ liệu vào cache
    await cacheFlightData(response.data);
    
    // Lấy thông tin về cache cho client
    const stats = await getCacheStats();
    
    // Return the API response with cache info
    return NextResponse.json({
      ...response.data,
      cache: {
        source: 'api',
        ...stats
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