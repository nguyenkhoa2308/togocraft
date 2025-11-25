# Cấu trúc Project Next.js - Togocraft

## Tổng quan cấu trúc

```
togocraft/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── _components/         # Components riêng cho trang home (không reusable)
│   │   │   ├── Hero.tsx
│   │   │   ├── SaleSection.tsx
│   │   │   ├── CouponSection.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── NewCollection.tsx
│   │   │   ├── CategoryShowcase.tsx
│   │   │   ├── StorySection.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── TikTokSection.tsx
│   │   │   ├── NewsSection.tsx
│   │   │   └── BrandLogos.tsx
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   │
│   ├── components/              # Shared/Reusable components
│   │   └── layout/             # Layout components (dùng cho nhiều pages)
│   │       ├── TopBar.tsx
│   │       ├── Header.tsx
│   │       ├── NavigationBar.tsx
│   │       ├── Navbar.tsx
│   │       ├── CategoryMenu.tsx
│   │       ├── CategoryList.tsx
│   │       ├── Footer.tsx
│   │       └── index.ts        # Barrel export
│   │
│   ├── lib/                     # Utilities & helpers
│   │   └── data/               # Mock data & constants
│   │       └── products.ts     # Product data
│   │
│   └── types/                  # TypeScript type definitions
│       └── product.ts          # Product interface
│
├── public/                     # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── next.config.ts             # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.mjs        # PostCSS configuration
├── eslint.config.mjs         # ESLint configuration
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## Chi tiết cấu trúc

### 📁 src/app/

Thư mục chứa Next.js App Router với route-based organization:

#### app/_components/
Components **chỉ dùng cho trang home**, không được reuse ở các pages khác. Prefix `_` cho biết đây là private folder, không tạo route.

- `Hero.tsx` - Hero banner chính
- `SaleSection.tsx` - Section hiển thị sale
- `CouponSection.tsx` - Section coupon/voucher
- `FeaturedProducts.tsx` - Sản phẩm nổi bật
- `NewCollection.tsx` - Bộ sưu tập mới
- `CategoryShowcase.tsx` - Showcase cho danh mục
- `StorySection.tsx` - Section câu chuyện thương hiệu
- `Testimonials.tsx` - Đánh giá khách hàng
- `TikTokSection.tsx` - Kết nối TikTok
- `NewsSection.tsx` - Tin tức
- `BrandLogos.tsx` - Logo các đối tác

#### app/layout.tsx
Root layout với:
- Font configuration (Geist Sans, Geist Mono, Pacifico, Plus Jakarta Sans)
- Metadata
- HTML structure

#### app/page.tsx
Home page component - import và sử dụng các components từ `_components/`

### 📁 src/components/

Thư mục chứa **shared/reusable components** - các component được dùng ở nhiều pages khác nhau.

#### components/layout/
Layout components được dùng chung cho nhiều pages:

- `TopBar.tsx` - Thanh thông báo trên cùng
- `Header.tsx` - Header với logo và tìm kiếm
- `NavigationBar.tsx` - Menu điều hướng chính
- `Navbar.tsx` - Navigation bar phụ
- `CategoryMenu.tsx` - Menu danh mục (dùng trong NavigationBar)
- `CategoryList.tsx` - Danh sách danh mục
- `Footer.tsx` - Footer của website
- `index.ts` - Barrel export

**Lưu ý**: Nếu sau này có thêm pages khác (ví dụ: `/products`, `/about`), các layout components này sẽ được reuse.

### 📁 src/lib/

Thư mục chứa utilities, helpers và data:

#### lib/data/
- `products.ts` - Mock data cho sản phẩm:
  - `gioKhayProducts` - Sản phẩm giỏ và khay
  - `denMayProducts` - Sản phẩm đèn mây tre
  - `decorProducts` - Sản phẩm decor

### 📁 src/types/

TypeScript type definitions:
- `product.ts` - Interface `Product` với các fields: id, name, price, oldPrice, discount, image

### 📁 public/

Static assets (images, icons, SVG files)

## Nguyên tắc tổ chức

### 1. **Colocation (đặt gần nhau)**
Components chỉ dùng cho một page cụ thể nên đặt trong `app/_components/` gần với page đó, không nên đặt trong `src/components/`.

### 2. **Shared vs Page-specific**
- `src/components/` - Chỉ chứa components **được dùng lại** ở nhiều pages
- `app/_components/` - Components **chỉ dùng cho home page**

### 3. **Type Safety**
Sử dụng TypeScript interfaces cho tất cả data models trong `src/types/`

### 4. **Data Separation**
Mock data và constants tách riêng vào `src/lib/data/`

### 5. **Barrel Exports**
Sử dụng `index.ts` để export nhiều components từ cùng một folder

## Import Examples

```tsx
// Import layout components (reusable)
import { TopBar, Header, Footer } from '@/components/layout';

// Import page-specific components
import Hero from '@/app/_components/Hero';
import SaleSection from '@/app/_components/SaleSection';

// Import data
import { gioKhayProducts, denMayProducts } from '@/lib/data/products';

// Import types
import { Product } from '@/types/product';
```

## Khi nào thêm vào đâu?

### Thêm component mới:

**Hỏi**: Component này có được dùng lại ở nhiều pages không?

- ✅ **CÓ** → Đặt trong `src/components/` (ví dụ: Button, Card, Modal)
- ❌ **KHÔNG** → Đặt trong `app/_components/` hoặc page-specific folder

**Ví dụ**:
- `Button` component → `src/components/ui/Button.tsx` (reusable)
- `ProductCard` component → `src/components/ui/ProductCard.tsx` (reusable)
- `HomeHero` component → `app/_components/Hero.tsx` (chỉ dùng cho home)

### Thêm page mới:

Khi tạo page mới (ví dụ: `/products`):

```
src/app/
├── products/
│   ├── _components/        # Components chỉ cho products page
│   │   ├── ProductFilter.tsx
│   │   └── ProductGrid.tsx
│   └── page.tsx           # Products page
```

## Best Practices

1. **Prefix `_` cho private folders** - Folders bắt đầu bằng `_` không tạo routes
2. **Colocation** - Đặt code gần nơi sử dụng nhất có thể
3. **Tách biệt concerns** - Layout, page-specific, và shared components tách riêng
4. **Type safety** - Luôn dùng TypeScript
5. **Naming conventions**:
   - Components: PascalCase (VD: `ProductCard.tsx`)
   - Files: kebab-case cho non-component files (VD: `products.ts`)
   - Folders: lowercase (VD: `layout/`, `_components/`)

## Lợi ích của cấu trúc này

1. ✅ **Rõ ràng** - Biết ngay component nào dùng ở đâu
2. ✅ **Dễ maintain** - Code đặt gần nơi sử dụng
3. ✅ **Scalable** - Dễ mở rộng khi thêm pages mới
4. ✅ **Performance** - Next.js tree-shaking tốt hơn với colocation
5. ✅ **Developer Experience** - Tìm code nhanh hơn
