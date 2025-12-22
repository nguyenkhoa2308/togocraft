"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  ProductCard,
  Product,
  QuickViewDialog,
  Carousel,
} from "@/components/ui";

interface CategoryShowcaseProps {
  title: string;
  subtitle: string;
  description?: string;
  bannerImage: string;
  products: Product[];
  reverse?: boolean;
  categorySlug?: string;
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  title,
  subtitle,
  description,
  bannerImage,
  products,
  reverse = false,
  categorySlug,
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  return (
    <section className="py-10 md:py-12 lg:py-16 bg-[#FDFBF7]">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col lg:flex-row gap-6 lg:gap-8 ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Banner Side - Hidden on mobile/tablet */}
          <div className="hidden lg:flex w-full lg:w-1/3 flex-col">
            <div className="relative flex-grow rounded-2xl overflow-hidden shadow-md group">
              <img
                src={bannerImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Products Grid Side - Full width on mobile/tablet */}
          <div className="w-full lg:w-2/3 flex flex-col justify-end">
            <div className="relative mb-4 md:mb-6">
              {/* Label */}
              <p className="relative text-[#D97706] font-semibold tracking-wide uppercase text-[10px] sm:text-xs md:text-sm pl-3 md:pl-4 mb-2 before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-[#D97706] before:rounded-full before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2">
                {subtitle}
              </p>  
              {categorySlug ? (
                <Link href={`/categories/${categorySlug}`}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-2 hover:text-[#f57b23] cursor-pointer transition-colors line-clamp-3 md:line-clamp-none">
                    {title}
                  </h2>
                </Link>
              ) : (
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-2 line-clamp-3 md:line-clamp-none">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-gray-600 text-xs sm:text-sm">{description}</p>
              )}
            </div>

            {/* Responsive carousel: 2 items mobile, 3 tablet, 3 desktop (with banner) */}
            <Carousel
              itemsPerView={{ default: 1, sm: 2, md: 3, lg: 3 }}
              gap="px-2 sm:px-3"
              customArrows={({ onPrev, onNext, isFirst, isLast }) => (
                <>
                  {/* Mobile/Tablet: Arrows at center of carousel, left/right edges */}
                  <button
                    type="button"
                    onTouchStart={(e) => { e.stopPropagation(); }}
                    onMouseDown={(e) => { e.stopPropagation(); }}
                    onClick={onPrev}
                    disabled={isFirst}
                    aria-label="Sản phẩm trước"
                    className={`md:hidden absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-[#C59263] hover:bg-[#B07D4E] active:bg-[#9A6B3D] rounded-full flex items-center justify-center text-white transition-colors shadow-lg touch-manipulation pointer-events-auto ${
                      isFirst ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onTouchStart={(e) => { e.stopPropagation(); }}
                    onMouseDown={(e) => { e.stopPropagation(); }}
                    onClick={onNext}
                    disabled={isLast}
                    aria-label="Sản phẩm tiếp theo"
                    className={`md:hidden absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-[#C59263] hover:bg-[#B07D4E] active:bg-[#9A6B3D] rounded-full flex items-center justify-center text-white transition-colors shadow-lg touch-manipulation pointer-events-auto ${
                      isLast ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <ArrowRight size={20} />
                  </button>
                  {/* Desktop: Arrows together at top right */}
                  <div className="hidden md:flex absolute -top-16 right-0 gap-2">
                    <button
                      type="button"
                      onClick={onPrev}
                      disabled={isFirst}
                      aria-label="Sản phẩm trước"
                      className={`w-10 h-10 bg-[#C59263] hover:bg-[#B07D4E] rounded-full flex items-center justify-center text-white transition-colors shadow-sm ${
                        isFirst ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      disabled={isLast}
                      aria-label="Sản phẩm tiếp theo"
                      className={`w-10 h-10 bg-[#C59263] hover:bg-[#B07D4E] rounded-full flex items-center justify-center text-white transition-colors shadow-sm ${
                        isLast ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </>
              )}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </Carousel>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          {categorySlug ? (
            <Link
              href={`/categories/${categorySlug}`}
              className="inline-flex items-center gap-2 bg-[#C59263] text-white hover:bg-[#B07D4E] px-8 py-3 rounded-full font-bold transition-colors text-sm uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
            >
              Xem tất cả
              <ArrowRight size={16} />
            </Link>
          ) : (
            <button className="inline-flex items-center gap-2 bg-[#C59263] text-white hover:bg-[#B07D4E] px-8 py-3 rounded-full font-bold transition-colors text-sm uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
              Xem tất cả
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Quick View Dialog */}
      <QuickViewDialog
        isOpen={!!quickViewProduct}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};

export default CategoryShowcase;
