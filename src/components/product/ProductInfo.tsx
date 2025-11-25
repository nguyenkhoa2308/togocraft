"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  Ruler,
  Weight,
  Layers,
  Box,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ProductDetail } from "@/types/product";

interface ProductInfoProps {
  product: ProductDetail;
  onVariantChange?: (variantValue: string) => void;
}

// Format số tiền VND
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};

// Component đếm ngược
const CountdownTimer: React.FC<{ endDate: string }> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const [day, month] = endDate.split("/").map(Number);
      const year = new Date().getFullYear();
      const end = new Date(year, month - 1, day, 23, 59, 59);
      const now = new Date();
      const diff = end.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex items-center gap-1">
      {[
        timeLeft.days.toString().padStart(2, "0"),
        timeLeft.hours.toString().padStart(2, "0"),
        timeLeft.minutes.toString().padStart(2, "0"),
        timeLeft.seconds.toString().padStart(2, "0"),
      ].map((value, index) => (
        <React.Fragment key={index}>
          <span className="bg-[#C59263] text-white px-2 py-1 rounded text-sm font-bold min-w-[28px] text-center">
            {value}
          </span>
          {index < 3 && <span className="text-[#C59263] font-bold">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onVariantChange,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product.variants?.options[0]?.value || null
  );
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const statusText = {
    in_stock: "Còn hàng",
    out_of_stock: "Hết hàng",
    pre_order: "Đặt trước",
  };

  const statusColor = {
    in_stock: "text-green-600",
    out_of_stock: "text-red-600",
    pre_order: "text-orange-600",
  };

  // Icon cho specs
  const specIcons = {
    size: Ruler,
    weight: Weight,
    material: Layers,
    shape: Box,
  };

  const specLabels = {
    size: "Kích thước",
    weight: "Trọng lượng",
    material: "Chất liệu",
    shape: "Hình dáng",
  };

  // Kiểm tra variant đang chọn có còn hàng không
  const selectedOption = product.variants?.options.find(
    (o) => o.value === selectedVariant
  );
  const isSelectedVariantOutOfStock = selectedOption?.inStock === false;

  // Xử lý khi chọn variant
  const handleVariantChange = (value: string) => {
    setSelectedVariant(value);
    onVariantChange?.(value);
  };

  return (
    <div className="space-y-5">
      {/* Tên sản phẩm */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#4A3B32] leading-tight">
        {product.name}
      </h1>

      {/* Mã SP, Rating, Thương hiệu, Tình trạng */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <span className="text-gray-500">
          Mã: <span className="text-[#C59263] font-medium">{product.sku}</span>
        </span>

        {product.rating && (
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-gray-600">{product.rating}</span>
            {product.reviewCount && (
              <span className="text-gray-400">
                ({product.reviewCount} đánh giá)
              </span>
            )}
          </div>
        )}

        <span className="text-gray-500">
          Thương hiệu:{" "}
          <a href="#" className="text-[#C59263] hover:underline">
            {product.brand}
          </a>
        </span>

        <span className="text-gray-500">
          Tình trạng:{" "}
          <span className={statusColor[product.status]}>
            {statusText[product.status]}
          </span>
        </span>
      </div>

      {/* Thông số kỹ thuật */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
          {(
            Object.keys(product.specs) as Array<keyof typeof product.specs>
          ).map((key) => {
            const value = product.specs?.[key];
            if (!value) return null;
            const Icon = specIcons[key];
            return (
              <div key={key} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FDF6E9] rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-[#C59263]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{specLabels[key]}</p>
                  <p className="text-sm font-medium text-[#4A3B32]">{value}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mô tả ngắn với Xem thêm */}
      {(product.shortDescription || product.description) && (
        <div className="text-gray-600 text-sm leading-relaxed">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isDescriptionExpanded ? "max-h-[500px]" : "max-h-[60px]"
            }`}
          >
            {!isDescriptionExpanded && product.shortDescription && (
              <p>{product.shortDescription}</p>
            )}
            {isDescriptionExpanded && product.description && (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
          </div>
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-[#C59263] hover:underline mt-2 flex items-center gap-1 font-medium"
          >
            {isDescriptionExpanded ? (
              <>
                Thu gọn <ChevronUp size={16} />
              </>
            ) : (
              <>
                Xem thêm <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      )}

      {/* Khuyến mãi */}
      {product.promotion && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#FFF7ED] border border-[#FFEDD5] rounded-lg px-4 py-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-lg">🏷️</span>
            <div>
              <p className="font-semibold text-[#C2410C]">
                {product.promotion.name}
              </p>
              <p className="text-xs text-orange-600">
                {product.promotion.dateRange}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Kết thúc sau:</span>
            <CountdownTimer endDate={product.promotion.endDate} />
          </div>
        </div>
      )}

      {/* Giá */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-[#DC2626]">
          {formatPrice(product.price)}
        </span>
        {product.oldPrice && (
          <>
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
            {product.discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span>
            )}
          </>
        )}
      </div>

      {/* Biến thể (Màu sắc / Kích thước / Loại) */}
      {product.variants && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            {product.variants.label}:{" "}
            <span className="text-[#C59263]">
              {
                product.variants.options.find(
                  (o) => o.value === selectedVariant
                )?.name
              }
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.type === "color"
              ? // Hiển thị dạng màu sắc - cho phép chọn cả khi hết hàng
                product.variants.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleVariantChange(option.value)}
                    className={`w-9 h-9 rounded-full border-2 transition-all relative ${
                      selectedVariant === option.value
                        ? "border-[#C59263] scale-110 ring-2 ring-[#C59263] ring-offset-2"
                        : "border-gray-200 hover:border-[#C59263]"
                    } ${option.inStock === false ? "opacity-60" : ""}`}
                    style={{ backgroundColor: option.value }}
                    title={
                      option.inStock === false
                        ? `${option.name} (Hết hàng)`
                        : option.name
                    }
                  >
                    {option.inStock === false && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        {/* <span className="w-full h-[2px] bg-gray-600 rotate-45 absolute"></span> */}
                      </span>
                    )}
                  </button>
                ))
              : // Hiển thị dạng button cho size/type - cho phép chọn cả khi hết hàng
                product.variants.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleVariantChange(option.value)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedVariant === option.value
                        ? "border-[#C59263] bg-[#C59263] text-white"
                        : "border-gray-200 text-gray-700 hover:border-[#C59263]"
                    } ${
                      option.inStock === false ? "opacity-60 line-through" : ""
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
          </div>
        </div>
      )}

      {/* Số lượng & Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <span className="text-sm font-medium text-gray-700">Số lượng:</span>
        <div className="flex items-center border border-gray-300 rounded-full">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#C59263] transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center font-medium text-gray-800">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#C59263] transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        {isSelectedVariantOutOfStock ? (
          <button
            disabled
            className="flex-1 min-w-[200px] bg-gray-400 text-white h-12 px-6 rounded-full font-semibold cursor-not-allowed"
          >
            Hết hàng
          </button>
        ) : (
          <>
            <button className="flex-1 min-w-[140px] bg-[#C59263] hover:bg-[#B07D4E] text-white h-12 px-6 rounded-full font-semibold transition-colors">
              Mua ngay
            </button>

            <button className="h-12 px-6 border-2 border-[#C59263] text-[#C59263] hover:bg-[#C59263] hover:text-white rounded-full font-semibold transition-colors">
              Thêm vào giỏ
            </button>
          </>
        )}
      </div>

      {/* Share & Wishlist */}
      <div className="flex items-center gap-6 pt-2 text-sm text-gray-600">
        <button className="flex items-center gap-2 hover:text-[#C59263] transition-colors">
          <Share2 size={18} />
          Chia sẻ
        </button>
        <button className="flex items-center gap-2 hover:text-[#C59263] transition-colors">
          <Heart size={18} />
          Thêm vào yêu thích
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
