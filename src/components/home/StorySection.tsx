import React from "react";
import { ArrowRight } from "lucide-react";

const StorySection = () => {
  return (
    <section className="py-20 bg-[#f7f4ef]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 mx-[-10px] gap-8 items-center">
          {/* Left Large Image */}
          <div className="w-full flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg w-full h-full min-h-[400px]">
              <img
                src="/images/section_about_product_1.webp"
                alt="Sudes Craft Story"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full flex flex-col justify-center">
            <div className="mb-8">
              <div className="text-left">
                <p className="relative block w-auto text-[#D97706] font-semibold tracking-wide uppercase mb-2 text-xs md:text-sm pl-[14px] mb-1 before:content before:block before:w-[6px] before:h-[6px] before:bg-[#D97706] before:rounded-[20px] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2">
                  THỦ CÔNG SUDES CRAFT
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-4">
                Câu chuyện về Sudes Craft
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed font-[family-name:var(--font-plus-jakarta)] text-justify">
                Lấy cảm hứng từ chất liệu mây, tre, gỗ, raffia và cỏ biển, Sudes
                Craft tôn vinh vẻ đẹp mộc mạc qua bàn tay nghệ nhân Việt. Mỗi
                thiết kế là sự kết hợp giữa nghệ thuật truyền thống và thẩm mỹ
                hiện đại, mang đến cho bạn không gian sống ấm cúng, bền vững và
                đầy cảm xúc.
              </p>

              <button className="inline-flex items-center gap-2 bg-[#C59263] text-white hover:bg-[#B07D4E] px-8 py-3 rounded-full font-bold transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200 text-sm">
                Xem chi tiết
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Small Images Grid */}
            <div className="grid grid-cols-3 gap-4 mt-auto bg-[#f7f4ef] py-4 pl-4 rounded-lg relative left-[-150px] w-[calc(100%+150px)]">
              <div className="rounded-xl overflow-hidden shadow-md aspect-square">
                <img
                  src="/images/section_about_product_2.webp"
                  alt="Crafting Process 1"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md aspect-square">
                <img
                  src="/images/section_about_product_3.webp"
                  alt="Crafting Process 2"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md aspect-square">
                <img
                  src="/images/section_about_product_4.webp"
                  alt="Crafting Process 3"
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
