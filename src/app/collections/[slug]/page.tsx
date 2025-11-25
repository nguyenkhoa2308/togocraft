"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Home,
  Calendar,
  Package,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Leaf,
  Award,
} from "lucide-react";
import { ProductCard, PageHero, QuickViewDialog } from "@/components/ui";
import { Product } from "@/components/ui/ProductCard";

// Mock collections data
const collectionsData = [
  {
    id: 1,
    slug: "spring-2024",
    name: "BST Mùa Xuân 2024",
    tagline: "Sức sống mới, khởi đầu tươi sáng",
    description: "Bộ sưu tập lấy cảm hứng từ sắc xuân tươi mới, mang đến không gian sống tràn đầy năng lượng.",
    content: `
      <p>Bộ sưu tập Mùa Xuân 2024 của Sudes Craft là sự kết hợp hoàn hảo giữa nét đẹp truyền thống và xu hướng thiết kế hiện đại. Lấy cảm hứng từ thiên nhiên đang hồi sinh, từng sản phẩm trong bộ sưu tập đều mang trong mình nguồn năng lượng tích cực và sự tươi mới.</p>

      <h2>Ý tưởng thiết kế</h2>
      <p>Chúng tôi bắt đầu hành trình sáng tạo bộ sưu tập này từ những chuyến đi về các làng nghề mây tre truyền thống vào đầu xuân. Cảm giác ấm áp của nắng xuân, sắc xanh non của lá non, và không khí rộn ràng của mùa lễ hội đã truyền cảm hứng cho toàn bộ thiết kế.</p>
      <p>Mỗi sản phẩm được thiết kế với đường nét nhẹ nhàng, tươi sáng, sử dụng những tông màu pastel dịu mắt như hồng phấn, xanh mint, vàng nhạt - những màu sắc đặc trưng của mùa xuân.</p>

      <h2>Nguyên liệu đặc biệt</h2>
      <p>Bộ sưu tập Mùa Xuân 2024 sử dụng nguyên liệu mây tre được thu hoạch vào đầu mùa xuân, khi sợi mây có độ dẻo dai và màu sắc đẹp nhất. Chúng tôi cũng lần đầu tiên áp dụng kỹ thuật nhuộm màu tự nhiên từ cánh hoa và lá cây, tạo nên những tông màu độc đáo và thân thiện với môi trường.</p>

      <h2>Điểm nhấn của bộ sưu tập</h2>
      <p><strong>Họa tiết hoa xuân:</strong> Những hoa văn lấy cảm hứng từ hoa đào, hoa mai, hoa lan được đan tinh xảo vào từng sản phẩm.</p>
      <p><strong>Màu sắc tươi sáng:</strong> Bảng màu pastel nhẹ nhàng, tạo cảm giác thư thái và tích cực cho không gian sống.</p>
      <p><strong>Thiết kế đa năng:</strong> Mỗi sản phẩm đều được thiết kế để phù hợp với nhiều phong cách nội thất khác nhau.</p>

      <h2>Câu chuyện nghệ nhân</h2>
      <p>Bộ sưu tập này là tâm huyết của 15 nghệ nhân đến từ làng nghề Phú Vinh, Hà Nội. Chị Nguyễn Thị Mai, người dẫn đầu dự án, chia sẻ: "Mỗi sản phẩm trong bộ sưu tập này không chỉ là đồ vật, mà là cách chúng tôi kể câu chuyện về mùa xuân của quê hương."</p>
      <p>Quá trình hoàn thiện mỗi sản phẩm mất từ 3-7 ngày, với hàng nghìn lượt đan tinh tế. Nghệ nhân phải có kinh nghiệm ít nhất 10 năm mới có thể tạo ra những họa tiết phức tạp trong bộ sưu tập.</p>

      <h2>Ứng dụng trong không gian sống</h2>
      <p>Bộ sưu tập Mùa Xuân 2024 hoàn hảo cho những ai muốn làm mới không gian sống vào đầu năm. Các sản phẩm có thể kết hợp với nhau hoặc sử dụng độc lập, phù hợp cho phòng khách, phòng ngủ, hay góc làm việc tại nhà.</p>
    `,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&auto=format&fit=crop&q=80",
    category: "Bộ sưu tập theo mùa",
    categorySlug: "seasonal",
    launchDate: "2024-03-01",
    productCount: 24,
    highlights: [
      "Họa tiết hoa xuân độc quyền",
      "Màu sắc pastel nhẹ nhàng",
      "Kỹ thuật nhuộm tự nhiên",
      "15 nghệ nhân tham gia",
    ],
    products: [
      {
        id: 1,
        name: "Giỏ hoa xuân oval",
        price: "520.000đ",
        oldPrice: "650.000đ",
        discount: "-20%",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=400&auto=format&fit=crop&q=60",
        colors: ["#FFB6C1", "#FFE4E1"],
      },
      {
        id: 2,
        name: "Đèn mây tre hoa mai",
        price: "890.000đ",
        oldPrice: "",
        discount: "",
        image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&auto=format&fit=crop&q=60",
        colors: ["#FFFACD", "#F4A460"],
      },
      {
        id: 3,
        name: "Khay mây họa tiết hoa đào",
        price: "380.000đ",
        oldPrice: "480.000đ",
        discount: "-21%",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=60",
        colors: ["#FFB6C1"],
      },
      {
        id: 4,
        name: "Gương trang trí mây tre",
        price: "720.000đ",
        oldPrice: "",
        discount: "",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&auto=format&fit=crop&q=60",
        colors: ["#F5DEB3", "#DEB887"],
      },
      {
        id: 5,
        name: "Chậu cây mây tre pastel",
        price: "450.000đ",
        oldPrice: "580.000đ",
        discount: "-22%",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop&q=60",
        colors: ["#98FB98", "#F0E68C"],
      },
      {
        id: 6,
        name: "Túi xách mây tre xuân",
        price: "680.000đ",
        oldPrice: "",
        discount: "",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=60",
        colors: ["#FFE4E1", "#F4A460"],
      },
    ],
  },
  {
    id: 2,
    slug: "tet",
    name: "BST Tết Nguyên Đán",
    tagline: "Đón Tết sum vầy, gìn giữ truyền thống",
    description: "Những sản phẩm mang đậm nét truyền thống, hoàn hảo cho mùa Tết sum vầy.",
    content: `
      <p>Bộ sưu tập Tết Nguyên Đán được Sudes Craft chuẩn bị công phu, mang đến những sản phẩm thủ công tinh xảo đậm chất truyền thống Việt Nam. Đây là món quà tinh thần chúng tôi muốn gửi gắm đến mọi gia đình trong dịp Tết cổ truyền.</p>

      <h2>Ý nghĩa và biểu tượng</h2>
      <p>Mỗi sản phẩm trong bộ sưu tập đều mang một ý nghĩa tốt lành cho năm mới. Từ màu đỏ tượng trưng cho may mắn, vàng kim biểu thị sự sung túc, đến các họa tiết rồng phượng, hoa mai, hoa đào - tất cả đều được đan vào từng chi tiết một cách tinh tế.</p>

      <h2>Sản phẩm đặc trưng</h2>
      <p><strong>Khay bánh kẹo mây tre:</strong> Sản phẩm không thể thiếu trong mâm quả ngày Tết, với họa tiết chữ Phúc, Lộc, Thọ được đan thủ công.</p>
      <p><strong>Đèn lồng mây tre:</strong> Tạo không khí ấm cúng, lung linh cho ngôi nhà trong những ngày Tết.</p>
      <p><strong>Giỏ quà Tết:</strong> Được thiết kế đặc biệt để đựng quà biếu, vừa đẹp mắt vừa thân thiện môi trường.</p>

      <h2>Quy trình sản xuất đặc biệt</h2>
      <p>Để chuẩn bị cho bộ sưu tập Tết, nghệ nhân bắt đầu từ tháng 10 âm lịch. Nguyên liệu được chọn lọc kỹ càng, qua nhiều công đoạn xử lý để đảm bảo độ bền và màu sắc đẹp nhất.</p>
      <p>Đặc biệt, các sản phẩm màu đỏ và vàng trong bộ sưu tập được nhuộm từ hoa cúc đỏ và nghệ, đảm bảo an toàn và thân thiện môi trường.</p>

      <h2>Câu chuyện từ làng nghề</h2>
      <p>Cụ Nguyễn Văn Tám, 78 tuổi, nghệ nhân có 60 năm gắn bó với nghề đan mây, chia sẻ: "Ngày xưa, mỗi dịp Tết đến, cả làng quây quần làm những sản phẩm đẹp nhất để bán cho người dân. Đó là niềm vui và cũng là cách chúng tôi giữ gìn truyền thống."</p>

      <h2>Ý nghĩa quà tặng</h2>
      <p>Trong văn hóa Việt, việc tặng quà vào dịp Tết không chỉ là biểu hiện của tình cảm mà còn là cách chúc phúc cho năm mới. Các sản phẩm trong bộ sưu tập này là lựa chọn hoàn hảo để gửi gắm những lời chúc tốt đẹp nhất.</p>
    `,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=80",
    category: "Bộ sưu tập dịp lễ",
    categorySlug: "holiday",
    launchDate: "2024-01-15",
    productCount: 18,
    highlights: [
      "Họa tiết Phúc Lộc Thọ",
      "Màu đỏ vàng truyền thống",
      "Nhuộm từ nguyên liệu tự nhiên",
      "Phù hợp làm quà biếu",
    ],
    products: [
      {
        id: 1,
        name: "Khay bánh kẹo chữ Phúc",
        price: "420.000đ",
        oldPrice: "520.000đ",
        discount: "-19%",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=60",
        colors: ["#DC143C", "#FFD700"],
      },
      {
        id: 2,
        name: "Đèn lồng mây tre đỏ",
        price: "680.000đ",
        oldPrice: "",
        discount: "",
        image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&auto=format&fit=crop&q=60",
        colors: ["#DC143C"],
      },
      {
        id: 3,
        name: "Giỏ quà Tết cao cấp",
        price: "550.000đ",
        oldPrice: "680.000đ",
        discount: "-19%",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=400&auto=format&fit=crop&q=60",
        colors: ["#DC143C", "#F4A460"],
      },
      {
        id: 4,
        name: "Hộp đựng lì xì mây tre",
        price: "280.000đ",
        oldPrice: "",
        discount: "",
        image: "https://images.unsplash.com/photo-1615719413546-198b25453f85?w=400&auto=format&fit=crop&q=60",
        colors: ["#FFD700"],
      },
      {
        id: 5,
        name: "Khay mứt Tết 3 ngăn",
        price: "520.000đ",
        oldPrice: "650.000đ",
        discount: "-20%",
        image: "https://images.unsplash.com/photo-1601206994051-59d5fc18c5bb?w=400&auto=format&fit=crop&q=60",
        colors: ["#DC143C", "#FFD700"],
      },
      {
        id: 6,
        name: "Giỏ hoa mai mây tre",
        price: "380.000đ",
        oldPrice: "",
        discount: "",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=60",
        colors: ["#FFFACD", "#F4A460"],
      },
    ],
  },
  {
    id: 3,
    slug: "eco-friendly",
    name: "BST Thân Thiện Môi Trường",
    tagline: "Sống xanh, yêu thiên nhiên",
    description: "Bộ sưu tập sản phẩm 100% từ nguyên liệu tự nhiên, bền vững với môi trường.",
    content: `
      <p>Bộ sưu tập Thân Thiện Môi Trường là cam kết của Sudes Craft trong việc bảo vệ hành tinh xanh. Mỗi sản phẩm không chỉ đẹp mắt mà còn góp phần giảm thiểu rác thải nhựa và tác động tiêu cực đến môi trường.</p>

      <h2>Triết lý thiết kế</h2>
      <p>Chúng tôi tin rằng sống xanh không có nghĩa là phải hy sinh sự tiện lợi hay thẩm mỹ. Bộ sưu tập này chứng minh rằng các sản phẩm thân thiện môi trường có thể vừa đẹp, vừa bền, vừa hiện đại.</p>

      <h2>100% nguyên liệu tự nhiên</h2>
      <p><strong>Mây tre:</strong> Là loại cây tái sinh nhanh, không cần thuốc trừ sâu, hấp thụ CO2 tốt.</p>
      <p><strong>Cói:</strong> Phát triển tự nhiên ở vùng đầm lầy, giúp làm sạch nước và tạo môi trường sống cho sinh vật.</p>
      <p><strong>Lục bình:</strong> Biến cây xâm lấn thành sản phẩm có giá trị, góp phần bảo vệ môi trường nước.</p>

      <h2>Quy trình sản xuất bền vững</h2>
      <p>Toàn bộ quy trình từ thu hoạch, xử lý đến hoàn thiện sản phẩm đều tuân thủ các tiêu chuẩn môi trường nghiêm ngặt. Chúng tôi không sử dụng hóa chất độc hại, nước thải được xử lý trước khi thải ra môi trường.</p>

      <h2>Phân hủy sinh học</h2>
      <p>Sau khi kết thúc vòng đời sử dụng, các sản phẩm trong bộ sưu tập có thể phân hủy hoàn toàn trong vòng 6-12 tháng, trở thành phân bón cho đất. Không để lại rác thải khó phân hủy như nhựa.</p>

      <h2>Đóng góp xã hội</h2>
      <p>Mỗi sản phẩm bạn mua từ bộ sưu tập này, chúng tôi sẽ trồng 1 cây xanh tại các vùng núi phía Bắc. Đến nay, chúng tôi đã trồng được hơn 5.000 cây.</p>

      <h2>Lời kêu gọi</h2>
      <p>Hãy cùng Sudes Craft lan tỏa thông điệp sống xanh. Mỗi lựa chọn nhỏ của bạn hôm nay sẽ tạo nên sự khác biệt lớn cho thế hệ mai sau.</p>
    `,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&auto=format&fit=crop&q=80",
    category: "Bộ sưu tập đặc biệt",
    categorySlug: "special",
    launchDate: "2024-06-05",
    productCount: 28,
    highlights: [
      "100% nguyên liệu tự nhiên",
      "Phân hủy sinh học",
      "Không chất độc hại",
      "Trồng cây cho mỗi đơn hàng",
    ],
    products: [
      {
        id: 1,
        name: "Túi xách cói tự nhiên",
        price: "320.000đ",
        oldPrice: "",
        discount: "",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=60",
        colors: ["#F5DEB3"],
      },
      {
        id: 2,
        name: "Giỏ lục bình đa năng",
        price: "280.000đ",
        oldPrice: "350.000đ",
        discount: "-20%",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=400&auto=format&fit=crop&q=60",
        colors: ["#8B4513"],
      },
      {
        id: 3,
        name: "Khay tre organic",
        price: "220.000đ",
        oldPrice: "",
        discount: "",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=60",
        colors: ["#D2B48C"],
      },
      {
        id: 4,
        name: "Đèn mây tre zero waste",
        price: "580.000đ",
        oldPrice: "720.000đ",
        discount: "-19%",
        image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&auto=format&fit=crop&q=60",
        colors: ["#F4A460"],
      },
      {
        id: 5,
        name: "Chậu cây tái chế",
        price: "180.000đ",
        oldPrice: "",
        discount: "",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop&q=60",
        colors: ["#8B4513", "#A0522D"],
      },
      {
        id: 6,
        name: "Kệ treo tường tre",
        price: "450.000đ",
        oldPrice: "550.000đ",
        discount: "-18%",
        image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=400&auto=format&fit=crop&q=60",
        colors: ["#D2B48C"],
      },
    ],
  },
];

