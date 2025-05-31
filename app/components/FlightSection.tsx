'use client';

import { FaInfoCircle, FaPlane } from 'react-icons/fa';
import FlightCard from './FlightCard';
import useFlights from '../hooks/useFlights';
import { useLanguage } from '../contexts/LanguageContext';
import { useCallback, useRef } from 'react';

export default function FlightSection({ showTitle = true }) {
  const { t } = useLanguage();
  // Fetch flights data using custom hook
  const { flights, loading, error, pagination, loadMore, refreshData } = useFlights();
  
  // Throttle refresh để tránh spam clicks
  const lastRefreshRef = useRef<number>(0);
  const REFRESH_THROTTLE_MS = 3000; // 3 giây
  
  const handleRefresh = useCallback(() => {
    const now = Date.now();
    if (now - lastRefreshRef.current < REFRESH_THROTTLE_MS) {
      console.log('Refresh bị throttle, vui lòng đợi');
      return;
    }
    
    lastRefreshRef.current = now;
    refreshData();
  }, [refreshData]);
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{t.flights?.hero?.title || 'Chuyến bay đến Cam Ranh (CXR)'}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.flights?.hero?.subtitle || 'Kiểm tra thông tin thời gian, trạng thái và chi tiết các chuyến bay sắp đến sân bay Cam Ranh - cửa ngõ hàng không của thành phố biển Nha Trang'}
            </p>
          </div>
        )}
        
        {/* Loading state - chỉ hiển thị khi lần đầu tải */}
        {loading && flights.length === 0 && (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-700 text-center max-w-3xl mx-auto">
            <FaInfoCircle className="mx-auto text-3xl mb-2" />
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        {/* No flights */}
        {!loading && !error && flights.length === 0 && (
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-200 text-blue-700 text-center max-w-3xl mx-auto">
            <FaPlane className="mx-auto text-3xl mb-3" />
            <p className="font-medium">{t.common?.error || 'Không có dữ liệu chuyến bay đến Nha Trang. Vui lòng thử lại sau.'}</p>
          </div>
        )}
        
        {/* Flights list */}
        {flights.length > 0 && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <p className="text-gray-700 mb-4 md:mb-0">
                Hiển thị {flights.length} chuyến bay đến sân bay Cam Ranh (CXR)
              </p>
              <button 
                onClick={handleRefresh}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center disabled:cursor-not-allowed"
                title={loading ? 'Đang cập nhật...' : 'Làm mới dữ liệu'}
              >
                <svg className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {loading ? 'Đang cập nhật...' : 'Làm mới'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flights.map((flight, index) => (
                <FlightCard key={`${flight.flight.iata}-${index}`} flight={flight} />
              ))}
            </div>
            
            {/* Pagination */}
            {pagination.hasMore && (
              <div className="mt-10 text-center">
                <p className="text-sm text-gray-500 mb-3">
                  Hiển thị <strong>{flights.length} / {pagination.total}</strong> chuyến bay
                </p>
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 inline-flex items-center disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang tải...
                    </>
                  ) : (
                    'Xem thêm chuyến bay'
                  )}
                </button>
              </div>
            )}
            
            {/* Loading more indicator */}
            {loading && flights.length > 0 && !pagination.hasMore && (
              <div className="flex justify-center items-center mt-6">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
} 