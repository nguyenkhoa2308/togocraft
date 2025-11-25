import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, currentPage }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 py-4 overflow-x-auto no-scrollbar">
      <Link href="/" className="flex items-center gap-1 hover:text-[#C59263] transition-colors flex-shrink-0">
        <Home size={16} />
        <span>Trang chủ</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
          <Link href={item.href} className="hover:text-[#C59263] transition-colors flex-shrink-0">
            {item.name}
          </Link>
        </React.Fragment>
      ))}

      <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
      <span className="text-[#4A3B32] font-medium truncate">{currentPage}</span>
    </nav>
  );
};

export default Breadcrumb;
