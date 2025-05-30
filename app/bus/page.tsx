'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBus, FaChevronLeft, FaMapMarkedAlt, FaInfoCircle, FaRoute, FaRegClock, FaExchangeAlt, FaSearch, FaRegDotCircle, FaRegCircle } from 'react-icons/fa';
import Script from 'next/script';
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

// Schema.org JSON-LD cho FAQ
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Giá vé xe buýt Nha Trang là bao nhiêu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Giá vé xe buýt nội thành Nha Trang là 7.000đ/lượt, xe buýt sân bay Cam Ranh là 50.000đ/lượt, vé tháng là 200.000đ. Học sinh, sinh viên, người cao tuổi và người khuyết tật được giảm 50% giá vé.'
      }
    },
    {
      '@type': 'Question',
      name: 'Xe buýt Nha Trang hoạt động từ mấy giờ đến mấy giờ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Xe buýt nội thành hoạt động từ 05:00 - 19:00 hàng ngày. Tuyến sân bay Cam Ranh hoạt động từ 04:00 - 21:00. Tần suất xe buýt là 15-30 phút/chuyến tùy theo tuyến.'
      }
    },
    {
      '@type': 'Question',
      name: 'Có bao nhiêu tuyến xe buýt tại Nha Trang?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hiện tại Nha Trang có 4 tuyến xe buýt chính: Tuyến 23 (Ana Marina - Vinpearl), Tuyến 18 (Bình Hưng - Diên Khánh), Tuyến 9 (Bến xe - Sân bay Cam Ranh), và Tuyến 4 (Chợ Đầm - Bến xe Phía Nam).'
      }
    },
    {
      '@type': 'Question',
      name: 'Làm thế nào để đi từ sân bay Cam Ranh về trung tâm Nha Trang bằng xe buýt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bạn có thể đi tuyến số 9 từ sân bay Cam Ranh về bến xe phía Nam Nha Trang. Giá vé 50.000đ/lượt, thời gian di chuyển khoảng 45-60 phút, xe chạy từ 04:00 - 21:00 với tần suất 30 phút/chuyến.'
      }
    },
    {
      '@type': 'Question',
      name: 'Xe buýt Nha Trang có chấp nhận thanh toán bằng thẻ không?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hiện tại hầu hết các tuyến xe buýt Nha Trang chỉ chấp nhận thanh toán bằng tiền mặt. Bạn nên chuẩn bị sẵn tiền lẻ để mua vé. Một số tuyến đang thí điểm thanh toán không tiền mặt.'
      }
    }
  ]
};

