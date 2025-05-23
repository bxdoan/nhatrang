'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPlane, FaBus, FaUmbrellaBeach, FaHistory, FaHotel, FaUtensils, FaComments, FaChevronDown, FaCar, FaMotorcycle, FaTaxi } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isTransportDropdownOpen, setIsTransportDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Ẩn trang Cache cho người dùng thông thường
  const isAdmin = false; // Sau này có thể thay bằng xác thực thực sự
  
  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTransportDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Kiểm tra xem có đang ở trang transportation hoặc sub-pages không
  const isTransportationActive = pathname.startsWith('/transportation') || 
                                  pathname === '/oto' || 
                                  pathname === '/moto' || 
                                  pathname === '/bus' || 
                                  pathname === '/taxi' || 
                                  pathname === '/ride-hailing';

  // Danh sách các trang con của transportation
  const transportationPages = [
    {
      href: '/transportation',
      icon: FaBus,
      title: 'Tổng quan',
      description: 'Tất cả phương tiện'
    },
    {
      href: '/oto',
      icon: FaCar,
      title: 'Xe ô tô',
      description: 'Thuê xe & đưa đón'
    },
    {
      href: '/moto',
      icon: FaMotorcycle,
      title: 'Xe máy',
      description: 'Thuê xe máy'
    },
    {
      href: '/bus',
      icon: FaBus,
      title: 'Xe buýt',
      description: 'Tuyến & lịch trình'
    },
    {
      href: '/taxi',
      icon: FaTaxi,
      title: 'Taxi',
      description: 'Các hãng taxi'
    },
    {
      href: '/ride-hailing',
      icon: FaMotorcycle,
      title: 'Xe ôm',
      description: 'Grab, Maxim'
    }
  ];

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
      {/* Banner trên cùng */}
      <div className="bg-blue-700 py-1 px-4 text-center text-sm">
        <span className="animate-pulse">🌴</span> Khám phá vẻ đẹp biển đảo Nha Trang - Thiên đường nghỉ dưỡng của Việt Nam <span className="animate-pulse">🌴</span>
      </div>
      
      {/* Logo và Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/logo/nti2.png" 
                alt="Nha Trang Insight Logo" 
                className="h-20"
              />
            </Link>
            <div className="ml-3 text-blue-100">
              <p className="text-sm leading-tight">Chuyên trang thông tin</p>
              <p className="text-sm leading-tight">du lịch & đời sống Nha Trang</p>
            </div>
          </div>
          
          <nav className="flex flex-wrap gap-2 md:gap-5 justify-center">
            <Link 
              href="/" 
              className={`group flex items-center text-sm px-3 py-2 rounded-full transition-all ${pathname === '/' ? 'bg-white text-blue-600 font-medium' : 'text-white hover:bg-blue-400'}`}
            >
              <FaUmbrellaBeach className="mr-1.5 group-hover:animate-pulse" /> 
              <span>Du lịch</span>
            </Link>
            
            <Link 
              href="/flights" 
              className={`group flex items-center text-sm px-3 py-2 rounded-full transition-all ${pathname === '/flights' ? 'bg-white text-blue-600 font-medium' : 'text-white hover:bg-blue-400'}`}
            >
              <FaPlane className="mr-1.5 group-hover:animate-pulse" /> 
              <span>Chuyến bay</span>
            </Link>
            
            {/* Transportation Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsTransportDropdownOpen(!isTransportDropdownOpen)}
                className={`group flex flex-col items-center text-sm px-3 py-2 rounded-full transition-all ${isTransportationActive ? 'bg-white text-blue-600 font-medium' : 'text-white hover:bg-blue-400'}`}
              >
                <div className="flex items-center">
                  <FaBus className="mr-1.5 group-hover:animate-pulse" /> 
                  <span>Di chuyển</span>
                  <FaChevronDown className={`ml-1 text-xs transition-transform ${isTransportDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              {/* Dropdown Menu */}
              {isTransportDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    {transportationPages.map((page, index) => {
                      const IconComponent = page.icon;
                      return (
                        <Link
                          key={index}
                          href={page.href}
                          onClick={() => setIsTransportDropdownOpen(false)}
                          className={`flex items-center px-4 py-3 hover:bg-gray-50 transition-colors ${pathname === page.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${pathname === page.href ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                            <IconComponent className="text-sm" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{page.title}</div>
                            <div className="text-xs text-gray-500">{page.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {/* <Link 
              href="/accommodations" 
              className={`group flex items-center text-sm px-3 py-2 rounded-full transition-all ${pathname === '/accommodations' ? 'bg-white text-blue-600 font-medium' : 'text-white hover:bg-blue-400'}`}
            >
              <FaHotel className="mr-1.5 group-hover:animate-pulse" /> 
              <span>Lưu trú</span>
            </Link>
            
            <Link 
              href="/food" 
              className={`group flex items-center text-sm px-3 py-2 rounded-full transition-all ${pathname === '/food' ? 'bg-white text-blue-600 font-medium' : 'text-white hover:bg-blue-400'}`}
            >
              <FaUtensils className="mr-1.5 group-hover:animate-pulse" /> 
              <span>Ẩm thực</span>
            </Link> */}
            
            <Link 
              href="/contact" 
              className={`group flex items-center text-sm px-3 py-2 rounded-full transition-all ${pathname === '/contact' ? 'bg-white text-blue-600 font-medium' : 'text-white hover:bg-blue-400'}`}
            >
              <FaComments className="mr-1.5 group-hover:animate-pulse" /> 
              <span>Liên hệ</span>
            </Link>
            
            {/* Ẩn liên kết đến trang cache, chỉ hiển thị cho admin */}
            {isAdmin && (
              <Link 
                href="/cache" 
                className={`group flex items-center text-sm px-3 py-2 rounded-full transition-all ${pathname === '/cache' ? 'bg-white text-blue-600 font-medium' : 'text-white hover:bg-blue-400'}`}
              >
                <span>Cache</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 