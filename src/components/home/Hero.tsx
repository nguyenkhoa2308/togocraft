"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

const slides = [
  {
    id: 1,
    image: "/images/banners/banner-1.jpg",
  },
  {
    id: 2,
    image: "/images/banners/banner-2.jpg",
  },
];

const Hero = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          className="w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full aspect-[1696/624]">
                <Image
                  src={slide.image}
                  alt={`Banner ${slide.id}`}
                  fill
                  priority={slide.id === 1}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Slide trước"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#C59263] p-2 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Slide tiếp theo"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#C59263] p-2 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>

        {/* Custom Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              aria-label={`Đến slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
