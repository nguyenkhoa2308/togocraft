import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
         <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Image */}
            <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                    <img 
                        src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=60" 
                        alt="Lifestyle" 
                        className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2">
                <p className="text-[#D97706] font-medium tracking-wide uppercase mb-2 text-sm">THỦ CÔNG SUDES CRAFT</p>
                <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-8">
                    Khách hàng nói về chúng tôi
                </h2>
                <p className="text-gray-500 mb-8 text-sm">Hơn +20.000 khách hàng đã sử dụng cảm nhận như thế nào về Sudes Home</p>

                <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-gray-100 relative">
                    <Quote size={40} className="text-[#D97706] opacity-20 absolute top-6 left-6" />
                    
                    <div className="flex items-center gap-4 mb-6">
                        <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" 
                            alt="Customer" 
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <div>
                            <h4 className="font-bold text-gray-800">Ngọc Vy</h4>
                            <p className="text-xs text-gray-500">Kế toán</p>
                        </div>
                    </div>
                    
                    <p className="text-gray-600 italic leading-relaxed relative z-10">
                        "Tôi thật sự ấn tượng với các sản phẩm của Sudes Craft. Từng đường đan trên giỏ và đèn đều tỉ mỉ, chắc tay, toát lên sự khéo léo của người thợ. Đặc biệt là mùi thơm tự nhiên của mây tre, mộc mạc mà dễ chịu, khiến tôi có cảm giác như mang cả làng nghề truyền thống về nhà mình."
                    </p>

                    {/* Dots */}
                    <div className="flex gap-2 mt-6 justify-center">
                        <div className="w-8 h-2 bg-[#D97706] rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default Testimonials;
