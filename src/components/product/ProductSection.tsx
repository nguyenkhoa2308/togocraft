"use client";

import React, { useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductCoupons from './ProductCoupons';
import { ProductDetail, Coupon } from '@/types/product';

interface ProductSectionProps {
  product: ProductDetail;
  coupons: Coupon[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ product, coupons }) => {
  const [selectedVariantImage, setSelectedVariantImage] = useState<string | undefined>();

  // Xử lý khi chọn variant (màu sắc/size/loại)
  const handleVariantChange = (variantValue: string) => {
    // Tìm variant option được chọn
    const selectedOption = product.variants?.options.find(o => o.value === variantValue);

    // Nếu variant có ảnh riêng, cập nhật ảnh
    if (selectedOption?.image) {
      setSelectedVariantImage(selectedOption.image);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-12 items-start">
      {/* Left - Gallery (sticky khi scroll) */}
      <div className="lg:sticky lg:top-4">
        <ProductGallery
          images={product.images}
          productName={product.name}
          selectedVariantImage={selectedVariantImage}
        />
      </div>

      {/* Right - Info */}
      <div>
        <ProductInfo
          product={product}
          onVariantChange={handleVariantChange}
        />
        <ProductCoupons coupons={coupons} />
      </div>
    </div>
  );
};

export default ProductSection;
