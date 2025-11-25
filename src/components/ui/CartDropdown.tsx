"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";
import { useCartStore, useCartTotalPrice, useToastStore } from "@/stores";
import ConfirmDialog from "./ConfirmDialog";

interface CartDropdownProps {
  isOpen: boolean;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen }) => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
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

  const handleRemoveClick = (item: typeof items[0]) => {
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
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor || ""}`}
                    className="flex gap-3"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-1">
                        {item.name}
                      </h4>
                      {item.selectedColor && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <span
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                          <span className="text-xs text-gray-500">
                            Màu đã chọn
                          </span>
                        </div>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 bg-gray-100 hover:bg-gray-200 transition-colors text-black border-r border-gray-200 cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-medium text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 bg-gray-100 hover:bg-gray-200 transition-colors text-black border-l border-gray-200 cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-[#C59263] font-bold text-sm">
                          {item.price}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveClick(item)}
                      className="p-1 rounded-full bg-red-400 hover:bg-red-500 transition-colors self-start cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Tổng tiền:</span>
                <span className="text-xl font-bold text-[#C59263]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <Link
                href="/cart"
                className="block w-full bg-[#C59263] hover:bg-[#A67B4D] text-white text-center py-3 rounded-full font-semibold transition-colors"
              >
                Thanh toán
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
