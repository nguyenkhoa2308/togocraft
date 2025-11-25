"use client"

import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { ProductCard, Carousel } from '@/components/ui';

const products = [
  { id: 1, name: 'Bình xà cừ, giá đỡ cây hoa', price: '1.300.000đ', oldPrice: '1.450.000đ', discount: '-10%', sold: 980, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60' },
  { id: 2, name: 'Đèn bàn mây tre đan trang trí', price: '99.000đ', oldPrice: '120.000đ', discount: '-18%', sold: 245, image: 'https://images.unsplash.com/photo-1570893620840-2dc6d3dc02a9?w=400&auto=format&fit=crop&q=60' },
  { id: 3, name: 'Cốc thủy tinh mây tre đan cao cấp', price: '100.000đ', oldPrice: '', discount: '', sold: 350, image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=400&auto=format&fit=crop&q=60' },
  { id: 4, name: 'Đèn Mây Tre Hình Cá', price: '990.000đ', oldPrice: '1.300.000đ', discount: '-24%', sold: 280, image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=400&auto=format&fit=crop&q=60' },
  { id: 5, name: 'Giỏ Cói Đựng Đồ Đa Năng', price: '150.000đ', oldPrice: '200.000đ', discount: '-25%', sold: 120, image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=400&auto=format&fit=crop&q=60' },
  { id: 6, name: 'Khay Mây Tròn Decor', price: '180.000đ', oldPrice: '', discount: '', sold: 85, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=60' },
];

const SaleSection = () => {

  return (
    <section className="py-16 bg-[#FDF6E9]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#D97706] font-medium tracking-wide uppercase mb-2 text-sm">CÙNG SUDES CRAFT KHỞI ĐỘNG</p>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-4">
            “Year End Craft Sale - Xả Kho Cuối Năm”
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-[family-name:var(--font-plus-jakarta)]">
            Ưu đãi cực hấp dẫn cho túi cói, đèn mây, chậu gốm và hàng trăm sản phẩm thủ công từ 01/12 – 31/12.
          </p>
        </div>

        {/* Tabs & Countdown */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 w-full lg:w-auto no-scrollbar">
            <div className="flex-shrink-0 border border-gray-200 bg-white px-6 py-3 rounded-lg text-gray-400 text-center min-w-[140px] opacity-60">
              <div className="font-bold text-sm">01/06 – 30/06</div>
              <div className="text-xs">Đã kết thúc</div>
            </div>
            <div className="flex-shrink-0 border-2 border-[#D97706] bg-white px-6 py-3 rounded-lg text-[#D97706] text-center min-w-[140px] shadow-sm relative overflow-hidden">
              <div className="font-bold text-sm">10/10 – 31/12</div>
              <div className="text-xs font-medium">Đang diễn ra</div>
            </div>
            <div className="flex-shrink-0 border border-gray-200 bg-white px-6 py-3 rounded-lg text-gray-400 text-center min-w-[140px] opacity-60">
              <div className="font-bold text-sm">01/01 – 30/06</div>
              <div className="text-xs">Sắp diễn ra</div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#FFEDD5] px-6 py-3 rounded-full text-[#9A3412] font-medium shadow-inner">
            <Clock size={20} />
            <span className="text-sm md:text-base">Kết thúc sau</span>
            <div className="flex gap-1.5">
              <span className="bg-white px-2.5 py-1 rounded text-sm font-bold shadow-sm text-[#C2410C]">41</span>
              <span className="text-[#C2410C]">:</span>
              <span className="bg-white px-2.5 py-1 rounded text-sm font-bold shadow-sm text-[#C2410C]">13</span>
              <span className="text-[#C2410C]">:</span>
              <span className="bg-white px-2.5 py-1 rounded text-sm font-bold shadow-sm text-[#C2410C]">31</span>
              <span className="text-[#C2410C]">:</span>
              <span className="bg-white px-2.5 py-1 rounded text-sm font-bold shadow-sm text-[#C2410C]">00</span>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <Carousel itemsPerView={4}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
        
        <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-[#D97706] text-white hover:bg-[#B45309] px-8 py-3 rounded-full font-bold transition-colors uppercase tracking-wide text-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                Xem tất cả sản phẩm
                <ArrowRight size={18} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default SaleSection;
