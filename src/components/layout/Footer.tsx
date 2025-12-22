"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Globe, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Hook for count-up animation
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

// Stats Counter Component
function StatCounter({ number, label }: { number: string; label: string }) {
  // Parse the number (remove + and other non-numeric characters)
  const numericValue = parseInt(number.replace(/[^0-9]/g, ""), 10);
  const suffix = number.replace(/[0-9]/g, "");

  const { count, ref } = useCountUp(numericValue, 2000);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold font-oswald">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-base mt-1 opacity-90">{label}</div>
    </div>
  );
}

const productLinks = [
  { name: "Tấm Polycarbonate Đặc Ruột", href: "/categories/polycarbonate_dac" },
  { name: "Tấm Polycarbonate Rỗng", href: "/categories/polycarbonate_rong" },
  { name: "Tấm Polycarbonate Sóng", href: "/categories/polycarbonate_song" },
  { name: "Phụ Kiện Lắp Đặt", href: "/categories/phu_kien" },
];

const companyLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Sản phẩm", href: "/categories/all" },
  { name: "Chính sách", href: "/policies" },
  { name: "Hỏi đáp", href: "/faq" },
  { name: "Liên hệ", href: "/contact" },
];

export default function Footer() {
  return (
    <footer id="footer">
      {/* Main Footer */}
      <div
        className="relative bg-contain bg-center bg-no-repeat pt-12"
        style={{ backgroundImage: "url('/images/backgrounds/footer-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#1a1a2e]/90"></div>
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 text-white">
            {/* Company Info */}
            <div className="sm:col-span-2">
              <div className="h-auto sm:h-[52px] flex items-start mb-4 sm:mb-0">
                <h3 className="font-bold text-base sm:text-lg text-white relative inline-block uppercase">
                  Thông tin liên hệ
                  <span className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD966]"></span>
                </h3>
              </div>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    Ngọc Trục, Đại Mỗ, Nam Từ Liêm, Hà Nội
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <Link
                    href="tel:0976110266"
                    className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    0976.110.266
                  </Link>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <Link
                    href="mailto:nhualaysangeverestlight@gmail.com"
                    className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors break-all"
                  >
                    nhualaysangeverestlight@gmail.com
                  </Link>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <Link
                    href="https://nhualaysangeverestlight.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    https://nhualaysangeverestlight.com/
                  </Link>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    Thứ 2 - Thứ 7: 8:00 - 17:30
                  </span>
                </li>
              </ul>
              {/* Social Links */}
              <div className="flex gap-3 mt-4">
                <Link
                  href="https://www.facebook.com/tamnhualaysangpoly/"
                  target="_blank"
                  className="w-8 h-8 flex items-center justify-center transition-all duration-300 group"
                >
                  <Image
                    src="/icons/facebook_icon.svg"
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="group-hover:scale-120 transition-transform duration-300"
                  />
                </Link>
                <Link
                  href="https://zalo.me/0976110266"
                  target="_blank"
                  className="w-8 h-8 flex items-center justify-center transition-all duration-300 group"
                >
                  <Image
                    src="/icons/zalo_icon.svg"
                    alt="Zalo"
                    width={40}
                    height={40}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </div>
            </div>
            {/* Products */}
            <div>
              <div className="h-auto sm:h-[52px] flex items-start mb-4 sm:mb-0">
                <h3 className="font-bold text-base sm:text-lg text-white relative inline-block uppercase">
                  Sản phẩm
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD966]"></span>
                </h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 mt-4">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-4 h-4 flex-shrink-0 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <div className="h-auto sm:h-[52px] flex items-start mb-4 sm:mb-0">
                <h3 className="font-bold text-base sm:text-lg text-white relative inline-block uppercase">
                  Liên kết nhanh
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD966]"></span>
                </h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 mt-4">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-4 h-4 flex-shrink-0 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Google Map */}
            <div className="sm:col-span-2">
              <div className="h-auto sm:h-[52px] flex items-start mb-4 sm:mb-0">
                <h3 className="font-bold text-lg text-white relative inline-block uppercase">
                  Bản đồ chỉ đường
                  <span className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD966]"></span>
                </h3>
              </div>
              <div className="rounded-lg overflow-hidden mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1343.5808081052633!2d105.7682310972573!3d20.98611531548671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDU5JzEwLjEiTiAxMDXCsDQ2JzA1LjYiRQ!5e1!3m2!1sen!2s!4v1764660022570!5m2!1sen!2s"
                  width="100%"
                  height="200"
                  className="h-[200px] sm:h-[250px] lg:h-[300px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Everest Light Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-5">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2025 Everest Light. Tất cả quyền được bảo lưu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
