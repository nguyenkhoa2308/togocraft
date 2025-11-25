"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Minus,
  Plus,
  Info,
  Check,
} from "lucide-react";
import { useCartStore, useCartTotalPrice, useToastStore } from "@/stores";
import { ProductCard, ConfirmDialog, CustomSelect, CustomDatePicker } from "@/components/ui";

// Time slot options
const timeOptions = [
  { value: "08:00-10:00", label: "08:00 - 10:00" },
  { value: "10:00-12:00", label: "10:00 - 12:00" },
  { value: "14:00-16:00", label: "14:00 - 16:00" },
  { value: "16:00-18:00", label: "16:00 - 18:00" },
];

// Mock coupons data
const mockCoupons = [
  {
    code: "CRAFT200",
    description: "Giảm 200k giá trị đơn hàng",
    expiry: "12/12/2026",
  },
  {
    code: "FREESHIP",
    description: "Miễn phí vận chuyển",
    expiry: "31/12/2025",
  },
];

// Mock recommended products
const recommendedProducts = [
  {
    id: 101,
    name: "Giỏ hoa đan mây tự nhiên",
    price: "890.000đ",
    oldPrice: "1.200.000đ",
    discount: "-26%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/e6408c60-e714-4885-a112-63079cd37c0d.jpg?v=1760493461697",
  },
  {
    id: 102,
    name: "Túi xách cói vintage",
    price: "650.000đ",
    oldPrice: "850.000đ",
    discount: "-24%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/e6408c60-e714-4885-a112-63079cd37c0d.jpg?v=1760493461697",
  },
  {
    id: 103,
    name: "Khay đựng trái cây mây tre",
    price: "420.000đ",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/e6408c60-e714-4885-a112-63079cd37c0d.jpg?v=1760493461697",
  },
  {
    id: 104,
    name: "Đèn ngủ mây đan thủ công",
    price: "1.250.000đ",
    oldPrice: "1.500.000đ",
    discount: "-17%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/e6408c60-e714-4885-a112-63079cd37c0d.jpg?v=1760493461697",
  },
];

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartTotalPrice();
  const addToast = useToastStore((state) => state.addToast);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isCompanyInvoice, setIsCompanyInvoice] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast(`Đã copy mã "${code}"`, "success");
    setTimeout(() => setCopiedCode(null), 2000);
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <div
        className="relative h-48 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/breadcrumb_bg.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
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
              href="/"
              className="inline-block bg-[#C59263] hover:bg-[#B07D4E] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Tiếp tục mua hàng
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 font-semibold text-gray-700 text-sm uppercase">
                  <div className="col-span-5">Thông tin sản phẩm</div>
                  <div className="col-span-2 text-center">Đơn giá</div>
                  <div className="col-span-3 text-center">Số lượng</div>
                  <div className="col-span-2 text-center">Thành tiền</div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-100">
                  {items.map((item) => {
                    const unitPrice =
                      parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;
                    const itemTotal = unitPrice * item.quantity;

                    return (
                      <div
                        key={`${item.id}-${item.selectedColor || ""}`}
                        className="grid grid-cols-12 gap-4 px-6 py-4 items-center"
                      >
                        {/* Product Info */}
                        <div className="col-span-5 flex gap-4">
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="font-medium text-gray-800 line-clamp-2">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => handleRemoveClick(item)}
                              className="text-red-500 hover:text-red-600 text-sm mt-1 flex items-center gap-1 w-fit"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <div className="col-span-2 text-center text-[#C59263] font-semibold">
                          {item.price}
                        </div>

                        {/* Quantity */}
                        <div className="col-span-3 flex justify-center">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors border-r border-gray-200"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors border-l border-gray-200"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-2 text-center text-red-500 font-bold">
                          {formatPrice(itemTotal)}
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
                  <span className="text-gray-600">Tổng tiền</span>
                  <span className="text-2xl font-bold text-red-500">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Notes */}
                <ul className="text-sm text-gray-500 space-y-1 mb-6">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Phí vận chuyển sẽ được tính ở trang thanh toán.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>
                      Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                    </span>
                  </li>
                </ul>

                {/* Delivery Time */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Thời gian giao hàng
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <CustomDatePicker
                      value={selectedDate}
                      onChange={setSelectedDate}
                      placeholder="Chọn ngày"
                    />
                    <CustomSelect
                      options={timeOptions}
                      value={selectedTime}
                      onChange={setSelectedTime}
                      placeholder="Chọn giờ"
                    />
                  </div>
                </div>

                {/* Company Invoice */}
                <label className="flex items-center gap-2 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCompanyInvoice}
                    onChange={(e) => setIsCompanyInvoice(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#C59263] focus:ring-[#C59263]"
                  />
                  <span className="text-sm text-gray-700">
                    Xuất hóa đơn công ty
                  </span>
                </label>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="block w-full bg-[#C59263] hover:bg-[#B07D4E] text-white text-center py-3 rounded-full font-semibold transition-colors"
                  >
                    Thanh toán ngay
                  </Link>
                  <Link
                    href="/"
                    className="block w-full border-2 border-[#C59263] text-[#C59263] hover:bg-[#C59263] hover:text-white text-center py-3 rounded-full font-semibold transition-colors"
                  >
                    Tiếp tục mua hàng
                  </Link>
                </div>

                {/* Coupons Section */}
                <div className="mt-8">
                  <h3 className="font-bold text-gray-800 uppercase mb-4">
                    Khuyến mãi dành cho bạn
                  </h3>
                  <div className="space-y-3">
                    {mockCoupons.map((coupon) => (
                      <div
                        key={coupon.code}
                        className="flex items-center gap-3 p-3 border border-dashed border-orange-300 rounded-lg bg-orange-50"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                          %
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-800">
                              {coupon.code}
                            </span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Info size={14} />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {coupon.description}
                          </p>
                          <p className="text-xs text-gray-400">
                            HSD: {coupon.expiry}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopyCode(coupon.code)}
                          className="px-4 py-1.5 bg-[#C59263] hover:bg-[#B07D4E] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
                        >
                          {copiedCode === coupon.code ? (
                            <>
                              <Check size={14} />
                              Đã copy
                            </>
                          ) : (
                            "Copy mã"
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* You May Also Like Section */}
        {items.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 uppercase">
              Có thể bạn thích
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
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
