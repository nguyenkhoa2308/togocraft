import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const contactInfo = {
  address: "Ngọc Trục, Đại Mỗ, Nam Từ Liêm, Hà Nội",
  email: "nhualaysangeverestlight@gmail.com",
  phone: "0976.110.266",
};

const TopBar = () => {
  return (
    <div className="hidden md:block bg-[#4A3B32] text-white text-xs">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Left - Address */}
        <div className="flex items-center gap-2 text-white/90">
          <MapPin size={14} className="text-[#D4AF37]" />
          <span>{contactInfo.address}</span>
        </div>

        {/* Right - Contact */}
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 text-white/90 hover:text-[#D4AF37] transition-colors"
          >
            <Mail size={14} className="text-[#D4AF37]" />
            <span>{contactInfo.email}</span>
          </a>

          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center gap-2 text-white/90 hover:text-[#D4AF37] transition-colors"
          >
            <Phone size={14} className="text-[#D4AF37]" />
            <span className="font-semibold">{contactInfo.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
