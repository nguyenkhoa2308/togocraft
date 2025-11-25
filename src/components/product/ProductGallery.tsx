"use client";

import React, { useState, useEffect } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  selectedVariantImage?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  selectedVariantImage,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (selectedVariantImage) {
      const variantIndex = images.findIndex(
        (img) => img === selectedVariantImage
      );
      if (variantIndex !== -1) {
        setSelectedIndex(variantIndex);
      }
    }
  }, [selectedVariantImage, images]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={
            "aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 " +
            (selectedIndex === index ? "ring-2 ring-[#C59263]" : "")
          }
          onClick={() => setSelectedIndex(index)}
        >
          <img
            src={image}
            alt={productName + " - " + (index + 1)}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
