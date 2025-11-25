"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Facebook,
  Instagram,
} from "lucide-react";
import { PageHero } from "@/components/ui";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert(
      "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất."
    );
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <PageHero
        title="Liên Hệ"
        subtitle="Chúng tôi luôn sẵn sàng lắng nghe bạn"
        backgroundImage="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1200&auto=format&fit=crop&q=80"
      />

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#D97706] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#4A3B32] mb-2">Địa chỉ</h3>
              <p className="text-gray-600 text-sm">
                123 Phố Hàng Bông
                <br />
                Quận Hoàn Kiếm, Hà Nội
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#C59263] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#4A3B32] mb-2">
                Điện thoại
              </h3>
              <p className="text-gray-600 text-sm">
                Hotline: 1900-xxxx
                <br />
                Mobile: 0912-345-678
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#4A3B32] mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                contact@sudescraft.com
                <br />
                support@sudescraft.com
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#A0522D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#4A3B32] mb-2">
                Giờ làm việc
              </h3>
              <p className="text-gray-600 text-sm">
                T2 - T6: 8:00 - 18:00
                <br />
                T7 - CN: 9:00 - 17:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="text-[#D97706]" size={32} />
                  <h2 className="text-3xl font-[family-name:var(--font-pacifico)] text-[#4A3B32]">
                    Gửi tin nhắn
                  </h2>
                </div>
                <p className="text-gray-600">
                  Vui lòng điền thông tin vào form bên dưới, chúng tôi sẽ phản
                  hồi trong vòng 24 giờ
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D97706] focus:outline-none transition-colors"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D97706] focus:outline-none transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D97706] focus:outline-none transition-colors"
                      placeholder="0912 345 678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ đề <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D97706] focus:outline-none transition-colors"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="product">Thông tin sản phẩm</option>
                    <option value="order">Đặt hàng</option>
                    <option value="shipping">Vận chuyển</option>
                    <option value="return">Đổi trả</option>
                    <option value="warranty">Bảo hành</option>
                    <option value="partnership">Hợp tác kinh doanh</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D97706] focus:outline-none transition-colors resize-none"
                    placeholder="Nhập nội dung bạn muốn gửi..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#D97706] text-white hover:bg-[#B45309] px-8 py-4 rounded-full font-bold transition-colors shadow-lg hover:shadow-xl"
                >
                  <Send size={20} />
                  Gửi tin nhắn
                </button>
              </form>
            </div>

            {/* Map & Social */}
            <div className="space-y-8">
              {/* Google Map */}
              <div>
                <h3 className="text-2xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-4">
                  Tìm chúng tôi
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096811147481!2d105.84117731533404!3d21.02879919316048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x4da9c8ddb21098ce!2zSMOgbmcgQuG7k25nLCBIb8OgbiBLaeG6v20sIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-4">
                  Kết nối với chúng tôi
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#1877F2] text-white px-6 py-3 rounded-full hover:bg-[#165EC7] transition-colors"
                  >
                    <Facebook size={20} />
                    <span className="font-medium">Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gradient-to-r from-[#E1306C] to-[#C13584] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Instagram size={20} />
                    <span className="font-medium">Instagram</span>
                  </a>
                </div>
              </div>

              {/* Store Info */}
              <div className="bg-[#FDF6E9] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#4A3B32] mb-4">
                  Cửa hàng trưng bày
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Showroom Hà Nội:</strong>
                    <br />
                    123 Phố Hàng Bông, Hoàn Kiếm, Hà Nội
                  </p>
                  <p>
                    <strong>Showroom TP.HCM:</strong>
                    <br />
                    456 Đường Lê Lợi, Quận 1, TP.HCM
                  </p>
                  <p className="text-sm text-gray-600 mt-4">
                    Ghé thăm showroom để trải nghiệm trực tiếp sản phẩm và nhận
                    tư vấn từ đội ngũ chuyên nghiệp của chúng tôi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Link */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-4">
            Câu hỏi thường gặp
          </h2>
          <p className="text-gray-600 mb-8">
            Có thể câu trả lời bạn cần đã có sẵn trong mục Câu hỏi thường gặp
          </p>
          <a
            href="/faq"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#D97706] border-2 border-[#D97706] hover:bg-[#D97706] hover:text-white px-8 py-3 rounded-full font-bold transition-all shadow-md"
          >
            Xem câu hỏi thường gặp
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
