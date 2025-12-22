"use client";

import React, { useRef, useState } from "react";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Anh Minh Tuấn",
    role: "Chủ nhà xưởng - Bắc Ninh",
    avatar: "/images/testimonials/avatar-1.jpg",
    content:
      "Tôi đã lắp đặt tấm polycarbonate cho nhà xưởng được 3 năm. Chất lượng tuyệt vời, không bị ố vàng hay giòn như các loại khác. Ánh sáng tự nhiên giúp tiết kiệm điện đáng kể cho xưởng sản xuất.",
  },
  {
    id: 2,
    name: "Chị Thanh Hương",
    role: "Kiến trúc sư - Hà Nội",
    avatar: "/images/testimonials/avatar-2.jpg",
    content:
      "Everest Light là lựa chọn hàng đầu của tôi khi thiết kế giếng trời và mái che sân vườn cho khách hàng. Sản phẩm đẹp, bền và đội ngũ tư vấn rất chuyên nghiệp.",
  },
  {
    id: 3,
    name: "Anh Văn Đức",
    role: "Nhà thầu xây dựng - Đà Nẵng",
    avatar: "/images/testimonials/avatar-3.jpg",
    content:
      "Đã hợp tác với Everest Light nhiều dự án lớn. Giao hàng đúng hẹn, giá cả cạnh tranh, đặc biệt là chế độ bảo hành 10 năm giúp khách hàng của tôi rất yên tâm.",
  },
  {
    id: 4,
    name: "Chị Kim Ngân",
    role: "Chủ khách sạn - Nha Trang",
    avatar: "/images/testimonials/avatar-4.jpg",
    content:
      "Mái che hồ bơi bằng polycarbonate rỗng giúp khách nghỉ dưỡng thoải mái mà vẫn có ánh sáng tự nhiên. Sau 5 năm vẫn đẹp như mới, không bị phai màu hay nứt vỡ.",
  },
];

const Testimonials = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/images/banners/testimonial-bg.jpg"
                alt="Công trình lắp đặt tấm polycarbonate"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2">
            <p className="text-[#D97706] font-medium tracking-wide uppercase mb-2 text-sm">
              TẤM LỢP LẤY SÁNG EVEREST LIGHT
            </p>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-8">
              Khách hàng nói về chúng tôi
            </h2>
            <p className="text-gray-500 mb-8 text-sm">
              Hơn 500+ công trình đã tin tưởng sử dụng sản phẩm Everest Light
            </p>

            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-gray-100 relative">
              <Quote
                size={40}
                className="text-[#D97706] opacity-20 absolute top-6 left-6"
              />

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
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C59263] to-[#D97706] flex items-center justify-center text-white text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 italic leading-relaxed relative z-10">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Dots */}
              <div className="flex gap-2 mt-6 justify-center">
                {testimonials.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    aria-label={`Đến đánh giá ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-[#D97706]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
