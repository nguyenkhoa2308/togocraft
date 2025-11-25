"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  Search,
  TrendingUp,
  Bookmark,
} from "lucide-react";

// Mock news data
const newsCategories = [
  { id: "all", name: "Tất cả", icon: "📰" },
  { id: "brand-story", name: "Câu chuyện thương hiệu", icon: "🏠" },
  { id: "guides", name: "Hướng dẫn sử dụng", icon: "📖" },
  { id: "decoration-tips", name: "Mẹo trang trí", icon: "✨" },
  { id: "promotions", name: "Khuyến mãi", icon: "🎁" },
];

const newsArticles = [
  {
    id: 1,
    slug: "cau-chuyen-lang-nghe-phu-vinh",
    title: "Nghệ thuật đan lát mây tre - Di sản văn hóa Việt Nam",
    excerpt:
      "Khám phá câu chuyện về nghề đan lát truyền thống đã tồn tại hàng trăm năm và cách chúng tôi gìn giữ, phát triển di sản này.",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=60",
    category: "brand-story",
    author: "Sudes Craft",
    date: "20/11/2024",
    readTime: "5 phút đọc",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    slug: "cham-soc-san-pham-may-tre",
    title: "Cách bảo quản đèn mây tre để sử dụng lâu dài",
    excerpt:
      "Hướng dẫn chi tiết cách vệ sinh và bảo quản đèn mây tre đúng cách để giữ vẻ đẹp tự nhiên theo thời gian.",
    image:
      "https://images.unsplash.com/photo-1513506003013-d531625a020d?w=800&auto=format&fit=crop&q=60",
    category: "guides",
    author: "Sudes Craft",
    date: "18/11/2024",
    readTime: "3 phút đọc",
    views: 890,
    featured: true,
  },
  {
    id: 3,
    slug: "5-y-tuong-trang-tri-phong-khach",
    title: "5 ý tưởng trang trí nhà với sản phẩm mây tre",
    excerpt:
      "Biến không gian sống của bạn trở nên ấm cúng và gần gũi thiên nhiên với những món đồ thủ công mỹ nghệ.",
    image:
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=800&auto=format&fit=crop&q=60",
    category: "decoration-tips",
    author: "Sudes Craft",
    date: "15/11/2024",
    readTime: "4 phút đọc",
    views: 2100,
    featured: false,
  },
  {
    id: 4,
    slug: "qua-tang-y-nghia-dip-tet",
    title: "Ưu đãi đặc biệt mùa lễ hội - Giảm đến 30%",
    excerpt:
      "Chương trình khuyến mãi cuối năm với nhiều ưu đãi hấp dẫn dành cho khách hàng thân thiết.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=60",
    category: "promotions",
    author: "Sudes Craft",
    date: "12/11/2024",
    readTime: "2 phút đọc",
    views: 3500,
    featured: false,
  },
  {
    id: 5,
    slug: "hanh-trinh-tu-lang-nghe",
    title: "Hành trình từ làng nghề đến sản phẩm hoàn thiện",
    excerpt:
      "Theo chân nghệ nhân làng nghề khám phá quy trình tạo ra những sản phẩm thủ công tinh xảo.",
    image:
      "https://images.unsplash.com/photo-1523779105324-a5e28371ad9a?w=800&auto=format&fit=crop&q=60",
    category: "brand-story",
    author: "Sudes Craft",
    date: "10/11/2024",
    readTime: "6 phút đọc",
    views: 1800,
    featured: false,
  },
  {
    id: 6,
    slug: "tui-coi-phu-kien-ben-vung",
    title: "Túi cói - Phụ kiện thời trang bền vững",
    excerpt:
      "Xu hướng thời trang xanh và lý do túi cói đang trở thành lựa chọn yêu thích của nhiều người.",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=60",
    category: "decoration-tips",
    author: "Sudes Craft",
    date: "08/11/2024",
    readTime: "4 phút đọc",
    views: 950,
    featured: false,
  },
  {
    id: 7,
    slug: "xu-huong-trang-tri-nha-2024",
    title: "Xu hướng nội thất 2024: Trở về với thiên nhiên",
    excerpt:
      "Các chuyên gia thiết kế nội thất dự đoán xu hướng sử dụng vật liệu tự nhiên sẽ bùng nổ trong năm nay.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop&q=60",
    category: "decoration-tips",
    author: "Sudes Craft",
    date: "05/11/2024",
    readTime: "5 phút đọc",
    views: 2800,
    featured: false,
  },
  {
    id: 8,
    slug: "cach-chon-den-may-tre",
    title: "Cách chọn đèn mây tre phù hợp với không gian",
    excerpt:
      "Hướng dẫn lựa chọn kích thước, kiểu dáng đèn mây tre phù hợp với từng không gian trong nhà.",
    image:
      "https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=800&auto=format&fit=crop&q=60",
    category: "guides",
    author: "Sudes Craft",
    date: "01/11/2024",
    readTime: "4 phút đọc",
    views: 1560,
    featured: false,
  },
];

