'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import CacheInfo from '../components/CacheInfo';

interface CacheStats {
  source: 'api' | 'cache' | 'error';
  lastUpdate: string;
  cacheAgeMinutes: number;
  cacheExpiryMinutes: number;
  apiCallCount: number;
  apiCallDate: string;
  maxApiCalls: number;
  noLimit?: boolean;
}

export default function CachePage() {
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCacheStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('/api/cache-stats');
        
        if (response.data && response.data.cache) {
          setCacheStats(response.data.cache);
        } else {
          setError('Không thể tải thông tin cache');
        }
      } catch (err) {
        console.error('Error fetching cache stats:', err);
        setError('Đã xảy ra lỗi khi tải thông tin cache');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCacheStats();
  }, []);
  
  const refreshCache = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Gọi API với tham số refresh
      const response = await axios.get('/api/flights?refresh=true');
      
      if (response.data && response.data.cache) {
        setCacheStats(response.data.cache);
        alert('Đã làm mới cache thành công!');
      } else {
        setError('Không thể làm mới cache');
      }
    } catch (err: any) {
      console.error('Error refreshing cache:', err);
      setError(err.response?.data?.error?.message || 'Đã xảy ra lỗi khi làm mới cache');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Thông tin Cache</h2>
        <p className="text-gray-600 mb-6">
          Xem thông tin về cache và số lần gọi API AviationStack
        </p>
        
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && !loading && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700 text-center">
            {error}
          </div>
        )}
        
        {!loading && !error && cacheStats && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Chi tiết cache</h3>
              <button
                onClick={refreshCache}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={!cacheStats.noLimit && cacheStats.apiCallCount >= cacheStats.maxApiCalls}
              >
                Làm mới cache
              </button>
            </div>
            
            <CacheInfo cacheInfo={cacheStats} />
            
            <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
              <h3 className="text-md font-semibold mb-2">Thông tin về giới hạn API</h3>
              <p className="text-sm text-gray-700">
                AviationStack API giới hạn số lần gọi mỗi ngày là <strong>{cacheStats.maxApiCalls}</strong> cho tài khoản miễn phí.
                Hệ thống sẽ tự động sử dụng dữ liệu cache khi đạt giới hạn này.
              </p>
              <p className="text-sm text-gray-700 mt-2">
                Cache sẽ được tự động làm mới sau <strong>10 giờ</strong> (nếu còn lượt gọi API).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 