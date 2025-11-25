import React from 'react';
import { Ticket, Info, Copy } from 'lucide-react';

const coupons = [
  { id: 1, code: 'CRAFT200', description: 'Giảm 200k giá trị đơn hàng', expiry: '12/12/2026', color: 'bg-[#FFF7ED]' },
  { id: 2, code: 'CRAFT100', description: 'Giảm 100k giá trị đơn hàng', expiry: '24/12/2026', color: 'bg-[#FFF7ED]' },
  { id: 3, code: 'CRAF50', description: 'Giảm 50k giá trị đơn hàng', expiry: '25/12/2026', color: 'bg-[#FFF7ED]' },
  { id: 4, code: 'FREESHIP', description: 'Miễn phí giao hàng', expiry: '25/12/2026', color: 'bg-[#FFF7ED]' },
];

const CouponSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#D97706] font-medium tracking-wide uppercase mb-2 text-sm">THỦ CÔNG SUDES CRAFT</p>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pacifico)] text-[#4A3B32]">
            Mã giảm giá dành cho bạn
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="flex bg-[#F9FAFB] rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              {/* Left Side - Icon */}
              <div className="w-1/3 bg-[#FFF7ED] flex items-center justify-center relative border-r border-dashed border-gray-300">
                 <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full"></div>
                 <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white rounded-full"></div>
                 
                 <div className="relative">
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/879/879757.png" 
                        alt="Coupon" 
                        className="w-12 h-12 object-contain opacity-90"
                        style={{ filter: 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} // Red tint approximation
                    />
                 </div>
              </div>

              {/* Right Side - Content */}
              <div className="w-2/3 p-4 flex flex-col justify-between relative">
                <div className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-gray-600">
                    <Info size={14} />
                </div>
                
                <div>
                    <h3 className="font-bold text-gray-800 text-lg">{coupon.code}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{coupon.description}</p>
                </div>
                
                <div className="flex items-end justify-between mt-3">
                    <span className="text-[10px] text-gray-400">HSD: {coupon.expiry}</span>
                    <button className="bg-[#C59263] hover:bg-[#B07D4E] text-white text-xs px-3 py-1 rounded shadow-sm transition-colors">
                        Copy mã
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponSection;