// Popular articles (sorted by views)
const popularArticles = [...newsArticles]
  .sort((a, b) => b.views - a.views)
  .slice(0, 4);

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = newsArticles.filter((article) => {
    const matchCategory =
      activeCategory === "all" || article.category === activeCategory;
    const matchSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredArticle = newsArticles.find((a) => a.featured);
  const secondFeatured = newsArticles.filter((a) => a.featured)[1];

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-20">
      {/* Hero Banner */}
      <div
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/breadcrumb_bg.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Home size={14} />
                Trang chủ
              </Link>
              <span>/</span>
              <span className="text-white">Tin tức</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tin tức & Blog
            </h1>
            <p className="text-white/80 text-lg">
              Khám phá những câu chuyện, mẹo hay và cập nhật mới nhất từ Sudes
              Craft
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Section */}
        {activeCategory === "all" && searchQuery === "" && featuredArticle && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-[#C59263] rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                Bài viết nổi bật
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Featured */}
              <Link
                href={`/news/${featuredArticle.slug}`}
                className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-[#C59263] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    {
                      newsCategories.find(
                        (c) => c.id === featuredArticle.category
                      )?.name
                    }
                  </span>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#F5D5B8] transition-colors">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-white/80 mb-4 line-clamp-2 hidden md:block">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {featuredArticle.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {featuredArticle.readTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye size={14} />
                        {featuredArticle.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Secondary Featured + Popular */}
              <div className="flex flex-col gap-6">
                {secondFeatured && (
                  <Link
                    href={`/news/${secondFeatured.slug}`}
                    className="group flex gap-4 bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="w-40 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={secondFeatured.image}
                        alt={secondFeatured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[#C59263] text-xs font-semibold mb-2">
                        {
                          newsCategories.find(
                            (c) => c.id === secondFeatured.category
                          )?.name
                        }
                      </span>
                      <h4 className="font-bold text-gray-800 group-hover:text-[#C59263] transition-colors line-clamp-2 mb-2">
                        {secondFeatured.title}
                      </h4>
                      <div className="flex items-center gap-3 text-gray-400 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {secondFeatured.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {secondFeatured.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Popular Articles Mini List */}
                <div className="bg-white rounded-2xl p-5 shadow-md flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={18} className="text-[#C59263]" />
                    <h4 className="font-bold text-gray-800">Đọc nhiều nhất</h4>
                  </div>
                  <div className="space-y-4">
                    {popularArticles.slice(0, 3).map((article, index) => (
                      <Link
                        key={article.id}
                        href={`/news/${article.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <span className="text-2xl font-bold text-[#C59263]/30 group-hover:text-[#C59263] transition-colors">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-gray-700 group-hover:text-[#C59263] transition-colors line-clamp-2">
                            {article.title}
                          </h5>
                          <span className="text-xs text-gray-400">
                            {article.views.toLocaleString()} lượt xem
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories & Search */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {newsCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-[#C59263] text-white shadow-lg shadow-[#C59263]/25"
                      : "bg-white text-gray-600 hover:bg-[#FDF6E9] hover:text-[#C59263] border border-gray-100"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-full focus:outline-none focus:border-[#C59263] focus:ring-2 focus:ring-[#C59263]/20 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-[#C59263] rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeCategory === "all"
                ? "Tất cả bài viết"
                : newsCategories.find((c) => c.id === activeCategory)?.name}
            </h2>
            <span className="text-gray-400 text-sm">
              ({filteredArticles.length} bài viết)
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Category */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#C59263] text-xs font-semibold px-3 py-1.5 rounded-full">
                      {
                        newsCategories.find((c) => c.id === article.category)
                          ?.icon
                      }{" "}
                      {
                        newsCategories.find((c) => c.id === article.category)
                          ?.name
                      }
                    </span>

                    {/* Bookmark */}
                    <button
                      className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-[#C59263] hover:text-white text-gray-600"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Bookmark size={16} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#C59263] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Eye size={14} />
                        <span>{article.views.toLocaleString()} lượt xem</span>
                      </div>
                      <span className="text-[#C59263] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Đọc tiếp
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Không tìm thấy bài viết
              </h3>
              <p className="text-gray-500 mb-6">
                Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-[#C59263] text-white rounded-full font-medium hover:bg-[#B08253] transition-colors"
              >
                Xem tất cả bài viết
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-[#C59263] to-[#A67B5B] rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 p-8 lg:p-12 text-white">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                Newsletter
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Đăng ký nhận tin mới
              </h2>
              <p className="text-white/80 mb-6">
                Nhận ngay những bài viết mới nhất, mẹo trang trí và ưu đãi độc
                quyền từ Sudes Craft.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30"
                />
                <button className="px-8 py-3 bg-white text-[#C59263] rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                  Đăng ký ngay
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 h-64 lg:h-80">
              <img
                src="https://images.unsplash.com/photo-1513506003013-d531625a020d?w=800&auto=format&fit=crop&q=60"
                alt="Newsletter"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
