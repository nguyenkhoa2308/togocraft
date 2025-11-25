import React from "react";
import { Heart, Users, Leaf, Award } from "lucide-react";
import { PageHero } from "@/components/ui";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <PageHero
        title="Về Sudes Craft"
        subtitle="Kết nối truyền thống và hiện đại, mang thiên nhiên vào không gian sống"
        backgroundImage="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&auto=format&fit=crop&q=80"
        height="h-[400px]"
      />

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#D97706] font-semibold tracking-wide uppercase mb-2">
                CÂU CHUYỆN CỦA CHÚNG TÔI
              </p>
              <h2 className="text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-6">
                Hành Trình Từ Làng Nghề
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6 leading-relaxed">
                Sudes Craft ra đời từ niềm đam mê gìn giữ và phát triển nghề thủ
                công truyền thống Việt Nam. Chúng tôi bắt đầu từ những làng nghề
                đan lát mây tre nổi tiếng ở miền Bắc Việt Nam, nơi nghề thủ công
                đã tồn tại và phát triển qua hàng trăm năm.
              </p>

              <p className="mb-6 leading-relaxed">
                Với sứ mệnh kết nối giữa truyền thống và hiện đại, chúng tôi
                không chỉ bảo tồn những kỹ thuật đan lát cổ truyền mà còn đổi
                mới thiết kế để phù hợp với không gian sống đương đại. Mỗi sản
                phẩm của Sudes Craft đều mang trong mình câu chuyện về con
                người, văn hóa và tình yêu với thiên nhiên.
              </p>

              <p className="leading-relaxed">
                Chúng tôi tự hào là cầu nối giữa nghệ nhân làng nghề và khách
                hàng trên toàn quốc, mang đến những sản phẩm thủ công chất lượng
                cao, thân thiện với môi trường và góp phần phát triển bền vững
                cho cộng đồng làng nghề.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#D97706] font-semibold tracking-wide uppercase mb-2">
              GIÁ TRỊ CỐT LÕI
            </p>
            <h2 className="text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32]">
              Điều Chúng Tôi Tin Tưởng
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-[#FDFBF7] hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#D97706] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#4A3B32] mb-3">
                Tâm Huyết
              </h3>
              <p className="text-gray-600">
                Mỗi sản phẩm được làm bằng tình yêu và sự tận tâm của nghệ nhân
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-[#FDFBF7] hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#C59263] rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#4A3B32] mb-3">
                Thân Thiện Môi Trường
              </h3>
              <p className="text-gray-600">
                Sử dụng nguyên liệu tự nhiên, quy trình sản xuất bền vững
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-[#FDFBF7] hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#4A3B32] mb-3">
                Cộng Đồng
              </h3>
              <p className="text-gray-600">
                Hỗ trợ và phát triển cùng các làng nghề truyền thống
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-[#FDFBF7] hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#A0522D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#4A3B32] mb-3">
                Chất Lượng
              </h3>
              <p className="text-gray-600">
                Cam kết chất lượng cao trong từng chi tiết nhỏ nhất
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-[#4A3B32] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10+</div>
              <div className="text-gray-300">Năm kinh nghiệm</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-gray-300">Sản phẩm</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-gray-300">Nghệ nhân</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-gray-300">Khách hàng hài lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#D97706] font-semibold tracking-wide uppercase mb-2">
              ĐỘI NGŨ CỦA CHÚNG TÔI
            </p>
            <h2 className="text-4xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-4">
              Những Người Tạo Nên Sudes Craft
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Đội ngũ nghệ nhân tài hoa và đầy nhiệt huyết, luôn nỗ lực mang đến
              những sản phẩm tốt nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60"
                  alt="Nguyễn Thị Hoa"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-[#4A3B32]">
                Nguyễn Thị Hoa
              </h3>
              <p className="text-[#D97706] font-medium mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                20 năm kinh nghiệm trong ngành thủ công mỹ nghệ
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60"
                  alt="Trần Văn Minh"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-[#4A3B32]">
                Trần Văn Minh
              </h3>
              <p className="text-[#D97706] font-medium mb-2">
                Giám đốc Sản xuất
              </p>
              <p className="text-gray-600 text-sm">
                Chuyên gia về kỹ thuật đan lát mây tre truyền thống
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60"
                  alt="Phạm Thu Hương"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-[#4A3B32]">
                Phạm Thu Hương
              </h3>
              <p className="text-[#D97706] font-medium mb-2">
                Trưởng phòng Thiết kế
              </p>
              <p className="text-gray-600 text-sm">
                Sáng tạo những thiết kế hiện đại kết hợp truyền thống
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
