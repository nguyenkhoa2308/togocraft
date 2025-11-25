"use client"

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ProductCard, QuickViewDialog, Product } from '@/components/ui';

const categories = [
  { id: 'bags', name: 'Túi xách và phụ kiện', icon: '/images/section_product_tab_icon_1.webp', link: '/categories/bags' },
  { id: 'lamps', name: 'Đèn mây tre trang trí', icon: '/images/section_product_tab_icon_2.webp', link: '/categories/lamps' },
  { id: 'trays', name: 'Giỏ và khay', icon: '/images/section_product_tab_icon_3.webp', link: '/categories/trays' },
  { id: 'shelves', name: 'Kệ & Giá Treo Decor', icon: '/images/section_product_tab_icon_4.webp', link: '/categories/shelves' },
  { id: 'gifts', name: 'Quà tặng thủ công', icon: '/images/section_product_tab_icon_5.webp', link: '/categories/gifts' },
];

const products = [
  { id: 1, categoryId: 'bags', name: 'Túi mây tròn trắng có hoa văn bện', price: '1.300.000đ', oldPrice: '', discount: '', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=60', colors: [] },
  { id: 2, categoryId: 'bags', name: 'Túi Chiêm Raffia', price: '990.000đ', oldPrice: '1.230.000đ', discount: '-20%', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60', colors: ['#8B4513', '#1F2937', '#F4A460', '#E5E7EB'] },
  { id: 3, categoryId: 'bags', name: 'Túi Gieo Raffia', price: '990.000đ', oldPrice: '1.090.000đ', discount: '-9%', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&auto=format&fit=crop&q=60', colors: ['#8B4513', '#1F2937', '#F4A460', '#E5E7EB'] },
  { id: 4, categoryId: 'bags', name: 'Túi mây tròn trắng', price: '880.000đ', oldPrice: '900.000đ', discount: '-2%', image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=400&auto=format&fit=crop&q=60', colors: [] },
  { id: 5, categoryId: 'bags', name: 'Túi cói đi biển', price: '550.000đ', oldPrice: '650.000đ', discount: '-15%', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=60', colors: ['#F4A460'] },
  { id: 6, categoryId: 'bags', name: 'Túi xách tay mây tre', price: '1.200.000đ', oldPrice: '', discount: '', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&auto=format&fit=crop&q=60', colors: [] },
  { id: 7, categoryId: 'bags', name: 'Túi đeo chéo nữ', price: '750.000đ', oldPrice: '800.000đ', discount: '-6%', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=400&auto=format&fit=crop&q=60', colors: ['#8B4513', '#F4A460'] },
  { id: 8, categoryId: 'bags', name: 'Túi tote vải đay', price: '350.000đ', oldPrice: '', discount: '', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=400&auto=format&fit=crop&q=60', colors: ['#E5E7EB'] },
  { id: 9, categoryId: 'bags', name: 'Túi cói vintage', price: '890.000đ', oldPrice: '1.100.000đ', discount: '-19%', image: 'https://images.unsplash.com/photo-1523779105324-a5e28371ad9a?w=400&auto=format&fit=crop&q=60', colors: [] },
  { id: 10, categoryId: 'lamps', name: 'Đèn thả trần mây tre', price: '1.500.000đ', oldPrice: '', discount: '', image: 'https://images.unsplash.com/photo-1513506003013-d531625a020d?w=400&auto=format&fit=crop&q=60', colors: [] },
  { id: 11, categoryId: 'lamps', name: 'Đèn ngủ để bàn', price: '650.000đ', oldPrice: '750.000đ', discount: '-13%', image: 'https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=400&auto=format&fit=crop&q=60', colors: ['#F4A460'] },
  { id: 12, categoryId: 'trays', name: 'Khay mây tròn', price: '250.000đ', oldPrice: '', discount: '', image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&auto=format&fit=crop&q=60', colors: [] },
  { id: 13, categoryId: 'shelves', name: 'Kệ treo tường gỗ', price: '450.000đ', oldPrice: '500.000đ', discount: '-10%', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&auto=format&fit=crop&q=60', colors: ['#8B4513'] },
  { id: 14, categoryId: 'gifts', name: 'Hộp quà tết mây tre', price: '550.000đ', oldPrice: '', discount: '', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=60', colors: [] },
];

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const filteredProducts = products.filter(p => p.categoryId === activeCategory);
  const displayedProducts = filteredProducts.slice(0, 8);
  const activeCategoryLink = categories.find(c => c.id === activeCategory)?.link || '#';

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[#D97706] font-medium tracking-wide uppercase mb-2 text-sm">THỦ CÔNG SUDES CRAFT</p>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pacifico)] text-[#4A3B32]">
            Các sản phẩm nổi bật
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto font-[family-name:var(--font-plus-jakarta)] mt-6">
            Sự kết hợp hài hòa giữa thủ công truyền thống và thiết kế hiện đại – đơn giản, tinh tế và bền vững cùng thời gian.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`group flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                  isActive
                    ? 'bg-[#F97316] text-white shadow-md'
                    : 'bg-[#F3F4F6] text-gray-600 hover:bg-[#F97316] hover:text-white'
                }`}
              >
                <img 
                  src={cat.icon} 
                  alt={cat.name} 
                  className={`w-6 h-6 object-contain transition-all ${isActive ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'}`} 
                />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Chưa có sản phẩm nào trong danh mục này.
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <a 
            href={activeCategoryLink}
            className="inline-flex items-center gap-2 border-2 border-[#C59263] text-[#C59263] hover:bg-[#C59263] hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 uppercase tracking-wide text-sm"
          >
            Xem tất cả
            <ChevronRight size={18} />
          </a>
        </div>

        {/* Quick View Dialog */}
        <QuickViewDialog
          isOpen={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
