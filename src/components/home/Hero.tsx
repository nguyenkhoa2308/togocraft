"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=1200&auto=format&fit=crop&q=80",
    title: "Mỗi món đồ là một câu chuyện mộc mạc.",
    description:
      "Từ những sợi mây đan đến từng đường gốm mộc mạc, mỗi sản phẩm của chúng tôi là sự kết hợp giữa truyền thống và thiết kế hiện đại.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&auto=format&fit=crop&q=80",
    title: "Tinh hoa thủ công Việt.",
    description:
      "Mang vẻ đẹp tự nhiên vào không gian sống của bạn với những sản phẩm thủ công tinh xảo, bền vững và đầy nghệ thuật.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80",
    title: "Nét đẹp bình dị, an yên.",
    description:
      "Khám phá bộ sưu tập mới nhất với những thiết kế độc đáo, giúp ngôi nhà của bạn trở nên ấm cúng và gần gũi hơn.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&auto=format&fit=crop&q=80",
    title: "Gần gũi với thiên nhiên.",
    description:
      "Sử dụng vật liệu tự nhiên, thân thiện với môi trường để tạo nên không gian sống xanh và bền vững.",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getIndex = (index: number) => {
    return (index + slides.length) % slides.length;
  };

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => getIndex(prev + 1));
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => getIndex(prev - 1));
  }, [isAnimating]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Faster transition for sliding
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="w-full bg-white overflow-hidden py-8">
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        {/* Carousel Track */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => {
            const activeIndex = getIndex(currentIndex);
            const prevIndex = getIndex(currentIndex - 1);
            const nextIndex = getIndex(currentIndex + 1);

            let positionClass =
              "opacity-0 z-0 scale-75 left-1/2 -translate-x-1/2 pointer-events-none"; // Default hidden
            let contentClass = "opacity-0 translate-y-8";

            if (index === activeIndex) {
              // Center Item
              positionClass =
                "opacity-100 z-20 left-1/2 -translate-x-1/2 scale-100 cursor-default";
              contentClass = "opacity-100 translate-y-0";
            } else if (index === prevIndex) {
              // Left Item
              positionClass =
                "opacity-100 z-10 left-[-12%] -translate-x-1/2 scale-100 cursor-pointer hover:opacity-80";
            } else if (index === nextIndex) {
              // Right Item
              positionClass =
                "opacity-100 z-10 left-[112%] -translate-x-1/2 scale-100 cursor-pointer hover:opacity-80";
            }

            return (
              <div
                key={slide.id}
                onClick={() => {
                  if (index === prevIndex) handlePrev();
                  if (index === nextIndex) handleNext();
                }}
                className={`absolute top-0 w-[65%] md:w-[60%] h-full transition-all duration-500 ease-out ${positionClass}`}
              >
                <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl mx-2 md:mx-4">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-full h-full object-cover transition-transform duration-[3000ms] ease-out ${
                      index === activeIndex ? "scale-100" : "scale-100"
                    }`}
                    style={{
                      animation:
                        index === activeIndex
                          ? "zoomOut 2s ease-out forwards"
                          : "none",
                    }}
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                      index === activeIndex ? "opacity-0" : "opacity-100"
                    }`}
                  ></div>

                  {/* Content - Only visible for active slide */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6 transition-all duration-[2000ms] ease-out ${contentClass}`}
                  >
                    <h2 className="text-2xl md:text-5xl font-[family-name:var(--font-pacifico)] mb-4 drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="max-w-lg text-xs md:text-base mb-8 drop-shadow-md text-white/90 leading-relaxed hidden md:block font-[family-name:var(--font-plus-jakarta)]">
                      {slide.description}
                    </p>

                    <button className="inline-flex items-center gap-2 bg-[#C59263] hover:bg-[#B07D4E] text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                      <span>Xem chi tiết</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-[22%] top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-[#C59263] p-2 rounded-full shadow-lg transition-all hover:scale-110 hidden md:block"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-[20%] top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-[#C59263] p-2 rounded-full shadow-lg transition-all hover:scale-110 hidden md:block"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                index === currentIndex
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
