'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FaSearch, FaPlane, FaInfoCircle, FaUmbrellaBeach, FaHotel, FaBus } from 'react-icons/fa';
import Link from 'next/link';
import FlightSection from './components/FlightSection';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-600 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Nha Trang Beach"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-600/60 z-0"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Khám phá <span className="text-yellow-300">Nha Trang</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Thông tin du lịch, chuyến bay, giao thông và các dịch vụ tại thiên đường biển Nha Trang
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 max-w-2xl mx-auto">
            <Link href="/flights" className="py-3 px-8 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition flex items-center justify-center">
              <FaPlane className="mr-2" /> Xem chuyến bay
            </Link>
            <button className="py-3 px-8 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition flex items-center justify-center">
              <FaSearch className="mr-2" /> Khám phá ngay
            </button>
          </div>
        </div>
      </section>
      
      {/* Flight Section */}
      <FlightSection />
      
      {/* Tourism Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Khám phá Nha Trang</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thông tin hữu ích giúp bạn lên kế hoạch cho chuyến du lịch hoàn hảo tới thành phố biển xinh đẹp
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Điểm đến */}
            <div className="bg-blue-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4">
                <FaUmbrellaBeach className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Điểm tham quan nổi bật</h3>
              <p className="text-gray-600 mb-4">
                Khám phá những địa điểm du lịch nổi tiếng nhất tại Nha Trang như Vinpearl Land, Tháp Bà Ponagar, 
                Vịnh Ninh Vân và nhiều hơn nữa.
              </p>
              <Link href="/destinations" className="text-blue-600 font-medium hover:text-blue-700">
                Xem chi tiết →
              </Link>
            </div>
            
            {/* Lưu trú */}
            <div className="bg-green-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mb-4">
                <FaHotel className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Khách sạn & Lưu trú</h3>
              <p className="text-gray-600 mb-4">
                Tìm hiểu các lựa chọn lưu trú từ khách sạn 5 sao sang trọng đến những homestay giá rẻ phù hợp với 
                ngân sách của bạn.
              </p>
              <Link href="/accommodations" className="text-green-600 font-medium hover:text-green-700">
                Xem chi tiết →
              </Link>
            </div>
            
            {/* Di chuyển */}
            <div className="bg-yellow-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-yellow-500 text-white rounded-full flex items-center justify-center mb-4">
                <FaBus className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Di chuyển & Giao thông</h3>
              <p className="text-gray-600 mb-4">
                Thông tin về cách di chuyển đến Nha Trang và phương tiện đi lại trong thành phố: taxi, xe buýt, 
                thuê xe máy và nhiều lựa chọn khác.
              </p>
              <Link href="/transportation" className="text-yellow-600 font-medium hover:text-yellow-700">
                Xem chi tiết →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 