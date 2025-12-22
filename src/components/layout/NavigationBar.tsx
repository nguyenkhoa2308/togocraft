"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CategoryMenu from "./CategoryMenu";
import ActionButtons from "./ActionButtons";

// Submenu data
const navItems = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Về chúng tôi",
    href: "/about",
  },
  {
    label: "Sản phẩm",
    href: "/categories/all",
    submenu: [
      { label: "Polycarbonate Đặc", href: "/categories/polycarbonate_dac" },
      { label: "Polycarbonate Sóng", href: "/categories/polycarbonate_song" },
      { label: "Polycarbonate Rỗng", href: "/categories/polycarbonate_rong" },
      { label: "Phụ Kiện Lắp Đặt", href: "/categories/phu_kien" },
      { label: "Tất cả sản phẩm", href: "/categories/all" },
    ],
  },
  {
    label: "Chính sách",
    href: "/policies",
  },
  {
    label: "Hỏi đáp",
    href: "/faq",
  },
  {
    label: "Liên hệ",
    href: "/contact",
  },
];

const NavigationBar = () => {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Check if nav item is active based on current pathname
  const isItemActive = (href: string, submenu?: { href: string }[]) => {
    if (href === "/") return pathname === "/";
    if (pathname.startsWith(href)) return true;
    if (submenu?.some((sub) => pathname.startsWith(sub.href))) return true;
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if page has scrolled past the header (approximately 150px)
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <>
      <div className="bg-[#FDF6E9] border-b border-[#F0E6D2] shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left: Categories & Links */}
            <div className="flex items-center gap-4 lg:gap-8">
              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-[#c88948] text-[#c88948] hover:bg-[#FFF7ED] transition-colors"
                aria-label="Mở menu"
              >
                <Menu size={22} />
              </button>

              {/* Categories Button - Desktop */}
              <div className="hidden lg:block">
                <CategoryMenu />
              </div>

              {/* Main Nav Links - Desktop */}
              <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-[#4B5563]">
                {navItems.map((item) => (
                  <div key={item.label} className="relative group">
                    {item.submenu ? (
                      // Item with submenu
                      <>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-1 cursor-pointer transition-colors ${
                            isItemActive(item.href, item.submenu)
                              ? "text-[#D97706]"
                              : "hover:text-[#D97706]"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={14}
                            className="transition-transform group-hover:rotate-180"
                          />
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
                          isItemActive(item.href)
                            ? "text-[#D97706]"
                            : "hover:text-[#D97706]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Hotline - Mobile */}
              <Link
                href="tel:0976110266"
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#D97706] text-white hover:bg-[#C77A06] transition-colors"
                aria-label="Gọi hotline"
              >
                <Phone size={18} />
              </Link>

              {/* Action Buttons - Always visible on mobile, animated on desktop when sticky */}
              <div className="lg:hidden">
                <ActionButtons compact />
              </div>
              <div
                className={`hidden lg:block ${
                  isSticky
                    ? "opacity-100 translate-y-0 transition-all duration-300"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
              >
                <ActionButtons compact />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[70] lg:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/logos/logo-everest-light.png"
              alt="Everest Light"
              width={40}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <span className="text-lg font-serif font-bold text-[#8B5E3C]">
              Everest Light
            </span>
          </Link>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Đóng menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {/* Nav Links */}
          <nav className="p-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100">
                {item.submenu ? (
                  // Item with submenu
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(item.label)}
                      className="flex items-center justify-between w-full py-3 text-[#4A3B32] font-medium"
                    >
                      <span>{item.label}</span>
                      <ChevronRight
                        size={18}
                        className={`text-gray-400 transition-transform duration-200 ${
                          openSubmenu === item.label ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {/* Submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openSubmenu === item.label
                          ? "max-h-[400px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 pb-3 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={closeMobileMenu}
                            className="block py-2 px-3 text-sm text-gray-600 hover:text-[#D97706] hover:bg-[#FFF7ED] rounded-lg transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Item without submenu
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block py-3 font-medium transition-colors ${
                      isItemActive(item.href)
                        ? "text-[#D97706]"
                        : "text-[#4A3B32] hover:text-[#D97706]"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="p-4 mt-4 mx-4 bg-[#FDF6E9] rounded-xl">
            <p className="text-sm text-gray-600 mb-3">Hotline tư vấn:</p>
            <Link
              href="tel:0976110266"
              className="flex items-center gap-2 text-[#D97706] font-bold text-lg"
            >
              <Phone size={20} />
              0976.110.266
            </Link>
            <div className="flex gap-3 mt-4">
              <Link
                href="https://zalo.me/0976110266"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#0068FF] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#0054CC] transition-colors"
              >
                <Image
                  src="/icons/zalo_icon.svg"
                  alt="Zalo"
                  width={18}
                  height={18}
                />
                Zalo
              </Link>
              <Link
                href="https://m.me/tamnhualaysangpoly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00B2FF] to-[#006AFF] text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-colors"
              >
                <Image
                  src="/icons/messenger_icon.svg"
                  alt="Messenger"
                  width={18}
                  height={18}
                />
                Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
