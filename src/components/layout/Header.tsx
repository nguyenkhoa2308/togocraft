"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ActionButtons } from "@/components/layout";

const Header = () => {
  return (
    <div className="bg-white py-3 md:py-4 border-b border-gray-100">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <Image
            src="/images/logos/logo-everest-light.png"
            alt="Everest Light"
            width={60}
            height={60}
            className="h-10 md:h-14 w-auto object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-serif font-bold text-[#8B5E3C]">
              Everest Light
            </span>
            <span className="text-[8px] md:text-[10px] text-gray-500 tracking-wider uppercase hidden sm:block">
              Giải pháp lấy sáng chuyên nghiệp
            </span>
          </div>
        </Link>

        {/* Search Bar - Hidden below lg */}
        <div className="flex-1 max-w-xl w-full relative hidden lg:block">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="w-full pl-5 pr-12 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706] transition-all text-sm text-gray-800 placeholder:text-gray-400 bg-white"
          />
          <button className="absolute right-1.5 top-1.5 p-1.5 bg-white text-gray-400 hover:text-[#D97706] rounded-full transition-colors">
            {""}
            <Search size={20} />
          </button>
        </div>

        {/* Actions - Hidden below lg (shown in NavigationBar instead) */}
        <div className="hidden lg:block">
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default Header;
