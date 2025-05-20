'use client';

import { useState } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaTelegram, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaCheck,
  FaMoneyBillWave,
  FaCreditCard
} from 'react-icons/fa';
import { CONTACT_INFO } from '../lib/contact-config';
import { qrCodeUrl } from '../lib/utils';
import Script from 'next/script';
import { CONTACT_PAGE_SCHEMA } from '../lib/metadata';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  // Xử lý thay đổi dữ liệu form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Xử lý submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Mô phỏng gửi form
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  // URL hình ảnh QR code thanh toán mặc định (amount=0)
  const defaultQrCode = qrCodeUrl({
    bankId: CONTACT_INFO.bankAccount.bankId,
    accountNumber: CONTACT_INFO.bankAccount.accountNumber,
    accountHolder: CONTACT_INFO.bankAccount.accountHolder,
    transferContent: "THANHTOAN", // Nội dung mặc định
    template: "compact2", // Template to
  });
  
  return (
    <>
      <div>
        {/* Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Liên hệ với chúng tôi</h1>
              <p className="max-w-3xl mx-auto text-blue-100 text-lg">
                Bạn có thắc mắc hoặc cần hỗ trợ? Liên hệ ngay với Nha Trang Insight để được phản hồi trong thời gian sớm nhất
              </p>
            </div>
          </div>
        </section>
        
        {/* Main Contact Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Information */}
                <div className="md:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Thông tin liên hệ</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <FaPhone />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Điện thoại</h3>
                          <p className="text-gray-600 mt-1">
                            <a href={`tel:${CONTACT_INFO.phoneNumber}`} className="hover:text-blue-600">
                              {CONTACT_INFO.phoneNumber}
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <FaEnvelope />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Email</h3>
                          <p className="text-gray-600 mt-1">
                            <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-blue-600">
                              {CONTACT_INFO.email}
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <FaMapMarkerAlt />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Địa chỉ</h3>
                          <p className="text-gray-600 mt-1">
                            {CONTACT_INFO.address}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Social Media */}
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Kết nối với chúng tôi</h3>
                      <div className="flex space-x-4">
                        <a 
                          href={CONTACT_INFO.socialMedia.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        >
                          <FaFacebook />
                        </a>
                        <a 
                          href={CONTACT_INFO.socialMedia.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                        >
                          <FaInstagram />
                        </a>
                        <a 
                          href={CONTACT_INFO.socialMedia.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                        >
                          <FaTwitter />
                        </a>
                        <a 
                          href={CONTACT_INFO.socialMedia.youtube} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                        >
                          <FaYoutube />
                        </a>
                        <a 
                          href={`https://t.me/${CONTACT_INFO.telegramUsername}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                        >
                          <FaTelegram />
                        </a>
                      </div>
                    </div>
                    
                    {/* Map */}
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Bản đồ</h3>
                      <div className="rounded-lg overflow-hidden h-48 bg-gray-200">
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d458.48380976669773!2d109.1958535366535!3d12.26732540245049!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170678cc4569d75%3A0x6ed33e525d8da564!2sHD%20Nha%20Trang!5e1!3m2!1svi!2s!4v1741926655368!5m2!1svi!2s"
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen={true} 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="md:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Gửi thông tin liên hệ</h2>
                    
                    {formStatus === 'success' ? (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <FaCheck className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-green-700 font-medium">
                              Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Họ và tên *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Nhập họ tên của bạn"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Nhập địa chỉ email"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Số điện thoại
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Nhập số điện thoại của bạn"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                              Chủ đề *
                            </label>
                            <select
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Chọn chủ đề</option>
                              <option value="Thông tin du lịch">Thông tin du lịch</option>
                              <option value="Dịch vụ thuê xe">Dịch vụ thuê xe</option>
                              <option value="Đặt tour">Đặt tour</option>
                              <option value="Hỗ trợ đặt phòng">Hỗ trợ đặt phòng</option>
                              <option value="Khác">Khác</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Nội dung tin nhắn *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Hãy mô tả chi tiết yêu cầu của bạn..."
                          ></textarea>
                        </div>
                        
                        <div className="text-right">
                          <button
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors ${formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {formStatus === 'submitting' ? 'Đang gửi...' : 'Gửi tin nhắn'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                  
                  {/* Bank Payment Information */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <FaMoneyBillWave className="text-green-600 mr-2" /> 
                      Thông tin thanh toán
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/2">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Thông tin chuyển khoản</h3>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-start">
                            <span className="text-gray-500 mr-2">Ngân hàng:</span>
                            <span className="font-medium">{CONTACT_INFO.bankAccount.bankName}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-500 mr-2">Chi nhánh:</span>
                            <span className="font-medium">{CONTACT_INFO.bankAccount.bankBranch}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-500 mr-2">Số tài khoản:</span>
                            <span className="font-medium">{CONTACT_INFO.bankAccount.accountNumber}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-500 mr-2">Chủ tài khoản:</span>
                            <span className="font-medium">{CONTACT_INFO.bankAccount.accountHolder}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-500 mr-2">Nội dung CK:</span>
                            <span className="font-medium">[Họ tên] - [Dịch vụ]</span>
                          </li>
                        </ul>
                        
                        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4">
                          <p className="text-sm text-yellow-700">
                            Vui lòng ghi rõ tên và dịch vụ bạn đặt trong nội dung chuyển khoản để chúng tôi có thể xác nhận thanh toán của bạn.
                          </p>
                        </div>
                      </div>
                      
                      <div className="md:w-1/2 flex flex-col items-center">
                        <h3 className="text-lg font-medium text-gray-800 mb-3 text-center">Quét mã QR để thanh toán</h3>
                        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
                          <img 
                            src={defaultQrCode} 
                            alt="Mã QR thanh toán" 
                            className="w-48 h-88 object-contain"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-3 text-center">
                          Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_PAGE_SCHEMA) }}
      />
    </>
  );
} 