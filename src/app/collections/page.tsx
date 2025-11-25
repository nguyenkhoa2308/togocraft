"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui";

// Collections data
const collections = [
  {
    id: "spring-2024",
    name: "BST Mùa Xuân 2024",
    description: "Bộ sưu tập lấy cảm hứng từ sắc xuân tươi mới, mang đến không gian sống tràn đầy năng lượng.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop&q=60",
    productCount: 24,
  },
  {
    id: "tet",
    name: "BST Tết Nguyên Đán",
    description: "Những sản phẩm mang đậm nét truyền thống, hoàn hảo cho mùa Tết sum vầy.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=60",
    productCount: 18,
  },
  {
    id: "gifts",
    name: "BST Quà Tặng",
    description: "Bộ sưu tập quà tặng ý nghĩa, được đóng gói tinh tế cho mọi dịp đặc biệt.",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop&q=60",
    productCount: 32,
  },
  {
    id: "new-arrivals",
    name: "Sản Phẩm Mới",
    description: "Những sản phẩm mới nhất vừa ra mắt, cập nhật xu hướng trang trí hiện đại.",
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=600&auto=format&fit=crop&q=60",
    productCount: 15,
  },
  {
    id: "best-sellers",
    name: "Bán Chạy Nhất",
    description: "Những sản phẩm được yêu thích nhất, được khách hàng tin tưởng lựa chọn.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=60",
    productCount: 20,
  },
  {
    id: "eco-friendly",
    name: "Thân Thiện Môi Trường",
    description: "Bộ sưu tập sản phẩm 100% từ nguyên liệu tự nhiên, bền vững với môi trường.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=60",
    productCount: 28,
  },
];

const CollectionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <PageHero
        title="Bộ Sưu Tập"
        subtitle="Khám phá các bộ sưu tập được tuyển chọn kỹ lưỡng, mỗi bộ sưu tập mang một câu chuyện riêng"
        backgroundImage="https://images.unsplash.com/photo-1523779105324-a5e28371ad9a?w=1200&auto=format&fit=crop&q=80"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-700">{collection.productCount} sản phẩm</span>
                </div>

                {/* Title on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{collection.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[#C59263] font-medium text-sm group-hover:gap-3 transition-all">
                  Xem bộ sưu tập
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#C59263] to-[#A67B5B] rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 p-8 lg:p-12 text-white">
              <span className="text-white/70 text-sm uppercase tracking-wider">Đặc biệt</span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4">
                Bộ Sưu Tập Giới Hạn
              </h2>
              <p className="text-white/90 mb-6">
                Những sản phẩm độc quyền, số lượng có hạn. Mỗi sản phẩm được đánh số và đi kèm chứng nhận chính hãng.
              </p>
              <Link
                href="/collections/limited"
                className="inline-flex items-center gap-2 bg-white text-[#C59263] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Khám phá ngay
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="lg:w-1/2 h-64 lg:h-80">
              <img
                src="https://images.unsplash.com/photo-1513506003013-d531625a020d?w=800&auto=format&fit=crop&q=60"
                alt="Limited Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
