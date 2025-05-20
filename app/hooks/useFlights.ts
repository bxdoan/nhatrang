import { useState, useEffect } from 'react';
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

  // Hàm sắp xếp chuyến bay theo thời gian hạ cánh
  const sortFlightsByArrivalTime = (flights: Flight[]): Flight[] => {
    return [...flights].sort((a, b) => {
      // Lấy thời gian hạ cánh từ cả scheduled, estimated hoặc actual
      const getArrivalTime = (flight: Flight) => {
        // Ưu tiên theo thứ tự: actual > estimated > scheduled
        if (flight.arrival.actual) return new Date(flight.arrival.actual).getTime();
        if (flight.arrival.estimated) return new Date(flight.arrival.estimated).getTime();
        if (flight.arrival.scheduled) return new Date(flight.arrival.scheduled).getTime();
        return 0; // Nếu không có thông tin thời gian
      };

      return getArrivalTime(a) - getArrivalTime(b);
    });
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Call our API route
        const response = await axios.get<FlightsResponse>('/api/flights');
        
        // Extract cache info
        if (response.data.cache) {
          setCacheInfo(response.data.cache);
        }
        
        // Check if we have data
        if (response.data && response.data.data) {
          // Sắp xếp chuyến bay theo giờ hạ cánh
          const sortedFlights = sortFlightsByArrivalTime(response.data.data);
          setFlights(sortedFlights);
        } else {
          setFlights([]);
        }
      } catch (err: any) {
        console.error('Error fetching flights:', err);
        
        // Nếu lỗi liên quan đến giới hạn API
        if (err.response?.status === 429) {
          setError('Đã đạt giới hạn gọi API. Sử dụng dữ liệu cache nếu có.');
          
          // Cập nhật thông tin cache nếu có
          if (err.response?.data?.cache) {
            setCacheInfo(err.response.data.cache);
          }
        } else {
          setError('Không thể tải dữ liệu chuyến bay. Vui lòng thử lại sau.');
        }
        
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []); // Không còn phụ thuộc vào selectedDate

  return { flights, loading, error, cacheInfo };
} 