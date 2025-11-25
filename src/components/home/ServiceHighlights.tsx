import React from "react";
import { Truck, RefreshCw, ShieldCheck, Headset } from "lucide-react";

const ServiceHighlights = () => {
  return (
    <div className="container mx-auto px-4 relative z-30 -mt-16 -mb-16">
      <div className="bg-[#FDF8F3] rounded-2xl shadow-lg py-8 px-4 md:px-12 flex flex-wrap justify-between items-center gap-6 md:gap-0 relative border border-gray-200">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 flex items-center justify-center text-gray-600">
            <Truck size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="font-bold text-[#D97706] text-lg">
              Giao hàng tận tâm
            </h4>
            <p className="text-sm text-gray-500 max-w-[200px]">
              Miễn phí, nhanh chóng, an toàn, hỗ trợ tận nơi.
            </p>
          </div>
        </div>

        <div className="hidden md:block w-px h-12 bg-gray-200"></div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 flex items-center justify-center text-gray-600">
            <RefreshCw size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="font-bold text-[#D97706] text-lg">Đổi trả 1 – 1</h4>
            <p className="text-sm text-gray-500 max-w-[200px]">
              Miễn phí, đổi mới dễ dàng, không lo rủi ro.
            </p>
          </div>
        </div>

        <div className="hidden md:block w-px h-12 bg-gray-200"></div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 flex items-center justify-center text-gray-600">
            <ShieldCheck size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="font-bold text-[#D97706] text-lg">
              Bảo hành chu đáo
            </h4>
            <p className="text-sm text-gray-500 max-w-[200px]">
              Sửa chữa miễn phí, nhanh chóng và đảm bảo dài lâu.
            </p>
          </div>
        </div>

        <div className="hidden md:block w-px h-12 bg-gray-200"></div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 flex items-center justify-center text-gray-600">
            <Headset size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="font-bold text-[#D97706] text-lg">Tư vấn decor</h4>
            <p className="text-sm text-gray-500 max-w-[200px]">
              Gợi ý cách bày trí tinh tế, hòa hợp cùng thiên nhiên.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHighlights;
