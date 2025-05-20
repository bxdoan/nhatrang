'use client';

import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaPlane,
  FaBus,
  FaHotel,
  FaUmbrellaBeach,
  FaUtensils,
  FaHistory
} from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white pt-12">
      <div className="container mx-auto px-4">
        {/* Wave separator */}
        <div className="w-full h-12 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
            <path fill="#60A5FA" fillOpacity="0.3" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,181.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo và thông tin */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-yellow-300 mr-2">☀️</span> Nha Trang Insight
            </h3>
            <p className="text-sm text-blue-200 mb-4">
              Cung cấp thông tin du lịch, giao thông, ẩm thực và lịch sử Nha Trang - Khánh Hòa 
              giúp bạn có chuyến đi tuyệt vời nhất.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          {/* Danh mục */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Khám phá</h3>
            <ul className="text-sm text-blue-200 space-y-2">
              <li>
                <Link href="/" className="hover:text-white flex items-center">
                  <FaUmbrellaBeach className="mr-2" /> Du lịch
                </Link>
              </li>
              <li>
                <Link href="/flights" className="hover:text-white flex items-center">
                  <FaPlane className="mr-2" /> Chuyến bay
                </Link>
              </li>
              <li>
                <Link href="/transportation" className="hover:text-white flex items-center">
                  <FaBus className="mr-2" /> Di chuyển
                </Link>
              </li>
              <li>
                <Link href="/accommodations" className="hover:text-white flex items-center">
                  <FaHotel className="mr-2" /> Lưu trú
                </Link>
              </li>
              <li>
                <Link href="/food" className="hover:text-white flex items-center">
                  <FaUtensils className="mr-2" /> Ẩm thực
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-white flex items-center">
                  <FaHistory className="mr-2" /> Lịch sử
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="text-sm text-blue-200 space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1 text-blue-300" />
                <span>2/18 Ngô Đến, Vĩnh Phước , Tp. Nha Trang, Khánh Hòa</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-blue-300" />
                <span>+84 915 670 892</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-300" />
                <span>info@nhatranginsight.vn</span>
              </li>
            </ul>
          </div>
          
          {/* Đăng ký nhận tin */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nhận tin mới nhất</h3>
            <p className="text-sm text-blue-200 mb-3">
              Đăng ký nhận thông tin du lịch, khuyến mãi và cập nhật mới nhất về Nha Trang.
            </p>
            <div className="flex mt-3">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="bg-blue-700 text-white py-2 px-3 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 py-2 px-4 rounded-r-md text-sm font-medium transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-blue-700 py-6 text-center text-sm text-blue-300">
          <p>© {new Date().getFullYear()} Nha Trang Insight - Thông tin du lịch & đời sống Nha Trang</p>
          <p className="mt-1 text-xs">Dữ liệu chuyến bay cung cấp bởi AviationStack API.</p>
        </div>
      </div>
    </footer>
  );
} 