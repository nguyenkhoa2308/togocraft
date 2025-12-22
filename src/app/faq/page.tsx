"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Search,
  ShoppingBag,
  Truck,
  Package,
  Wrench,
  Shield,
  Phone,
} from "lucide-react";
import { PageHero } from "@/components/ui";

const contactInfo = {
  phone: "0976.110.266",
  zalo: "https://zalo.me/0976110266",
  messenger: "https://m.me/tamnhualaysangpoly",
};

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Sản phẩm
  {
    category: "product",
    question: "Polycarbonate là gì? Có những loại nào?",
    answer:
      "Polycarbonate là loại nhựa kỹ thuật cao cấp, trong suốt như kính nhưng bền hơn gấp 200 lần. Everest Light cung cấp 3 loại chính: Tấm Polycarbonate Đặc (trong suốt hoàn toàn), Tấm Polycarbonate Sóng (dạng lượn sóng cho mái lợp), và Tấm Polycarbonate Rỗng (cấu trúc nhiều lớp cách nhiệt tốt).",
  },
  {
    category: "product",
    question: "Tấm polycarbonate có bền không? Tuổi thọ bao lâu?",
    answer:
      "Tấm polycarbonate Everest Light có tuổi thọ từ 10-15 năm tùy điều kiện sử dụng. Sản phẩm có lớp phủ chống UV, không bị ố vàng, giòn hay nứt vỡ theo thời gian như các loại nhựa thông thường.",
  },
  {
    category: "product",
    question: "Tấm polycarbonate có chống tia UV không?",
    answer:
      "Có, tất cả sản phẩm Everest Light đều có lớp phủ chống UV tiêu chuẩn Châu Âu, ngăn chặn 99.9% tia UV có hại. Lớp phủ này giúp bảo vệ không gian bên dưới và đảm bảo sản phẩm không bị ố vàng theo thời gian.",
  },
  {
    category: "product",
    question: "Tấm nào phù hợp cho giếng trời, mái che sân vườn?",
    answer:
      "Tấm Polycarbonate Rỗng là lựa chọn tốt nhất cho giếng trời và mái che sân vườn nhờ khả năng cách nhiệt tốt, trọng lượng nhẹ và độ truyền sáng cao. Có thể chọn độ dày từ 6mm-16mm tùy diện tích và yêu cầu cách nhiệt.",
  },
  {
    category: "product",
    question: "Tấm nào phù hợp cho nhà xưởng, nhà kho?",
    answer:
      "Tấm Polycarbonate Sóng là lựa chọn phổ biến cho nhà xưởng, nhà kho nhờ độ bền cao, dễ lắp đặt và giá thành hợp lý. Sóng ngói hoặc sóng vuông đều phù hợp tùy thiết kế mái hiện có.",
  },
  {
    category: "product",
    question: "Có những màu sắc và độ dày nào?",
    answer:
      "Everest Light cung cấp đa dạng màu sắc: Trong suốt, Trắng sữa, Xanh dương, Xanh lá, Xám khói, Nâu đồng... Độ dày từ 0.8mm đến 16mm tùy loại sản phẩm, đáp ứng mọi nhu cầu công trình.",
  },

  // Lắp đặt
  {
    category: "install",
    question: "Tấm polycarbonate có dễ lắp đặt không?",
    answer:
      "Có, tấm polycarbonate rất dễ thi công. Sản phẩm nhẹ, có thể cắt bằng cưa hoặc dao, khoan lỗ dễ dàng. Everest Light cung cấp đầy đủ hướng dẫn lắp đặt và phụ kiện đồng bộ.",
  },
  {
    category: "install",
    question: "Cần những phụ kiện gì để lắp đặt?",
    answer:
      "Các phụ kiện cần thiết gồm: Nẹp nhôm hoặc nẹp nhựa (tùy loại tấm), Ron cao su chống thấm, Ốc vít inox có đệm cao su, Băng keo chống bụi dán đầu tấm. Everest Light cung cấp đầy đủ phụ kiện chính hãng.",
  },
  {
    category: "install",
    question: "Khoảng cách xà gồ tiêu chuẩn là bao nhiêu?",
    answer:
      "Khoảng cách xà gồ phụ thuộc vào độ dày tấm: Tấm 6mm: 60-70cm, Tấm 8mm: 80-90cm, Tấm 10mm: 100-110cm, Tấm 16mm: 120-140cm. Khuyến cáo tham khảo kỹ thuật viên trước khi thi công.",
  },
  {
    category: "install",
    question: "Everest Light có hỗ trợ lắp đặt không?",
    answer:
      "Everest Light cung cấp dịch vụ tư vấn kỹ thuật miễn phí và có đội ngũ đối tác thi công tại các tỉnh thành. Liên hệ hotline để được kết nối với nhà thầu uy tín tại khu vực của bạn.",
  },

  // Bảo hành
  {
    category: "warranty",
    question: "Chính sách bảo hành như thế nào?",
    answer:
      "Everest Light bảo hành 10 năm cho tất cả sản phẩm tấm polycarbonate. Bảo hành bao gồm: không ố vàng, không giòn vỡ do lỗi sản xuất. Không bảo hành các trường hợp hư hỏng do thiên tai, lắp đặt sai kỹ thuật.",
  },
  {
    category: "warranty",
    question: "Quy trình bảo hành như thế nào?",
    answer:
      "Liên hệ hotline → Cung cấp hình ảnh/video sản phẩm lỗi, hóa đơn mua hàng → Kỹ thuật viên kiểm tra → Xác nhận bảo hành và xử lý trong 7-14 ngày làm việc.",
  },
  {
    category: "warranty",
    question: "Sản phẩm có chứng nhận chất lượng không?",
    answer:
      "Có, sản phẩm Everest Light đạt tiêu chuẩn Châu Âu (EU), có chứng nhận ISO 9001:2015, kiểm định độ bền va đập, khả năng chống UV và độ truyền sáng tại các phòng thí nghiệm uy tín.",
  },

  // Đặt hàng
  {
    category: "order",
    question: "Làm thế nào để đặt hàng?",
    answer:
      "Có nhiều cách đặt hàng: 1) Liên hệ hotline 0976.110.266, 2) Gửi email đến nhualaysangeverestlight@gmail.com, 3) Liên hệ qua Zalo, 4) Đến trực tiếp văn phòng tại Hà Nội. Đội ngũ tư vấn sẽ hỗ trợ báo giá và đặt hàng.",
  },
  {
    category: "order",
    question: "Đơn hàng tối thiểu là bao nhiêu?",
    answer:
      "Không giới hạn đơn hàng tối thiểu cho khách lẻ. Với đơn hàng lớn (từ 100m² trở lên) hoặc đại lý, vui lòng liên hệ trực tiếp để nhận báo giá ưu đãi.",
  },
  {
    category: "order",
    question: "Có thể cắt theo kích thước yêu cầu không?",
    answer:
      "Có, Everest Light hỗ trợ cắt tấm theo kích thước yêu cầu của khách hàng. Phí cắt được tính dựa trên số lượng và độ phức tạp. Liên hệ để được báo giá chi tiết.",
  },

  // Vận chuyển
  {
    category: "shipping",
    question: "Giao hàng đi tỉnh được không?",
    answer:
      "Có, Everest Light giao hàng toàn quốc. Hà Nội và các tỉnh lân cận: 1-3 ngày. Miền Trung, Nam: 3-7 ngày tùy địa điểm. Phí vận chuyển được tính dựa trên khối lượng và khoảng cách.",
  },
  {
    category: "shipping",
    question: "Phí vận chuyển được tính như thế nào?",
    answer:
      "Phí vận chuyển phụ thuộc vào khối lượng hàng và địa điểm giao. Miễn phí giao hàng nội thành Hà Nội cho đơn từ 5 triệu đồng. Liên hệ hotline để được báo phí vận chuyển chính xác.",
  },
  {
    category: "shipping",
    question: "Hàng có được đóng gói cẩn thận không?",
    answer:
      "Có, tất cả sản phẩm được đóng gói cẩn thận với màng PE bảo vệ bề mặt, đệm xốp chống va đập và pallet gỗ cho đơn hàng lớn. Đảm bảo hàng đến tay khách hàng nguyên vẹn.",
  },
];

