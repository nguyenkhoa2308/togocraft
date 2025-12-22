import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Layers,
  Headphones,
  FileCheck,
  BadgeDollarSign,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { PageHero } from "@/components/ui";

const contactInfo = {
  phone: "0976.110.266",
  email: "nhualaysangeverestlight@gmail.com",
  address: "Ngọc Trục, Đại Mỗ, Nam Từ Liêm, Hà Nội",
  zalo: "https://zalo.me/0976110266",
};

// Differentiators data
const differentiators = [
  {
    icon: ShieldCheck,
    title: "Chuẩn Châu Âu",
    description:
      "Sản phẩm đạt chuẩn EU - chống tia UV, chịu lực và bền màu vượt trội.",
    color: "#D97706",
  },
  {
    icon: Layers,
    title: "Đa dạng sản phẩm",
    description:
      "Đa dạng mẫu mã, độ dày, kích thước, đáp ứng mọi loại công trình.",
    color: "#C59263",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ tư vấn & kỹ thuật viên tận tâm, hỗ trợ mọi lúc.",
    color: "#8B4513",
  },
  {
    icon: FileCheck,
    title: "Bảo hành rõ ràng",
    description: "Chính sách bảo hành minh bạch, giao hàng nhanh toàn quốc.",
    color: "#A0522D",
  },
  {
    icon: BadgeDollarSign,
    title: "Giá cạnh tranh",
    description: "Giá thành hợp lý, dịch vụ hậu mãi chu đáo.",
    color: "#2E7D32",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <PageHero
        title="Về Everest Light"
        subtitle="Bền vững cùng ánh sáng tự nhiên - Giải pháp lấy sáng hiện đại cho mọi công trình"
        breadcrumbs={[{ label: "Về chúng tôi" }]}
      />

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <p className="text-[#D97706] font-semibold tracking-wide uppercase mb-2">
                GIỚI THIỆU
              </p>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-6">
                Everest Light
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-[#4A3B32]">Everest Light</strong> –
                  thương hiệu hàng đầu trong lĩnh vực tấm nhựa lấy sáng
                  Polycarbonate cao cấp tại Việt Nam, chuyên cung cấp giải pháp
                  chiếu sáng tự nhiên cho mọi loại công trình: từ dân dụng đến
                  công nghiệp.
                </p>
                <p>
                  Chúng tôi cung ứng đa dạng sản phẩm gồm tấm Polycarbonate dạng
                  đặc, dạng rỗng và dạng sóng, cùng hệ phụ kiện lắp đặt đồng bộ,
                  giúp khách hàng dễ dàng thi công và tối ưu độ bền cho công
                  trình.
                </p>
                <p>
                  Tất cả sản phẩm Everest Light đều được sản xuất trên dây
                  chuyền công nghệ ép đùn tiên tiến, tuân thủ tiêu chuẩn Châu Âu
                  (EU), đảm bảo chất lượng vượt trội:{" "}
                  <span className="text-[#D97706] font-medium">
                    chống tia UV, chịu va đập gấp 200 lần kính
                  </span>
                  , truyền sáng tự nhiên và bền bỉ với thời gian.
                </p>
                <p>
                  Nhờ quy trình kiểm định nghiêm ngặt, sản phẩm của chúng tôi
                  không chỉ đẹp về hình thức mà còn tối ưu hiệu suất sử dụng và
                  độ an toàn cho người dùng.
                </p>
                <p>
                  Sau nhiều năm hoạt động và phát triển, Everest Light đã trở
                  thành đối tác tin cậy của hàng trăm đại lý, nhà thầu và khách
                  hàng cá nhân trên toàn quốc.
                </p>
                <p className="italic text-[#4A3B32] border-l-4 border-[#D97706] pl-4 mt-6">
                  &quot;Với triết lý{" "}
                  <strong>Bền vững cùng ánh sáng tự nhiên</strong>, chúng tôi
                  luôn đặt uy tín và chất lượng lên hàng đầu, mang đến những sản
                  phẩm thực sự khác biệt và lâu dài cho công trình Việt.&quot;
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/about-img.jpg"
                  alt="Everest Light Factory"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#D97706] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">10+</div>
                <div className="text-sm opacity-90">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/vision.jpg"
                  alt="Tầm nhìn Everest Light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-[#D97706] font-semibold tracking-wide uppercase mb-2">
                TẦM NHÌN
              </p>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-6">
                Tầm nhìn của Everest Light
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Everest Light hướng tới trở thành{" "}
                  <strong className="text-[#4A3B32]">
                    thương hiệu tiên phong
                  </strong>{" "}
                  về giải pháp lấy sáng tự nhiên và vật liệu nhựa kỹ thuật cao
                  cấp tại Việt Nam.
                </p>
                <p>
                  Chúng tôi không chỉ cung cấp vật liệu, mà còn mang đến{" "}
                  <span className="text-[#D97706] font-medium">
                    giải pháp toàn diện
                  </span>{" "}
                  – từ lựa chọn sản phẩm, thiết kế đến lắp đặt, giúp khách hàng
                  tối ưu công năng, tiết kiệm chi phí và nâng tầm thẩm mỹ cho
                  công trình.
                </p>
                <p>
                  Tầm nhìn của chúng tôi là đưa tấm nhựa Polycarbonate Việt Nam
                  đạt chuẩn quốc tế, thay thế các vật liệu truyền thống, góp
                  phần tạo dựng những{" "}
                  <strong className="text-[#4A3B32]">
                    không gian xanh, bền vững và hiện đại
                  </strong>{" "}
                  hơn mỗi ngày.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#4A3B32] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[#D97706] font-semibold tracking-wide uppercase mb-2">
              TẠI SAO CHỌN CHÚNG TÔI
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-pacifico)] text-white mb-6">
              Tại sao khách hàng lựa chọn Everest Light?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Everest Light luôn đặt khách hàng làm trung tâm trong mọi hoạt
              động. Mỗi sản phẩm trước khi xuất xưởng đều được kiểm định kỹ
              lưỡng, đảm bảo chất lượng cao và tuổi thọ dài hạn.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Chúng tôi không chỉ bán vật liệu, mà{" "}
              <span className="text-[#D97706] font-medium">
                đồng hành cùng khách hàng
              </span>{" "}
              từ khâu tư vấn đến thi công, mang lại trải nghiệm chuyên nghiệp và
              đáng tin cậy nhất.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-[#D97706]">500+</div>
              <div className="text-gray-300">Nhà phân phối cả nước</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-[#D97706]">250+</div>
              <div className="text-gray-300">Đối tác kinh doanh</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-[#D97706]">100+</div>
              <div className="text-gray-300">Nhân viên hoạt động</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-[#D97706]">3+</div>
              <div className="text-gray-300">Nhà máy + nhà xưởng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#D97706] font-semibold tracking-wide uppercase mb-2">
              ĐIỂM KHÁC BIỆT
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32]">
              Điểm khác biệt của Everest Light
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="group flex gap-5 p-6 rounded-2xl bg-[#FDFBF7] hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className="w-14 h-14 min-w-[56px] rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: item.color }}
                  >
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#4A3B32] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banners/tam-lop-song.jpg"
            alt="Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#4A3B32]/85" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pacifico)] text-white mb-6">
              Bạn đã sẵn sàng hợp tác?
            </h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá
              tốt nhất cho công trình của bạn.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#D97706] text-white px-8 py-4 rounded-full font-bold hover:bg-[#C77A06] transition-colors shadow-lg"
              >
                Liên hệ tư vấn
              </Link>
              <Link
                href="/categories/all"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors"
              >
                Xem sản phẩm
              </Link>
            </div>

            {/* Contact info */}
            <div className="mt-12 pt-10 border-t border-white/20 flex flex-wrap justify-center gap-8 text-white/70">
              <Link
                href={`tel:${contactInfo.phone.replace(/\./g, "")}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="text-[#D97706]" size={18} />
                <span>Hotline: {contactInfo.phone}</span>
              </Link>
              <Link
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="text-[#D97706]" size={18} />
                <span>{contactInfo.email}</span>
              </Link>
              <div className="flex items-center gap-2">
                <MapPin className="text-[#D97706]" size={18} />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
