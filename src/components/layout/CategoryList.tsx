import React from 'react';

const categories = [
  { name: 'Đèn Mây/Tre', count: '16 sản phẩm', image: 'https://images.unsplash.com/photo-1513506003011-3b03c80165bd?w=400&auto=format&fit=crop&q=60' },
  { name: 'Đồ Nội Thất', count: '10 sản phẩm', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=60' },
  { name: 'Phụ Kiện', count: '12 sản phẩm', image: 'https://images.unsplash.com/photo-1584936684506-c3a7086e8212?w=400&auto=format&fit=crop&q=60' },
  { name: 'Gương Trang Trí', count: '2 sản phẩm', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&auto=format&fit=crop&q=60' },
  { name: 'Kệ & Giá Treo', count: '10 sản phẩm', image: 'https://images.unsplash.com/photo-1594060467018-b965f0101735?w=400&auto=format&fit=crop&q=60' },
  { name: 'Trang Trí Tường', count: '0 sản phẩm', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=60' },
  { name: 'Lọ & Chậu', count: '0 sản phẩm', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop&q=60' },
  { name: 'Quà Tặng', count: '16 sản phẩm', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=60' },
];

const CategoryList = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {categories.map((cat, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-4 border-2 border-transparent hover:border-[#D97706] p-0.5 transition-all">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-100">
                    <img 
                        src={cat.image} 
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
              </div>
              <h3 className="font-bold text-sm text-[#4B5563] group-hover:text-[#D97706] transition-colors mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400 group-hover:text-[#D97706]">
                {cat.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
