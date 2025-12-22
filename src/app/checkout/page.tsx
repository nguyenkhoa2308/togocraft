"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Phone,
  User,
  FileText,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useCartStore, useCartTotalPrice, useToastStore } from "@/stores";
import { getColorName, formatPricePerM2 } from "@/lib/utils/color-helper";

// Contact info
const contactInfo = {
  phone: "0976.110.266",
  zalo: "0976110266",
  messenger: "https://m.me/tamnhualaysangpoly",
  email: "nhualaysangeverestlight@gmail.com",
};

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartTotalPrice();
  const clearCart = useCartStore((state) => state.clearCart);
  const addToast = useToastStore((state) => state.addToast);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            selectedColor: item.selectedColor,
          })),
          totalPrice: formatPrice(totalPrice),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra");
      }

      setIsSubmitted(true);
      addToast(
        "Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.",
        "success"
      );
      clearCart();
    } catch (error) {
      console.error("Submit error:", error);
      addToast(
        "Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại hoặc liên hệ hotline.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallPhone = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleZalo = () => {
    window.open(`https://zalo.me/${contactInfo.zalo}`, "_blank");
  };

  const handleMessenger = () => {
    window.open(contactInfo.messenger, "_blank");
  };

  // Success state after submission
  if (isSubmitted) {
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
            <h1 className="text-4xl font-bold text-white mb-2">
              Yêu cầu báo giá
            </h1>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-white"
              >
                <Home size={16} />
                Trang chủ
              </Link>
              <span>/</span>
              <span>Yêu cầu báo giá</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#4A3B32] mb-4">
              Gửi yêu cầu thành công!
            </h2>
            <p className="text-gray-600 mb-8">
              Cảm ơn bạn đã quan tâm đến sản phẩm của Everest Light. Đội ngũ tư
              vấn sẽ liên hệ với bạn trong thời gian sớm nhất để báo giá chi
              tiết.
            </p>

            {/* Quick contact */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <p className="text-gray-700 mb-4">
                Hoặc liên hệ ngay với chúng tôi:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCallPhone}
                  className="flex items-center gap-2 px-5 py-3 bg-[#D97706] text-white rounded-full font-semibold hover:bg-[#C77A06] transition-colors"
                >
                  <Phone size={18} />
                  {contactInfo.phone}
                </button>
                <button
                  type="button"
                  onClick={handleZalo}
                  className="flex items-center gap-2 px-5 py-3 bg-[#0068FF] text-white rounded-full font-semibold hover:bg-[#0054CC] transition-colors"
                >
                  <Image src="/icons/zalo_icon.svg" alt="Zalo" width={18} height={18} />
                  Zalo
                </button>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block bg-[#4A3B32] hover:bg-[#3A2B22] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
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
            <h1 className="text-4xl font-bold text-white mb-2">
              Yêu cầu báo giá
            </h1>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-white"
              >
                <Home size={16} />
                Trang chủ
              </Link>
              <span>/</span>
              <span>Yêu cầu báo giá</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg max-w-lg mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg mb-6">
              Chưa có sản phẩm nào trong danh sách
            </p>
            <Link
              href="/categories/all"
              className="inline-block bg-[#D97706] hover:bg-[#C77A06] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Xem sản phẩm
            </Link>

            {/* Direct contact option */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-gray-600 mb-4">
                Hoặc liên hệ trực tiếp để được tư vấn:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCallPhone}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-[#D97706] text-[#D97706] rounded-full font-semibold hover:bg-[#D97706] hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  Gọi ngay
                </button>
                <button
                  type="button"
                  onClick={handleZalo}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-[#0068FF] text-[#0068FF] rounded-full font-semibold hover:bg-[#0068FF] hover:text-white transition-colors"
                >
                  <Image src="/icons/zalo_icon.svg" alt="Zalo" width={16} height={16} />
                  Zalo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold text-white mb-2">
            Yêu cầu báo giá
          </h1>
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
            <span>Yêu cầu báo giá</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Quick contact bar */}
        <div className="bg-gradient-to-r from-[#D97706] to-[#C77A06] rounded-2xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Cần tư vấn ngay?</h3>
              <p className="text-white/90">
                Liên hệ hotline hoặc chat trực tiếp để được hỗ trợ nhanh nhất
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCallPhone}
                className="flex items-center gap-2 px-5 py-3 bg-white text-[#D97706] rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                <Phone size={18} />
                {contactInfo.phone}
              </button>
              <button
                type="button"
                onClick={handleZalo}
                className="flex items-center gap-2 px-5 py-3 bg-[#0068FF] text-white rounded-full font-bold hover:bg-[#0054CC] transition-colors"
              >
                <Image src="/icons/zalo_icon.svg" alt="Zalo" width={20} height={20} />
                Zalo
              </button>
              <button
                type="button"
                onClick={handleMessenger}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#00B2FF] to-[#006AFF] text-white rounded-full font-bold hover:opacity-90 transition-colors"
              >
                <Image src="/icons/messenger_icon.svg" alt="Messenger" width={20} height={20} />
                Messenger
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="font-bold text-[#4A3B32] text-xl mb-6 flex items-center gap-2">
                  <User className="text-[#D97706]" size={24} />
                  Thông tin liên hệ
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all text-gray-800 placeholder:text-gray-400 bg-white"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all text-gray-800 placeholder:text-gray-400 bg-white"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all text-gray-800 placeholder:text-gray-400 bg-white"
                    placeholder="Nhập email (không bắt buộc)"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung yêu cầu / Ghi chú
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 resize-none transition-all text-gray-800 placeholder:text-gray-400 bg-white"
                    placeholder="Ví dụ: Cần báo giá cho công trình nhà xưởng 500m², dự kiến thi công tháng sau..."
                  />
                </div>

                {/* Info note */}
                <div className="bg-[#FDF6E9] rounded-xl p-4 mb-6">
                  <p className="text-sm text-[#8B6914]">
                    <strong>Lưu ý:</strong> Sau khi gửi yêu cầu, đội ngũ tư vấn
                    sẽ liên hệ bạn qua số điện thoại trong vòng 30 phút (giờ
                    hành chính) để báo giá chi tiết và giải đáp thắc mắc.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D97706] hover:bg-[#C77A06] disabled:bg-gray-400 text-white py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Gửi yêu cầu báo giá
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="font-bold text-[#4A3B32] text-lg mb-6 flex items-center gap-2">
                <FileText className="text-[#D97706]" size={20} />
                Sản phẩm quan tâm
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                {items.map((item) => {
                  const unitPrice =
                    parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;

                  return (
                    <Link
                      key={`${item.id}-${item.selectedColor || ""}`}
                      href={`/product/${item.slug}`}
                      className="flex gap-3 p-3 bg-[#FDFBF7] rounded-xl hover:bg-[#FDF6E9] transition-colors group"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-[#4A3B32] line-clamp-2 group-hover:text-[#D97706] transition-colors">
                          {item.name}
                        </h4>
                        {item.selectedColor && (
                          <span className="text-xs text-gray-500">
                            Màu: {getColorName(item.selectedColor)}
                          </span>
                        )}
                        <p className="text-sm text-[#D97706] font-semibold mt-1">
                          {formatPricePerM2(formatPrice(unitPrice))}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Total */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tổng giá trị tham khảo</span>
                  <span className="text-xl font-bold text-[#D97706]">
                    {formatPricePerM2(formatPrice(totalPrice))}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Giá chính thức sẽ được báo sau khi tư vấn chi tiết
                </p>
              </div>

              {/* Back to cart */}
              <Link
                href="/cart"
                className="block w-full mt-4 border-2 border-[#D97706] text-[#D97706] text-center py-3 rounded-full font-semibold hover:bg-[#D97706] hover:text-white transition-colors"
              >
                Quay lại giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
