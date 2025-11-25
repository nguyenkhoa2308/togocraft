import React from 'react';
import { Send, MapPin, Phone, Mail, ChevronUp, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Column 1: Brand & Contact */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
               {/* Logo Placeholder - replacing with text/icon if no image */}
               <div className="text-[#D97706]">
                 <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <rect width="40" height="40" rx="8" fill="currentColor"/>
                   <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="white"/>
                 </svg>
               </div>
               <div>
                 <h3 className="text-2xl font-[family-name:var(--font-pacifico)] text-[#D97706]">Sudes Craft</h3>
                 <p className="text-xs text-gray-400">Từng chi tiết, gửi gắm yêu thương</p>
               </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Sudes Craft – thương hiệu decor thủ công từ tre, mây và gỗ, mang đến những sản phẩm trang trí và gia dụng tự nhiên, tinh tế cho không gian sống hiện đại tại Việt Nam.
            </p>
            
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D97706] shrink-0" />
                <span>Địa chỉ: 70 Lữ Gia, Phường Phú Thọ, Tp.HCM</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D97706] shrink-0" />
                <span>Điện thoại: <span className="text-[#D97706] font-bold">1900 6750</span></span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D97706] shrink-0" />
                <span>Email: <span className="text-[#D97706]">support@sapo.vn</span></span>
              </div>
            </div>
            
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-full h-full object-cover" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden">
                <img src="/icons/instagram.svg" alt="Instagram" className="w-full h-full object-cover" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden">
                <img src="/icons/tiktok.svg" alt="TikTok" className="w-full h-full object-cover" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden">
                <img src="/icons/shopee.svg" alt="Shopee" className="w-full h-full object-cover" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden">
                <img src="/icons/lazada.svg" alt="Lazada" className="w-full h-full object-cover" />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="md:col-span-4 flex gap-8">
             <div className="flex-1">
                <h4 className="font-bold text-lg mb-6 uppercase">Về chúng tôi</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Về chúng tôi</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Hệ thống cửa hàng</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Chính sách mua hàng</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Chính sách vận chuyển</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Hướng dẫn mua hàng</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Hướng dẫn trả góp</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Quy định bảo hành</a></li>
                </ul>
             </div>
             <div className="flex-1 pt-12 md:pt-0">
                <h4 className="font-bold text-lg mb-6 opacity-0 md:opacity-100">Liên hệ</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Liên hệ</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Hỏi đáp</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Chính sách đổi trả</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Chính sách thành viên</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Hướng dẫn chuyển khoản</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Hướng dẫn đổi trả</a></li>
                  <li><a href="#" className="hover:text-[#D97706] transition-colors">Cam kết cửa hàng</a></li>
                </ul>
             </div>
          </div>

          {/* Column 3: Newsletter & Payment */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <h4 className="font-bold text-lg mb-4 uppercase">Đăng ký nhận tin từ Sudes Craft</h4>
              <p className="text-gray-400 text-sm mb-4">Nhận thông tin sản phẩm mới nhất và các chương trình khuyến mãi.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Nhập địa chỉ email" 
                  className="w-full bg-white text-gray-800 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-[#D97706] hover:bg-[#B07D4E] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 uppercase">Hỗ trợ thanh toán</h4>
              <div className="flex flex-wrap gap-2">
                <img src="/images/payment_1.webp" alt="Payment 1" className="h-8 w-auto rounded bg-white p-1" />
                <img src="/images/payment_2.webp" alt="Payment 2" className="h-8 w-auto rounded bg-white p-1" />
                <img src="/images/payment_3.webp" alt="Payment 3" className="h-8 w-auto rounded bg-white p-1" />
                <img src="/images/payment_4.webp" alt="Payment 4" className="h-8 w-auto rounded bg-white p-1" />
                <img src="/images/payment_5.webp" alt="Payment 5" className="h-8 w-auto rounded bg-white p-1" />
                <img src="/images/payment_6.webp" alt="Payment 6" className="h-8 w-auto rounded bg-white p-1" />
              </div>
            </div>
            
            <div>
               <div className="bg-white p-2 rounded-lg inline-block">
                 <div className="flex items-center gap-2">
                   <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-black text-xs">QR Code</div>
                   <div className="text-black">
                     <p className="font-bold text-sm text-[#D97706]">Zalo Mini App</p>
                     <p className="text-xs">Quét mã QR để mua hàng nhanh chóng</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© Bản quyền thuộc về <span className="font-bold text-white">Sudes Team</span> | Cung cấp bởi <span className="font-bold text-white">Sapo</span></p>
          
          <div className="flex gap-6">
             <a href="#" className="hover:text-white">Bảo mật thông tin</a>
             <a href="#" className="hover:text-white">Điều khoản & Điều lệ</a>
             <a href="#" className="hover:text-white">Quyền riêng tư</a>
          </div>
          
          <div className="flex gap-2">
             {/* Certification Badges */}
             <div className="h-8 w-20 bg-gray-700 rounded"></div>
             <div className="h-8 w-20 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Floating Buttons */}
      <button className="fixed bottom-24 right-6 bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-50">
         <ChevronUp size={24} />
      </button>
      <button className="fixed bottom-6 right-6 bg-[#D97706] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 animate-bounce">
         <MessageCircle size={24} />
      </button>
    </footer>
  );
}
