"use client";

import React from "react";
import Image from "next/image";

// Featured projects data
const projects = [
  {
    id: 1,
    name: "KCN SAMSUNG",
    image: "/images/projects/samsung.jpg",
  },
  {
    id: 2,
    name: "BIỆT THỰ NHÀ DÂN",
    image: "/images/projects/biethu.jpg",
  },
  {
    id: 3,
    name: "ĐẠI HỌC THƯƠNG MẠI",
    image: "/images/projects/thuongmai.jpg",
  },
  {
    id: 4,
    name: "ROYAL TUYÊN QUANG",
    image: "/images/projects/royal.jpg",
  },
  {
    id: 5,
    name: "THCS QUẾ VÕ BẮC NINH",
    image: "/images/projects/quevo.jpg",
  },
  {
    id: 6,
    name: "KHÁCH SẠN NHA TRANG",
    image: "/images/projects/nhatrang.jpg",
  },
  {
    id: 7,
    name: "NHÀ VƯỜN",
    image: "/images/projects/nhavuon.jpg",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-16 bg-[#171717] text-white overflow-hidden relative before:content-[''] before:absolute before:w-[270px] before:h-[270px] before:rounded-full before:top-[-22%] before:left-[-5%] before:bg-[#25f4ee] before:blur-[150px] after:content-[''] after:absolute after:w-[320px] after:h-[320px] after:rounded-full after:bottom-[-11%] after:right-[-8%] after:bg-[#ee3f63] after:blur-[150px]">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C59263] to-[#C59263]" />
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pacifico)] text-white whitespace-nowrap">
            Công Trình Tiêu Biểu
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C59263] to-[#C59263]" />
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* KCN Samsung - Tall Left */}
          <div className="row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src={projects[0].image}
              alt={projects[0].name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 bg-[#C59263] text-white text-xs font-bold px-3 py-1.5 rounded">
              {projects[0].name}
            </span>
          </div>

          {/* Biệt Thự Nhà Dân - Top Middle Small */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src={projects[1].image}
              alt={projects[1].name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 bg-[#C59263] text-white text-xs font-bold px-3 py-1.5 rounded">
              {projects[1].name}
            </span>
          </div>

          {/* Royal Tuyên Quang - Tall Right */}
          <div className="row-span-2 col-span-2 md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src={projects[3].image}
              alt={projects[3].name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 bg-[#C59263] text-white text-xs font-bold px-3 py-1.5 rounded">
              {projects[3].name}
            </span>
          </div>

          {/* Đại Học Thương Mại - Middle Small */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src={projects[2].image}
              alt={projects[2].name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 bg-[#C59263] text-white text-xs font-bold px-3 py-1.5 rounded">
              {projects[2].name}
            </span>
          </div>

          {/* THCS Quế Võ Bắc Ninh - Large Middle-Bottom Left */}
          <div className="col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src={projects[4].image}
              alt={projects[4].name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 bg-[#C59263] text-white text-xs font-bold px-3 py-1.5 rounded">
              {projects[4].name}
            </span>
          </div>

          {/* Khách Sạn Nha Trang - Large Right */}
          <div className="row-span-2 col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src={projects[5].image}
              alt={projects[5].name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-4 right-4 bg-[#C59263] text-white text-xs font-bold px-3 py-1.5 rounded">
              {projects[5].name}
            </span>
          </div>

          {/* Nhà Vườn - Bottom Left */}
          <div className="col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src={projects[6].image}
              alt={projects[6].name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 bg-[#C59263] text-white text-xs font-bold px-3 py-1.5 rounded">
              {projects[6].name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
