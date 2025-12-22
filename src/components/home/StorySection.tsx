import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const StorySection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#f7f4ef]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left Large Image */}
          <div className="w-full order-2 lg:order-1">
            <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg aspect-[4/3] md:aspect-square lg:min-h-[450px]">
              <img
                src="/images/about/about-img.jpg"
                alt="Everest Light Story"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full flex flex-col justify-center order-1 lg:order-2">
            <div className="mb-6 md:mb-8">
              {/* Label */}
              <p className="relative text-[#D97706] font-semibold tracking-wide uppercase text-[10px] sm:text-xs md:text-sm pl-3 md:pl-4 mb-3 before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-[#D97706] before:rounded-full before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2">
                NHỰA LẤY SÁNG EVEREST LIGHT
              </p>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-3 md:mb-4">
                Câu chuyện về Everest Light
              </h2>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6 leading-relaxed font-[family-name:var(--font-plus-jakarta)]">
                Everest Light là đơn vị hàng đầu tại Việt Nam chuyên{" "}
                <strong>sản xuất – phân phối – thi công</strong> tấm nhựa lấy
                sáng thông minh, cam kết dùng{" "}
                <strong>100% hạt nhựa nhập khẩu Đức (Bayer/Sabic)</strong>, nói
                không với nhựa tái chế để đảm bảo{" "}
                <strong>độ bền trên 30 năm</strong>. Với{" "}
                <strong>dây chuyền công nghệ cao</strong>, chúng tôi đáp ứng mọi
                yêu cầu về kích thước, màu sắc, độ dày; đồng thời triển khai mô
                hình <strong>"từ nhà máy đến công trình"</strong> giúp khách
                hàng nhận chất lượng chuẩn Châu Âu với{" "}
                <strong>giá cạnh tranh</strong>.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#C59263] text-white hover:bg-[#B07D4E] px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200 text-xs md:text-sm"
              >
                Xem chi tiết
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Small Images Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-auto lg:relative lg:left-[-100px] xl:left-[-150px] lg:w-[calc(100%+100px)] xl:w-[calc(100%+150px)]">
              <div className="rounded-lg md:rounded-xl overflow-hidden shadow-md aspect-square">
                <img
                  src="/images/banners/tam-lop-dac.jpg"
                  alt="Tấm lợp đặc"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-lg md:rounded-xl overflow-hidden shadow-md aspect-square">
                <img
                  src="/images/banners/tam-lop-song.jpg"
                  alt="Tấm lợp sóng"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-lg md:rounded-xl overflow-hidden shadow-md aspect-square">
                <img
                  src="/images/banners/tam-lop-rong.jpg"
                  alt="Tấm lợp rỗng"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
