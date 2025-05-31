import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

// Types
interface Flight {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    iata: string;
    timezone: string;
    terminal?: string;
    gate?: string;
    delay?: number;
    scheduled: string;
    estimated?: string;
    actual?: string;
    estimated_runway?: string;
    actual_runway?: string;
  };
  arrival: {
    airport: string;
    iata: string;
    timezone: string;
    terminal?: string;
    gate?: string;
    baggage?: string;
    delay?: number;
    scheduled: string;
    estimated?: string;
    actual?: string;
    estimated_runway?: string;
    actual_runway?: string;
  };
  airline: {
    name: string | null;
    iata: string;
    icao?: string;
  };
  flight: {
    number: string;
    iata: string;
    icao?: string;
    codeshared?: {
      airline_name: string;
      airline_iata: string;
      airline_icao: string;
      flight_number: string;
      flight_iata: string;
      flight_icao: string;
    };
  };
  aircraft?: any;
  live?: any;
}

interface FlightsResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: Flight[];
  cache?: {
    source: 'api' | 'cache' | 'error';
    lastUpdate: string;
    cacheAgeMinutes: number;
    cacheExpiryMinutes: number;
    apiCallCount: number;
    apiCallDate: string;
    maxApiCalls: number;
  };
}

interface CacheInfo {
  source: 'api' | 'cache' | 'error';
  lastUpdate: string;
  cacheAgeMinutes: number;
  cacheExpiryMinutes: number;
  apiCallCount: number;
  apiCallDate: string;
  maxApiCalls: number;
}

