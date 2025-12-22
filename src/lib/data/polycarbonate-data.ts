import { Product } from "@/types/product";
import productData from "@/data/polycarbonate_products.json";

// Types from JSON
export interface JsonCategory {
  slug: string;
  name: string;
}

export interface JsonProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  category_slug: string;
  price: number;
  price_formatted: string;
  unit: string;
  bestseller?: boolean;
  short_description: string;
  thumbnail: string;
  images: { url: string; alt: string; caption: string }[];
  specs: {
    thickness: string;
    product_line: string;
    sku: string;
    length: string;
    colors: { name: string }[];
    widths: string[];
  };
  content: {
    intro: string;
    sections: unknown[];
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

// Category icons mapping
const categoryIcons: Record<string, string> = {
  polycarbonate_dac: "/images/categories/polycarbonate-dac.jpg",
  polycarbonate_song: "/images/categories/polycarbonate-song.jpg",
  polycarbonate_rong: "/images/categories/polycarbonate-rong.jpg",
  phu_kien: "/images/categories/phu-kien.jpg",
};

// Best seller products config - add product slugs here to mark as best sellers
// Lower sortOrder = higher priority (appears first)
const bestSellerConfig: Record<string, number> = {
  // Polycarbonate đặc - popular thicknesses
  "tam-lay-sang-polycarbonate-dac-3mm": 1,
  "tam-lay-sang-polycarbonate-dac-5mm": 2,
  "tam-lay-sang-polycarbonate-dac-2mm": 3,
  "tam-lay-sang-polycarbonate-dac-4mm": 4,
  "tam-lay-sang-polycarbonate-dac-6mm": 5,
  // Polycarbonate sóng cao cấp
  "tam-lop-lay-sang-polycarbonate-dang-song-cao-cap-1-5mm": 6,
  "tam-lop-lay-sang-polycarbonate-dang-song-cao-cap-2mm": 7,
  "tam-lop-lay-sang-polycarbonate-dang-song-cao-cap-1-2mm": 8,
  // Polycarbonate sóng phổ thông
  "tam-lop-lay-sang-polycarbonate-dang-song-pho-thong-1-5mm": 9,
  "tam-lop-lay-sang-polycarbonate-dang-song-pho-thong-2mm": 10,
  // Polycarbonate rỗng cao cấp
  "tam-polycarbonate-rong-cao-cap-6mm": 11,
  "tam-polycarbonate-rong-cao-cap-8mm": 12,
  "tam-polycarbonate-rong-cao-cap-10mm": 13,
  // Polycarbonate rỗng phổ thông
  "tam-lop-lay-sang-polycarbonate-rong-pho-thong-8mm": 14,
  "tam-lop-lay-sang-polycarbonate-rong-pho-thong-10mm": 15,
  // Phụ kiện phổ biến
  "nep-chu-h-nhua": 16,
  "nep-u-bit-dau": 17,
  "nep-sap-mai-ton": 18,
};

// Category images for showcase
const categoryImages: Record<string, string> = {
  polycarbonate_dac: "/images/products/tam-polycarbonate-dac-ruot-2-mau.jpg",
  polycarbonate_song: "/images/products/tam-lop-polycarbonate-song.jpg",
  polycarbonate_rong: "/images/products/tam-lop-polycarbonate-rong.jpg",
  phu_kien: "/images/products/phu-kien.jpg",
};

const colorMap: Record<string, string> = {
  "Trắng Trong": "#E8F4F8", // Light transparent blue-ish
  "Trắng trong": "#E8F4F8",
  "Xanh Hồ": "#3481B8", // RAL 5012
  "Xanh hồ": "#3481B8",
  "Trắng Đục": "#F4F4F4", // RAL 9003
  "Trắng đục": "#F4F4F4",
  "Xanh Lá": "#114232", // RAL 6005
  "Xanh lá": "#114232",
  "Nâu Trà": "#45322E", // RAL 8017
  "Nâu trà": "#45322E",
  "Xám Khói": "#555D61", // RAL 7011
  "Xám khói": "#555D61",
};

// Get hex color from Vietnamese name
export const getColorHex = (colorName: string): string => {
  return colorMap[colorName] || colorName;
};

// Get color name from hex (for tooltips)
export const getColorName = (hex: string): string => {
  const entry = Object.entries(colorMap).find(([, value]) => value === hex);
  return entry ? entry[0] : hex;
};

// Export color map for reference
export { colorMap };

// Get all categories
export const getCategories = (): JsonCategory[] => {
  return productData.metadata.categories;
};

// Get all raw products from JSON
export const getRawProducts = (): JsonProduct[] => {
  return productData.products as JsonProduct[];
};

// Transform JSON product to UI Product format
export const transformProduct = (
  product: JsonProduct,
  index: number
): Product => {
  // Don't show colors for accessories (phu_kien) category
  const colors =
    product.category_slug === "phu_kien"
      ? []
      : product.specs?.colors?.map((c) => getColorHex(c.name)) || [];

  // Check if product is a best seller (from JSON field OR config)
  const configSortOrder = bestSellerConfig[product.slug];
  const isBestSeller = product.bestseller === true || configSortOrder !== undefined;
  // JSON bestseller gets priority sortOrder 0, config uses its defined order
  const sortOrder = product.bestseller ? 0 : (configSortOrder ?? 999);

  return {
    id: index + 1,
    slug: product.slug, // Pass real slug from JSON data
    name: product.name,
    price: product.price_formatted,
    oldPrice: "",
    discount: "",
    image: product.thumbnail,
    colors,
    bestSeller: isBestSeller,
    sortOrder,
  };
};

// Sort products by best seller status (best sellers first, then by sortOrder)
const sortByBestSeller = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => {
    // Best sellers come first
    if (a.bestSeller && !b.bestSeller) return -1;
    if (!a.bestSeller && b.bestSeller) return 1;
    // Among best sellers, sort by sortOrder
    return (a.sortOrder ?? 999) - (b.sortOrder ?? 999);
  });
};

