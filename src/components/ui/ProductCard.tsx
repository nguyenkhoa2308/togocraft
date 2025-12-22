"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Settings, Flame } from "lucide-react";
import { useCartStore, useWishlistStore, useToastStore, useIsInCart } from "@/stores";
import { getColorName } from "@/lib/data/polycarbonate-data";

// Helper function to generate slug from product name
const generateSlug = (name: string, id: string | number): string => {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
  return `${slug}-${id}`;
};

export interface Product {
  id: number | string;
  slug?: string; // Real slug from data, if available
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  image: string;
  colors?: string[];
  colorImages?: Record<string, string>;
  sold?: number;
  categoryId?: string;
  bestSeller?: boolean;
  sortOrder?: number;
}

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [currentImage, setCurrentImage] = React.useState(product.image);
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) =>
    state.items.some((item) => item.id === product.id)
  );
  const addToast = useToastStore((state) => state.addToast);
  const isInCart = useIsInCart();

  // Reset state when product changes
  React.useEffect(() => {
    setCurrentImage(product.image);
    setSelectedColor(null);
  }, [product]);

  const handleColorClick = (color: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
    if (product.colorImages && product.colorImages[color]) {
      setCurrentImage(product.colorImages[color]);
    }
  };

  // Use real slug from data if available, otherwise generate from name
  const productSlug = product.slug || generateSlug(product.name, product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
      image: currentImage,
      selectedColor: colorToAdd,
    });
    addToast(`Đã thêm "${product.name}" vào giỏ hàng`, "success");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasWishlisted = isWishlisted;
    toggleWishlist({
      id: product.id,
      slug: productSlug,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
    });
    if (wasWishlisted) {
      addToast(`Đã xóa "${product.name}" khỏi yêu thích`, "info");
    } else {
      addToast(`Đã thêm "${product.name}" vào yêu thích`, "success");
    }
  };

  return (
    <Link
      href={`/product/${productSlug}`}
      className="group relative overflow-hidden rounded-2xl bg-[#F5F1EB] shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="aspect-square w-full relative p-2">
        <div className="w-full h-full rounded-xl overflow-hidden relative">
          <img
            src={currentImage}
            // src="https://bizweb.dktcdn.net/thumb/large/100/608/033/products/e6408c60-e714-4885-a112-63079cd37c0d.jpg?v=1760493461697"
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {/* Bestseller Badge */}
          {product.bestSeller && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white text-xs font-bold px-2.5 py-1.5 rounded-md shadow-md">
              <Flame size={14} className="animate-pulse" />
              Bán chạy
            </span>
          )}
          {/* Discount Badge */}
          {product.discount && (
            <div
              className="flex items-center justify-center text-white font-bold pr-2"
              style={{
                backgroundImage: "url('/images/tag-sale.webp')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "contain",
                width: "63px",
                height: "auto",
                aspectRatio: "63 / 24",
                fontSize: "12px",
              }}
            >
              {product.discount}
            </div>
          )}
        </div>
      </div>

      {/* Product Info Overlay */}
      <div className="bg-[#F5F1EB] px-4 pt-3 mb-4 text-center transition-transform duration-400 z-20 group-hover:translate-y-[-60px] flex flex-col justify-end flex-1 shrink-1">
        {/* Color Variants */}
        {product.colors && product.colors.length > 0 && (
          <div className="h-6 mb-2 flex justify-center flex-auto">
            <div className="flex justify-center gap-2">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleColorClick(color, e)}
                  className={`w-4 h-4 rounded-full border border-gray-300 transition-transform duration-200 hover:scale-125 focus:outline-none ${
                    selectedColor === color
                      ? "ring-2 ring-offset-1 ring-[#C59263] scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  title={getColorName(color)}
                />
              ))}
            </div>
          </div>
        )}

        <h3 className="font-medium text-gray-800 text-base mb-1 line-clamp-2 md:line-clamp-none px-2 text-center group-hover:text-[#C59263] transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-center gap-2 mb-2">
          {product.oldPrice && (
            <span className="text-gray-400 text-sm line-through">
              {product.oldPrice}
            </span>
          )}
          <span className="text-[#DC2626] font-bold text-lg">
            {product.price}
          </span>
        </div>

        {/* Sold Progress Bar */}
        {product.sold !== undefined && (
          <div className="mb-3 px-2">
            <div className="relative w-full h-5 bg-[#ababab] rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ffbf00] to-[#ff5b00] rounded-full"
                style={{
                  width: `${Math.min((product.sold / 1000) * 100, 100)}%`,
                }}
              />

              {/* Flame Icon */}
              <div className="absolute top-[6px] -translate-y-1/2 left-[-3px] z-10 w-[25px] h-[25px]">
                <svg
                  version="1.1"
                  viewBox="0 0 511.269 511.269"
                  xmlSpace="preserve"
                  className="w-full h-full"
                >
                  <path
                    d="M140.367,465.067C116.9,438.4,93.434,410.667,78.5,377.6c-14.933-35.2-19.2-75.733-11.733-114.133s24.533-74.667,49.067-105.6c-2.133,26.667,7.467,54.4,25.6,74.667c-10.667-51.2,6.4-106.667,40.533-147.2S263.034,18.133,312.1,0c-24.533,25.6-27.733,66.133-18.133,100.267c9.6,34.133,29.867,64,48,94.933c18.133,30.933,35.2,62.933,36.267,98.133c9.6-18.133,20.267-36.267,26.667-56.533c6.4-20.267,9.6-41.6,4.267-61.867c19.2,23.467,29.867,46.933,35.2,76.8c5.333,29.867,4.267,60.8,1.067,90.667c-4.267,33.067-12.8,67.2-30.933,94.933c-21.333,33.067-55.467,56.533-92.8,69.333C255.567,518.4,190.5,508.8,140.367,465.067z"
                    style={{ fill: "#f3705a" }}
                  />
                  <path
                    d="M221.434,504.533C308.9,538.667,395.3,435.2,347.3,355.2c0-1.067-1.067-1.067-1.067-2.133c4.267,43.733-6.4,75.733-26.667,93.867c10.667-25.6,3.2-55.467-9.6-81.067c-12.8-24.533-30.933-46.933-44.8-70.4c-13.867-24.533-24.533-52.267-18.133-80c-25.6,19.2-43.733,48-51.2,78.933c-7.467,30.933-3.2,65.067,10.667,93.867c-16-11.733-27.733-30.933-28.8-51.2c-17.067,20.267-27.733,46.933-26.667,73.6C151.034,452.267,184.1,489.6,221.434,504.533z"
                    style={{ fill: "#ffd15c" }}
                  />
                </svg>
              </div>

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center text-xs text-white z-10">
                Đã bán <span className="font-bold ml-1">{product.sold}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-full left-0 w-full flex items-center justify-center gap-3 px-4 pt-4">
          {product.colors && product.colors.length > 0 ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView?.(product);
              }}
              className="flex items-center gap-2 bg-[#C59263] hover:bg-[#B07D4E] text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-md text-sm whitespace-nowrap"
            >
              Tùy chọn
              <Settings size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-[#C59263] hover:bg-[#B07D4E] text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-md text-sm whitespace-nowrap"
            >
              Thêm vào giỏ
              <ShoppingBag size={16} />
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
              isWishlisted
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#FCD34D] hover:bg-[#FBBF24]"
            }`}
            title={isWishlisted ? "Bỏ yêu thích" : "Yêu thích"}
          >
            <Heart
              size={20}
              className="text-white"
              fill={isWishlisted ? "white" : "transparent"}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
