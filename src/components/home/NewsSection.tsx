import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  {
    id: 1,
    slug: "cau-chuyen-lang-nghe-phu-vinh",
    title: "Nghệ thuật đan lát mây tre - Di sản văn hóa Việt Nam",
    excerpt:
      "Khám phá câu chuyện về nghề đan lát truyền thống đã tồn tại hàng trăm năm và cách chúng tôi gìn giữ, phát triển di sản này.",
    date: "20/11/2024",
    category: "Câu chuyện thương hiệu",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    slug: "cham-soc-san-pham-may-tre",
    title: "Cách bảo quản đèn mây tre để sử dụng lâu dài",
    excerpt:
      "Hướng dẫn chi tiết cách vệ sinh và bảo quản đèn mây tre đúng cách để giữ vẻ đẹp tự nhiên theo thời gian.",
    date: "18/11/2024",
    category: "Hướng dẫn",
    image:
      "https://images.unsplash.com/photo-1513506003013-d531625a020d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    slug: "5-y-tuong-trang-tri-phong-khach",
    title: "5 ý tưởng trang trí nhà với sản phẩm mây tre",
    excerpt:
      "Biến không gian sống của bạn trở nên ấm cúng và gần gũi thiên nhiên với những món đồ thủ công mỹ nghệ.",
    date: "15/11/2024",
    category: "Mẹo trang trí",
    image:
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=800&auto=format&fit=crop&q=60",
  },
];

const NewsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[#D97706] font-medium tracking-wide uppercase mb-2 text-sm">
              TẤM LỢP LẤY SÁNG EVEREST LIGHT
            </p>
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pacifico)] text-[#4A3B32]">
              Tin tức mới nhất từ Sudes Craft
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#D97706] hover:text-white hover:border-[#D97706] transition-colors">
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#D97706] hover:text-white hover:border-[#D97706] transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 h-64">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Calendar size={12} className="text-[#D97706]" />
                  {post.date}
                </div>
                <div className="absolute bottom-4 left-4 bg-[#D97706] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#D97706] transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>

              <span className="text-[#D97706] font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Đọc thêm <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-[#C59263] text-white hover:bg-[#B07D4E] px-8 py-3 rounded-full font-bold transition-colors shadow-lg"
          >
            Xem thêm
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