// Get all products in UI format (sorted by best seller)
export const getAllProducts = (): Product[] => {
  const products = getRawProducts().map((p, idx) => transformProduct(p, idx));
  return sortByBestSeller(products);
};

// Get products by category slug (sorted by best seller)
export const getProductsByCategory = (categorySlug: string): Product[] => {
  const products = getRawProducts()
    .filter((p) => p.category_slug === categorySlug)
    .map((p, idx) => transformProduct(p, idx));
  return sortByBestSeller(products);
};

// Get featured products (best sellers first from each category)
export const getFeaturedProducts = (perCategory: number = 3): Product[] => {
  const categories = getCategories();
  const products: Product[] = [];

  categories.forEach((cat) => {
    // getProductsByCategory already sorts by best seller
    const catProducts = getProductsByCategory(cat.slug).slice(0, perCategory);
    products.push(...catProducts);
  });

  return products;
};

// Categories for menu
export const menuCategories = getCategories().map((cat) => ({
  id: cat.slug,
  name: cat.name,
  href: `/categories/${cat.slug}`,
  image: categoryImages[cat.slug] || "/images/products/default.jpg",
}));

// Categories for featured products tabs
export const featuredCategories = getCategories().map((cat) => ({
  id: cat.slug,
  name: cat.name,
  icon: categoryIcons[cat.slug] || "/images/categories/default.jpg",
  link: `/categories/${cat.slug}`,
}));

// Category list for sidebar/listing
export const categoryListData = getCategories().map((cat) => {
  const count = getRawProducts().filter(
    (p) => p.category_slug === cat.slug
  ).length;
  return {
    slug: cat.slug,
    name: cat.name,
    count: `${count} sản phẩm`,
    image: categoryImages[cat.slug] || "/images/products/default.jpg",
  };
});

// Get raw product by slug
export const getRawProductBySlug = (slug: string): JsonProduct | undefined => {
  return getRawProducts().find((p) => p.slug === slug);
};

// Get related products (same category, excluding current product, sorted by best seller)
export const getRelatedProducts = (
  categorySlug: string,
  excludeSlug: string,
  limit: number = 4
): Product[] => {
  const products = getRawProducts()
    .filter((p) => p.category_slug === categorySlug && p.slug !== excludeSlug)
    .map((p, idx) => transformProduct(p, idx));
  return sortByBestSeller(products).slice(0, limit);
};

// Products for each category showcase
export const polycarbonateDocProducts =
  getProductsByCategory("polycarbonate_dac");
export const polycarbonateSongProducts =
  getProductsByCategory("polycarbonate_song");
export const polycarbonateRongProducts =
  getProductsByCategory("polycarbonate_rong");
export const phuKienProducts = getProductsByCategory("phu_kien");
