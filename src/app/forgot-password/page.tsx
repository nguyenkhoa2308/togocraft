"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useToastStore } from "@/stores";

const ForgotPasswordPage = () => {
  const addToast = useToastStore((state) => state.addToast);

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      addToast("Đã gửi email khôi phục mật khẩu!", "success");
    }, 1500);
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
          <h1 className="text-4xl font-bold text-white mb-2">Quên mật khẩu</h1>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Link href="/" className="flex items-center gap-1 hover:text-white">
              <Home size={16} />
              Trang chủ
            </Link>
            <span>/</span>
            <span>Quên mật khẩu</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Brand Info */}
              <div className="lg:w-1/2 bg-gradient-to-br from-[#C59263] to-[#A67B5B] p-8 lg:p-12 text-white relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-[family-name:var(--font-pacifico)]">
                      Sudes Craft
                    </h2>
                    <p className="text-white/90 text-lg leading-relaxed">
                      Đừng lo lắng! Việc quên mật khẩu có thể xảy ra với bất kỳ ai. Chỉ cần nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                        1
                      </div>
                      <span>Nhập email đã đăng ký</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                        2
                      </div>
                      <span>Kiểm tra hộp thư email</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                        3
                      </div>
                      <span>Nhấp vào link và đặt mật khẩu mới</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-white/70 text-sm">
                      Nếu bạn không nhận được email trong vài phút, hãy kiểm tra thư mục spam hoặc liên hệ với chúng tôi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-[#C59263]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={32} className="text-[#C59263]" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Khôi phục mật khẩu
                      </h2>
                      <p className="text-gray-500">
                        Nhập email để nhận link đặt lại mật khẩu
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email đã đăng ký
                        </label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@email.com"
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C59263] focus:ring-1 focus:ring-[#C59263] transition-all"
                            required
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#C59263] hover:bg-[#B07D4E] disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Đang gửi...
                          </>
                        ) : (
                          "Gửi link khôi phục"
                        )}
                      </button>
                    </form>

                    {/* Back to Login */}
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2 mt-6 text-gray-600 hover:text-[#C59263] transition-colors"
                    >
                      <ArrowLeft size={18} />
                      Quay lại đăng nhập
                    </Link>
                  </>
                ) : (
                  /* Success State */
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      Email đã được gửi!
                    </h2>
                    <p className="text-gray-500 mb-6">
                      Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến{" "}
                      <span className="font-medium text-gray-700">{email}</span>.
                      Vui lòng kiểm tra hộp thư của bạn.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <p className="text-sm text-gray-600">
                        Không nhận được email? Kiểm tra thư mục spam hoặc{" "}
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="text-[#C59263] hover:underline font-medium"
                        >
                          thử lại với email khác
                        </button>
                      </p>
                    </div>

                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 text-[#C59263] hover:text-[#B07D4E] font-semibold transition-colors"
                    >
                      <ArrowLeft size={18} />
                      Quay lại đăng nhập
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
