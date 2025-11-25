import React from 'react';
import { Gift, MapPin, Phone } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-[#FDF6E9] border-b border-[#F0E6D2] text-xs md:text-sm py-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-[#8B5E3C]">
          <Gift size={16} />
          <span>Tặng Thiệp và Gói Quà <span className="font-bold text-[#D97706]">MIỄN PHÍ</span> Cho Đơn Từ 2 Triệu</span>
        </div>
        <div className="flex items-center gap-6 text-[#6B5D52]">
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#8B5E3C]">
            <Phone size={14} />
            <span>1900 6750</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#8B5E3C]">
            <MapPin size={14} />
            <span>Cửa hàng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
