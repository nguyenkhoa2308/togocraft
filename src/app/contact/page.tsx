"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Send, Globe } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/ui";

const contactInfo = {
  phone: "0976.110.266",
  email: "nhualaysangeverestlight@gmail.com",
  address: "Ngọc Trục, Đại Mỗ, Nam Từ Liêm, Hà Nội",
  zalo: "https://zalo.me/0976110266",
  messenger: "https://m.me/tamnhualaysangpoly",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ lại sớm nhất!");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <PageHero title="Liên hệ" breadcrumbs={[{ label: "Liên hệ" }]} />

      {/* Contact Info Bar - Overlapping */}
      <section className="relative z-20 -mt-16 px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col 2xl:flex-row lg:items-center lg:justify-between gap-6">
              {/* Brand Name */}
              <div className="text-center 2xl:text-left">
                <p className="text-gray-600">Liên hệ với chúng tôi,</p>
                <p className="text-[17px] lg:text-xl font-bold bg-gradient-to-r from-[#996515] to-[#D4AF37] bg-clip-text text-transparent">
                  Everest Light - Tấm Nhựa Lấy Sáng
                </p>
              </div>

              {/* Contact Items */}
              <div className="flex flex-wrap justify-start sm:justify-center lg:justify-end gap-6 lg:gap-8">
                {/* Hotline */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-[#3b2410] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#3b2410]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hotline</p>
                    <p className="font-bold text-gray-800">0976.110.266</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-[#3b2410] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#3b2410]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-bold text-gray-800">
                      nhualaysangeverestlight@gmail.com
                    </p>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-[#3b2410] flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#3b2410]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="font-bold text-gray-800">
                      nhualaysangeverestlight.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact Info & Social */}
            <div>
              <p className="text-[#D97706] font-semibold tracking-wide uppercase mb-2">
                THÔNG TIN LIÊN HỆ
              </p>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-6">
                Liên hệ với chúng tôi
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Mọi thông tin đặt hàng, tư vấn báo giá hoặc hợp tác kinh doanh,
                vui lòng liên hệ với chúng tôi qua các kênh dưới đây:
              </p>

              {/* Contact Methods */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#D97706] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hotline tư vấn</p>
                    <Link
                      href={`tel:${contactInfo.phone.replace(/\./g, "")}`}
                      className="font-bold text-[#4A3B32] hover:text-[#D97706] transition-colors"
                    >
                      {contactInfo.phone}
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#D97706] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <Link
                      href={`mailto:${contactInfo.email}`}
                      className="font-bold text-[#4A3B32] hover:text-[#D97706] transition-colors break-all"
                    >
                      {contactInfo.email}
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#D97706] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="font-bold text-[#4A3B32]">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={contactInfo.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0068FF] hover:bg-[#0054CC] text-white px-5 py-3 rounded-full font-semibold transition-colors"
                >
                  <Image
                    src="/icons/zalo_icon.svg"
                    alt="Zalo"
                    width={20}
                    height={20}
                  />
                  Chat Zalo
                </Link>
                <Link
                  href={contactInfo.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00B2FF] to-[#006AFF] hover:opacity-90 text-white px-5 py-3 rounded-full font-semibold transition-colors"
                >
                  <Image
                    src="/icons/messenger_icon.svg"
                    alt="Messenger"
                    width={20}
                    height={20}
                  />
                  Messenger
                </Link>
                <Link
                  href="https://www.facebook.com/tamnhualaysangpoly/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white px-5 py-3 rounded-full font-semibold transition-colors"
                >
                  <Image
                    src="/icons/facebook_icon.svg"
                    alt="Facebook"
                    width={20}
                    height={20}
                  />
                  Facebook
                </Link>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#4A3B32] mb-2">
                Gửi yêu cầu tư vấn
              </h2>
              <p className="text-gray-600 mb-6">
                Để lại thông tin, chúng tôi sẽ liên hệ tư vấn và báo giá trong
                thời gian sớm nhất.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập họ và tên"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all text-gray-800 placeholder:text-gray-400 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all text-gray-800 placeholder:text-gray-400 bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Nhập email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all text-gray-800 placeholder:text-gray-400 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mục đích liên hệ
                    </label>
                    <div className="relative">
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        title="Chọn mục đích liên hệ"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all text-gray-800 bg-white appearance-none cursor-pointer"
                      >
                        <option value="">Chọn mục đích</option>
                        <option value="bao-gia">Báo giá sản phẩm</option>
                        <option value="tu-van">Tư vấn kỹ thuật</option>
                        <option value="dai-ly">Hợp tác đại lý</option>
                        <option value="khac">Khác</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Nhập nội dung yêu cầu (loại sản phẩm, số lượng, địa chỉ giao hàng...)"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all resize-none text-gray-800 placeholder:text-gray-400 bg-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D97706] hover:bg-[#C77A06] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                  Gửi yêu cầu tư vấn
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-[#D97706] font-semibold tracking-wide uppercase mb-2">
              BẢN ĐỒ
            </p>
            <h2 className="text-3xl font-[family-name:var(--font-pacifico)] text-[#4A3B32]">
              Vị trí của chúng tôi
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1343.5808081052633!2d105.7682310972573!3d20.98611531548671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDU5JzEwLjEiTiAxMDXCsDQ2JzA1LjYiRQ!5e1!3m2!1sen!2s!4v1764660022570!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Everest Light Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
