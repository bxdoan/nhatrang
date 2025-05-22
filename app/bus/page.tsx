'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBus, FaChevronLeft, FaMapMarkedAlt, FaInfoCircle, FaRoute, FaRegClock, FaExchangeAlt, FaSearch, FaRegDotCircle, FaRegCircle } from 'react-icons/fa';
import { CONTACT_INFO } from '../lib/contact-config';
import Script from 'next/script';
import busStopsData from '../data/busStops.json';
import busRoutesData from '../data/busRoutes.json';

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
  const mapRef = useRef<any>(null);
  const leafletMapRef = useRef<any>(null);
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mapReady, setMapReady] = useState(false);
  
  // Load dữ liệu từ files JSON
  const busStops: BusStop[] = busStopsData;
  const busRoutes: BusRoute[] = busRoutesData;
  
  // Khởi tạo bản đồ khi component được render
  useEffect(() => {
    if (typeof window !== 'undefined' && !mapReady) {
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
  }, [mapReady]);
  
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Xe Buýt Nha Trang</h1>
            <p className="max-w-3xl mx-auto text-blue-100 text-lg">
              Thông tin tuyến đường, lịch trình và bản đồ các tuyến xe buýt công cộng tại Nha Trang
            </p>
          </div>
        </div>
      </section>
      
      {/* Back to main */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <Link href="/transportation" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FaChevronLeft className="mr-1 text-sm" /> Quay lại trang Di chuyển
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="flex-grow py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/3 flex flex-col gap-4">
              {/* Search Box */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm trạm xe buýt..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                
                {searchTerm.trim() !== '' && (
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Kết quả ({filteredStops.length})</h3>
                    {filteredStops.length > 0 ? (
                      <ul className="max-h-60 overflow-y-auto">
                        {filteredStops.map(stop => (
                          <li 
                            key={stop.id} 
                            className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer"
                            onClick={() => {
                              setSelectedStop(stop.id);
                              leafletMapRef.current.setView([stop.lat, stop.lng], 15);
                              setSearchTerm('');
                            }}
                          >
                            <div className="flex items-start">
                              <FaMapMarkedAlt className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                              <div>
                                <div className="font-medium">{stop.name}</div>
                                {stop.description && (
                                  <div className="text-sm text-gray-600">{stop.description}</div>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-3 text-gray-500">
                        Không tìm thấy trạm xe buýt nào
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Bus Routes List */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FaRoute className="mr-2 text-blue-600" /> Các tuyến xe buýt
                </h2>
                
                <ul className="space-y-3">
                  {busRoutes.map(route => (
                    <li 
                      key={route.id} 
                      className={`p-3 rounded-md cursor-pointer border ${
                        activeRoute === route.id 
                          ? 'bg-blue-50 border-blue-500' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveRoute(route.id)}
                    >
                      <div className="flex items-start">
                        <div 
                          className="w-4 h-4 rounded-full mt-1 mr-2 flex-shrink-0" 
                          style={{ backgroundColor: route.color }}
                        ></div>
                        <div>
                          <div className="font-medium">{route.name}</div>
                          <div className="text-sm text-gray-600 mt-1 flex items-center">
                            <FaRegClock className="mr-1" /> {route.frequency}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Selected Route Info */}
              {selectedRoute && (
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-3">
                    Thông tin tuyến {selectedRoute.name.split(':')[0]}
                  </h2>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">Tên tuyến:</div>
                      <div className="font-medium">{selectedRoute.name}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Giờ hoạt động:</div>
                      <div>{selectedRoute.schedule[0]}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Tần suất:</div>
                      <div>{selectedRoute.frequency.join(' - ')} phút/chuyến</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Giá vé:</div>
                      <div>{selectedRoute.fare.toLocaleString()} VNĐ</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Thông tin:</div>
                      <div className="text-sm">{selectedRoute.description}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Các trạm dừng:</div>
                      <ul className="space-y-2 pl-2">
                        {selectedRoute.stops.map((stopId, index) => {
                          const stop = busStops.find(s => s.id === stopId);
                          if (!stop) return null;
                          
                          return (
                            <li key={stopId} className="flex items-start">
                              {index === 0 ? (
                                <FaRegDotCircle className="text-green-500 mt-1 mr-2" />
                              ) : index === selectedRoute.stops.length - 1 ? (
                                <FaRegDotCircle className="text-red-500 mt-1 mr-2" />
                              ) : (
                                <FaRegCircle className="text-blue-500 mt-1 mr-2" />
                              )}
                              <span>{stop.name}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Selected Stop Info */}
              {selectedStop && (
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-3">
                    Trạm {busStops.find(s => s.id === selectedStop)?.name}
                  </h2>
                  
                  <div className="space-y-3">
                    {busStops.find(s => s.id === selectedStop)?.description && (
                      <div>
                        <div className="text-sm text-gray-500">Mô tả:</div>
                        <div>{busStops.find(s => s.id === selectedStop)?.description}</div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Các tuyến đi qua:</div>
                      {routesThroughSelectedStop.length > 0 ? (
                        <ul className="space-y-2">
                          {routesThroughSelectedStop.map(route => (
                            <li 
                              key={route.id} 
                              className="flex items-center cursor-pointer hover:text-blue-600"
                              onClick={() => setActiveRoute(route.id)}
                            >
                              <div 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: route.color }}
                              ></div>
                              <span>{route.name}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-gray-500">Không có tuyến nào đi qua trạm này</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Map */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-2 h-[700px]">
                <div ref={mapRef} className="w-full h-full rounded-lg"></div>
              </div>
              
              {/* Map Legend */}
              <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
                <h3 className="text-base font-medium mb-3">Chú thích bản đồ</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Điểm bắt đầu</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm">Điểm kết thúc</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Trạm dừng</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-sm">Tuyến xe buýt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bus Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin xe buýt Nha Trang</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Giá vé</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Tuyến nội thành:</span> 7.000đ/lượt
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Tuyến Sân bay Cam Ranh:</span> 50.000đ/lượt
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Vé tháng:</span> 200.000đ/tháng
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Đối tượng ưu tiên:</span> Giảm 50% giá vé cho học sinh, sinh viên, người cao tuổi và người khuyết tật
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Giờ hoạt động</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Tuyến nội thành:</span> 05:00 - 19:00
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Tuyến Sân bay Cam Ranh:</span> 04:00 - 21:00
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Tần suất:</span> 15-30 phút/chuyến tùy tuyến
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Lưu ý khi đi xe buýt</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-blue-700">Chuẩn bị sẵn tiền mặt để mua vé. Một số tuyến chưa hỗ trợ thanh toán bằng thẻ.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-blue-700">Kiểm tra lịch trình xe buýt trước khi di chuyển, một số tuyến có thể thay đổi vào cuối tuần.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Liên hệ</h3>
              <p className="text-gray-700">
                Trung tâm Điều hành xe buýt Nha Trang: <span className="font-medium">0258.3810 810</span>
              </p>
              <p className="text-gray-700 mt-1">
                Tổng đài hỗ trợ hành khách: <span className="font-medium">1900 8110</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 