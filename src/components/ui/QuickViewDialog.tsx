"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore, useToastStore, useWishlistStore, useIsInCart } from "@/stores";
import type { Product } from "./ProductCard";
import { getColorName, formatPricePerM2 } from "@/lib/utils/color-helper";
import { getRawProductBySlug } from "@/lib/data/polycarbonate-data";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlistItems = useWishlistStore((state) => state.items);
  const isInCart = useIsInCart();

  const inWishlist = product
    ? wishlistItems.some((item) => item.id === product.id)
    : false;

  // Reset state when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setCurrentImage(
        product.colorImages && product.colors?.[0]
          ? product.colorImages[product.colors[0]]
          : product.image
      );
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (product.colorImages && product.colorImages[color]) {
      setCurrentImage(product.colorImages[color]);
    }
  };

  const productSlug = product.slug || generateSlug(product.name, product.id);

  const handleAddToCart = () => {
    const colorToAdd = selectedColor || undefined;

    // Check if item with same color already in cart
    if (isInCart(product.id, colorToAdd)) {
      addToast(`Sản phẩm này đã có trong giỏ hàng`, "info");
      return;
    }

    addToCart({
      id: product.id,
      slug: productSlug,
      name: product.name,
      price: product.price,
      image: currentImage || product.image,
      selectedColor: colorToAdd,
    });
    addToast(`Đã thêm "${product.name}" vào giỏ hàng`, "success");
    onClose();
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      slug: productSlug,
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

  // Get all images from raw product data
  const thumbnails = React.useMemo(() => {
    if (!product.slug) return [product.image];

    const rawProduct = getRawProductBySlug(product.slug);
    if (rawProduct?.images && rawProduct.images.length > 0) {
      return rawProduct.images.map(img => img.url);
    }
    // Fallback to colorImages or main image
    if (product.colorImages && Object.keys(product.colorImages).length > 0) {
      return Object.values(product.colorImages);
    }
    return [product.image];
  }, [product.slug, product.colorImages, product.image]);

  // Product description for polycarbonate
  const getDescription = () => {
    if (
      product.name.toLowerCase().includes("đặc") ||
      product.name.toLowerCase().includes("solid")
    ) {
      return "Tấm lợp polycarbonate đặc trong suốt như kính, độ bền gấp 200 lần thủy tinh. Chống UV, cách nhiệt tốt, phù hợp mái che, giếng trời.";
    }
    if (
      product.name.toLowerCase().includes("sóng") ||
      product.name.toLowerCase().includes("corrugated")
    ) {
      return "Tấm lợp polycarbonate sóng độ cứng cao, chống ồn tốt. Thiết kế dạng sóng tăng độ cứng vững, phù hợp mái nhà xưởng, nhà kho.";
    }
    if (
      product.name.toLowerCase().includes("rỗng") ||
      product.name.toLowerCase().includes("multiwall")
    ) {
      return "Tấm lợp polycarbonate rỗng ruột cách nhiệt tốt, trọng lượng nhẹ, tiết kiệm chi phí. Phù hợp mái che sân vườn, hành lang.";
    }
    return "Tấm lợp polycarbonate chất lượng cao, trong suốt lấy sáng tự nhiên, chống tia UV, bền bỉ với thời tiết khắc nghiệt.";
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[980px] overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
        >
          {""}
          <X size={18} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left - Image Gallery */}
          <div className="md:w-[52%] bg-gradient-to-br from-gray-50 to-gray-100 relative quickview-gallery">
            {/* Sale Tag */}
            {product.discount && (
              <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                {product.discount}
              </span>
            )}

            {/* Custom Nav Buttons */}
            <button
              type="button"
              aria-label="Ảnh trước"
              className="qv-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#D97706] transition-all disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Ảnh tiếp theo"
              className="qv-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#D97706] transition-all disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>

            {/* Main Image Swiper */}
            <Swiper
              spaceBetween={10}
              navigation={{
                prevEl: ".qv-prev",
                nextEl: ".qv-next",
              }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="main-swiper aspect-square"
            >
              {thumbnails.map((thumb, idx) => (
                <SwiperSlide key={idx}>
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <img
                      src={thumb}
                      alt={`${product.name} - ${idx + 1}`}
                      className="max-w-[85%] max-h-[85%] object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Swiper */}
            {thumbnails.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={8}
                  slidesPerView={Math.min(thumbnails.length, 4)}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                  className="thumb-swiper"
                  style={{ width: `${Math.min(thumbnails.length, 4) * 56}px` }}
                >
                  {thumbnails.map((thumb, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-transparent cursor-pointer transition-all hover:opacity-100 opacity-70">
                        <img
                          src={thumb}
                          alt={`Ảnh ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            <style jsx global>{`
              .quickview-gallery .thumb-swiper .swiper-slide-thumb-active > div {
                border-color: #D97706 !important;
                opacity: 1 !important;
              }
            `}</style>
          </div>

          {/* Right - Product Info */}
          <div className="md:w-[48%] p-6 md:p-8 flex flex-col max-h-[600px] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Brand */}
                <p className="text-xs font-medium text-[#D97706] uppercase tracking-wider mb-2">
                  EVEREST LIGHT
                </p>

                {/* Product Title */}
                <Link href={`/product/${productSlug}`} onClick={onClose}>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight hover:text-[#D97706] transition-colors">
                    {product.name}
                  </h2>
                </Link>

                {/* SKU */}
                <p className="text-sm text-gray-400 mt-1">
                  SKU: EL{product.id}
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
                  title={
                    inWishlist ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"
                  }
                >
                  <Heart
                    size={16}
                    fill={inWishlist ? "currentColor" : "none"}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#D97706] hover:border-[#D97706]/30 transition-all"
                  title="Chia sẻ sản phẩm"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4 pb-4 border-b border-gray-100">
              <span className="text-2xl md:text-3xl font-bold text-[#D97706]">
                {formatPricePerM2(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-base text-gray-400 line-through">
                  {formatPricePerM2(product.oldPrice)}
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
                  <span className="text-sm font-medium text-gray-700">
                    Màu sắc
                  </span>
                  <span className="text-sm text-gray-500">
                    {selectedColor ? getColorName(selectedColor) : ""}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
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
                      title={getColorName(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full h-12 bg-[#D97706] hover:bg-[#C77A06] text-white rounded-lg font-semibold transition-all hover:shadow-lg active:scale-[0.98]"
              >
                Thêm vào giỏ hàng
              </button>

              {/* View Detail Link */}
              <Link
                href={`/product/${productSlug}`}
                onClick={onClose}
                className="block text-center text-sm text-[#D97706] hover:text-[#C77A06] font-medium mt-4 hover:underline"
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
              <span>Bảo hành 10 năm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewDialog;
