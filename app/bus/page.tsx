'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBus, FaChevronLeft, FaMapMarkedAlt, FaInfoCircle, FaRoute, FaRegClock, FaExchangeAlt, FaSearch, FaRegDotCircle, FaRegCircle } from 'react-icons/fa';
import Script from 'next/script';
import BusPlanner from '../components/BusPlanner';
import ApproximatePlanner from '../components/ApproximatePlanner';
import ProvincialRoutes from '../components/ProvincialRoutes';
import busStopsData from '../data/busStops.json';
import busRoutesData from '../data/busRoutes.json';
import { BUS_PAGE_SCHEMA } from '../lib/metadata';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocalizedLink } from '../hooks/useLocalizedLink';

// Định nghĩa type cho Leaflet để TypeScript không báo lỗi
declare global {
  interface Window {
    L: any;
  }
}

// Định nghĩa kiểu dữ liệu cho trạm xe buýt
interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

// Định nghĩa kiểu dữ liệu cho tuyến xe buýt
interface BusRoute {
  id: string;
  name: string;
  color: string;
  stops: string[]; // IDs của các trạm
  schedule: string[];
  fare: number;
  frequency: number[];
  description: string;
  description_en: string;
  path: number[][]; // Tọa độ cho polyline
}

export default function BusPage() {
  const { t, isLoading } = useLanguage();
  const { createLink } = useLocalizedLink();
  const mapRef = useRef<any>(null);
  const leafletMapRef = useRef<any>(null);
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mapReady, setMapReady] = useState(false);
  
  // Load dữ liệu từ files JSON
  const busStops: BusStop[] = busStopsData;
  const busRoutes: BusRoute[] = busRoutesData;
  
  // Tìm ngày cập nhật gần nhất từ dữ liệu routes
  const getLatestUpdateDate = () => {
    const dates = busRoutes
      .map(route => (route as any).updated_at)
      .filter(date => date)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    return dates[0] || '2025-01-01';
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Khởi tạo bản đồ khi component được render
  useEffect(() => {
    if (typeof window !== 'undefined' && !mapReady && !isLoading) {
      // Đợi cho đến khi leaflet được load
      const checkLeaflet = setInterval(() => {
        if (window.L) {
          clearInterval(checkLeaflet);
          initMap();
          setMapReady(true);
        }
      }, 100);
      
      return () => {
        clearInterval(checkLeaflet);
      };
    }
  }, [mapReady, isLoading]);
  
  // Theo dõi thay đổi của tuyến đường được chọn
  useEffect(() => {
    if (mapReady && activeRoute) {
      drawRouteOnMap(activeRoute);
    }
  }, [activeRoute, mapReady]);
  
  // Khởi tạo bản đồ
  const initMap = () => {
    if (!mapRef.current || leafletMapRef.current) return;
    
    const L = window.L;
    
    // Tạo bản đồ với tọa độ trung tâm Nha Trang
    const map = L.map(mapRef.current).setView([12.2388, 109.1967], 13);
    
    // Thêm layer bản đồ từ OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    leafletMapRef.current = map;
    
    // Thêm các trạm xe buýt vào bản đồ
    busStops.forEach(stop => {
      const marker = L.marker([stop.lat, stop.lng], {
        title: stop.name,
        alt: stop.id
      }).addTo(map);
      
      marker.bindPopup(`
        <strong>${stop.name}</strong><br>
        ${stop.description || ''}
      `);
      
      marker.on('click', () => {
        setSelectedStop(stop.id);
      });
    });
  };
  
  // Vẽ tuyến đường xe buýt lên bản đồ
  const drawRouteOnMap = (routeId: string) => {
    if (!leafletMapRef.current) return;
    
    const L = window.L;
    const map = leafletMapRef.current;
    
    // Xóa tất cả các polyline hiện tại
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Polyline && layer.options.className === 'bus-route') {
        map.removeLayer(layer);
      }
    });
    
    // Tìm tuyến xe buýt được chọn
    const route = busRoutes.find(r => r.id === routeId);
    if (!route) return;
    
    // Vẽ polyline cho tuyến đường với các tùy chọn nâng cao
    // Chuyển đổi tọa độ từ [lng, lat] thành [lat, lng] vì Leaflet cần định dạng [lat, lng]
    const convertedPath = route.path.map(coord => [coord[1], coord[0]]);
    const polyline = L.polyline(convertedPath, {
      color: route.color,
      weight: 5,
      opacity: 0.8,
      className: 'bus-route',
      smoothFactor: 1, // Làm mượt đường
      lineJoin: 'round', // Bo tròn các góc nối
      lineCap: 'round' // Bo tròn đầu cuối đường
    }).addTo(map);
    
    // Đánh dấu các trạm dừng trên tuyến
    route.stops.forEach(stopId => {
      const stop = busStops.find(s => s.id === stopId);
      if (stop) {
        // Tạo marker hình tròn cho trạm với viền màu tuyến
        L.circleMarker([stop.lat, stop.lng], {
          className: 'bus-route',
          color: route.color,
          fillColor: '#ffffff',
          fillOpacity: 1,
          radius: 6,
          weight: 3
        }).addTo(map);
      }
    });
    
    // Điều chỉnh view của bản đồ để hiển thị toàn bộ tuyến đường với padding
    map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
  };
  
  // Lọc trạm xe buýt và tuyến đường theo từ khóa tìm kiếm
  const filteredStops = searchTerm.trim() !== '' 
    ? busStops.filter(stop => 
        stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (stop.description && stop.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];
  
  // Tìm tuyến đường hiện đang được chọn
  const selectedRoute = activeRoute 
    ? busRoutes.find(route => route.id === activeRoute) 
    : null;
  
  // Tìm các tuyến đường đi qua trạm được chọn
  const routesThroughSelectedStop = selectedStop
    ? busRoutes.filter(route => route.stops.includes(selectedStop))
    : [];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Leaflet scripts */}
      <Script 
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
      />
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <FaBus className="inline-block text-4xl mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.bus?.hero?.title || 'Xe Buýt Nha Trang'}</h1>
            <p className="max-w-3xl mx-auto text-blue-100 text-lg">
              {t.bus?.hero?.subtitle || 'Thông tin tuyến đường, lịch trình và bản đồ các tuyến xe buýt công cộng tại Nha Trang'}
            </p>
          </div>
        </div>
      </section>
      
      {/* Back to main */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <Link href={createLink('/transportation')} className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FaChevronLeft className="mr-1 text-sm" /> {t.bus?.backToTransportation || 'Quay lại trang Di chuyển'}
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="flex-grow py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <ApproximatePlanner />
          <details className="mb-4 rounded-xl bg-white p-4"><summary className="cursor-pointer font-semibold">Tra cứu trạm theo chiều tuyến</summary><BusPlanner /></details>
          <details className="mb-4 rounded-xl bg-white p-4"><summary className="cursor-pointer font-semibold">Xem danh mục 29 tuyến</summary><ProvincialRoutes /></details>
        </div>
      </section>

      {/* Data Update Information */}
      <section className="py-6 bg-gray-100 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  <FaInfoCircle className="text-blue-500 mr-3 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.bus?.dataUpdate?.title || 'Thông tin cập nhật dữ liệu'}</h3>
                    <p className="text-sm text-gray-600">
                      {t.bus?.dataUpdate?.description || 'Dữ liệu tuyến xe buýt được cập nhật thường xuyên để đảm bảo tính chính xác'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{t.bus?.dataUpdate?.lastUpdate || 'Cập nhật gần nhất'}</div>
                  <div className="font-semibold text-blue-600">{formatDate(getLatestUpdateDate())}</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{busRoutes.length}</div>
                    <div className="text-gray-600">{t.bus?.dataUpdate?.stats?.routes || 'Tuyến xe buýt'}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{busStops.length}</div>
                    <div className="text-gray-600">{t.bus?.dataUpdate?.stats?.stops || 'Trạm xe buýt'}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">24/7</div>
                    <div className="text-gray-600">{t.bus?.dataUpdate?.stats?.support || 'Hỗ trợ thông tin'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <Script
        id="schema-bus"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BUS_PAGE_SCHEMA) }}
      />
      
    </div>
  );
} 