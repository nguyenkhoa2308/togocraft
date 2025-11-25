"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  User,
  Mail,
  FileText,
  Building2,
  Check,
} from "lucide-react";
import { useCartStore, useCartTotalPrice } from "@/stores";

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartTotalPrice();
  const clearCart = useCartStore((state) => state.clearCart);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    note: "",
    companyName: "",
    taxCode: "",
    companyAddress: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isCompanyInvoice, setIsCompanyInvoice] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const shippingFee = shippingMethod === "express" ? 50000 : 30000;
  const finalTotal = totalPrice - discount + shippingFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = () => {
    if (couponCode === "CRAFT200") {
      setDiscount(200000);
      setAppliedCoupon(couponCode);
    } else if (couponCode === "FREESHIP") {
      setDiscount(shippingFee);
      setAppliedCoupon(couponCode);
    } else {
      alert("Mã giảm giá không hợp lệ");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");
    clearCart();
  };

  if (items.length === 0) {
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
            <h1 className="text-4xl font-bold text-white mb-2">Thanh toán</h1>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-white"
              >
                <Home size={16} />
                Trang chủ
              </Link>
              <span>/</span>
              <span>Thanh toán</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div
        className="relative h-48 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/breadcrumb_bg.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">Thanh toán</h1>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Link href="/" className="flex items-center gap-1 hover:text-white">
              <Home size={16} />
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-white">
              Giỏ hàng
            </Link>
            <span>/</span>
            <span>Thanh toán</span>
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="container mx-auto px-4 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Customer Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold text-gray-800 uppercase text-lg mb-6 flex items-center gap-2">
                  <User className="text-[#C59263]" size={20} />
                  Thông tin khách hàng
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263] focus:ring-1 focus:ring-[#C59263]"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263] focus:ring-1 focus:ring-[#C59263]"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263] focus:ring-1 focus:ring-[#C59263]"
                      placeholder="Nhập email (không bắt buộc)"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold text-gray-800 uppercase text-lg mb-6 flex items-center gap-2">
                  <MapPin className="text-[#C59263]" size={20} />
                  Địa chỉ giao hàng
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263] bg-white"
                    >
                      <option value="">Chọn tỉnh/thành</option>
                      <option value="hanoi">Hà Nội</option>
                      <option value="hcm">TP. Hồ Chí Minh</option>
                      <option value="danang">Đà Nẵng</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quận/Huyện <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263] bg-white"
                    >
                      <option value="">Chọn quận/huyện</option>
                      <option value="q1">Quận 1</option>
                      <option value="q2">Quận 2</option>
                      <option value="q3">Quận 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phường/Xã <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263] bg-white"
                    >
                      <option value="">Chọn phường/xã</option>
                      <option value="p1">Phường 1</option>
                      <option value="p2">Phường 2</option>
                      <option value="p3">Phường 3</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ chi tiết <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263] focus:ring-1 focus:ring-[#C59263]"
                    placeholder="Số nhà, tên đường..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263] focus:ring-1 focus:ring-[#C59263] resize-none"
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết hơn."
                  />
                </div>
              </div>

              {/* Company Invoice */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCompanyInvoice}
                    onChange={(e) => setIsCompanyInvoice(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-[#C59263] focus:ring-[#C59263]"
                  />
                  <span className="font-bold text-gray-800 uppercase flex items-center gap-2">
                    <Building2 className="text-[#C59263]" size={20} />
                    Xuất hóa đơn công ty
                  </span>
                </label>

                {isCompanyInvoice && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên công ty <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required={isCompanyInvoice}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263]"
                        placeholder="Nhập tên công ty"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mã số thuế <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="taxCode"
                        value={formData.taxCode}
                        onChange={handleInputChange}
                        required={isCompanyInvoice}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263]"
                        placeholder="Nhập mã số thuế"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Địa chỉ công ty <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleInputChange}
                        required={isCompanyInvoice}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263]"
                        placeholder="Nhập địa chỉ công ty"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold text-gray-800 uppercase text-lg mb-6 flex items-center gap-2">
                  <Truck className="text-[#C59263]" size={20} />
                  Phương thức vận chuyển
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#C59263] transition-colors">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-5 h-5 text-[#C59263] focus:ring-[#C59263]"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        Giao hàng tiêu chuẩn
                      </div>
                      <div className="text-sm text-gray-500">
                        Nhận hàng trong 3-5 ngày
                      </div>
                    </div>
                    <span className="font-semibold text-[#C59263]">
                      30.000đ
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#C59263] transition-colors">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-5 h-5 text-[#C59263] focus:ring-[#C59263]"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        Giao hàng nhanh
                      </div>
                      <div className="text-sm text-gray-500">
                        Nhận hàng trong 1-2 ngày
                      </div>
                    </div>
                    <span className="font-semibold text-[#C59263]">
                      50.000đ
                    </span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold text-gray-800 uppercase text-lg mb-6 flex items-center gap-2">
                  <CreditCard className="text-[#C59263]" size={20} />
                  Phương thức thanh toán
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#C59263] transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-[#C59263] focus:ring-[#C59263]"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        Thanh toán khi nhận hàng (COD)
                      </div>
                      <div className="text-sm text-gray-500">
                        Thanh toán bằng tiền mặt khi nhận hàng
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#C59263] transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-[#C59263] focus:ring-[#C59263]"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        Chuyển khoản ngân hàng
                      </div>
                      <div className="text-sm text-gray-500">
                        Chuyển khoản qua tài khoản ngân hàng
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#C59263] transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      checked={paymentMethod === "momo"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-[#C59263] focus:ring-[#C59263]"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Ví MoMo</div>
                      <div className="text-sm text-gray-500">
                        Thanh toán qua ví điện tử MoMo
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="font-bold text-gray-800 uppercase text-lg mb-6">
                  Đơn hàng của bạn
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {items.map((item) => {
                    const unitPrice =
                      parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;
                    const itemTotal = unitPrice * item.quantity;

                    return (
                      <div
                        key={`${item.id}-${item.selectedColor || ""}`}
                        className="flex gap-3"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C59263] text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[#C59263] font-semibold mt-1">
                            {formatPrice(itemTotal)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      placeholder="Nhập mã giảm giá"
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C59263] text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2.5 bg-[#C59263] hover:bg-[#B07D4E] text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      Áp dụng
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <Check size={14} />
                      Đã áp dụng mã {appliedCoupon}
                    </p>
                  )}
                </div>

                {/* Order Total */}
                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-100">
                    <span>Tổng cộng</span>
                    <span className="text-red-500">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-6 bg-[#C59263] hover:bg-[#B07D4E] text-white py-4 rounded-full font-bold text-lg transition-colors"
                >
                  Đặt hàng
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Bằng việc đặt hàng, bạn đồng ý với{" "}
                  <Link
                    href="/terms"
                    className="text-[#C59263] hover:underline"
                  >
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link
                    href="/privacy"
                    className="text-[#C59263] hover:underline"
                  >
                    Chính sách bảo mật
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
