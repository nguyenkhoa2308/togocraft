"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore, useCartTotalPrice, useToastStore } from "@/stores";
import ConfirmDialog from "./ConfirmDialog";
import { getColorName, formatPricePerM2 } from "@/lib/utils/color-helper";

interface CartDropdownProps {
  isOpen: boolean;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen }) => {
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

  const handleRemoveClick = (e: React.MouseEvent, item: (typeof items)[0]) => {
    e.preventDefault();
    e.stopPropagation();
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

  if (!isOpen) return null;

  return (
    <>
      <div className="absolute top-full right-0 pt-2 w-96 z-100">
        {/* Dropdown content */}
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-[#F5F1EB] px-4 py-3 border-b border-gray-100">
            <h3 className="font-bold text-[#4A3B32] uppercase text-sm">
              Giỏ hàng
            </h3>
          </div>

          {/* Cart Items */}
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p>Giỏ hàng trống</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => {
                  const unitPrice =
                    parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;

                  return (
                    <Link
                      key={`${item.id}-${item.selectedColor || ""}`}
                      href={`/product/${item.slug}`}
                      className="flex gap-3 group hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-[#D97706] transition-colors">
                          {item.name}
                        </h4>
                        {item.selectedColor && (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className="w-3 h-3 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                            <span className="text-xs text-gray-500">
                              {getColorName(item.selectedColor)}
                            </span>
                          </div>
                        )}
                        <span className="text-[#D97706] font-bold text-sm mt-1 block">
                          {formatPricePerM2(formatPrice(unitPrice))}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={(e) => handleRemoveClick(e, item)}
                        className="p-1.5 rounded-full bg-red-100 hover:bg-red-500 hover:text-white text-red-500 transition-colors self-start cursor-pointer"
                        title="Xóa sản phẩm"
                      >
                        <X size={14} />
                      </button>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Tổng tham khảo:</span>
                <span className="text-xl font-bold text-[#D97706]">
                  {formatPricePerM2(formatPrice(totalPrice))}
                </span>
              </div>
              <Link
                href="/cart"
                className="block w-full bg-[#D97706] hover:bg-[#C77A06] text-white text-center py-3 rounded-full font-semibold transition-colors"
              >
                Xem giỏ hàng
              </Link>
            </div>
          )}
        </div>
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
    </>
  );
};

export default CartDropdown;
