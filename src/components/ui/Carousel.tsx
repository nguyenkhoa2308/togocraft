"use client";

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Responsive breakpoints type
interface ResponsiveConfig {
  default: number;
  sm?: number;  // 640px
  md?: number;  // 768px
  lg?: number;  // 1024px
  xl?: number;  // 1280px
}

interface CarouselProps {
  children: ReactNode[];
  itemsPerView?: number | ResponsiveConfig;
  showArrows?: boolean;
  gap?: string;
  className?: string;
  arrowClassName?: string;
  customArrows?: (props: { onPrev: () => void; onNext: () => void; isFirst: boolean; isLast: boolean }) => ReactNode;
}

// Hook to get responsive itemsPerView
const useResponsiveItemsPerView = (config: number | ResponsiveConfig): number => {
  const [itemsPerView, setItemsPerView] = useState<number>(
    typeof config === 'number' ? config : config.default
  );

  useEffect(() => {
    if (typeof config === 'number') {
      setItemsPerView(config);
      return;
    }

    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (config.xl && width >= 1280) {
        setItemsPerView(config.xl);
      } else if (config.lg && width >= 1024) {
        setItemsPerView(config.lg);
      } else if (config.md && width >= 768) {
        setItemsPerView(config.md);
      } else if (config.sm && width >= 640) {
        setItemsPerView(config.sm);
      } else {
        setItemsPerView(config.default);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [config]);

  return itemsPerView;
};

export const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsPerView: itemsPerViewConfig = 4,
  showArrows = true,
  gap = 'px-3',
  className = '',
  arrowClassName = '',
  customArrows,
}) => {
  const itemsPerView = useResponsiveItemsPerView(itemsPerViewConfig);
  const [startIndex, setStartIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset startIndex when itemsPerView changes to avoid overflow
  useEffect(() => {
    if (startIndex + itemsPerView > children.length) {
      setStartIndex(Math.max(0, children.length - itemsPerView));
    }
  }, [itemsPerView, children.length, startIndex]);

  const nextSlide = () => {
    if (startIndex + itemsPerView < children.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const isFirst = startIndex === 0;
  const isLast = startIndex + itemsPerView >= children.length;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX);
    setScrollLeft(startIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.touches[0].pageX);
    setScrollLeft(startIndex);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const distance = Math.abs(startX - x);

    if (distance > 5) {
      setHasDragged(true);
    }

    const walk = (startX - x) / 150;
    const newIndex = scrollLeft + walk;
    if (newIndex >= 0 && newIndex + itemsPerView <= children.length) {
      setStartIndex(newIndex);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const distance = Math.abs(startX - x);

    if (distance > 5) {
      setHasDragged(true);
    }

    const walk = (startX - x) / 150;
    const newIndex = scrollLeft + walk;
    if (newIndex >= 0 && newIndex + itemsPerView <= children.length) {
      setStartIndex(newIndex);
    }
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setStartIndex(Math.round(startIndex));
    }
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 100);
  };

  return (
    <div className={`relative group/carousel ${className}`}>
      <div
        ref={containerRef}
        className={`overflow-hidden -mx-3 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } select-none`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        <div
          className={`flex ${
            isDragging ? '' : 'transition-transform duration-500 ease-out'
          }`}
          style={{
            transform: `translateX(-${startIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${gap}`}
              onClick={(e) => {
                if (hasDragged) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              style={{
                width: `${100 / itemsPerView}%`,
                pointerEvents: hasDragged ? 'none' : 'auto'
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && !customArrows && (
        <>
          <button
            onClick={prevSlide}
            disabled={isFirst}
            className={`absolute -left-5 top-1/2 -translate-y-1/2 bg-[#C59263] text-white p-3 rounded-full shadow-lg hover:bg-[#B07D4E] transition-all z-10 ${
              isFirst ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            } ${arrowClassName}`}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            disabled={isLast}
            className={`absolute -right-5 top-1/2 -translate-y-1/2 bg-[#C59263] text-white p-3 rounded-full shadow-lg hover:bg-[#B07D4E] transition-all z-10 ${
              isLast ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            } ${arrowClassName}`}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Custom Arrows */}
      {customArrows && customArrows({ onPrev: prevSlide, onNext: nextSlide, isFirst, isLast })}
    </div>
  );
};

export default Carousel;