const categories = [
  { id: "all", name: "Tất cả", icon: Package },
  { id: "product", name: "Sản phẩm", icon: Package },
  { id: "install", name: "Lắp đặt", icon: Wrench },
  { id: "warranty", name: "Bảo hành", icon: Shield },
  { id: "order", name: "Đặt hàng", icon: ShoppingBag },
  { id: "shipping", name: "Vận chuyển", icon: Truck },
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <PageHero
        title="Câu Hỏi Thường Gặp"
        subtitle="Giải đáp thắc mắc về sản phẩm tấm lợp lấy sáng Polycarbonate"
        breadcrumbs={[{ label: "FAQ" }]}
      />

      {/* Search Bar */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-full focus:border-[#D97706] focus:outline-none text-gray-800 placeholder:text-gray-400 bg-white"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all text-sm ${
                    selectedCategory === category.id
                      ? "bg-[#D97706] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Icon size={16} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Không tìm thấy câu hỏi phù hợp
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ease-out ${
                      isOpen
                        ? "shadow-xl ring-1 ring-[#D97706]/20"
                        : "shadow-md hover:shadow-lg"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      className={`w-full flex items-center justify-between p-6 text-left transition-colors duration-200 ${
                        isOpen ? "bg-[#FDF6E9]" : "hover:bg-gray-50"
                      }`}
                    >
                      <h3
                        className={`text-base font-bold pr-4 transition-colors duration-200 ${
                          isOpen ? "text-[#D97706]" : "text-[#4A3B32]"
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-out ${
                          isOpen
                            ? "bg-[#D97706] rotate-180"
                            : "bg-gray-100 rotate-0"
                        }`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-colors duration-200 ${
                            isOpen ? "text-white" : "text-[#D97706]"
                          }`}
                        />
                      </div>
                    </button>
                    <div
                      className="grid transition-all duration-300 ease-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={`px-6 pb-6 pt-2 text-gray-600 leading-relaxed text-sm transition-opacity duration-300 ${
                            isOpen ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-4">
            Vẫn chưa tìm được câu trả lời?
          </h2>
          <p className="text-gray-600 mb-8">
            Đội ngũ tư vấn của Everest Light luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`tel:${contactInfo.phone.replace(/\./g, "")}`}
              className="inline-flex items-center justify-center gap-2 bg-[#D97706] text-white hover:bg-[#C77A06] px-6 py-3 rounded-full font-bold transition-colors shadow-lg"
            >
              <Phone size={18} />
              {contactInfo.phone}
            </Link>
            <Link
              href={contactInfo.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0068FF] text-white hover:bg-[#0054CC] px-6 py-3 rounded-full font-bold transition-colors shadow-lg"
            >
              <Image src="/icons/zalo_icon.svg" alt="Zalo" width={20} height={20} />
              Zalo
            </Link>
            <Link
              href={contactInfo.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00B2FF] to-[#006AFF] text-white hover:opacity-90 px-6 py-3 rounded-full font-bold transition-colors shadow-lg"
            >
              <Image src="/icons/messenger_icon.svg" alt="Messenger" width={20} height={20} />
              Messenger
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Hoặc{" "}
            <Link href="/contact" className="text-[#D97706] hover:underline font-semibold">
              để lại thông tin
            </Link>
            , chúng tôi sẽ liên hệ lại ngay
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