export default function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cacheInfo, setCacheInfo] = useState<CacheInfo | null>(null);
  const [pagination, setPagination] = useState({
    limit: 100,
    offset: 0,
    count: 0,
    total: 0,
    hasMore: false
  });

  // Refs để track API calls và tránh multiple calls
  const isLoadingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastFetchParamsRef = useRef<string>('');

  // Hàm loại bỏ chuyến bay trùng lặp
  const removeDuplicateFlights = (flights: Flight[]): Flight[] => {
    const uniqueFlights = new Map<string, Flight>();
    
    for (const flight of flights) {
      // Tạo key duy nhất dựa trên mã chuyến bay và thời gian khởi hành/đến
      const flightKey = `${flight.flight.iata}-${flight.departure.scheduled}-${flight.arrival.scheduled}`;
      
      // Chỉ giữ lại phiên bản đầu tiên của mỗi chuyến bay
      if (!uniqueFlights.has(flightKey)) {
        uniqueFlights.set(flightKey, flight);
      }
    }
    
    return Array.from(uniqueFlights.values());
  };

  // Hàm sắp xếp chuyến bay theo thời gian hạ cánh
  const sortFlightsByArrivalTime = (flights: Flight[]): Flight[] => {
    const now = new Date();
    
    return [...flights].sort((a, b) => {
      // Hàm chuyển đổi thời gian về cùng múi giờ UTC để so sánh chính xác
      const getArrivalTimeUTC = (flight: Flight) => {
        // Ưu tiên theo thứ tự: actual > estimated > scheduled
        let timeString = '';
        if (flight.arrival.actual) timeString = flight.arrival.actual;
        else if (flight.arrival.estimated) timeString = flight.arrival.estimated;
        else if (flight.arrival.scheduled) timeString = flight.arrival.scheduled;
        else return 0; // Nếu không có thông tin thời gian
        
        // Tạo đối tượng Date (chuỗi ISO tự xử lý múi giờ nếu có thông tin)
        // API thường trả về thời gian đã bao gồm thông tin múi giờ trong chuỗi ISO
        return new Date(timeString).getTime();
      };

      const timeA = getArrivalTimeUTC(a);
      const timeB = getArrivalTimeUTC(b);
      const nowTime = now.getTime();
      
      // Kiểm tra xem chuyến bay đã diễn ra chưa
      const aInPast = timeA < nowTime;
      const bInPast = timeB < nowTime;
      
      // Nếu một chuyến bay trong tương lai và một trong quá khứ, ưu tiên tương lai
      if (aInPast && !bInPast) return 1;  // a trong quá khứ, b trong tương lai -> b đứng trước
      if (!aInPast && bInPast) return -1; // a trong tương lai, b trong quá khứ -> a đứng trước
      
      // Nếu cả hai đều trong tương lai, sắp xếp từ gần đến xa
      if (!aInPast && !bInPast) {
        return timeA - timeB; // Thời gian gần hơn trước
      }
      
      // Nếu cả hai đều trong quá khứ, sắp xếp từ gần đến xa (ngược lại)
      return timeB - timeA; // Thời gian gần quá khứ hơn trước
    });
  };

  // Hàm fetch dữ liệu với tham số phân trang và debounce
  const fetchFlights = useCallback(async (limit = 100, offset = 0, forceRefresh = false) => {
    const fetchKey = `${limit}_${offset}_${forceRefresh}`;
    
    // Tránh duplicate calls với cùng params
    if (lastFetchParamsRef.current === fetchKey && !forceRefresh) {
      console.log('Bỏ qua fetch vì params giống nhau:', fetchKey);
      return;
    }
    
    // Tránh multiple concurrent calls
    if (isLoadingRef.current && !forceRefresh) {
      console.log('Bỏ qua fetch vì đang có call khác đang thực hiện');
      return;
    }

    try {
      // Cancel previous request if any
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Create new abort controller
      abortControllerRef.current = new AbortController();
      
      isLoadingRef.current = true;
      setLoading(true);
      setError(null);
      lastFetchParamsRef.current = fetchKey;
      
      // Build URL with params
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      });
      
      if (forceRefresh) {
        params.append('refresh', 'true');
      }
      
      // Call our API route with pagination params
      const response = await axios.get<FlightsResponse>(
        `/api/flights?${params.toString()}`,
        {
          signal: abortControllerRef.current.signal,
          timeout: 30000  // 30 seconds timeout
        }
      );
      
      // Extract cache info
      if (response.data.cache) {
        setCacheInfo(response.data.cache);
      }
      
      // Extract pagination info
      if (response.data.pagination) {
        const { limit, offset, count, total } = response.data.pagination;
        setPagination({
          limit,
          offset,
          count,
          total,
          hasMore: offset + count < total
        });
      }
      
      // Check if we have data
      if (response.data && response.data.data) {
        // Loại bỏ các chuyến bay trùng lặp
        const uniqueFlights = removeDuplicateFlights(response.data.data);
        
        // Sắp xếp chuyến bay theo giờ hạ cánh
        const sortedFlights = sortFlightsByArrivalTime(uniqueFlights);
        setFlights(sortedFlights);
        
        console.log(`Đã lọc từ ${response.data.data.length} chuyến bay xuống còn ${uniqueFlights.length} chuyến bay duy nhất`);
      } else {
        setFlights([]);
      }
    } catch (err: any) {
      // Ignore aborted requests
      if (err.name === 'AbortError' || err.code === 'ERR_CANCELED') {
        console.log('Request bị hủy');
        return;
      }
      
      console.error('Error fetching flights:', err);
      
      // Nếu lỗi liên quan đến giới hạn API
      if (err.response?.status === 429) {
        setError('Đã đạt giới hạn gọi API. Sử dụng dữ liệu cache nếu có.');
        
        // Cập nhật thông tin cache nếu có
        if (err.response?.data?.cache) {
          setCacheInfo(err.response.data.cache);
        }
      } else if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        setError('Timeout khi tải dữ liệu. Vui lòng thử lại.');
      } else {
        setError('Không thể tải dữ liệu chuyến bay. Vui lòng thử lại sau.');
      }
      
      setFlights([]);
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  }, []); // Empty dependencies để tránh re-render

  // Hàm tải thêm dữ liệu với debounce
  const loadMore = useCallback(async () => {
    if (!pagination.hasMore || loading || isLoadingRef.current) {
      console.log('Không thể load more:', { hasMore: pagination.hasMore, loading, isLoading: isLoadingRef.current });
      return;
    }
    
    const nextOffset = pagination.offset + pagination.limit;
    await fetchFlights(pagination.limit, nextOffset);
  }, [pagination.hasMore, pagination.offset, pagination.limit, loading, fetchFlights]);

  // Hàm tải lại dữ liệu từ đầu với debounce
  const refreshData = useCallback(async () => {
    if (isLoadingRef.current) {
      console.log('Đang có refresh khác, bỏ qua');
      return;
    }
    
    await fetchFlights(pagination.limit, 0, true);
  }, [pagination.limit, fetchFlights]);

  // Effect để fetch data lần đầu, chỉ chạy 1 lần
  useEffect(() => {
    let mounted = true;
    
    const initialFetch = async () => {
      if (mounted && !isLoadingRef.current) {
        await fetchFlights();
      }
    };
    
    initialFetch();
    
    return () => {
      mounted = false;
      // Cleanup abort controller
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // Chỉ chạy 1 lần khi component mount

  return { 
    flights, 
    loading, 
    error, 
    cacheInfo, 
    pagination,
    loadMore,
    refreshData
  };
} 