"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Minus, Plus, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore, useToastStore, useWishlistStore } from "@/stores";
import type { Product } from "./ProductCard";

// Helper function to generate slug from product name
const generateSlug = (name: string, id: string | number): string => {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  return `${slug}-${id}`;
};

interface QuickViewDialogProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

const QuickViewDialog: React.FC<QuickViewDialogProps> = ({
  isOpen,
  product,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [activeThumb, setActiveThumb] = useState(0);

  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlistItems = useWishlistStore((state) => state.items);

  const inWishlist = product ? wishlistItems.some((item) => item.id === product.id) : false;

  // Reset state when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setCurrentImage(
        product.colorImages && product.colors?.[0]
          ? product.colorImages[product.colors[0]]
          : product.image
      );
      setQuantity(1);
      setActiveThumb(0);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (product.colorImages && product.colorImages[color]) {
      setCurrentImage(product.colorImages[color]);
    }
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: currentImage || product.image,
        selectedColor: selectedColor || undefined,
      },
      quantity
    );
    addToast(`Đã thêm "${product.name}" vào giỏ hàng`, "success");
    onClose();
  };

  const productSlug = generateSlug(product.name, product.id);

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      image: currentImage || product.image,
    });
    if (inWishlist) {
      addToast(`Đã xóa "${product.name}" khỏi yêu thích`, "info");
    } else {
      addToast(`Đã thêm "${product.name}" vào yêu thích`, "success");
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${productSlug}`;
    try {
      await navigator.clipboard.writeText(url);
      addToast("Đã sao chép link sản phẩm!", "success");
    } catch {
      addToast("Không thể sao chép link", "error");
    }
  };

  // Generate thumbnails
  const thumbnails = [
    currentImage || product.image,
    currentImage || product.image,
    currentImage || product.image,
    currentImage || product.image,
  ];

  // Product description
  const getDescription = () => {
    if (product.name.toLowerCase().includes("túi")) {
      return 'Trong văn hóa Việt Nam, "Chiêm" là vụ lúa được gieo vào đầu mùa lạnh — loại lúa mang trong mình sức sống bền bỉ, kiên cường và giàu năng lượng sinh sôi.';
    }
    if (product.name.toLowerCase().includes("đèn")) {
      return "Đèn mây tre thủ công, mang đến ánh sáng ấm áp và vẻ đẹp tự nhiên cho không gian sống của bạn.";
    }
    return "Sản phẩm thủ công mỹ nghệ Việt Nam, được làm từ chất liệu tự nhiên, thân thiện với môi trường.";
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[980px] overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left - Image Gallery */}
          <div className="md:w-[52%] bg-gradient-to-br from-gray-50 to-gray-100 relative">
            {/* Main Image Container */}
            <div className="relative aspect-square flex items-center justify-center p-6">
              <img
                src={currentImage || product.image}
                alt={product.name}
                className="max-w-[85%] max-h-[85%] object-contain"
              />

              {/* Sale Tag */}
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                  {product.discount}
                </span>
              )}

              {/* Nav Arrows */}
              <button
                onClick={() => setActiveThumb(prev => prev > 0 ? prev - 1 : thumbnails.length - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setActiveThumb(prev => prev < thumbnails.length - 1 ? prev + 1 : 0)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumb(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    activeThumb === idx
                      ? "border-[#C59263] scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Ảnh ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="md:w-[48%] p-6 md:p-8 flex flex-col max-h-[600px] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Brand */}
                <p className="text-xs font-medium text-[#C59263] uppercase tracking-wider mb-2">
                  SUDES CRAFT
                </p>

                {/* Product Title */}
                <Link
                  href={`/product/${productSlug}`}
                  onClick={onClose}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight hover:text-[#C59263] transition-colors">
                    {product.name}
                  </h2>
                </Link>

                {/* SKU */}
                <p className="text-sm text-gray-400 mt-1">
                  SKU: CF0{product.id}
                </p>
              </div>

              {/* Action Icons */}
              <div className="flex gap-2">
                <button
                  onClick={handleToggleWishlist}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    inWishlist
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200"
                  }`}
                  title={inWishlist ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
                >
                  <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#C59263] hover:border-[#C59263]/30 transition-all"
                  title="Chia sẻ sản phẩm"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4 pb-4 border-b border-gray-100">
              <span className="text-2xl md:text-3xl font-bold text-[#C59263]">
                {product.price}
              </span>
              {product.oldPrice && (
                <span className="text-base text-gray-400 line-through">
                  {product.oldPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mt-4">
              {getDescription()}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Màu sắc</span>
                  <span className="text-sm text-gray-400">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleColorSelect(color)}
                      className={`w-9 h-9 rounded-full transition-all border-2 ${
                        selectedColor === color
                          ? "border-gray-900 scale-110"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center h-12 border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all rounded-l-lg"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all rounded-r-lg"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-[#C59263] hover:bg-[#B07D4E] text-white rounded-lg font-semibold transition-all hover:shadow-lg active:scale-[0.98]"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>

              {/* View Detail Link */}
              <Link
                href={`/product/${productSlug}`}
                onClick={onClose}
                className="block text-center text-sm text-[#C59263] hover:text-[#B07D4E] font-medium mt-4 hover:underline"
              >
                Xem chi tiết sản phẩm →
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-auto pt-5 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Còn hàng
              </span>
              <span>•</span>
              <span>Giao hàng toàn quốc</span>
              <span>•</span>
              <span>Đổi trả 7 ngày</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewDialog;
