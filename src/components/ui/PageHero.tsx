import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
  backgroundImage = "/images/backgrounds/section2-g.jpg",
  height = "h-[280px]",
  breadcrumbs,
}) => {
  return (
    <section
      className={`relative ${height} bg-cover bg-center flex items-center justify-center`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Brown Overlay */}
      <div className="absolute inset-0 bg-[#3b2410]/80" />

      {/* Content - Centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-16">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && <p className="text-white/80 text-lg mb-4">{subtitle}</p>}

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-white/80">
          <Link href="/" className="hover:text-white transition-colors">
            Trang chủ
          </Link>
          {breadcrumbs &&
            breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="w-4 h-4" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </React.Fragment>
            ))}
        </nav>
      </div>
    </section>
  );
};

export default PageHero;
