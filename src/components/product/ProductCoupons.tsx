"use client";

import React, { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import { Coupon } from '@/types/product';

interface ProductCouponsProps {
  coupons: Coupon[];
}

const ProductCoupons: React.FC<ProductCouponsProps> = ({ coupons }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!coupons || coupons.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-[#4A3B32] uppercase tracking-wide mb-3">
        Ưu đãi dành cho bạn
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="flex-shrink-0 w-[200px] bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD5] border border-[#FDBA74] rounded-xl overflow-hidden"
          >
            {/* Left side with discount icon */}
            <div className="flex">
              <div className="w-16 bg-[#F97316] flex items-center justify-center">
                <div className="text-white text-center">
                  <span className="text-2xl font-bold">%</span>
                </div>
              </div>

              {/* Right side with info */}
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-[#C2410C] text-sm">{coupon.code}</p>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{coupon.description}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Info size={14} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-[10px] text-gray-500">HSD: {coupon.expireDate}</p>
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className={`text-xs font-medium px-2 py-1 rounded transition-all ${
                      copiedCode === coupon.code
                        ? 'bg-green-500 text-white'
                        : 'bg-[#C59263] text-white hover:bg-[#B07D4E]'
                    }`}
                  >
                    {copiedCode === coupon.code ? (
                      <span className="flex items-center gap-1">
                        <Check size={12} /> Đã copy
                      </span>
                    ) : (
                      'Copy mã'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCoupons;
