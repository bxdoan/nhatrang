'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import FlightCard from './components/FlightCard';
import useFlights from './hooks/useFlights';

export default function Home() {
  // Fetch flights data using custom hook
  const { flights, loading, error } = useFlights();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-primary">
          Theo dõi chuyến bay - Sân bay Cam Ranh (CXR)
        </h1>
      </header>
      
      <main>
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700 text-center">
            {error}
          </div>
        )}
        
        {/* No flights */}
        {!loading && !error && flights.length === 0 && (
          <div className="bg-blue-50 p-6 rounded-md border border-blue-200 text-blue-700 text-center">
            Không có dữ liệu chuyến bay đến Cam Ranh. Vui lòng thử lại sau.
          </div>
        )}
        
        {/* Flights list */}
        {!loading && !error && flights.length > 0 && (
          <div>
            <p className="text-center mb-4">Hiển thị {flights.length} chuyến bay đến Cam Ranh (CXR) trong 24h</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flights.map((flight, index) => (
                <FlightCard key={`${flight.flight.iata}-${index}`} flight={flight} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Dữ liệu được cung cấp bởi AviationStack API</p>
        <p className="mt-2">© {new Date().getFullYear()} Theo dõi chuyến bay sân bay Cam Ranh</p>
      </footer>
    </div>
  );
} 