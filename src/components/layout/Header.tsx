"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Search,
  ShoppingCart,
  User,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import {
  useCartTotal,
  useWishlistTotal,
  useAuthStore,
  useToastStore,
} from "@/stores";
import { CartDropdown } from "@/components/ui";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const cartTotal = useCartTotal();
  const wishlistTotal = useWishlistTotal();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const addToast = useToastStore((state) => state.addToast);

  // Close dropdowns on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isCartOpen) setIsCartOpen(false);
      if (isAccountOpen) setIsAccountOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCartOpen, isAccountOpen]);

  const handleLogout = () => {
    logout();
    addToast("Đăng xuất thành công!", "info");
    setIsAccountOpen(false);
  };

  return (
    <div className="bg-white py-4 border-b border-gray-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Placeholder for Logo Icon */}
          <div className="text-[#D97706]">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8.5c-2.5-2-5.5-1.5-7 1.5s-1 5.5 1.5 7 5.5 1 7-1.5c2.5 2 5.5 1.5 7-1.5s1-5.5-1.5-7-5.5-1-7 1.5z" />
              <path d="M12 8.5V3" />
              <path d="M7.5 18.5c-1.5 1.5-3.5 1-4.5 0s-1-3.5 1-4.5" />
              <path d="M16.5 18.5c1.5 1.5 3.5 1 4.5 0s1-3.5-1-4.5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-bold text-[#8B5E3C]">
              Togo Craft
            </span>
            <span className="text-[10px] text-gray-500 tracking-wider uppercase">
              Từng chi tiết, gửi gắm yêu thương
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl w-full relative">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="w-full pl-5 pr-12 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706] transition-all text-sm"
          />
          <button className="absolute right-1.5 top-1.5 p-1.5 bg-white text-gray-400 hover:text-[#D97706] rounded-full transition-colors">
            <Search size={20} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Wishlist Button */}
          <Link
            href="/wishlist"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FDF6E9] text-[#8B5E3C] hover:bg-[#F0E6D2] transition-colors relative group"
          >
            <Heart size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-white border border-[#F0E6D2] text-[10px] flex items-center justify-center rounded-full text-[#8B5E3C]">
              {wishlistTotal}
            </span>
          </Link>

          {/* Account Button with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAccountOpen(true)}
            onMouseLeave={() => setIsAccountOpen(false)}
          >
            <button className="flex items-center gap-2 bg-[#FDF6E9] hover:bg-[#F0E6D2] text-[#8B5E3C] px-4 py-2 rounded-full transition-colors">
              <User size={18} />
              <span className="text-sm font-medium">
                {isAuthenticated && user
                  ? user.name.split(" ").pop()
                  : "Tài khoản"}
              </span>
            </button>

            {/* Account Dropdown */}
            {isAccountOpen && (
              <div className="absolute top-full right-0 pt-2 w-56 z-100">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-scale-in">
                  {isAuthenticated && user ? (
                    <>
                      {/* User Info */}
                      <div className="px-4 py-3 bg-[#FDF8F3] border-b border-gray-100">
                        <p className="font-semibold text-gray-800 truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User size={18} className="text-gray-400" />
                          <span>Thông tin cá nhân</span>
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Heart size={18} className="text-gray-400" />
                          <span>Sản phẩm yêu thích</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={18} />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Guest Menu */}
                      <div className="py-2">
                        <Link
                          href="/login"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LogIn size={18} className="text-[#C59263]" />
                          <span className="font-medium">Đăng nhập</span>
                        </Link>
                        <Link
                          href="/register"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <UserPlus size={18} className="text-[#C59263]" />
                          <span className="font-medium">Đăng ký</span>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Button with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-[#C59263] hover:bg-[#B07D4E] text-white px-4 py-2 rounded-full transition-colors relative shadow-sm hover:shadow-md"
            >
              <ShoppingCart size={18} />
              <span className="text-sm font-medium">Giỏ hàng</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-[#C59263] text-xs font-bold flex items-center justify-center rounded-full border border-[#C59263]">
                {cartTotal}
              </span>
            </Link>

            {/* Cart Dropdown */}
            <CartDropdown isOpen={isCartOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
