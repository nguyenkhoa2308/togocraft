"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Package,
  Heart,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuthStore, useToastStore } from "@/stores";
import { ConfirmDialog } from "@/components/ui";

const ProfilePage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const logout = useAuthStore((state) => state.logout);
  const addToast = useToastStore((state) => state.addToast);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Populate form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      updateProfile(formData);
      addToast("Cập nhật thông tin thành công!", "success");
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    addToast("Đăng xuất thành công!", "info");
    router.push("/");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

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
          <h1 className="text-4xl font-bold text-white mb-2">Tài khoản</h1>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Link href="/" className="flex items-center gap-1 hover:text-white">
              <Home size={16} />
              Trang chủ
            </Link>
            <span>/</span>
            <span>Tài khoản</span>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C59263] to-[#8B5E3C] flex items-center justify-center text-white text-3xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-[#C59263] transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <h3 className="mt-4 font-bold text-gray-800 text-lg">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Menu */}
              <nav className="space-y-1">
                <Link
                  href="/profile"
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#FDF8F3] text-[#C59263] font-medium"
                >
                  <div className="flex items-center gap-3">
                    <User size={18} />
                    <span>Thông tin cá nhân</span>
                  </div>
                  <ChevronRight size={16} />
                </Link>

                <Link
                  href="/profile/orders"
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Package size={18} />
                    <span>Đơn hàng của tôi</span>
                  </div>
                  <ChevronRight size={16} />
                </Link>

                <Link
                  href="/wishlist"
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Heart size={18} />
                    <span>Sản phẩm yêu thích</span>
                  </div>
                  <ChevronRight size={16} />
                </Link>

                <button
                  onClick={() => setShowLogoutDialog(true)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <LogOut size={18} />
                    <span>Đăng xuất</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-800">Thông tin cá nhân</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-[#C59263] border border-[#C59263] rounded-lg hover:bg-[#FDF8F3] transition-colors font-medium"
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C59263] focus:ring-1 focus:ring-[#C59263] transition-all disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C59263] focus:ring-1 focus:ring-[#C59263] transition-all disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Chưa cập nhật"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C59263] focus:ring-1 focus:ring-[#C59263] transition-all disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Chưa cập nhật"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C59263] focus:ring-1 focus:ring-[#C59263] transition-all disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        if (user) {
                          setFormData({
                            name: user.name || "",
                            email: user.email || "",
                            phone: user.phone || "",
                            address: user.address || "",
                          });
                        }
                      }}
                      className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 md:flex-none px-8 py-3 bg-[#C59263] hover:bg-[#B07D4E] disabled:bg-gray-300 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Đang lưu...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Lưu thay đổi
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirm Dialog */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất?"
        confirmText="Đăng xuất"
        cancelText="Hủy"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutDialog(false)}
        type="warning"
      />
    </div>
  );
};

export default ProfilePage;
