import React from "react";
import { ArrowRight } from "lucide-react";

const TikTokSection = () => {
  return (
    <section className="py-16 bg-[#171717] text-white overflow-hidden relative before:content-[''] before:absolute before:w-[270px] before:h-[270px] before:rounded-full before:top-[-22%] before:left-[-5%] before:bg-[#25f4ee] before:blur-[150px] after:content-[''] after:absolute after:w-[320px] after:h-[320px] after:rounded-full after:bottom-[-11%] after:right-[-8%] after:bg-[#ee3f63] after:blur-[150px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/3">
            <p className="text-[#D97706] font-medium tracking-wide uppercase mb-2 text-sm">
              THỦ CÔNG SUDES CRAFT
            </p>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-pacifico)] mb-6 leading-tight">
              Đón nguồn cảm hứng mộc mạc cùng Sudes Craft trên TikTok
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed text-sm">
              Nơi mỗi khung hình kể về hành trình của những món đồ thủ công – từ
              sợi mây, tấm cói đến nét gốm mộc. Khám phá cách Sudes Craft mang
              hơi thở thiên nhiên vào cuộc sống thường ngày qua những góc decor
              tinh tế và phong cách sống giản dị mà đầy cảm xúc.
            </p>

            <button className="inline-flex items-center gap-2 bg-[#C59263] text-white hover:bg-[#B07D4E] px-8 py-3 rounded-full font-bold transition-colors shadow-lg">
              Theo dõi ngay
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Content - TikTok Feed Mockup */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-2xl">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  {/* TikTok Logo Mock */}
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-black font-bold text-lg">#</h3>
                  <p className="text-gray-500 text-sm">11 posts</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden relative group cursor-pointer"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${
                        item === 1
                          ? "1584917865442-de89df76afd3"
                          : item === 2
                          ? "1513519245088-0e12902e5a38"
                          : item === 3
                          ? "1616486338812-3dadae4b4f9d"
                          : "1590736969955-71cc94801759"
                      }?w=400&auto=format&fit=crop&q=60`}
                      alt="TikTok Post"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-bold drop-shadow-md">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3 h-3"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      {1000 + item * 500}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="bg-[#FE2C55] text-white px-6 py-2 rounded font-bold text-sm hover:bg-[#E02045] transition-colors w-full md:w-auto">
                  Open TikTok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TikTokSection;
