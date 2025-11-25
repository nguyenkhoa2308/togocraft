import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  height = 'h-64 md:h-80',
  breadcrumbs
}) => {
  return (
    <section className={`relative ${height} bg-cover bg-center`} style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

      {/* Content - Left aligned */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-2xl">
          {/* Breadcrumb */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-4">
              <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
                <Home size={14} />
                <span>Trang chủ</span>
              </Link>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  <span>/</span>
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white">{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-white/80 text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
