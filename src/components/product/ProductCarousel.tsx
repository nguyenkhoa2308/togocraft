"use client";

import React, { useId } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard, { Product } from "@/components/ui/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
}) => {
  const id = useId().replace(/:/g, ""); // Remove colons for CSS selector safety
  const prevClass = `swiper-button-prev-${id}`;
  const nextClass = `swiper-button-next-${id}`;

  return (
    <div className="mt-16 relative group/carousel">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#4A3B32] uppercase tracking-wide">
          {title}
        </h2>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: `.${nextClass}`,
            prevEl: `.${prevClass}`,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="!pb-10 w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <div className="h-full w-full flex">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className={`${prevClass} absolute top-1/2 -left-4 md:-left-6 z-10 -translate-y-1/2 w-10 h-10 bg-[#E8DCCF] hover:bg-[#C59263] text-[#4A3B32] hover:text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 cursor-pointer shadow-md`}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className={`${nextClass} absolute top-1/2 -right-4 md:-right-6 z-10 -translate-y-1/2 w-10 h-10 bg-[#E8DCCF] hover:bg-[#C59263] text-[#4A3B32] hover:text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 cursor-pointer shadow-md`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