export default function BusPage() {
  const { t, isLoading } = useLanguage();
  const { createLink } = useLocalizedLink();
  const mapRef = useRef<any>(null);
  const leafletMapRef = useRef<any>(null);
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mapReady, setMapReady] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Load dữ liệu từ files JSON
  const busStops: BusStop[] = busStopsData;
  const busRoutes: BusRoute[] = busRoutesData;
  
  // Tìm ngày cập nhật gần nhất từ dữ liệu routes
  const getLatestUpdateDate = () => {
    const dates = busRoutes
      .map(route => (route as any).updated_at)
      .filter(date => date)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    return dates[0] || new Date().toISOString().split('T')[0];
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
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/3 flex flex-col gap-4">
              {/* Search Box */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.bus?.searchPlaceholder || "Tìm trạm xe buýt..."}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                
                {searchTerm.trim() !== '' && (
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">{t.bus?.searchResults || 'Kết quả'} ({filteredStops.length})</h3>
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
                        {t.bus?.noResults || 'Không tìm thấy trạm xe buýt nào'}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Bus Routes List */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FaRoute className="mr-2 text-blue-600" /> {t.bus?.routes?.title || 'Các tuyến xe buýt'}
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
                            <FaRegClock className="mr-1" /> {route.frequency.join(' - ')} {t.bus?.routes?.frequency || 'phút/chuyến'}
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
                    {t.bus?.routeInfo?.title || 'Thông tin tuyến'} {selectedRoute.name.split(':')[0]}
                  </h2>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">{t.bus?.routeInfo?.routeName || 'Tên tuyến'}:</div>
                      <div className="font-medium">{selectedRoute.name}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">{t.bus?.routeInfo?.operatingHours || 'Giờ hoạt động'}:</div>
                      <div>{selectedRoute.schedule[0]}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">{t.bus?.routeInfo?.frequency || 'Tần suất'}:</div>
                      <div>{selectedRoute.frequency.join(' - ')} {t.bus?.routes?.frequency || 'phút/chuyến'}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">{t.bus?.routeInfo?.fare || 'Giá vé'}:</div>
                      <div>{selectedRoute.fare.toLocaleString()} VNĐ</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">{t.bus?.routeInfo?.information || 'Thông tin'}:</div>
                      <div className="text-sm">{selectedRoute.description}</div>
                    </div>
                    
                    {(selectedRoute as any).updated_at && (
                                              <div>
                          <div className="text-sm text-gray-500">{t.bus?.routeInfo?.lastUpdated || 'Cập nhật'}:</div>
                          <div className="text-sm">{formatDate((selectedRoute as any).updated_at)}</div>
                        </div>
                    )}
                    
                                          <div>
                        <div className="text-sm text-gray-500 mb-2">{t.bus?.routeInfo?.stops || 'Các trạm dừng'}:</div>
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
                    {t.bus?.stopInfo?.title || 'Trạm'} {busStops.find(s => s.id === selectedStop)?.name}
                  </h2>
                  
                  <div className="space-y-3">
                    {busStops.find(s => s.id === selectedStop)?.description && (
                      <div>
                        <div className="text-sm text-gray-500">{t.bus?.stopInfo?.description || 'Mô tả'}:</div>
                        <div>{busStops.find(s => s.id === selectedStop)?.description}</div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-2">{t.bus?.stopInfo?.routesThrough || 'Các tuyến đi qua'}:</div>
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
                        <div className="text-gray-500">{t.bus?.stopInfo?.noRoutes || 'Không có tuyến nào đi qua trạm này'}</div>
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
                <h3 className="text-base font-medium mb-3">{t.bus?.mapLegend?.title || 'Chú thích bản đồ'}</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">{t.bus?.mapLegend?.startPoint || 'Điểm bắt đầu'}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm">{t.bus?.mapLegend?.endPoint || 'Điểm kết thúc'}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">{t.bus?.mapLegend?.busStop || 'Trạm dừng'}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-sm">{t.bus?.mapLegend?.busRoute || 'Tuyến xe buýt'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

      {/* FAQ Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">{t.bus?.faq?.title || 'Câu hỏi thường gặp về xe buýt Nha Trang'}</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {t.bus?.faq?.questions?.fare?.question || 'Giá vé xe buýt Nha Trang là bao nhiêu?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.bus?.faq?.questions?.fare?.answer || 'Giá vé xe buýt nội thành Nha Trang là 7.000đ/lượt, xe buýt sân bay Cam Ranh là 50.000đ/lượt, vé tháng là 200.000đ. Học sinh, sinh viên, người cao tuổi và người khuyết tật được giảm 50% giá vé.'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {t.bus?.faq?.questions?.schedule?.question || 'Xe buýt Nha Trang hoạt động từ mấy giờ đến mấy giờ?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.bus?.faq?.questions?.schedule?.answer || 'Xe buýt nội thành hoạt động từ 05:00 - 19:00 hàng ngày. Tuyến sân bay Cam Ranh hoạt động từ 04:00 - 21:00. Tần suất xe buýt là 15-30 phút/chuyến tùy theo tuyến.'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {t.bus?.faq?.questions?.routes?.question || 'Có bao nhiêu tuyến xe buýt tại Nha Trang?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.bus?.faq?.questions?.routes?.answer || 'Hiện tại Nha Trang có 4 tuyến xe buýt chính: Tuyến 23 (Ana Marina - Vinpearl), Tuyến 18 (Bình Hưng - Diên Khánh), Tuyến 9 (Bến xe - Sân bay Cam Ranh), và Tuyến 4 (Chợ Đầm - Bến xe Phía Nam).'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {t.bus?.faq?.questions?.airport?.question || 'Làm thế nào để đi từ sân bay Cam Ranh về trung tâm Nha Trang bằng xe buýt?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.bus?.faq?.questions?.airport?.answer || 'Bạn có thể đi tuyến số 9 từ sân bay Cam Ranh về bến xe phía Nam Nha Trang. Giá vé 50.000đ/lượt, thời gian di chuyển khoảng 45-60 phút, xe chạy từ 04:00 - 21:00 với tần suất 30 phút/chuyến.'}</p>
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {t.bus?.faq?.questions?.payment?.question || 'Xe buýt Nha Trang có chấp nhận thanh toán bằng thẻ không?'}
                </summary>
                <div className="mt-3 text-gray-700">
                  <p>{t.bus?.faq?.questions?.payment?.answer || 'Hiện tại hầu hết các tuyến xe buýt Nha Trang chỉ chấp nhận thanh toán bằng tiền mặt. Bạn nên chuẩn bị sẵn tiền lẻ để mua vé. Một số tuyến đang thí điểm thanh toán không tiền mặt.'}</p>
                </div>
              </details>
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
      
      {/* FAQ Schema */}
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
    </div>
  );
} 