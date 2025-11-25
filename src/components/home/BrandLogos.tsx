import React from 'react';

const brands = [
  { id: 1, name: 'VinHomes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Vinhomes_Logo.png/1200px-Vinhomes_Logo.png' },
  { id: 2, name: 'Phu Dong', logo: 'https://phudonggroup.com/wp-content/uploads/2020/06/logo-phu-dong-group.png' },
  { id: 3, name: 'Ecopark', logo: 'https://ecopark.com.vn/wp-content/uploads/2021/05/logo-ecopark.png' },
  { id: 4, name: 'Estella Heights', logo: 'https://estellaheights.com.vn/wp-content/uploads/2018/04/logo.png' },
  { id: 5, name: 'Celadon City', logo: 'https://celadoncity.com.vn/wp-content/uploads/2019/07/logo-celadon-city.png' },
  { id: 6, name: 'Cantavil', logo: 'https://cantavil.com.vn/wp-content/uploads/2020/07/logo-cantavil.png' },
  { id: 7, name: 'Masterise Homes', logo: 'https://masterisehomes.com/wp-content/uploads/2020/09/logo-masterise-homes.png' },
];

const BrandLogos = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Since I don't have real logo URLs that are guaranteed to work, I will use text placeholders styled to look like logos if images fail, or just generic placeholders */}
           {/* Actually, let's use text for reliability in this demo */}
           
           <div className="text-2xl font-bold font-serif text-gray-400">VINHOMES</div>
           <div className="text-2xl font-bold font-sans text-gray-400">PHÚ ĐÔNG</div>
           <div className="text-2xl font-bold font-mono text-gray-400">ecopark</div>
           <div className="text-xl font-bold font-serif italic text-gray-400">Estella Heights</div>
           <div className="text-2xl font-bold font-sans text-gray-400">CELADON CITY</div>
           <div className="text-2xl font-bold font-serif text-gray-400">CANTAVIL</div>
           <div className="text-2xl font-bold font-sans text-gray-400">MASTERISE</div>
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
