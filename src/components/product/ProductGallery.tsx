"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  selectedVariantImage?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  selectedVariantImage,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  // Handle variant image change
  useEffect(() => {
    if (selectedVariantImage && mainSwiper) {
      const variantIndex = images.findIndex(
        (img) => img === selectedVariantImage
      );
      if (variantIndex !== -1) {
        mainSwiper.slideTo(variantIndex);
      }
    }
  }, [selectedVariantImage, images, mainSwiper]);

  return (
    <div className="product-gallery">
      {/* Main Image Swiper */}
      <Swiper
        onSwiper={setMainSwiper}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="main-gallery rounded-xl overflow-hidden mb-3"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square bg-gray-50">
              <img
                src={image}
                alt={`${productName} - ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumb-gallery"
        breakpoints={{
          480: { slidesPerView: 5 },
          640: { slidesPerView: 4 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#C59263] transition-colors">
              <img
                src={image}
                alt={`${productName} thumb ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .product-gallery .swiper-button-next,
        .product-gallery .swiper-button-prev {
          color: #C59263;
          background: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .product-gallery .swiper-button-next:after,
        .product-gallery .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }
        .product-gallery .swiper-button-disabled {
          opacity: 0.3;
        }
        .thumb-gallery .swiper-slide-thumb-active > div {
          border-color: #C59263 !important;
        }
      `}</style>
    </div>
  );
};

export default ProductGallery;
