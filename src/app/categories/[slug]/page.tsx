"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Home, SlidersHorizontal, X } from "lucide-react";
import { ProductCard, QuickViewDialog, Product } from "@/components/ui";
import {
  getCategories,
  getProductsByCategory,
  getAllProducts,
  colorMap,
} from "@/lib/data/polycarbonate-data";

// Category metadata
const categoryMeta: Record<
  string,
  {
    description: string;
    banner: string;
  }
> = {
  all: {
    description:
      "Khám phá bộ sưu tập đầy đủ các sản phẩm tấm lợp lấy sáng polycarbonate Everest Light. Chất lượng cao, bảo hành 10 năm.",
    banner: "/images/banners/tam-lop-dac.jpg",
  },
  polycarbonate_dac: {
    description:
      "Tấm polycarbonate đặc trong suốt như kính, bền gấp 200 lần, chống UV tuyệt đối - Giải pháp lấy sáng hiện đại cho mọi công trình.",
    banner: "/images/banners/tam-lop-dac.jpg",
  },
  polycarbonate_song: {
    description:
      "Tấm lợp polycarbonate dạng sóng chống nóng, chống UV, độ bền cao - Lựa chọn hoàn hảo cho mái nhà xưởng, nhà kho.",
    banner: "/images/banners/tam-lop-song.jpg",
  },
  polycarbonate_rong: {
    description:
      "Tấm polycarbonate rỗng cấu trúc cách nhiệt tốt, nhẹ và dễ thi công - Phù hợp cho giếng trời, mái che sân vườn.",
    banner: "/images/banners/tam-lop-rong.jpg",
  },
  phu_kien: {
    description:
      "Đầy đủ phụ kiện lắp đặt chính hãng: nẹp, ốc vít, ron cao su - Đảm bảo thi công chuẩn kỹ thuật.",
    banner: "/images/banners/phu-kien.jpg",
  },
};

// Category images for display
const categoryImages: Record<string, string> = {
  polycarbonate_dac: "/images/banners/tam-lop-dac.jpg",
  polycarbonate_song: "/images/banners/tam-lop-song.jpg",
  polycarbonate_rong: "/images/banners/tam-lop-rong.jpg",
  phu_kien: "/images/banners/phu-kien.jpg",
};

const sortOptions = [
  { value: "default", label: "Mặc định" },
  { value: "name-asc", label: "Tên A-Z" },
  { value: "name-desc", label: "Tên Z-A" },
  { value: "price-asc", label: "Giá thấp đến cao" },
  { value: "price-desc", label: "Giá cao xuống thấp" },
];

