import React from 'react';
import { ArrowRight } from 'lucide-react';

const collections = [
  { id: 1, title: 'BST Hơi Thở Mộc', price: '299k', image: '/images/img_4banner_1.webp' },
  { id: 2, title: 'BST Nét Đan', price: '299k', image: '/images/img_4banner_2.webp' },
  { id: 3, title: 'BST Ánh Mây Đan', price: '399k', image: '/images/img_4banner_3.webp' },
  { id: 4, title: 'BST Mộc Nhiên Quà Tặng', price: '99k', image: '/images/img_4banner_4.webp' },
  { id: 5, title: 'BST Nắng Trên Cói', price: '199k', image: '/images/img_4banner_5.webp' },
  { id: 6, title: 'BST Lung Linh Mây Việt', price: '999k', image: '/images/img_4banner_6.webp' },
];

// We will display 4 items in a 2x2 grid as per the design, but maybe the design has 6?
// Looking at uploaded_image_2, it shows a 2x2 grid of large items, or maybe a grid of 3?
// Wait, uploaded_image_2 shows 4 items in a grid (2 rows, 2 columns).
// Let's stick to 4 items.

const displayCollections = collections.slice(0, 4);

const NewCollection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pacifico)] text-[#4A3B32] mb-4">
            Bộ sưu tập thủ công mới nhất
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-[family-name:var(--font-plus-jakarta)] text-sm leading-relaxed">
            Mỗi sản phẩm là một dấu ấn của thời gian – giản dị nhưng tinh tế, mang trong mình hơi thở thiên nhiên và bàn tay khéo léo của người thợ Việt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => {
            const isWide = index === 0 || index === 5;
            return (
              <div 
                key={collection.id} 
                className={`group relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 ${isWide ? 'md:col-span-2' : 'md:col-span-1'}`}
              >
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                  <h3 className="text-lg md:text-xl font-bold mb-1 font-[family-name:var(--font-plus-jakarta)] group-hover:text-[#f57b23] transition-colors duration-300">{collection.title}</h3>
                  <p className="text-sm opacity-90 font-light">Giá chỉ từ {collection.price}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-10">
             <button className="inline-flex items-center gap-2 bg-[#C59263] text-white hover:bg-[#B07D4E] px-8 py-3 rounded-full font-bold transition-all text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Xem chi tiết
                <ArrowRight size={18} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default NewCollection;
