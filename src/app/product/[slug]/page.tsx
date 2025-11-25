import { TopBar, Header, NavigationBar, Footer } from "@/components/layout";
import {
  ProductSection,
  Breadcrumb,
  ProductTabs,
  ProductCarousel,
} from "@/components/product";
import { ProductDetail, Coupon, Review } from "@/types/product";
import { Product } from "@/components/ui/ProductCard";

// Mock data - sau này sẽ fetch từ API
const mockProduct: ProductDetail = {
  id: "1",
  slug: "tui-xach-co-kouna-dang-chu-u-theu-hoa-van",
  sku: "CF0070",
  name: "Túi Xách Cỏ Kouna Dáng Chữ U Thêu Hoa Văn",
  brand: "Bamboo pecker",
  status: "in_stock",

  price: 990000,
  oldPrice: 1400000,
  discount: "-29%",

  images: [
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=600&auto=format&fit=crop&q=80",
  ],

  specs: {
    size: "26×15 cm",
    weight: "200g",
    material: "Cỏ kouna",
    shape: "Chữ nhật",
  },

  shortDescription:
    "Mang đậm hơi thở tự nhiên và tinh thần thủ công truyền thống, chiếc túi được làm hoàn toàn từ cỏ Kouna tự nhiên kết hợp cùng họa tiết thêu tay tinh tế. M...",

  description: `
    <p>Mang đậm hơi thở tự nhiên và tinh thần thủ công truyền thống, chiếc túi được làm hoàn toàn từ cỏ Kouna tự nhiên kết hợp cùng họa tiết thêu tay tinh tế.</p>
    <p>Sản phẩm phù hợp cho những buổi dạo phố, đi biển hay làm quà tặng ý nghĩa.</p>
  `,

  variants: {
    type: "color",
    label: "Màu sắc",
    options: [
      {
        value: "#FFB6C1",
        name: "Hồng",
        inStock: true,
        image:
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80",
      },
      {
        value: "#FFD700",
        name: "Vàng",
        inStock: true,
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
      },
      {
        value: "#87CEEB",
        name: "Xanh dương",
        inStock: true,
        image:
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&auto=format&fit=crop&q=80",
      },
      {
        value: "#DDA0DD",
        name: "Tím nhạt",
        inStock: true,
        image:
          "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=600&auto=format&fit=crop&q=80",
      },
      { value: "#DC143C", name: "Đỏ", inStock: true },
      { value: "#FFFACD", name: "Vàng nhạt", inStock: false },
      { value: "#FFA07A", name: "Cam nhạt", inStock: true },
    ],
  },

  promotion: {
    name: "Ưu đãi 31/12",
    endDate: "31/12",
    dateRange: "10/10 - 31/12",
  },

  breadcrumbs: [{ name: "BST Nét Đan", href: "/collections/net-dan" }],

  rating: 5,
  reviewCount: 12,
};

const mockCoupons: Coupon[] = [
  {
    code: "CRAFT200",
    description: "Giảm 200k giá trị đơn hàng",
    expireDate: "12/12/2026",
  },
  {
    code: "CRAFT100",
    description: "Giảm 100k giá trị đơn hàng từ 500k",
    expireDate: "24/12/2026",
  },
  {
    code: "FREESHIP",
    description: "Miễn phí vận chuyển đơn từ 300k",
    expireDate: "31/12/2026",
  },
];

const mockViewedProducts: Product[] = [
  {
    id: 101,
    name: "Giỏ Lục Bình Đựng Đồ",
    price: "460.000đ",
    oldPrice: "600.000đ",
    discount: "-23%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/gio-luc-binh-dung-do-decor-trang-tri-nha-cua.jpg",
  },
  {
    id: 102,
    name: "Giỏ Mây Tre Tự Nhiên",
    price: "469.000đ",
    oldPrice: "879.000đ",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/gio-may-tre-tu-nhien-dung-do-decor.jpg",
  },
  {
    id: 103,
    name: "Giỏ đan tay Rosie",
    price: "670.000đ",
    oldPrice: "980.000đ",
    discount: "-32%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/gio-dan-tay-rosie-dung-do-decor.jpg",
  },
  {
    id: 104,
    name: "Giỏ mây đan Etsy",
    price: "345.000đ",
    oldPrice: "780.000đ",
    discount: "-56%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/504463e1-307f-4834-a623-288815c9cc2e.jpg?v=1760256190173",
  },
];