// Get available colors from colorMap
const availableColors = Object.entries(colorMap)
  .filter((_, index) => index % 2 === 0) // Get unique colors (skip duplicates)
  .map(([name, hex]) => ({
    id: hex,
    label: name,
    hex: hex,
  }));

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Get categories from data
  const categories = getCategories();
  const currentCategory = categories.find((c) => c.slug === slug);
  const meta = categoryMeta[slug] || categoryMeta.all;

  // Get products
  const rawProducts = useMemo(() => {
    if (slug === "all") {
      return getAllProducts();
    }
    return getProductsByCategory(slug);
  }, [slug]);

  // Parse price string to number
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^\d]/g, "")) || 0;
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...rawProducts];

    // Filter by color
    if (selectedColors.length > 0) {
      products = products.filter(
        (p) =>
          p.colors && p.colors.some((color) => selectedColors.includes(color))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-desc":
        products.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "name-asc":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return products;
  }, [rawProducts, sortBy, selectedColors]);

  const toggleColorFilter = (colorHex: string) => {
    if (selectedColors.includes(colorHex)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorHex));
    } else {
      setSelectedColors([...selectedColors, colorHex]);
    }
  };

  const clearAllFilters = () => {
    setSelectedColors([]);
  };

  const hasActiveFilters = selectedColors.length > 0;

  // Category display name
  const categoryName =
    slug === "all"
      ? "Tất cả sản phẩm"
      : currentCategory?.name || "Danh mục không tồn tại";

  if (!currentCategory && slug !== "all") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Danh mục không tồn tại
          </h1>
          <Link href="/" className="text-[#C59263] hover:underline">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <div className="relative h-56 md:h-72">
        <Image
          src={meta.banner}
          alt={categoryName}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {categoryName}
          </h1>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Link href="/" className="flex items-center gap-1 hover:text-white">
              <Home size={16} />
              Trang chủ
            </Link>
            <span>/</span>
            <span>{categoryName}</span>
          </div>
          <p className="text-white/80 text-sm mt-4 max-w-2xl hidden md:block">
            {meta.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Category Cards - Show when viewing all products */}
        {slug === "all" && (
          <div className="py-10 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group text-center"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-3 border-transparent group-hover:border-[#C59263] transition-all shadow-lg">
                    <Image
                      src={
                        categoryImages[cat.slug] ||
                        "/images/products/default.jpg"
                      }
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="128px"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-[#C59263] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {getProductsByCategory(cat.slug).length} sản phẩm
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
          {/* Left: Filter toggle & result count */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-[#C59263] transition-colors bg-white text-[#c59263] font-semibold"
            >
              <SlidersHorizontal size={16} strokeWidth={3} />
              Bộ lọc
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-[#C59263] text-white text-xs rounded-full flex items-center justify-center text-[#c59263]">
                  {selectedColors.length}
                </span>
              )}
            </button>
            <span className="text-sm text-gray-500">
              {filteredProducts.length} sản phẩm
            </span>
          </div>

          {/* Right: Sort options */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500 hidden sm:inline">
              Xếp theo:
            </span>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  sortBy === option.value
                    ? "bg-[#C59263] text-white"
                    : "text-gray-600 hover:text-[#C59263]"
                }`}
              >
                {sortBy === option.value && <span className="mr-1">●</span>}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm nào.</p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[#C59263] hover:underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowFilters(false)}
      />

      {/* Filter Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Bộ lọc</h2>
          <button
            type="button"
            onClick={() => setShowFilters(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Categories */}
          <div className="border-b border-gray-100 pb-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#C59263] mb-4">
              <span className="w-2 h-2 bg-[#C59263] rounded-full"></span>
              DANH MỤC
            </h3>
            <div className="space-y-3">
              <Link
                href="/categories/all"
                className={`block text-sm transition-colors ${
                  slug === "all"
                    ? "text-[#C59263] font-medium"
                    : "text-gray-600 hover:text-[#C59263]"
                }`}
              >
                Tất cả sản phẩm
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className={`block text-sm transition-colors ${
                    slug === cat.slug
                      ? "text-[#C59263] font-medium"
                      : "text-gray-600 hover:text-[#C59263]"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Color Filter - Only show for non-accessory categories */}
          {slug !== "phu_kien" && (
            <div className="pb-6">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[#C59263] mb-4">
                <span className="w-2 h-2 bg-[#C59263] rounded-full"></span>
                MÀU SẮC
              </h3>
              <div className="space-y-3">
                {availableColors.map((color) => (
                  <label
                    key={color.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        color.hex === "#F4F4F4" || color.hex === "#E8F4F8"
                          ? "border-gray-300"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColors.includes(color.id) && (
                        <svg
                          className={`w-3 h-3 ${
                            color.hex === "#F4F4F4" || color.hex === "#E8F4F8"
                              ? "text-gray-800"
                              : "text-white"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleColorFilter(color.id)}
                      className="text-sm text-gray-600 group-hover:text-[#C59263] transition-colors"
                    >
                      {color.label}
                    </button>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button
            type="button"
            onClick={clearAllFilters}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Xóa bộ lọc
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(false)}
            className="flex-1 px-4 py-2.5 bg-[#C59263] text-white rounded-lg text-sm font-medium hover:bg-[#B08253] transition-colors"
          >
            Áp dụng
          </button>
        </div>
      </div>

      {/* Quick View Dialog */}
      <QuickViewDialog
        isOpen={!!quickViewProduct}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default CategoryPage;
