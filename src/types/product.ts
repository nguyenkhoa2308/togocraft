export interface Product {
  id: number;
  slug?: string; // Real slug from data
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  image: string;
  colors?: string[];
  bestSeller?: boolean; // Sản phẩm bán chạy - sắp xếp lên đầu
  sortOrder?: number; // Thứ tự sắp xếp (số nhỏ = ưu tiên cao)
}

// Chi tiết sản phẩm
export interface ProductDetail {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  status: 'in_stock' | 'out_of_stock' | 'pre_order';

  price: number;
  oldPrice?: number;
  discount?: string;

  images: string[];

  // Thông số kỹ thuật (tuỳ chọn)
  specs?: {
    size?: string;
    weight?: string;
    material?: string;
    shape?: string;
  };

  shortDescription?: string;
  description?: string;

  // Biến thể sản phẩm (tuỳ chọn - có thể là màu sắc, kích thước, hoặc loại)
  variants?: {
    type: 'color' | 'size' | 'type';
    label: string;
    options: {
      value: string;
      name: string;
      image?: string;
      inStock?: boolean;
    }[];
  };

  // Khuyến mãi
  promotion?: {
    name: string;
    endDate: string;
    dateRange: string;
  };

  // Breadcrumb
  breadcrumbs: {
    name: string;
    href: string;
  }[];

  rating?: number;
  reviewCount?: number;
}

// Mã giảm giá
export interface Coupon {
  code: string;
  description: string;
  expireDate: string;
}

// Đánh giá sản phẩm
export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  isVerifiedPurchase: boolean;
}