const mockCollectionProducts: Product[] = [
  {
    id: 201,
    name: "Gương Mây Tròn Thủ Công Chloe",
    price: "350.000đ",
    oldPrice: "400.000đ",
    discount: "-12%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/guong-may-tron-thu-cong-chloe.jpg",
  },
  {
    id: 202,
    name: "Bông Tai Gốm Nghệ Thuật O Sahara",
    price: "670.000đ",
    oldPrice: "800.000đ",
    discount: "-16%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/bong-tai-gom-nghe-thuat-o-sahara.jpg",
  },
  {
    id: 203,
    name: "Kẹp Tóc Tre Thủ Công Leah",
    price: "149.000đ",
    oldPrice: "200.000đ",
    discount: "-26%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/kep-toc-tre-thu-cong-leah.jpg",
  },
  {
    id: 204,
    name: "Kệ Tre Tối Giản Liburua",
    price: "450.000đ",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/ke-tre-toi-gian-liburua.jpg",
  },
];

const mockRelatedProducts: Product[] = [
  {
    id: 301,
    name: "Túi Xách Cỏ Kouna Dáng Chữ U Thêu Hoa Văn",
    price: "990.000đ",
    oldPrice: "1.400.000đ",
    discount: "-29%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/tui-xach-co-kouna-dang-chu-u-theu-hoa-van.jpg",
    colors: ["#FFB6C1", "#FFD700", "#87CEEB"],
  },
  {
    id: 302,
    name: "Túi Xách Cỏ Kouna Quai Mây",
    price: "1.250.000đ",
    oldPrice: "1.500.000đ",
    discount: "-17%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/tui-xach-co-kouna-quai-may.jpg",
  },
  {
    id: 303,
    name: "Túi Xách Cỏ Kouna Thêu Hoa Văn",
    price: "890.000đ",
    oldPrice: "1.450.000đ",
    discount: "-39%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/tui-xach-co-kouna-theu-hoa-van.jpg",
  },
  {
    id: 304,
    name: "Túi Xách Cỏ Kouna Dáng Chữ U - Thủ Công Tự Nhiên",
    price: "1.100.000đ",
    oldPrice: "1.200.000đ",
    discount: "-8%",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/608/033/products/tui-xach-co-kouna-dang-chu-u-thu-cong-tu-nhien.jpg",
  },
];

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Nguyễn Thị Mai",
    rating: 5,
    comment:
      "Túi rất đẹp, đúng như hình. Chất liệu tự nhiên, thân thiện môi trường. Giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng!",
    date: "15/11/2025",
    isVerifiedPurchase: true,
  },
  {
    id: "2",
    userName: "Trần Văn Hùng",
    rating: 4,
    comment:
      "Sản phẩm chất lượng tốt, họa tiết thêu tay rất tinh xảo. Chỉ tiếc là hơi nhỏ hơn mình tưởng tượng một chút.",
    date: "10/11/2025",
    isVerifiedPurchase: true,
  },
  {
    id: "3",
    userName: "Lê Thị Hương",
    rating: 5,
    comment:
      "Mua tặng mẹ, mẹ rất thích. Kiểu dáng thanh lịch, phù hợp với nhiều trang phục. Sẽ quay lại mua thêm!",
    date: "05/11/2025",
    isVerifiedPurchase: true,
  },
  {
    id: "4",
    userName: "Phạm Minh Tuấn",
    rating: 5,
    comment:
      "Lần đầu mua đồ thủ công online mà ưng ý quá. Túi nhẹ, bền, mang đi du lịch rất hợp.",
    date: "01/11/2025",
    isVerifiedPurchase: true,
  },
];

// Hàm lấy sản phẩm (mock)
async function getProduct(slug: string): Promise<ProductDetail | null> {
  // TODO: Fetch từ API thực tế
  // const res = await fetch(`/api/products/${slug}`);
  // return res.json();
  return mockProduct;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Không tìm thấy sản phẩm
          </h1>
          <p className="text-gray-600 mt-2">
            Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb items={product.breadcrumbs} currentPage={product.name} />

        {/* Product Section */}
        <ProductSection product={product} coupons={mockCoupons} />

        {/* Product Tabs (Description, Guide, Reviews) */}
        <ProductTabs
          product={product}
          reviews={mockReviews}
          hasPurchased={false}
        />

        {/* Carousels */}
        <div className="space-y-8 pb-20">
          <ProductCarousel
            title="Cùng bộ sưu tập"
            products={mockCollectionProducts}
          />
          <ProductCarousel
            title="Sản phẩm liên quan"
            products={mockRelatedProducts}
          />
          <ProductCarousel title="Bạn đã xem" products={mockViewedProducts} />
        </div>
      </div>
    </main>
  );
}
