"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Grid,
  ChevronRight,
  Package,
  Lamp,
  Armchair,
  ShoppingBag,
  Gem,
  LayoutGrid,
  Flower2,
  Gift,
  Layers,
} from "lucide-react";
import Link from "next/link";

// Mock Data based on the image
const CATEGORIES = [
  {
    id: "gio-khay",
    name: "Giỏ & Khay Đựng Đồ",
    href: "/categories/trays",
    icon: Package,
    subCategories: [
      {
        title: "Giỏ Lưu Trữ Thủ Công",
        items: [
          "Giỏ Đựng Đồ Cá Nhân",
          "Giỏ Đựng Quần Áo",
          "Giỏ Lưu Trữ Văn Phòng",
          "Giỏ Trang Trí Góc Nhà",
        ],
      },
      {
        title: "Khay Trang Trí & Phục Vụ",
        items: [
          "Khay Gỗ Tự Nhiên",
          "Khay Mây Đan Decor",
          "Khay Phục Vụ Trà & Cafe",
          "Khay Bày Biện Bàn Ăn",
        ],
      },
      {
        title: "Hộp Đan Tay & Giỏ Có Nắp",
        items: [
          "Hộp Trang Sức Thủ Công",
          "Hộp Lưu Giữ Mini",
          "Giỏ Nắp Đậy Đa Năng",
          "Bộ Hộp Decor Handmade",
        ],
      },
      {
        title: "Bộ Giỏ Quà & Set Decor",
        items: [
          "Giỏ Quà Decor Handmade",
          "Giỏ Quà Thư Giãn & Spa",
          "Giỏ Quà Mùa Lễ & Dịp Đặc Biệt",
          "Set Giỏ Decor Trang Trí",
        ],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "den-may-tre",
    name: "Đèn Mây Tre Trang Trí",
    href: "/categories/lamps",
    icon: Lamp,
    subCategories: [
      {
        title: "Đèn Thả Trần",
        items: ["Đèn Thả Bàn Ăn", "Đèn Thả Phòng Khách", "Đèn Lồng Mây Tre"],
      },
      {
        title: "Đèn Để Bàn & Đèn Sàn",
        items: ["Đèn Ngủ Để Bàn", "Đèn Sàn Góc Sofa", "Đèn Đọc Sách"],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "do-noi-that",
    name: "Đồ Nội Thất Tự Nhiên",
    href: "/categories/shelves",
    icon: Armchair,
    subCategories: [],
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "phu-kien",
    name: "Phụ Kiện Thời Trang Thủ Công",
    href: "/categories/bags",
    icon: ShoppingBag,
    subCategories: [],
    image:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "guong",
    name: "Gương Trang Trí",
    href: "/categories/shelves",
    icon: Gem,
    subCategories: [],
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "ke-gia-treo",
    name: "Kệ & Giá Treo Decor",
    href: "/categories/shelves",
    icon: LayoutGrid,
    subCategories: [],
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "trang-tri-tuong",
    name: "Trang Trí Tường",
    href: "/categories/shelves",
    icon: Layers,
    subCategories: [],
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "lo-hoa",
    name: "Lọ Hoa & Chậu Cây Decor",
    href: "/categories/trays",
    icon: Flower2,
    subCategories: [],
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "qua-tang",
    name: "Quà Tặng Thủ Công",
    href: "/categories/gifts",
    icon: Gift,
    subCategories: [],
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "bo-suu-tap",
    name: "Bộ Sưu Tập",
    href: "/collections",
    icon: Layers,
    subCategories: [],
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80",
  },
];

const CategoryMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (categoryId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(categoryId);
    }, 300); // 300ms delay
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Optional: Add delay for hiding too, or keep it instant/controlled by submenu enter
  };

  const handleSubMenuEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div
      className="relative group z-50"
      onMouseLeave={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveCategory(null);
      }}
    >
      {/* Trigger Button */}
      <button className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2 text-[#4B5563] hover:text-[#D97706] transition-all shadow-sm border-2 border-[#c88948]">
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

      {/* Bridge to prevent menu closing when moving from button to dropdown */}
      <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>

      {/* Main Dropdown - Category List */}
      <div className="absolute top-full left-0 w-[280px] bg-white shadow-xl rounded-lg mt-2 hidden group-hover:block border border-gray-100 py-2">
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            onMouseEnter={() => handleMouseEnter(category.id)}
            onMouseLeave={handleMouseLeave}
            className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors relative ${
              activeCategory === category.id
                ? "bg-[#FFF7ED] text-[#D97706]"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#D97706]"
            }`}
          >
            <div className="flex items-center gap-3">
              <category.icon size={18} strokeWidth={1.5} />
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            {activeCategory === category.id && <ChevronRight size={16} />}
          </Link>
        ))}

        {/* Sub-menu Panel - Appears to the right */}
        {activeCategory && (
          <div
            className="absolute top-0 left-[100%] w-[800px] h-full min-h-[450px] bg-white shadow-xl rounded-r-lg border-y border-r border-gray-100 ml-1 z-50 flex overflow-hidden"
            onMouseEnter={handleSubMenuEnter}
            onMouseLeave={() => setActiveCategory(null)}
          >
            {/* Invisible Bridge for safe hovering */}
            <div className="absolute inset-y-0 -left-4 w-4 bg-transparent"></div>

            {(() => {
              const category = CATEGORIES.find((c) => c.id === activeCategory);
              if (!category) return null;

              return (
                <div className="flex w-full">
                  {/* Sub-categories Grid */}
                  <div className="flex-1 p-6 grid grid-cols-2 gap-x-8 gap-y-6 content-start overflow-y-auto">
                    {category.subCategories.length > 0 ? (
                      category.subCategories.map((sub, idx) => (
                        <div key={idx}>
                          <h3 className="font-bold text-gray-800 mb-3 text-sm">
                            {sub.title}
                          </h3>
                          <ul className="space-y-2">
                            {sub.items.map((item, i) => (
                              <li key={i}>
                                <Link
                                  href="#"
                                  className="text-sm text-gray-500 hover:text-[#D97706] transition-colors block"
                                >
                                  » {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-gray-400 italic">
                        Đang cập nhật danh mục con...
                      </div>
                    )}
                  </div>

                  {/* Featured Image */}
                  <div className="w-[300px] h-full relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
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
