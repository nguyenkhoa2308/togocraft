"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  ShoppingBag,
  Truck,
  CreditCard,
  Package,
} from "lucide-react";
import { PageHero } from "@/components/ui";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Đặt hàng
  {
    category: "order",
    question: "Làm thế nào để đặt hàng trên website?",
    answer:
      'Bạn có thể đặt hàng bằng cách: 1) Chọn sản phẩm và nhấn "Thêm vào giỏ hàng", 2) Xem giỏ hàng và điều chỉnh số lượng, 3) Nhấn "Thanh toán" và điền thông tin giao hàng, 4) Chọn phương thức thanh toán và xác nhận đơn hàng.',
  },
  {
    category: "order",
    question: "Tôi có thể đặt hàng qua điện thoại không?",
    answer:
      "Có, bạn có thể gọi đến hotline 1900-xxxx hoặc liên hệ trực tiếp với bộ phận chăm sóc khách hàng để được hỗ trợ đặt hàng.",
  },
  {
    category: "order",
    question: "Tôi có thể thay đổi hoặc hủy đơn hàng không?",
    answer:
      "Bạn có thể thay đổi hoặc hủy đơn hàng trong vòng 2 giờ sau khi đặt hàng. Vui lòng liên hệ ngay với bộ phận chăm sóc khách hàng để được hỗ trợ.",
  },
  {
    category: "order",
    question: "Đơn hàng của tôi đang ở đâu? Làm sao để theo dõi?",
    answer:
      'Bạn có thể theo dõi đơn hàng bằng cách: 1) Đăng nhập vào tài khoản và xem "Đơn hàng của tôi", 2) Sử dụng mã vận đơn được gửi qua email/SMS để tra cứu trên website đơn vị vận chuyển.',
  },

  // Vận chuyển
  {
    category: "shipping",
    question: "Thời gian giao hàng là bao lâu?",
    answer:
      "Thời gian giao hàng phụ thuộc vào địa điểm: Nội thành Hà Nội 1-2 ngày, các tỉnh lân cận 2-3 ngày, các tỉnh thành khác 3-5 ngày, vùng sâu vùng xa 5-7 ngày làm việc.",
  },
  {
    category: "shipping",
    question: "Phí vận chuyển là bao nhiêu?",
    answer:
      "Miễn phí vận chuyển cho đơn hàng từ 500.000đ. Đơn hàng dưới 500.000đ: phí 30.000đ (nội thành Hà Nội), 50.000đ - 100.000đ (các tỉnh khác).",
  },
  {
    category: "shipping",
    question: "Tôi có thể chọn thời gian giao hàng không?",
    answer:
      "Có, bạn có thể ghi chú thời gian mong muốn nhận hàng khi đặt hàng. Chúng tôi sẽ cố gắng sắp xếp phù hợp, tuy nhiên không đảm bảo 100% do phụ thuộc vào đơn vị vận chuyển.",
  },
  {
    category: "shipping",
    question: "Tôi có được kiểm tra hàng trước khi thanh toán không?",
    answer:
      "Có, bạn được quyền kiểm tra tình trạng bên ngoài của bưu kiện trước khi thanh toán. Tuy nhiên, không mở hàng để kiểm tra chi tiết.",
  },

  // Thanh toán
  {
    category: "payment",
    question: "Có những phương thức thanh toán nào?",
    answer:
      "Chúng tôi hỗ trợ nhiều phương thức: 1) Thanh toán khi nhận hàng (COD), 2) Chuyển khoản ngân hàng, 3) Thanh toán qua ví điện tử (MoMo, ZaloPay), 4) Thanh toán qua thẻ tín dụng/ghi nợ.",
  },
  {
    category: "payment",
    question: "Thanh toán online có an toàn không?",
    answer:
      "Hoàn toàn an toàn. Chúng tôi sử dụng các cổng thanh toán uy tín có chứng nhận bảo mật quốc tế. Thông tin thẻ của bạn được mã hóa và không lưu trữ trên hệ thống của chúng tôi.",
  },
  {
    category: "payment",
    question: "Tôi có thể xin hóa đơn VAT không?",
    answer:
      "Có, vui lòng cung cấp thông tin công ty (Tên công ty, Mã số thuế, Địa chỉ) khi đặt hàng. Hóa đơn VAT sẽ được gửi kèm hàng hoặc qua email.",
  },
  {
    category: "payment",
    question: "Tôi thanh toán nhưng đơn hàng chưa được xác nhận?",
    answer:
      "Sau khi thanh toán, hệ thống cần 5-15 phút để xử lý. Nếu quá thời gian này mà chưa nhận được xác nhận, vui lòng liên hệ hotline để được kiểm tra.",
  },

  // Sản phẩm
  {
    category: "product",
    question: "Sản phẩm được làm từ nguyên liệu gì?",
    answer:
      "Tất cả sản phẩm của chúng tôi được làm từ nguyên liệu tự nhiên như mây, tre, cói, lục bình... được thu hoạch từ các làng nghề truyền thống ở Việt Nam.",
  },
  {
    category: "product",
    question: "Làm thế nào để bảo quản sản phẩm mây tre?",
    answer:
      "Để sản phẩm ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và độ ẩm cao. Vệ sinh định kỳ bằng khăn mềm hoặc bàn chải lông mềm. Không ngâm nước hoặc rửa trực tiếp.",
  },
  {
    category: "product",
    question: "Sản phẩm có được bảo hành không?",
    answer:
      "Có, sản phẩm được bảo hành từ 3-6 tháng tùy loại sản phẩm. Bảo hành các lỗi do nhà sản xuất, không bảo hành các trường hợp hư hỏng do tác động ngoại lực hoặc sử dụng không đúng cách.",
  },
  {
    category: "product",
    question: "Sản phẩm có thể sử dụng ngoài trời không?",
    answer:
      "Một số sản phẩm có thể sử dụng ngoài trời nhưng nên để ở vị trí có mái che, tránh mưa nắng trực tiếp. Nên mang vào trong nhà khi thời tiết xấu để sản phẩm bền lâu hơn.",
  },

  // Đổi trả
  {
    category: "return",
    question: "Tôi có thể đổi trả sản phẩm không?",
    answer:
      "Có, chúng tôi chấp nhận đổi trả trong vòng 7 ngày với điều kiện sản phẩm còn nguyên vẹn, chưa qua sử dụng, còn đầy đủ bao bì, nhãn mác và hóa đơn.",
  },
  {
    category: "return",
    question: "Chi phí đổi trả do ai chịu?",
    answer:
      "Nếu sản phẩm bị lỗi do nhà sản xuất hoặc giao sai hàng, Sudes Craft sẽ chịu toàn bộ chi phí. Các trường hợp khác, khách hàng vui lòng chịu phí vận chuyển.",
  },
  {
    category: "return",
    question: "Quy trình đổi trả như thế nào?",
    answer:
      "Liên hệ hotline hoặc email → Cung cấp thông tin đơn hàng và lý do → Đóng gói sản phẩm cẩn thận → Gửi về địa chỉ được hướng dẫn → Chúng tôi kiểm tra và xử lý trong 3-5 ngày.",
  },
];

const categories = [
  { id: "all", name: "Tất cả", icon: Package },
  { id: "order", name: "Đặt hàng", icon: ShoppingBag },
  { id: "shipping", name: "Vận chuyển", icon: Truck },
  { id: "payment", name: "Thanh toán", icon: CreditCard },
  { id: "product", name: "Sản phẩm", icon: Package },
  { id: "return", name: "Đổi trả", icon: Package },
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
        subtitle="Tìm câu trả lời cho những thắc mắc của bạn"
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80"
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
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full focus:border-[#D97706] focus:outline-none text-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-[#D97706] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
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
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <h3 className="text-lg font-bold text-[#4A3B32] pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      size={24}
                      className={`text-[#D97706] transition-transform flex-shrink-0 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
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
            Đừng lo lắng! Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn
            sàng hỗ trợ bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#D97706] text-white hover:bg-[#B45309] px-8 py-3 rounded-full font-bold transition-colors shadow-lg"
            >
              Liên hệ với chúng tôi
            </a>
            <a
              href="tel:1900xxxx"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#D97706] border-2 border-[#D97706] hover:bg-[#D97706] hover:text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              Hotline: 1900-xxxx
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
