"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { useCartStore, useCartTotalPrice, useToastStore } from "@/stores";
import { ConfirmDialog } from "@/components/ui";
import { getColorName, formatPricePerM2 } from "@/lib/utils/color-helper";

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartTotalPrice();
  const addToast = useToastStore((state) => state.addToast);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    itemId: string | number | null;
    itemName: string;
  }>({
    isOpen: false,
    itemId: null,
    itemName: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const handleRemoveClick = (item: (typeof items)[0]) => {
    setConfirmDialog({
      isOpen: true,
      itemId: item.id,
      itemName: item.name,
    });
  };

  const handleConfirmRemove = () => {
    if (confirmDialog.itemId) {
      removeFromCart(confirmDialog.itemId);
      addToast(`Đã xóa "${confirmDialog.itemName}" khỏi giỏ hàng`, "info");
    }
    setConfirmDialog({ isOpen: false, itemId: null, itemName: "" });
  };

  const handleCancelRemove = () => {
    setConfirmDialog({ isOpen: false, itemId: null, itemName: "" });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* Hero Banner */}
      <div
        className="relative h-48 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/banners/tam-lop-dac.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">Giỏ hàng</h1>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Link href="/" className="flex items-center gap-1 hover:text-white">
              <Home size={16} />
              Trang chủ
            </Link>
            <span>/</span>
            <span>Giỏ hàng</span>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-10">
        {items.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <p className="text-gray-500 text-lg mb-4">
              Giỏ hàng của bạn đang trống
            </p>
            <Link
              href="/categories/all"
              className="inline-block bg-[#D97706] hover:bg-[#C77A06] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Xem sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 font-semibold text-gray-700 text-sm uppercase">
                  <div className="col-span-8">Thông tin sản phẩm</div>
                  <div className="col-span-4 text-center">Giá tham khảo</div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-100">
                  {items.map((item) => {
                    const unitPrice =
                      parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;

                    return (
                      <div
                        key={`${item.id}-${item.selectedColor || ""}`}
                        className="grid grid-cols-12 gap-4 px-6 py-4 items-center"
                      >
                        {/* Product Info */}
                        <div className="col-span-8 flex gap-4">
                          <Link
                            href={`/product/${item.slug}`}
                            className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 hover:opacity-80 transition-opacity"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          <div className="flex flex-col justify-center">
                            <Link
                              href={`/product/${item.slug}`}
                              className="font-medium text-gray-800 line-clamp-2 hover:text-[#D97706] transition-colors"
                            >
                              {item.name}
                            </Link>
                            {item.selectedColor && (
                              <span className="text-sm text-gray-500 mt-1">
                                Màu: {getColorName(item.selectedColor)}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveClick(item)}
                              className="text-red-500 hover:text-red-600 text-sm mt-1 flex items-center gap-1 w-fit"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-4 text-center text-[#D97706] font-bold text-lg">
                          {formatPricePerM2(formatPrice(unitPrice))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="font-bold text-gray-800 uppercase text-lg mb-4">
                  Thông tin đơn hàng
                </h2>

                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Tổng giá trị tham khảo</span>
                  <span className="text-2xl font-bold text-[#D97706]">
                    {formatPricePerM2(formatPrice(totalPrice))}
                  </span>
                </div>

                {/* Notes */}
                <ul className="text-sm text-gray-500 space-y-1 mb-6">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Giá trên chỉ mang tính chất tham khảo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>
                      Đội ngũ tư vấn sẽ liên hệ báo giá chính thức cho bạn.
                    </span>
                  </li>
                </ul>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="block w-full bg-[#D97706] hover:bg-[#C77A06] text-white text-center py-3 rounded-full font-semibold transition-colors"
                  >
                    Yêu cầu báo giá
                  </Link>
                  <Link
                    href="/categories/all"
                    className="block w-full border-2 border-[#D97706] text-[#D97706] hover:bg-[#D97706] hover:text-white text-center py-3 rounded-full font-semibold transition-colors"
                  >
                    Tiếp tục xem sản phẩm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Xóa sản phẩm"
        message={`Bạn có chắc chắn muốn xóa "${confirmDialog.itemName}" khỏi giỏ hàng?`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        type="danger"
      />
    </div>
  );
};

export default CartPage;
