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
  FaHistory,
  FaComments,
  FaGithub,
  FaShoppingCart
} from 'react-icons/fa';
import Link from 'next/link';
import { CONTACT_INFO } from '../lib/contact-config';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocalizedLink } from '../hooks/useLocalizedLink';

export default function Footer() {
  const { t } = useLanguage();
  const { createLink } = useLocalizedLink();
  
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
            <div className="flex justify-center mb-4">
              <Link href={createLink('/')}>
                <img 
                  src="/images/logo/nti2.png" 
                  alt="Nha Trang Insight Logo" 
                  className="h-20 hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
            <p className="text-sm text-blue-200 mb-4">
              {t.footer?.description || 'Cung cấp thông tin du lịch, giao thông, ẩm thực và lịch sử Nha Trang - Khánh Hòa giúp bạn có chuyến đi tuyệt vời nhất.'}
            </p>
            <div className="flex space-x-3 mt-4">
              <a href={CONTACT_INFO.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href={CONTACT_INFO.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href={CONTACT_INFO.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href={CONTACT_INFO.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <FaYoutube size={20} />
              </a>
              <a href="https://github.com/bxdoan" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          
          {/* Danh mục */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer?.explore || 'Khám phá'}</h3>
            <ul className="text-sm text-blue-200 space-y-2">
              <li>
                <Link href={createLink('/')} className="hover:text-white flex items-center">
                  <FaUmbrellaBeach className="mr-2" /> {t.navigation?.home || 'Du lịch'}
                </Link>
              </li>
              <li>
                <Link href={createLink('/services')} className="hover:text-white flex items-center">
                  <FaShoppingCart className="mr-2" /> {t.navigation?.services || 'Dịch vụ Premium'}
                </Link>
              </li>
              <li>
                <Link href={createLink('/flights')} className="hover:text-white flex items-center">
                  <FaPlane className="mr-2" /> {t.navigation?.flights || 'Chuyến bay'}
                </Link>
              </li>
              <li>
                <Link href={createLink('/transportation')} className="hover:text-white flex items-center">
                  <FaBus className="mr-2" /> {t.navigation?.transportation || 'Di chuyển'}
                </Link>
              </li>
              <li>
                <Link href={createLink('/accommodations')} className="hover:text-white flex items-center">
                  <FaHotel className="mr-2" /> {t.navigation?.accommodations || 'Lưu trú'}
                </Link>
              </li>
              <li>
                <Link href={createLink('/food')} className="hover:text-white flex items-center">
                  <FaUtensils className="mr-2" /> {t.navigation?.food || 'Ẩm thực'}
                </Link>
              </li>
              <li>
                <Link href={createLink('/contact')} className="hover:text-white flex items-center">
                  <FaComments className="mr-2" /> {t.navigation?.contact || 'Liên hệ'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer?.contact || 'Liên hệ'}</h3>
            <ul className="text-sm text-blue-200 space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1 text-blue-300" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-blue-300" />
                <span>{CONTACT_INFO.phoneNumber}</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-300" />
                <span>{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>
          
          {/* Đăng ký nhận tin */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer?.newsletter || 'Nhận tin mới nhất'}</h3>
            <p className="text-sm text-blue-200 mb-3">
              {t.footer?.newsletterDesc || 'Đăng ký nhận thông tin du lịch, khuyến mãi và cập nhật mới nhất về Nha Trang.'}
            </p>
            <div className="flex mt-3">
              <input 
                type="email" 
                placeholder={t.footer?.emailPlaceholder || 'Email của bạn'}
                className="bg-blue-700 text-white py-2 px-3 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 py-2 px-4 rounded-r-md text-sm font-medium transition-colors">
                {t.footer?.subscribe || 'Đăng ký'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-blue-700 py-6 text-center text-sm text-blue-300">
          <p>© {new Date().getFullYear()} {t.footer?.copyright || 'Nha Trang Insight - Thông tin du lịch & đời sống Nha Trang'}</p>
        </div>
      </div>
    </footer>
  );
} 