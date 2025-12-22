"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Home, Trash2, ShoppingBag, Heart } from "lucide-react";
import { useWishlistStore } from "@/stores";
import { useToastStore } from "@/stores/toastStore";
import { ConfirmDialog, QuickViewDialog } from "@/components/ui";
import { getAllProducts } from "@/lib/data/polycarbonate-data";
import type { Product } from "@/components/ui/ProductCard";

const WishlistPage = () => {
  const items = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const addToast = useToastStore((state) => state.addToast);

  // Get all products to find full product data
  const allProducts = useMemo(() => getAllProducts(), []);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    itemId: string | number | null;
    itemName: string;
  }>({
    isOpen: false,
    itemId: null,
    itemName: "",
  });

  // QuickView state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleAddToCart = (item: (typeof items)[0]) => {
    // Find full product data to show QuickViewDialog with colors
    const fullProduct = allProducts.find((p) => p.id === item.id);
    if (fullProduct) {
      setQuickViewProduct(fullProduct as Product);
    } else {
      // Fallback: show toast if product not found
      addToast("Không tìm thấy thông tin sản phẩm", "error");
    }
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
      removeFromWishlist(confirmDialog.itemId);
      addToast(
        `Đã xóa "${confirmDialog.itemName}" khỏi danh sách yêu thích`,
        "info"
      );
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
          <h1 className="text-4xl font-bold text-white mb-2">Yêu thích</h1>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Link href="/" className="flex items-center gap-1 hover:text-white">
              <Home size={16} />
              Trang chủ
            </Link>
            <span>/</span>
            <span>Yêu thích</span>
          </div>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="container mx-auto px-4 py-10">
        {items.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={40} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg mb-4">
              Danh sách yêu thích của bạn đang trống
            </p>
            <Link
              href="/categories/all"
              className="inline-block bg-[#D97706] hover:bg-[#C77A06] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Bạn có{" "}
                <span className="font-bold text-[#D97706]">{items.length}</span>{" "}
                sản phẩm yêu thích
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <Link
                    href={`/product/${item.slug}`}
                    className="block aspect-square relative overflow-hidden bg-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.oldPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Giảm giá
                      </div>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="p-4">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-medium text-gray-800 line-clamp-2 mb-2 min-h-[48px] block hover:text-[#D97706] transition-colors"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-2 mb-4">
                      {item.oldPrice && (
                        <span className="text-gray-400 text-sm line-through">
                          {item.oldPrice}
                        </span>
                      )}
                      <span className="text-[#D97706] font-bold text-lg">
                        {item.price}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#C77A06] text-white py-2.5 rounded-lg font-medium transition-colors text-sm"
                      >
                        <ShoppingBag size={16} />
                        Thêm vào giỏ
                      </button>
                      <button
                        onClick={() => handleRemoveClick(item)}
                        className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Xóa sản phẩm yêu thích"
        message={`Bạn có chắc chắn muốn xóa "${confirmDialog.itemName}" khỏi danh sách yêu thích?`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        type="danger"
      />

      {/* QuickView Dialog for color selection */}
      <QuickViewDialog
        isOpen={!!quickViewProduct}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default WishlistPage;
