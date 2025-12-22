import {
  Hero,
  CouponSection,
  FeaturedProducts,
  CategoryShowcase,
  StorySection,
  Testimonials,
  TikTokSection,
} from "@/components/home";
import {
  polycarbonateDocProducts,
  polycarbonateSongProducts,
  polycarbonateRongProducts,
  phuKienProducts,
} from "@/lib/data/polycarbonate-data";

export default function Home() {
  return (
    <div className="bg-white pb-20">
      <Hero />
      {/* <SaleSection /> */}
      <CouponSection />
      <FeaturedProducts />

      <CategoryShowcase
        title="Polycarbonate Đặc"
        subtitle="TẤM LỢP LẤY SÁNG EVEREST LIGHT"
        description="Trong suốt như kính, bền gấp 200 lần, chống UV tuyệt đối - Giải pháp lấy sáng hiện đại cho mọi công trình."
        bannerImage="/images/banners/tam-lop-dac.jpg"
        products={polycarbonateDocProducts}
        categorySlug="polycarbonate-dac"
      />

      <CategoryShowcase
        title="Polycarbonate Sóng"
        subtitle="TẤM LỢP LẤY SÁNG EVEREST LIGHT"
        description="Tấm lợp dạng sóng chống nóng, chống UV, độ bền cao - Lựa chọn hoàn hảo cho mái nhà xưởng, nhà kho."
        bannerImage="/images/banners/tam-lop-song.jpg"
        products={polycarbonateSongProducts}
        categorySlug="polycarbonate-song"
        reverse={true}
      />

      <StorySection />

      <CategoryShowcase
        title="Polycarbonate Rỗng"
        subtitle="TẤM LỢP LẤY SÁNG EVEREST LIGHT"
        description="Cấu trúc rỗng cách nhiệt tốt, nhẹ và dễ thi công - Phù hợp cho giếng trời, mái che sân vườn."
        bannerImage="/images/banners/tam-lop-rong.jpg"
        products={polycarbonateRongProducts}
        categorySlug="polycarbonate-rong"
      />

      <CategoryShowcase
        title="Phụ Kiện Lắp Đặt"
        subtitle="TẤM LỢP LẤY SÁNG EVEREST LIGHT"
        description="Đầy đủ phụ kiện chính hãng: nẹp, ốc vít, ron cao su - Đảm bảo thi công chuẩn kỹ thuật."
        bannerImage="/images/banners/phu-kien.jpg"
        products={phuKienProducts}
        categorySlug="phu-kien"
        reverse={true}
      />

      <TikTokSection />
      <Testimonials />
    </div>
  );
}
