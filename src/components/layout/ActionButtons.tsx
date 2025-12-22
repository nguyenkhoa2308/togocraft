"use client";

import { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartTotal, useWishlistTotal } from "@/stores";
import { CartDropdown } from "@/components/ui";

interface ActionButtonsProps {
  compact?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ compact = false }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartTotal = useCartTotal();
  const wishlistTotal = useWishlistTotal();

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isCartOpen) setIsCartOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCartOpen]);

  return (
    <div className="flex items-center gap-3">
      {/* Wishlist Button */}
      <Link
        href="/wishlist"
        className={`flex items-center justify-center rounded-full bg-[#FDF6E9] text-[#8B5E3C] hover:bg-[#F0E6D2] transition-colors relative ${
          compact ? "w-9 h-9" : "w-10 h-10"
        }`}
      >
        <Heart size={compact ? 18 : 20} />
        <span
          className={`absolute -top-1 -right-1 bg-white border border-[#F0E6D2] flex items-center justify-center rounded-full text-[#8B5E3C] ${
            compact ? "w-4 h-4 text-[9px]" : "w-4 h-4 text-[10px]"
          }`}
        >
          {wishlistTotal}
        </span>
      </Link>

      {/* Cart Button with Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setIsCartOpen(true)}
        onMouseLeave={() => setIsCartOpen(false)}
      >
        <Link
          href="/cart"
          className={`flex items-center gap-2 bg-[#C59263] hover:bg-[#B07D4E] text-white rounded-full transition-colors relative shadow-sm hover:shadow-md ${
            compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
          }`}
        >
          <ShoppingCart size={compact ? 16 : 18} />
          <span className="font-medium">Giỏ hàng</span>
          <span
            className={`absolute -top-1 -right-1 bg-white text-[#C59263] font-bold flex items-center justify-center rounded-full border border-[#C59263] ${
              compact ? "w-4 h-4 text-[9px]" : "w-5 h-5 text-xs"
            }`}
          >
            {cartTotal}
          </span>
        </Link>

        {/* Cart Dropdown */}
        <CartDropdown isOpen={isCartOpen} />
      </div>
    </div>
  );
};

export default ActionButtons;