// Get related collections (same category, exclude current)
const getRelatedCollections = (currentSlug: string, category: string) => {
  const sameCategory = collectionsData.filter(
    (col) => col.slug !== currentSlug && col.categorySlug === category
  );

  if (sameCategory.length >= 2) {
    return sameCategory.slice(0, 2);
  }

  const otherCollections = collectionsData.filter(
    (col) => col.slug !== currentSlug && col.categorySlug !== category
  );

  return [...sameCategory, ...otherCollections].slice(0, 2);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const CollectionDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const collection = collectionsData.find((c) => c.slug === slug);

  if (!collection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-6">Bộ sưu tập không tồn tại</p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 bg-[#C59263] text-white px-6 py-3 rounded-lg hover:bg-[#A67B5B] transition-colors"
          >
            <ChevronLeft size={18} />
            Quay lại bộ sưu tập
          </Link>
        </div>
      </div>
    );
  }

  const relatedCollections = getRelatedCollections(slug, collection.categorySlug);

  return (
    <>
      <div className="min-h-screen bg-white pb-20">
        {/* Hero Banner with Breadcrumb */}
        <PageHero
          title={collection.name}
          subtitle={collection.tagline}
          backgroundImage={collection.image}
          breadcrumbs={[
            { label: 'Bộ sưu tập', href: '/collections' },
            { label: collection.name }
          ]}
        />

        <div className="bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Script Title */}
              <h2 className="collection-title-script mb-6">
                {collection.tagline}
              </h2>

              {/* Introduction Text */}
              <div className="max-w-3xl mx-auto mb-12">
                <p className="text-lg md:text-xl leading-relaxed text-gray-600 text-center">
                  {collection.description}
                </p>
              </div>

              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-[450px] md:h-[600px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">

            {/* Content Sections */}
            <div className="space-y-20 md:space-y-24 mb-24">
              {/* Section 1 */}
              <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                    Nghệ thuật thủ công – Từ chất liệu đến cảm xúc
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    <p className="text-base md:text-lg leading-relaxed">
                      Từ chiếc mặt dây chuyền gốm với nét vẽ mềm mại, lược gỗ mang hương gỗ tự nhiên,
                      đến bông tai gốm mang hình thù công phu... mỗi sản phẩm đều được chế tác tỉ mỉ bằng tay.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      Không chỉ là phụ kiện làm đẹp, từng món đồ còn mang trong mình tinh thần của sự mộc mạc,
                      gần gũi — một món quà câu chuyện riêng, thay lời muốn nói.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80"
                    alt="Crafting process"
                    className="w-full h-[350px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Section 2 */}
              <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&auto=format&fit=crop&q=80"
                    alt="Natural materials"
                    className="w-full h-[350px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="order-1 md:order-2 space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                    Chất liệu tự nhiên – Tinh thần bền vững
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    <p className="text-base md:text-lg leading-relaxed">
                      Sản phẩm được làm từ tre, gỗ, gốm thủ công – những chất liệu thân thiện với môi
                      trường. Mỗi bề mặt được xử lý cẩn thận để giữ nguyên vẻ đẹp, an toàn khi
                      sử dụng và có tuổi thọ lâu dài.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      Chính sự mộc mạc ấy lại tạo nên nét đẹp riêng: nhẹ nhàng, không phô trương nhưng
                      đủ để trở thành điểm nhấn tinh tế.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 - Full Width with Background */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                    Món quà mang giá trị tinh thần
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-gray-600">
                    Không đơn thuần là những món phụ kiện, mà là cách bạn
                    gửi gắm một câu chuyện riêng. Phù hợp để dành tặng bạn bè, người thân hoặc chính bản thân –
                    như một lời nhắc nhở về giá trị văn hóa, sự trân trọng thiên nhiên giữa cuộc sống hiện đại.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Section (optional) */}
            {collection.slug === "spring-2024" && (
              <div className="mb-24">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                  <div>
                    <div className="rounded-2xl overflow-hidden shadow-xl aspect-video mb-4">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Video giới thiệu sản phẩm"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <p className="text-center text-sm text-gray-500 font-medium uppercase tracking-wider">
                      Đào sản phẩm mây tre dân thủ công
                    </p>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                      Tôn vinh thủ công Việt – Gìn giữ nét đẹp truyền thống
                    </h3>
                    <div className="space-y-4 text-gray-600">
                      <p className="text-base md:text-lg leading-relaxed">
                        Mỗi sản phẩm là kết quả của quá trình lao động tỉ mỉ từ những đôi tay khéo léo của
                        người thợ Việt. Từng đường vân, từng nét gốm đều là dấu ấn riêng — không sản phẩm nào hoàn toàn
                        giống nhau, vì mỗi món quà đều mang một câu chuyện riêng.
                      </p>
                      <p className="text-base md:text-lg leading-relaxed">
                        Sudes Craft tin rằng, món quà đẹp nhất không phải là món quà đắt nhất, mà là món
                        quà có linh hồn — và bộ sưu tập này giúp bạn thể hiện được điều ấy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products in Collection - Full width background */}
        <div className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="collection-section-title mb-12 md:mb-16">
                Sản phẩm trong bộ sưu tập
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {collection.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
          </div>
        </div>

        {/* Related Collections Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="collection-section-title mb-12 md:mb-16">
              Bộ sưu tập cùng loại
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {relatedCollections.length > 0 ? (
                relatedCollections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={col.image}
                        alt={col.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{col.name}</h3>
                        <p className="text-white/90 text-sm line-clamp-2">{col.description}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Package size={16} />
                          <span>{col.productCount} sản phẩm</span>
                        </div>
                        <span className="text-[#C59263] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Khám phá
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                collectionsData
                  .filter((col) => col.slug !== slug)
                  .slice(0, 2)
                  .map((col) => (
                    <Link
                      key={col.id}
                      href={`/collections/${col.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={col.image}
                          alt={col.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-2xl font-bold text-white mb-2">{col.name}</h3>
                          <p className="text-white/90 text-sm line-clamp-2">{col.description}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Package size={16} />
                            <span>{col.productCount} sản phẩm</span>
                          </div>
                          <span className="text-[#C59263] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Khám phá
                            <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
              )}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 bg-[#C59263] text-white px-8 py-3 rounded-full hover:bg-[#A67B5B] transition-colors font-medium"
              >
                Xem tất cả bộ sưu tập
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Dialog */}
      {quickViewProduct && (
        <QuickViewDialog
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
};

export default CollectionDetailPage;
