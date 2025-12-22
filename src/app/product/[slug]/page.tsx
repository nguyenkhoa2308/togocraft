"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Home,
  ChevronRight,
  Phone,
  MessageCircle,
  ShoppingCart,
  Check,
  Ruler,
  Layers,
  Palette,
  Package,
  ChevronLeft,
  X,
  ZoomIn,
} from "lucide-react";
import {
  getRawProductBySlug,
  getRelatedProducts,
  getColorHex,
  JsonProduct,
} from "@/lib/data/polycarbonate-data";
import { useCartStore, useToastStore, useIsInCart } from "@/stores";
import ProductCard from "@/components/ui/ProductCard";
import PriceTable from "@/components/ui/PriceTable";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const contactInfo = {
  phone: "0976.110.266",
  zalo: "0976110266",
  messenger: "https://m.me/tamnhualaysangpoly",
};

const ProductDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<JsonProduct | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);
  const isInCart = useIsInCart();

  useEffect(() => {
    if (slug) {
      const foundProduct = getRawProductBySlug(slug);
      setProduct(foundProduct || null);
      if (foundProduct?.specs?.colors?.length) {
        setSelectedColor(foundProduct.specs.colors[0].name);
      }
    }
  }, [slug]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen || !product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === 0 ? product.images.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === product.images.length - 1 ? 0 : prev + 1
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <p className="text-gray-600 mb-6">
            Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            href="/categories/all"
            className="inline-block bg-[#D97706] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#C77A06] transition-colors"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.category_slug, product.slug, 8);

  const handleAddToCart = () => {
    const colorToAdd = selectedColor || undefined;

    // Check if item with same color already in cart
    if (isInCart(product.id, colorToAdd)) {
      addToast(`Sản phẩm này đã có trong giỏ hàng`, "info");
      return;
    }

    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price_formatted,
      image: product.thumbnail,
      selectedColor: colorToAdd,
    });
    addToast(`Đã thêm "${product.name}" vào giỏ hàng`, "success");
  };

  const formatPhoneDisplay = (phone: string) => {
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="flex items-center gap-1 hover:text-[#D97706]">
              <Home size={16} />
              Trang chủ
            </Link>
            <ChevronRight size={14} />
            <Link
              href={`/categories/${product.category_slug}`}
              className="hover:text-[#D97706]"
            >
              {product.category}
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#D97706] font-medium line-clamp-1">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left - Image Gallery */}
          <div className="space-y-3 product-gallery">
            {/* Main Image Swiper */}
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="main-gallery rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="aspect-square cursor-zoom-in relative group"
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                  >
                    <Image
                      src={img.url || product.thumbnail}
                      alt={img.alt || product.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-contain"
                      priority={index === 0}
                    />
                    {/* Zoom hint overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3 shadow-lg">
                        <ZoomIn size={24} className="text-[#4A3B32]" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Swiper */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumb-gallery"
              breakpoints={{
                480: { slidesPerView: 5 },
                640: { slidesPerView: 5 },
              }}
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#D97706] transition-colors">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <style jsx global>{`
              .product-gallery .thumb-gallery .swiper-slide-thumb-active > div {
                border-color: #D97706 !important;
              }
              .product-gallery .main-gallery .swiper-button-next,
              .product-gallery .main-gallery .swiper-button-prev {
                color: #4A3B32;
                background: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                box-shadow: 0 2px 10px rgba(0,0,0,0.15);
              }
              .product-gallery .main-gallery .swiper-button-next:after,
              .product-gallery .main-gallery .swiper-button-prev:after {
                font-size: 16px;
                font-weight: bold;
              }
              .product-gallery .main-gallery .swiper-button-next:hover,
              .product-gallery .main-gallery .swiper-button-prev:hover {
                color: #D97706;
                background: white;
              }
              .product-gallery .main-gallery .swiper-button-disabled {
                opacity: 0.3;
              }
            `}</style>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Title & SKU */}
            <div>
              <p className="text-sm text-gray-500 mb-2">
                SKU: {product.specs?.sku || "N/A"}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-[#4A3B32]">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Giá tham khảo</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#D97706]">
                  {product.price_formatted}
                </span>
                <span className="text-gray-600">/ {product.unit}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Giá chính thức sẽ được báo sau khi tư vấn
              </p>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.short_description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 text-[#D97706] mb-2">
                  <Layers size={18} />
                  <span className="text-sm font-medium">Độ dày</span>
                </div>
                <p className="font-semibold text-[#4A3B32]">
                  {product.specs?.thickness || "N/A"}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 text-[#D97706] mb-2">
                  <Ruler size={18} />
                  <span className="text-sm font-medium">Chiều dài</span>
                </div>
                <p className="font-semibold text-[#4A3B32]">
                  {product.specs?.length || "N/A"}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 col-span-2">
                <div className="flex items-center gap-2 text-[#D97706] mb-2">
                  <Package size={18} />
                  <span className="text-sm font-medium">Khổ rộng có sẵn</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.specs?.widths?.map((width, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-[#4A3B32]"
                    >
                      {width}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Colors */}
            {product.specs?.colors && product.specs.colors.length > 0 && (
              <div className="bg-white p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 text-[#D97706] mb-3">
                  <Palette size={18} />
                  <span className="text-sm font-medium">Màu sắc</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.specs.colors.map((color, idx) => {
                    const hexColor = getColorHex(color.name);
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`relative group flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                          isSelected
                            ? "border-[#D97706] bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: hexColor }}
                        />
                        <span className="text-sm font-medium text-[#4A3B32]">
                          {color.name}
                        </span>
                        {isSelected && (
                          <Check size={16} className="text-[#D97706]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-[#D97706] hover:bg-[#C77A06] text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart size={20} />
                Thêm vào danh sách báo giá
              </button>

              <div className="grid grid-cols-3 gap-3">
                <Link
                  href={`tel:${contactInfo.phone.replace(/\./g, "")}`}
                  className="flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#C77A06] text-white py-3 rounded-xl font-medium transition-colors"
                >
                  <Phone size={18} />
                  <span className="hidden sm:inline">Gọi ngay</span>
                </Link>
                <Link
                  href={`https://zalo.me/${contactInfo.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#0068FF] hover:bg-[#0054CC] text-white py-3 rounded-xl font-medium transition-colors"
                >
                  <Image src="/icons/zalo_icon.svg" alt="Zalo" width={20} height={20} />
                  <span className="hidden sm:inline">Zalo</span>
                </Link>
                <Link
                  href={contactInfo.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00B2FF] to-[#006AFF] hover:opacity-90 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  <Image src="/icons/messenger_icon.svg" alt="Messenger" width={20} height={20} />
                  <span className="hidden sm:inline">Messenger</span>
                </Link>
              </div>
            </div>

            {/* Hotline */}
            <div className="bg-[#4A3B32] text-white p-4 rounded-xl text-center">
              <p className="text-sm opacity-80 mb-1">Hotline tư vấn</p>
              <Link
                href={`tel:${contactInfo.phone.replace(/\./g, "")}`}
                className="text-2xl font-bold hover:text-[#D97706] transition-colors"
              >
                {formatPhoneDisplay(contactInfo.phone)}
              </Link>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#4A3B32] mb-6">
            Mô tả sản phẩm
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            {/* Intro */}
            {product.content?.intro && (
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                {product.content.intro}
              </p>
            )}

            {/* Content Sections */}
            {product.content?.sections?.map((section: any, idx: number) => (
              <div key={idx} className="mb-8">
                {section.type === "composition" && (
                  <div>
                    <h3 className="text-xl font-bold text-[#4A3B32] mb-4">
                      {section.title}
                    </h3>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {section.body}
                    </div>
                  </div>
                )}

                {section.type === "image" && (
                  <div className="my-6">
                    <Image
                      src={section.url}
                      alt={section.alt}
                      width={800}
                      height={400}
                      className="w-full rounded-xl"
                    />
                    {section.caption && (
                      <p className="text-center text-sm text-gray-500 mt-2">
                        {section.caption}
                      </p>
                    )}
                  </div>
                )}

                {section.type === "pros_cons" && (
                  <div>
                    <h3 className="text-xl font-bold text-[#4A3B32] mb-4">
                      {section.title}
                    </h3>
                    {section.intro && (
                      <p className="text-gray-700 mb-4">{section.intro}</p>
                    )}
                    {section.pros && (
                      <ul className="space-y-2">
                        {section.pros.map((pro: string, proIdx: number) => (
                          <li key={proIdx} className="flex items-start gap-3">
                            <Check
                              size={20}
                              className="text-green-500 flex-shrink-0 mt-0.5"
                            />
                            <span className="text-gray-700">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {section.type === "applications" && (
                  <div>
                    <h3 className="text-xl font-bold text-[#4A3B32] mb-4">
                      {section.title}
                    </h3>
                    {section.intro && (
                      <p className="text-gray-700 mb-4">{section.intro}</p>
                    )}
                    {section.items && (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.items.map((item: string, itemIdx: number) => (
                          <li key={itemIdx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#D97706] rounded-full flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {section.type === "price_table" && section.data && (
                  <PriceTable title={section.title} data={section.data} />
                )}

                {section.type === "text" && (
                  <div className="bg-gradient-to-br from-[#4A3B32] to-[#6B5344] text-white p-6 rounded-2xl overflow-hidden">
                    <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                    <div className="leading-relaxed whitespace-pre-line opacity-90 break-words">
                      {section.body}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#4A3B32]">
                Sản phẩm liên quan
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="related-prev w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#D97706] hover:border-[#D97706] hover:text-white transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Sản phẩm trước"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="related-next w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#D97706] hover:border-[#D97706] hover:text-white transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Sản phẩm tiếp theo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <Link
                  href={`/categories/${product.category_slug}`}
                  className="text-[#D97706] hover:underline font-medium"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={2}
              navigation={{
                prevEl: ".related-prev",
                nextEl: ".related-next",
              }}
              pagination={{
                clickable: true,
                el: ".related-pagination",
                bulletClass: "inline-block w-2 h-2 rounded-full bg-gray-300 mx-1 cursor-pointer transition-all",
                bulletActiveClass: "!bg-[#D97706] !w-6",
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="!pb-10"
            >
              {relatedProducts.map((p) => (
                <SwiperSlide key={p.id}>
                  <ProductCard product={p} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="related-pagination flex justify-center mt-4" />
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && product && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Đóng"
          >
            <X size={28} />
          </button>

          {/* Navigation buttons */}
          {product.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev === 0 ? product.images.length - 1 : prev - 1
                  );
                }}
                className="absolute left-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Ảnh trước"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev === product.images.length - 1 ? 0 : prev + 1
                  );
                }}
                className="absolute right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={product.images[lightboxIndex]?.url || product.thumbnail}
              alt={product.images[lightboxIndex]?.alt || product.name}
              width={1200}
              height={1200}
              className="max-w-full max-h-[90vh] object-contain"
            />
            {/* Image counter */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {lightboxIndex + 1} / {product.images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
