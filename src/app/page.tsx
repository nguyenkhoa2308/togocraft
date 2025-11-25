import {
  Hero,
  SaleSection,
  CouponSection,
  FeaturedProducts,
  NewCollection,
  CategoryShowcase,
  StorySection,
  Testimonials,
  TikTokSection,
  NewsSection,
} from "@/components/home";
import {
  gioKhayProducts,
  denMayProducts,
  decorProducts,
} from "@/lib/data/products";

export default function Home() {
  return (
    <div className="bg-white pb-20">
      <Hero />
      <SaleSection />
      <CouponSection />
      <FeaturedProducts />
      <NewCollection />

      <CategoryShowcase
        title="Giỏ & Khay Đan Tay"
        subtitle="THỦ CÔNG SUDES CRAFT"
        description="Từng sợi mây đan thủ công, lưu giữ vẻ tự nhiên và tiện dụng cho không gian sống."
        bannerImage="/images/section_pro_1_banner_1.webp"
        products={gioKhayProducts}
        categorySlug="trays"
      />

      <CategoryShowcase
        title="Đèn Mây Tre Trang Trí"
        subtitle="THỦ CÔNG SUDES CRAFT"
        description="Ánh sáng len qua sợi mây, mang hơi thở thiên nhiên và sự ấm áp đến từng góc nhỏ."
        bannerImage="/images/section_pro_2_banner_1.webp"
        products={denMayProducts}
        categorySlug="lamps"
        reverse={true}
      />

      <StorySection />

      <CategoryShowcase
        title="Đồ Decor Tự Nhiên"
        subtitle="THỦ CÔNG SUDES CRAFT"
        description="Mộc mạc, tinh tế và nghệ thuật – tôn vinh vẻ đẹp tự nhiên trong không gian sống."
        bannerImage="/images/section_pro_3_banner_1.webp"
        products={decorProducts}
        categorySlug="shelves"
        reverse={true}
      />

      <Testimonials />
      <TikTokSection />
      <NewsSection />
    </div>
  );
}
