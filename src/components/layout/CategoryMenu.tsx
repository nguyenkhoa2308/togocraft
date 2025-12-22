"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Layers, Wrench } from "lucide-react";
import Link from "next/link";

// Reorganized categories - Tấm lợp as main with subcategories
interface SubCategory {
  name: string;
  href: string;
  description: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  href: string;
  icon: React.ElementType;
  subCategories: SubCategory[];
  image: string;
}

const CATEGORIES: Category[] = [
  {
    id: "tam-lop",
    name: "Tấm lợp Polycarbonate",
    href: "/categories/all",
    icon: Layers,
    image: "/images/banners/tam-lop-dac.jpg",
    subCategories: [
      {
        name: "Polycarbonate đặc (Solid)",
        href: "/categories/polycarbonate_dac",
        description: "Trong suốt như kính, bền gấp 200 lần",
        image: "/images/banners/tam-lop-dac.jpg",
      },
      {
        name: "Polycarbonate sóng (Corrugated)",
        href: "/categories/polycarbonate_song",
        description: "Dạng sóng, độ cứng cao, chống ồn tốt",
        image: "/images/banners/tam-lop-song.jpg",
      },
      {
        name: "Polycarbonate rỗng (Multiwall)",
        href: "/categories/polycarbonate_rong",
        description: "Cách nhiệt tốt, nhẹ, tiết kiệm chi phí",
        image: "/images/banners/tam-lop-rong.jpg",
      },
    ],
  },
  {
    id: "phu_kien",
    name: "Phụ kiện lắp đặt",
    href: "/categories/phu_kien",
    icon: Wrench,
    image: "/images/products/phu-kien.jpg",
    subCategories: [],
  },
];

const CategoryMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSubIndex, setHoveredSubIndex] = useState<number | null>(null);

  return (
    <div
      className="relative group z-50"
      onMouseLeave={() => {
        setActiveCategory(null);
        setHoveredSubIndex(null);
      }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2 text-[#4B5563] hover:text-[#D97706] transition-all shadow-sm border-2 border-[#c88948]"
      >
        <svg
          className="w-4 h-4 mr-1 text-[#c88948]"
          enableBackground="new 0 0 100 100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="m21.6526432 42.0268707c10.551836 0 19.135767-8.5840302 19.135767-19.1357651 0-10.568717-8.5839272-19.1527462-19.1357651-19.1527462-10.568716 0-19.1526451 8.5840302-19.1526451 19.1527462-.000001 10.551735 8.5839291 19.1357651 19.1526432 19.1357651z"
          ></path>
          <path
            fill="currentColor"
            d="m78.3473511 3.7383595c-10.5518341 0-19.1357651 8.5840302-19.1357651 19.1527462 0 10.5517349 8.583931 19.1357651 19.1357651 19.1357651 10.5687179-.0000001 19.1526489-8.584034 19.1526489-19.1357651 0-10.5687171-8.583931-19.152747-19.1526489-19.1527462z"
          ></path>
          <path
            fill="currentColor"
            d="m21.6526432 96.2616425c10.551836 0 19.135767-8.5840302 19.135767-19.1527481 0-10.5517349-8.5839272-19.1357613-19.1357651-19.1357613-10.568716 0-19.1526451 8.5840263-19.1526451 19.1357613-.000001 10.5687179 8.5839291 19.1527481 19.1526432 19.1527481z"
          ></path>
          <path
            fill="currentColor"
            d="m78.3473511 57.9731331c-10.5518341 0-19.1357651 8.5840263-19.1357651 19.1357613 0 10.568718 8.583931 19.1527481 19.1357651 19.1527481 10.5687179 0 19.1526489-8.5840302 19.1526489-19.1527482 0-10.5517349-8.583931-19.1357612-19.1526489-19.1357612z"
          ></path>
        </svg>
        <span className="font-semibold text-sm">Danh mục</span>
        <ChevronDown size={16} />
      </button>

      {/* Bridge to prevent menu closing */}
      <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>

      {/* Main Dropdown */}
      <div className="absolute top-full left-0 w-[280px] bg-white shadow-xl rounded-lg mt-2 hidden group-hover:block border border-gray-100 py-2">
        {CATEGORIES.map((category) => (
          <div
            key={category.id}
            onMouseEnter={() => {
              setActiveCategory(category.id);
              setHoveredSubIndex(null);
            }}
            className="relative"
          >
            <Link
              href={category.href}
              className={`flex items-center justify-between px-4 py-2.5 transition-colors ${
                activeCategory === category.id
                  ? "bg-[#FFF7ED] text-[#D97706]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#D97706]"
              }`}
            >
              <div className="flex items-center gap-3">
                <category.icon size={18} strokeWidth={1.5} />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              {category.subCategories.length > 0 && <ChevronRight size={16} />}
            </Link>
          </div>
        ))}

        {/* Sub-menu Panel */}
        {activeCategory &&
          (CATEGORIES.find((c) => c.id === activeCategory)?.subCategories
            .length ?? 0) > 0 && (
            <div
              className="absolute top-0 left-full w-[500px] bg-white shadow-xl rounded-r-lg border border-l-0 border-gray-100 ml-0 z-50 overflow-hidden"
              onMouseEnter={() => {
                const cat = CATEGORIES.find((c) => c.id === activeCategory);
                if (cat) setActiveCategory(cat.id);
              }}
            >
              {(() => {
                const category = CATEGORIES.find(
                  (c) => c.id === activeCategory
                );
                if (!category) return null;

                return (
                  <div className="flex">
                    {/* Sub-categories List */}
                    <div className="flex-1 p-4">
                      <h3 className="font-bold text-[#4A3B32] mb-3 text-sm uppercase tracking-wide">
                        {category.name}
                      </h3>
                      <div className="space-y-1">
                        {category.subCategories.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            onMouseEnter={() => setHoveredSubIndex(idx)}
                            onMouseLeave={() => setHoveredSubIndex(null)}
                            className={`block p-3 rounded-lg transition-colors ${
                              hoveredSubIndex === idx
                                ? "bg-[#FFF7ED]"
                                : "hover:bg-[#FFF7ED]"
                            }`}
                          >
                            <div
                              className={`font-medium text-sm ${
                                hoveredSubIndex === idx
                                  ? "text-[#D97706]"
                                  : "text-gray-800 hover:text-[#D97706]"
                              }`}
                            >
                              {sub.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {sub.description}
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* View all link */}
                      <Link
                        href={category.href}
                        className="inline-flex items-center gap-1 mt-4 text-sm text-[#D97706] hover:underline font-medium"
                      >
                        Xem tất cả sản phẩm
                        <ChevronRight size={14} />
                      </Link>
                    </div>

                    {/* Featured Image - changes on subcategory hover with fade */}
                    <div className="w-[180px] relative overflow-hidden">
                      {/* Stack all images and fade in/out */}
                      {category.subCategories.map((sub, idx) => (
                        <img
                          key={idx}
                          src={sub.image}
                          alt={sub.name}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                            hoveredSubIndex === idx ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      ))}
                      {/* Default image when no subcategory is hovered */}
                      <img
                        src={category.image}
                        alt={category.name}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          hoveredSubIndex === null ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
      </div>
    </div>
  );
};

export default CategoryMenu;
