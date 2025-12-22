import React from 'react';
import Link from 'next/link';
import { categoryListData } from '@/lib/data/polycarbonate-data';

const categories = categoryListData;

const CategoryList = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <Link key={index} href={`/categories/${cat.slug}`} className="flex flex-col items-center text-center group cursor-pointer">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
