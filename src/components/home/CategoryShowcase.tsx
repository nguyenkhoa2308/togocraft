"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { ProductCard, Product, QuickViewDialog, Carousel } from "@/components/ui";

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
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section className="py-16 bg-[#FDFBF7]">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col lg:flex-row gap-8 ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Banner Side */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="relative flex-grow rounded-2xl overflow-hidden min-h-[300px] lg:min-h-0 shadow-md group">
              <img
                src={bannerImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Products Grid Side */}
          <div className="w-full lg:w-2/3 flex flex-col justify-end">
            <div className="relative mb-6">
              <div>
                <div className="text-left">
                  <p className="relative block w-auto text-[#D97706] font-semibold tracking-wide uppercase mb-2 text-xs md:text-sm pl-[14px] mb-1 before:content before:block before:w-[6px] before:h-[6px] before:bg-[#D97706] before:rounded-[20px] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2">
                    {subtitle}
                  </p>
                </div>
                {categorySlug ? (
                  <Link href={`/categories/${categorySlug}`}>
                    <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-3 hover:text-[#f57b23] cursor-pointer transition-colors">
                      {title}
                    </h2>
                  </Link>
                ) : (
                  <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-3">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-gray-600 text-sm">{description}</p>
                )}
              </div>
            </div>

            {/* Always show carousel with 3 items per view */}
            <Carousel
              itemsPerView={3}
              gap="px-3"
              customArrows={({ onPrev, onNext, isFirst, isLast }) => (
                <div className="absolute -top-16 right-4 flex gap-2">
                  <button
                    onClick={onPrev}
                    disabled={isFirst}
                    className={`w-10 h-10 bg-[#C59263] hover:bg-[#B07D4E] rounded-full flex items-center justify-center text-white transition-colors shadow-sm relative cursor-pointer z-0 overflow-hidden before:content-[''] before:absolute before:w-[32px] before:h-[32px] before:rounded-full before:bg-white/15 before:right-0 before:bottom-0 before:translate-x-[5px] before:translate-y-[15px] before:transition-transform before:duration-[600ms] before:-z-10 before:pointer-events-none before:select-none hover:before:scale-[20] ${
                      isFirst ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={onNext}
                    disabled={isLast}
                    className={`w-10 h-10 bg-[#C59263] hover:bg-[#B07D4E] rounded-full flex items-center justify-center text-white transition-colors shadow-sm relative cursor-pointer z-0 overflow-hidden before:content-[''] before:absolute before:w-[32px] before:h-[32px] before:rounded-full before:bg-white/15 before:right-0 before:bottom-0 before:translate-x-[5px] before:translate-y-[15px] before:transition-transform before:duration-[600ms] before:-z-10 before:pointer-events-none before:select-none hover:before:scale-[20] ${
                      isLast ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
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

        <div className="text-center mt-12">
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
