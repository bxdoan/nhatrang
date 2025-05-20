'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPlane, FaBus, FaUmbrellaBeach, FaHistory, FaHotel, FaUtensils } from 'react-icons/fa';

export default function Header() {
  const pathname = usePathname();
  
  // Ẩn trang Cache cho người dùng thông thường
  const isAdmin = false; // Sau này có thể thay bằng xác thực thực sự
  
  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
      {/* Banner trên cùng */}
      <div className="bg-blue-700 py-1 px-4 text-center text-sm">
        <span className="animate-pulse">🌴</span> Khám phá vẻ đẹp biển đảo Nha Trang - Thiên đường nghỉ dưỡng của Việt Nam <span className="animate-pulse">🌴</span>
      </div>
      
      {/* Logo và Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-white hover:text-blue-100 transition-colors flex items-center">
              <span className="text-yellow-300 mr-2">☀️</span> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Nha Trang Insight
              </span>
            </Link>
            <p className="text-sm text-blue-100">
              Chuyên trang thông tin du lịch & đời sống Nha Trang
            </p>
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
            
            <Link 
              href="/transportation" 
              className={`group flex items-center text-sm px-3 py-2 rounded-full transition-all ${pathname === '/transportation' ? 'bg-white text-blue-600 font-medium' : 'text-white hover:bg-blue-400'}`}
            >
              <FaBus className="mr-1.5 group-hover:animate-pulse" /> 
              <span>Di chuyển</span>
            </Link>
            
            <Link 
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
            </Link>
            
            <Link 
              href="/history" 
              className={`group flex items-center text-sm px-3 py-2 rounded-full transition-all ${pathname === '/history' ? 'bg-white text-blue-600 font-medium' : 'text-white hover:bg-blue-400'}`}
            >
              <FaHistory className="mr-1.5 group-hover:animate-pulse" /> 
              <span>Lịch sử</span>
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