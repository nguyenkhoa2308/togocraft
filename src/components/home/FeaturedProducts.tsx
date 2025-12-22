"use client";

import React, { useState } from "react";
import { ChevronRight, Sun, Waves, Grid3X3, Wrench } from "lucide-react";
import { ProductCard, QuickViewDialog, Product } from "@/components/ui";
import {
  featuredCategories,
  getProductsByCategory,
} from "@/lib/data/polycarbonate-data";

// Icon mapping for category tabs
const categoryIcons: Record<string, React.ElementType> = {
  polycarbonate_dac: Sun, // Tấm đặc - trong suốt như ánh sáng
  polycarbonate_song: Waves, // Tấm sóng - dạng lượn sóng
  polycarbonate_rong: Grid3X3, // Tấm rỗng - cấu trúc ô rỗng
  phu_kien: Wrench, // Phụ kiện - dụng cụ lắp đặt
};

const categories = featuredCategories;

// Build products with categoryId for filtering
const allProducts = categories.flatMap((cat) =>
  getProductsByCategory(cat.id).map((p) => ({ ...p, categoryId: cat.id }))
);

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const filteredProducts = allProducts.filter(
    (p) => p.categoryId === activeCategory
  );
  const displayedProducts = filteredProducts.slice(0, 8);
  const activeCategoryLink =
    categories.find((c) => c.id === activeCategory)?.link || "#";

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[#D97706] font-medium tracking-wide uppercase mb-2 text-sm">
            TẤM LỢP LẤY SÁNG EVEREST LIGHT
          </p>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pacifico)] text-[#4A3B32]">
            Các sản phẩm nổi bật
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto font-[family-name:var(--font-plus-jakarta)] mt-6">
            Sự kết hợp hài hòa giữa thủ công truyền thống và thiết kế hiện đại –
            đơn giản, tinh tế và bền vững cùng thời gian.
          </p>
        </div>

        {/* Filter Tabs - Responsive */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-1 py-1 max-w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const IconComponent = categoryIcons[cat.id];
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm md:text-base transition-all whitespace-nowrap border-2 flex-shrink-0 ${
                    isActive
                      ? "bg-[#F97316] text-white border-[#F97316]"
                      : "bg-white text-[#4A3B32] border-[#E5E7EB] hover:border-[#F97316] hover:text-[#F97316]"
                  }`}
                >
                  {IconComponent && (
                    <IconComponent className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  )}
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Chưa có sản phẩm nào trong danh mục này.
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <a
            href={activeCategoryLink}
            className="inline-flex items-center gap-2 border-2 border-[#C59263] text-[#C59263] hover:bg-[#C59263] hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 uppercase tracking-wide text-sm"
          >
            Xem tất cả
            <ChevronRight size={18} />
          </a>
        </div>

        {/* Quick View Dialog */}
        <QuickViewDialog
          isOpen={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
