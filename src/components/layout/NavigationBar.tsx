"use client";

import { ChevronDown, Tag } from 'lucide-react';
import Link from 'next/link';
import CategoryMenu from './CategoryMenu';

// Submenu data
const navItems = [
  {
    label: 'Trang chủ',
    href: '/',
    isActive: true
  },
  {
    label: 'Về chúng tôi',
    href: '/about'
  },
  {
    label: 'Sản phẩm',
    href: '/categories/all',
    submenu: [
      { label: 'Giỏ & Khay Đựng Đồ', href: '/categories/trays' },
      { label: 'Đèn Mây Tre Trang Trí', href: '/categories/lamps' },
      { label: 'Đồ Nội Thất Tự Nhiên', href: '/categories/shelves' },
      { label: 'Phụ Kiện Thời Trang Thủ Công', href: '/categories/bags' },
      { label: 'Gương Trang Trí', href: '/categories/shelves' },
      { label: 'Kệ & Giá Treo Decor', href: '/categories/shelves' },
      { label: 'Trang Trí Tường', href: '/categories/shelves' },
      { label: 'Lọ Hoa & Chậu Cây Decor', href: '/categories/trays' },
      { label: 'Quà Tặng Thủ Công', href: '/categories/gifts' },
      { label: 'Tất cả sản phẩm', href: '/categories/all' },
    ]
  },
  {
    label: 'Bộ sưu tập',
    href: '/collections',
    submenu: [
      { label: 'BST Mùa Xuân 2024', href: '/collections/spring-2024' },
      { label: 'BST Tết Nguyên Đán', href: '/collections/tet' },
      { label: 'BST Quà tặng', href: '/collections/gifts' },
      { label: 'Sản phẩm mới', href: '/collections/new-arrivals' },
      { label: 'Bán chạy nhất', href: '/collections/best-sellers' },
    ]
  },
  {
    label: 'Chính sách',
    href: '/policies'
  },
  {
    label: 'Hỏi đáp',
    href: '/faq'
  },
  {
    label: 'Tin tức',
    href: '/news',
    submenu: [
      { label: 'Tin tức mới nhất', href: '/news' },
      { label: 'Câu chuyện thương hiệu', href: '/news/brand-story' },
      { label: 'Hướng dẫn sử dụng', href: '/news/guides' },
      { label: 'Mẹo trang trí', href: '/news/decoration-tips' },
    ]
  },
  {
    label: 'Liên hệ',
    href: '/contact'
  },
];

const NavigationBar = () => {
  return (
    <div className="bg-[#FDF6E9] border-b border-[#F0E6D2] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">

          {/* Left: Categories & Links */}
          <div className="flex items-center gap-8">
            {/* Categories Button */}
            <CategoryMenu />

            {/* Main Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-[#4B5563]">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.submenu ? (
                    // Item with submenu
                    <>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-1 cursor-pointer transition-colors ${
                          item.isActive ? 'text-[#D97706]' : 'hover:text-[#D97706]'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                      </Link>

                      {/* Dropdown */}
                      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px]">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#FDF6E9] hover:text-[#D97706] transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    // Item without submenu
                    <Link
                      href={item.href}
                      className={`transition-colors ${
                        item.isActive ? 'text-[#D97706]' : 'hover:text-[#D97706]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right: Sale Button */}
          <div className="hidden md:block">
             <button className="flex items-center gap-2 bg-white border border-[#D97706] rounded px-4 py-1.5 text-[#D97706] font-bold text-sm shadow-sm hover:bg-[#FFF7ED] transition-colors">
                <Tag size={16} />
                <span>Ưu đãi <span className="underline decoration-dotted">31/12</span></span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
