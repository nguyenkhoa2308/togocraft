"use client";

import { useState } from "react";
import { Phone, X, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {/* Contact Buttons Container */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "sm:opacity-100 sm:translate-y-0 opacity-0 translate-y-4 pointer-events-none sm:pointer-events-auto"
        }`}
      >
        {/* Phone Button */}
        <Link
          href="tel:0976110266"
          className="relative group"
          aria-label="Gọi điện"
        >
          <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse">
            <Phone className="w-7 h-7 text-white" fill="currentColor" />
          </div>
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            0976.110.266
          </span>
        </Link>

        {/* Zalo Button */}
        <Link
          href="https://zalo.me/0976110266"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
          aria-label="Chat Zalo"
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Image
              src="/icons/zalo_icon.svg"
              alt="Zalo"
              width={56}
              height={56}
              className="w-full h-full"
            />
          </div>
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Chat Zalo
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </Link>

        {/* Messenger Button */}
        <Link
          href="https://m.me/905441442648609"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
          aria-label="Chat Messenger"
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Image
              src="/icons/messenger_icon.svg"
              alt="Messenger"
              width={56}
              height={56}
              className="w-full h-full"
            />
          </div>
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Messenger
          </span>
        </Link>
      </div>

      {/* Mobile Toggle Button - Only visible on mobile */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`sm:hidden w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700 rotate-0"
            : "bg-[#3b2410] hover:bg-primary-dark rotate-0"
        }`}
        aria-label={isOpen ? "Đóng menu liên hệ" : "Mở menu liên hệ"}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
      </button>

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-gray-600 transition-all"
        aria-label="Lên đầu trang"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}
