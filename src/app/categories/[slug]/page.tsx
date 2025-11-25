"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Home, Grid, List, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ProductCard, QuickViewDialog, Product } from "@/components/ui";

// Category data with subcategories
const categoriesData: Record<string, {
  name: string;
  description: string;
  banner: string;
  parent?: string;
  subCategories?: { id: string; name: string; image: string; productCount: number }[];
}> = {
  // All products
  all: {
    name: "Tất cả sản phẩm",
    description: "Khám phá bộ sưu tập đầy đủ các sản phẩm thủ công mỹ nghệ từ mây tre, cói tự nhiên. Mỗi sản phẩm đều được làm thủ công tỉ mỉ bởi các nghệ nhân làng nghề.",
    banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=60",
    subCategories: [], // Will show main categories
  },
  // Main categories
  bags: {
    name: "Phụ Kiện Thời Trang Thủ Công",
    description: "Bộ sưu tập túi xách và phụ kiện thủ công từ mây tre, cói tự nhiên. Mỗi sản phẩm là một tác phẩm nghệ thuật độc đáo.",
    banner: "https://images.unsplash.com/photo-1523779105324-a5e28371ad9a?w=1200&auto=format&fit=crop&q=60",
    subCategories: [
      { id: "tui-coi", name: "Túi cói đan tay", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&auto=format&fit=crop&q=60", productCount: 12 },
      { id: "tui-may-tre", name: "Túi mây tre", image: "https://images.unsplash.com/photo-1523779105324-a5e28371ad9a?w=300&auto=format&fit=crop&q=60", productCount: 8 },
      { id: "vi-cam-tay", name: "Ví cầm tay", image: "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=300&auto=format&fit=crop&q=60", productCount: 6 },
      { id: "phu-kien-tui", name: "Phụ kiện túi", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300&auto=format&fit=crop&q=60", productCount: 10 },
    ],
  },
  lamps: {
    name: "Đèn Mây Tre Trang Trí",
    description: "Đèn trang trí từ mây tre thủ công, mang đến ánh sáng ấm áp và vẻ đẹp tự nhiên cho không gian sống.",
    banner: "https://images.unsplash.com/photo-1513506003013-d531625a020d?w=1200&auto=format&fit=crop&q=60",
    subCategories: [
      { id: "den-tha-tran", name: "Đèn thả trần", image: "https://images.unsplash.com/photo-1513506003013-d531625a020d?w=300&auto=format&fit=crop&q=60", productCount: 15 },
      { id: "den-de-ban", name: "Đèn để bàn", image: "https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=300&auto=format&fit=crop&q=60", productCount: 9 },
      { id: "den-san", name: "Đèn sàn", image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=300&auto=format&fit=crop&q=60", productCount: 7 },
      { id: "den-tuong", name: "Đèn treo tường", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&auto=format&fit=crop&q=60", productCount: 11 },
    ],
  },
  trays: {
    name: "Giỏ & Khay Đựng Đồ",
    description: "Giỏ đựng đồ và khay trang trí đan thủ công, kết hợp công năng sử dụng và thẩm mỹ cao.",
    banner: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=1200&auto=format&fit=crop&q=60",
    subCategories: [
      { id: "gio-luu-tru", name: "Giỏ Lưu Trữ Thủ Công", image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=300&auto=format&fit=crop&q=60", productCount: 14 },
      { id: "khay-trang-tri", name: "Khay Trang Trí & Phục Vụ", image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=300&auto=format&fit=crop&q=60", productCount: 10 },
      { id: "hop-dan-tay", name: "Hộp Đan Tay & Giỏ Có Nắp", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&auto=format&fit=crop&q=60", productCount: 8 },
      { id: "gio-qua", name: "Bộ Giỏ Quà & Set Decor", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=60", productCount: 6 },
    ],
  },
  shelves: {
    name: "Đồ Nội Thất Tự Nhiên",
    description: "Đồ nội thất từ mây tre và gỗ tự nhiên, mang đến không gian sống gần gũi thiên nhiên.",
    banner: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&auto=format&fit=crop&q=60",
    subCategories: [
      { id: "ke-treo-tuong", name: "Kệ treo tường", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&auto=format&fit=crop&q=60", productCount: 12 },
      { id: "gia-treo-macrame", name: "Giá treo macrame", image: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=300&auto=format&fit=crop&q=60", productCount: 8 },
      { id: "ke-goc", name: "Kệ góc trang trí", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=300&auto=format&fit=crop&q=60", productCount: 6 },
      { id: "gia-cay-canh", name: "Giá đỡ cây cảnh", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&auto=format&fit=crop&q=60", productCount: 10 },
    ],
  },
  gifts: {
    name: "Quà Tặng Thủ Công",
    description: "Những món quà ý nghĩa được làm thủ công tỉ mỉ, hoàn hảo cho mọi dịp đặc biệt.",
    banner: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=60",
    subCategories: [
      { id: "hop-qua-tet", name: "Hộp quà Tết", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=60", productCount: 8 },
      { id: "set-qua-tang", name: "Set quà tặng", image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=300&auto=format&fit=crop&q=60", productCount: 12 },
      { id: "hop-trang-suc", name: "Hộp đựng trang sức", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=60", productCount: 6 },
      { id: "lot-ly", name: "Bộ lót ly", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&auto=format&fit=crop&q=60", productCount: 10 },
    ],
  },
  mirrors: {
    name: "Gương Trang Trí",
    description: "Gương trang trí từ mây tre và vật liệu tự nhiên, tạo điểm nhấn nghệ thuật cho không gian.",
    banner: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&auto=format&fit=crop&q=60",
    subCategories: [
      { id: "guong-tron", name: "Gương tròn", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=300&auto=format&fit=crop&q=60", productCount: 8 },
      { id: "guong-oval", name: "Gương oval", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=300&auto=format&fit=crop&q=60", productCount: 6 },
      { id: "guong-bo", name: "Bộ gương trang trí", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=300&auto=format&fit=crop&q=60", productCount: 5 },
    ],
  },
  "decor-shelves": {
    name: "Kệ & Giá Treo Decor",
    description: "Kệ treo tường và giá đỡ trang trí từ gỗ và mây tre, tạo điểm nhấn cho mọi không gian.",
    banner: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&auto=format&fit=crop&q=60",
    subCategories: [
      { id: "ke-treo-tuong", name: "Kệ treo tường", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&auto=format&fit=crop&q=60", productCount: 12 },
      { id: "gia-treo-macrame", name: "Giá treo macrame", image: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=300&auto=format&fit=crop&q=60", productCount: 8 },
      { id: "ke-goc", name: "Kệ góc trang trí", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=300&auto=format&fit=crop&q=60", productCount: 6 },
    ],
  },
  "wall-decor": {
    name: "Trang Trí Tường",
    description: "Đồ trang trí tường từ mây tre đan, macrame và vật liệu tự nhiên độc đáo.",
    banner: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&auto=format&fit=crop&q=60",
    subCategories: [
      { id: "macrame-tuong", name: "Macrame treo tường", image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=300&auto=format&fit=crop&q=60", productCount: 10 },
      { id: "dia-may-tre", name: "Đĩa mây tre decor", image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=300&auto=format&fit=crop&q=60", productCount: 8 },
      { id: "tranh-tu-nhien", name: "Tranh từ vật liệu tự nhiên", image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=300&auto=format&fit=crop&q=60", productCount: 6 },
    ],
  },
  vases: {
    name: "Lọ Hoa & Chậu Cây Decor",
    description: "Lọ hoa và chậu cây từ mây tre, cói tự nhiên, mang thiên nhiên vào không gian sống.",
    banner: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&auto=format&fit=crop&q=60",
    subCategories: [
      { id: "lo-hoa-may", name: "Lọ hoa mây tre", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&auto=format&fit=crop&q=60", productCount: 12 },
      { id: "chau-cay-coi", name: "Chậu cây cói", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&auto=format&fit=crop&q=60", productCount: 8 },
      { id: "gio-treo-cay", name: "Giỏ treo cây", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&auto=format&fit=crop&q=60", productCount: 10 },
    ],
  },
  // Subcategories - Bags
  "tui-coi": {
    name: "Túi cói đan tay",
    description: "Túi cói đan tay thủ công, phong cách vintage và thân thiện môi trường.",
    banner: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&auto=format&fit=crop&q=60",
    parent: "bags",
  },
  "tui-may-tre": {
    name: "Túi mây tre",
    description: "Túi mây tre cao cấp, thiết kế độc đáo và bền bỉ.",
    banner: "https://images.unsplash.com/photo-1523779105324-a5e28371ad9a?w=1200&auto=format&fit=crop&q=60",
    parent: "bags",
  },
  "vi-cam-tay": {
    name: "Ví cầm tay",
    description: "Ví cầm tay từ mây tre và cói tự nhiên, nhỏ gọn và tiện lợi.",
    banner: "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=1200&auto=format&fit=crop&q=60",
    parent: "bags",
  },
  "phu-kien-tui": {
    name: "Phụ kiện túi",
    description: "Phụ kiện túi xách từ vật liệu tự nhiên.",
    banner: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&auto=format&fit=crop&q=60",
    parent: "bags",
  },
  // Subcategories - Lamps
  "den-tha-tran": {
    name: "Đèn thả trần",
    description: "Đèn thả trần mây tre, tạo điểm nhấn cho không gian phòng khách và phòng ăn.",
    banner: "https://images.unsplash.com/photo-1513506003013-d531625a020d?w=1200&auto=format&fit=crop&q=60",
    parent: "lamps",
  },
  "den-de-ban": {
    name: "Đèn để bàn",
    description: "Đèn để bàn mây tre, ánh sáng ấm áp cho góc làm việc và phòng ngủ.",
    banner: "https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=1200&auto=format&fit=crop&q=60",
    parent: "lamps",
  },
  "den-san": {
    name: "Đèn sàn",
    description: "Đèn sàn mây tre cao cấp, thiết kế đơn giản và sang trọng.",
    banner: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=1200&auto=format&fit=crop&q=60",
    parent: "lamps",
  },
  "den-tuong": {
    name: "Đèn treo tường",
    description: "Đèn treo tường mây tre, trang trí và chiếu sáng cho hành lang và phòng khách.",
    banner: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1200&auto=format&fit=crop&q=60",
    parent: "lamps",
  },
  // Subcategories - Trays
  "gio-luu-tru": {
    name: "Giỏ Lưu Trữ Thủ Công",
    description: "Giỏ lưu trữ đan tay, tiện dụng và trang trí cho mọi không gian.",
    banner: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=1200&auto=format&fit=crop&q=60",
    parent: "trays",
  },
  "khay-trang-tri": {
    name: "Khay Trang Trí & Phục Vụ",
    description: "Khay trang trí và phục vụ từ mây tre, sang trọng và tinh tế.",
    banner: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=1200&auto=format&fit=crop&q=60",
    parent: "trays",
  },
  "hop-dan-tay": {
    name: "Hộp Đan Tay & Giỏ Có Nắp",
    description: "Hộp đan tay và giỏ có nắp, lưu trữ gọn gàng và thẩm mỹ.",
    banner: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&auto=format&fit=crop&q=60",
    parent: "trays",
  },
  "gio-qua": {
    name: "Bộ Giỏ Quà & Set Decor",
    description: "Bộ giỏ quà và set decor, hoàn hảo cho những dịp đặc biệt.",
    banner: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=60",
    parent: "trays",
  },
  // Subcategories - Shelves
  "ke-treo-tuong": {
    name: "Kệ treo tường",
    description: "Kệ treo tường từ gỗ và mây tre, tạo điểm nhấn cho không gian.",
    banner: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&auto=format&fit=crop&q=60",
    parent: "shelves",
  },
  "gia-treo-macrame": {
    name: "Giá treo macrame",
    description: "Giá treo macrame handmade, phong cách boho độc đáo.",
    banner: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=1200&auto=format&fit=crop&q=60",
    parent: "shelves",
  },
  "ke-goc": {
    name: "Kệ góc trang trí",
    description: "Kệ góc trang trí, tận dụng không gian hiệu quả.",
    banner: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1200&auto=format&fit=crop&q=60",
    parent: "shelves",
  },
  "gia-cay-canh": {
    name: "Giá đỡ cây cảnh",
    description: "Giá đỡ cây cảnh từ mây tre, mang thiên nhiên vào nhà.",
    banner: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&auto=format&fit=crop&q=60",
    parent: "shelves",
  },
  // Subcategories - Gifts
  "hop-qua-tet": {
    name: "Hộp quà Tết",
    description: "Hộp quà Tết thủ công, ý nghĩa và sang trọng.",
    banner: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=60",
    parent: "gifts",
  },
  "set-qua-tang": {
    name: "Set quà tặng",
    description: "Set quà tặng đa dạng, phù hợp mọi dịp.",
    banner: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1200&auto=format&fit=crop&q=60",
    parent: "gifts",
  },
  "hop-trang-suc": {
    name: "Hộp đựng trang sức",
    description: "Hộp đựng trang sức từ mây tre, tinh tế và độc đáo.",
    banner: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&auto=format&fit=crop&q=60",
    parent: "gifts",
  },
  "lot-ly": {
    name: "Bộ lót ly",
    description: "Bộ lót ly đan tay, bảo vệ mặt bàn và trang trí.",
    banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=60",
    parent: "gifts",
  },
  // Subcategories - Mirrors
  "guong-tron": {
    name: "Gương tròn",
    description: "Gương tròn trang trí với khung mây tre độc đáo.",
    banner: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&auto=format&fit=crop&q=60",
    parent: "mirrors",
  },
  "guong-oval": {
    name: "Gương oval",
    description: "Gương oval với thiết kế thanh lịch và hiện đại.",
    banner: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&auto=format&fit=crop&q=60",
    parent: "mirrors",
  },
  "guong-bo": {
    name: "Bộ gương trang trí",
    description: "Bộ gương trang trí, tạo điểm nhấn nghệ thuật cho tường.",
    banner: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&auto=format&fit=crop&q=60",
    parent: "mirrors",
  },
  // Subcategories - Wall Decor
  "macrame-tuong": {
    name: "Macrame treo tường",
    description: "Macrame treo tường handmade, phong cách boho ấm cúng.",
    banner: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&auto=format&fit=crop&q=60",
    parent: "wall-decor",
  },
  "dia-may-tre": {
    name: "Đĩa mây tre decor",
    description: "Đĩa mây tre trang trí tường, mang nét đẹp truyền thống.",
    banner: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&auto=format&fit=crop&q=60",
    parent: "wall-decor",
  },
  "tranh-tu-nhien": {
    name: "Tranh từ vật liệu tự nhiên",
    description: "Tranh nghệ thuật từ vật liệu tự nhiên, độc đáo và thân thiện.",
    banner: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&auto=format&fit=crop&q=60",
    parent: "wall-decor",
  },
  // Subcategories - Vases
  "lo-hoa-may": {
    name: "Lọ hoa mây tre",
    description: "Lọ hoa mây tre đan tay, tôn vinh vẻ đẹp của hoa.",
    banner: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&auto=format&fit=crop&q=60",
    parent: "vases",
  },
  "chau-cay-coi": {
    name: "Chậu cây cói",
    description: "Chậu cây cói tự nhiên, mang thiên nhiên vào không gian sống.",
    banner: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&auto=format&fit=crop&q=60",
    parent: "vases",
  },
  "gio-treo-cay": {
    name: "Giỏ treo cây",
    description: "Giỏ treo cây macrame và mây tre, trang trí xanh cho nhà.",
    banner: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&auto=format&fit=crop&q=60",
    parent: "vases",
  },
};

// All main categories for navigation (matching CategoryMenu)
const mainCategories = [
  { id: "trays", name: "Giỏ & Khay Đựng Đồ", image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=300&auto=format&fit=crop&q=60" },
  { id: "lamps", name: "Đèn Mây Tre Trang Trí", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=60" },
  { id: "shelves", name: "Đồ Nội Thất Tự Nhiên", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=60" },
  { id: "bags", name: "Phụ Kiện Thời Trang Thủ Công", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300&auto=format&fit=crop&q=60" },
  { id: "mirrors", name: "Gương Trang Trí", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=300&auto=format&fit=crop&q=60" },
  { id: "decor-shelves", name: "Kệ & Giá Treo Decor", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&auto=format&fit=crop&q=60" },
  { id: "wall-decor", name: "Trang Trí Tường", image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=300&auto=format&fit=crop&q=60" },
  { id: "vases", name: "Lọ Hoa & Chậu Cây Decor", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&auto=format&fit=crop&q=60" },
  { id: "gifts", name: "Quà Tặng Thủ Công", image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=300&auto=format&fit=crop&q=60" },
];

// Mock products data
const allProducts: Product[] = [
  // Bags
  { id: 1, categoryId: "bags", name: "Túi cói đan tay Chiêm", price: "450.000đ", oldPrice: "550.000đ", discount: "-18%", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=60", colors: ["#D2B48C", "#8B4513", "#F5DEB3"] },
  { id: 2, categoryId: "bags", name: "Túi xách mây tre vintage", price: "680.000đ", oldPrice: "850.000đ", discount: "-20%", image: "https://images.unsplash.com/photo-1523779105324-a5e28371ad9a?w=400&auto=format&fit=crop&q=60", colors: ["#D2B48C", "#A0522D"] },
  { id: 3, categoryId: "bags", name: "Túi cói mini đeo chéo", price: "320.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=60", colors: ["#F5DEB3"] },
  { id: 4, categoryId: "bags", name: "Túi đựng laptop mây tre", price: "890.000đ", oldPrice: "1.100.000đ", discount: "-19%", image: "https://images.unsplash.com/photo-1523779105324-a5e28371ad9a?w=400&auto=format&fit=crop&q=60", colors: [] },
  { id: 5, categoryId: "bags", name: "Túi tote cói lớn", price: "520.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=60", colors: ["#D2B48C", "#8B4513"] },
  { id: 6, categoryId: "bags", name: "Ví cầm tay mây tre", price: "280.000đ", oldPrice: "350.000đ", discount: "-20%", image: "https://images.unsplash.com/photo-1523779105324-a5e28371ad9a?w=400&auto=format&fit=crop&q=60", colors: [] },
  // Lamps
  { id: 7, categoryId: "lamps", name: "Đèn thả trần mây tre", price: "1.500.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1513506003013-d531625a020d?w=400&auto=format&fit=crop&q=60", colors: [] },
  { id: 8, categoryId: "lamps", name: "Đèn ngủ để bàn", price: "650.000đ", oldPrice: "750.000đ", discount: "-13%", image: "https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=400&auto=format&fit=crop&q=60", colors: ["#F4A460"] },
  { id: 9, categoryId: "lamps", name: "Đèn lồng trang trí", price: "420.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1513506003013-d531625a020d?w=400&auto=format&fit=crop&q=60", colors: ["#D2B48C", "#8B4513"] },
  { id: 10, categoryId: "lamps", name: "Đèn treo tường mây", price: "380.000đ", oldPrice: "450.000đ", discount: "-16%", image: "https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=400&auto=format&fit=crop&q=60", colors: [] },
  { id: 11, categoryId: "lamps", name: "Đèn bàn làm việc", price: "550.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1513506003013-d531625a020d?w=400&auto=format&fit=crop&q=60", colors: ["#F5DEB3"] },
  { id: 12, categoryId: "lamps", name: "Đèn sàn góc phòng", price: "1.200.000đ", oldPrice: "1.500.000đ", discount: "-20%", image: "https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=400&auto=format&fit=crop&q=60", colors: [] },
  // Trays
  { id: 13, categoryId: "trays", name: "Khay mây tròn", price: "250.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&auto=format&fit=crop&q=60", colors: [] },
  { id: 14, categoryId: "trays", name: "Giỏ đựng đồ lớn", price: "380.000đ", oldPrice: "450.000đ", discount: "-16%", image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&auto=format&fit=crop&q=60", colors: ["#D2B48C"] },
  { id: 15, categoryId: "trays", name: "Khay phục vụ oval", price: "320.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&auto=format&fit=crop&q=60", colors: [] },
  { id: 16, categoryId: "trays", name: "Giỏ picnic có nắp", price: "580.000đ", oldPrice: "680.000đ", discount: "-15%", image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&auto=format&fit=crop&q=60", colors: [] },
  // Shelves
  { id: 17, categoryId: "shelves", name: "Kệ treo tường gỗ", price: "450.000đ", oldPrice: "500.000đ", discount: "-10%", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&auto=format&fit=crop&q=60", colors: ["#8B4513"] },
  { id: 18, categoryId: "shelves", name: "Giá treo macrame", price: "280.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&auto=format&fit=crop&q=60", colors: ["#F5DEB3", "#D2B48C"] },
  { id: 19, categoryId: "shelves", name: "Kệ góc mây tre", price: "620.000đ", oldPrice: "750.000đ", discount: "-17%", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&auto=format&fit=crop&q=60", colors: [] },
  { id: 20, categoryId: "shelves", name: "Giá đỡ cây cảnh", price: "350.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&auto=format&fit=crop&q=60", colors: ["#8B4513"] },
  // Gifts
  { id: 21, categoryId: "gifts", name: "Hộp quà tết mây tre", price: "550.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=60", colors: [] },
  { id: 22, categoryId: "gifts", name: "Set quà tặng mini", price: "380.000đ", oldPrice: "450.000đ", discount: "-16%", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=60", colors: [] },
  { id: 23, categoryId: "gifts", name: "Hộp đựng trang sức", price: "290.000đ", oldPrice: "", discount: "", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=60", colors: ["#D2B48C", "#F5DEB3"] },
  { id: 24, categoryId: "gifts", name: "Bộ lót ly mây tre", price: "180.000đ", oldPrice: "220.000đ", discount: "-18%", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=60", colors: [] },
];

const sortOptions = [
  { value: "default", label: "Mặc định" },
  { value: "name-asc", label: "Tên A-Z" },
  { value: "name-desc", label: "Tên Z-A" },
  { value: "new", label: "Hàng mới" },
  { value: "price-asc", label: "Giá thấp đến cao" },
  { value: "price-desc", label: "Giá cao xuống thấp" },
];

// Filter data
const priceRanges = [
  { id: "under-2m", label: "Dưới 2 triệu" },
  { id: "2m-6m", label: "Từ 2 triệu - 6 triệu" },
  { id: "6m-15m", label: "Từ 6 triệu - 15 triệu" },
  { id: "15m-20m", label: "Từ 15 triệu - 20 triệu" },
  { id: "over-20m", label: "Trên 20 triệu" },
];

const productTypes = [
  { id: "gift", label: "Quà tặng" },
  { id: "chandelier", label: "Đèn chùm" },
  { id: "fashion", label: "Thời trang" },
  { id: "jewelry", label: "Trang sức" },
  { id: "furniture", label: "Nội thất" },
];

const brands = [
  { id: "hanyin", label: "Hanyin" },
  { id: "meehkoe", label: "Meehkoe" },
  { id: "luna", label: "Luna" },
  { id: "hapro-craft", label: "Hapro Craft" },
  { id: "bamboo-pecker", label: "Bamboo pecker" },
  { id: "handicraft", label: "Handicraft" },
];

const colors = [
  { id: "white", label: "Trắng", hex: "#FFFFFF", border: true },
  { id: "blue", label: "Xanh", hex: "#2563EB" },
  { id: "pink", label: "Hồng", hex: "#EC4899" },
  { id: "gray", label: "Xám", hex: "#9CA3AF" },
  { id: "beige", label: "Beige", hex: "#D4A574" },
  { id: "black", label: "Đen", hex: "#1F2937" },
];

const materials = [
  { id: "rattan", label: "Mây tre" },
  { id: "bamboo", label: "Tre" },
  { id: "seagrass", label: "Cói" },
  { id: "wood", label: "Gỗ" },
  { id: "fabric", label: "Vải" },
];

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const category = categoriesData[slug];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  // Filter states
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [showCarouselArrows, setShowCarouselArrows] = useState(false);

  // Drag scroll states
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  // Drag handlers for carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftPos(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier

    // Only set hasDragged if moved more than 5px
    if (Math.abs(x - startX) > 5) {
      setHasDragged(true);
    }

    scrollContainerRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reset hasDragged after a short delay to allow click to be processed
    setTimeout(() => setHasDragged(false), 100);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedProductTypes([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
  };

  const hasActiveFilters =
    selectedPriceRanges.length > 0 ||
    selectedProductTypes.length > 0 ||
    selectedBrands.length > 0 ||
    selectedColors.length > 0 ||
    selectedMaterials.length > 0;

  // Get subcategories to display - if has subCategories show them, otherwise show sibling categories
  const displayCategories = useMemo(() => {
    if (category?.subCategories && category.subCategories.length > 0) {
      return category.subCategories;
    }
    // Show all main categories as siblings
    return mainCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      image: cat.image,
      productCount: allProducts.filter(p => p.categoryId === cat.id).length
    }));
  }, [slug, category]);

  // Parse price string to number
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^\d]/g, ""));
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    // If "all" category, show all products
    let products = slug === "all"
      ? [...allProducts]
      : allProducts.filter((p) => p.categoryId === slug);

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-desc":
        products.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "name-asc":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return products;
  }, [slug, sortBy]);

  // Scroll functions for category carousel
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Check if carousel needs arrows (content overflows)
  React.useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowCarouselArrows(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [displayCategories]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Danh mục không tồn tại</h1>
          <Link href="/" className="text-[#C59263] hover:underline">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <div
        className="relative h-56 bg-cover bg-center"
        style={{
          backgroundImage: `url('${category.banner}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">{category.name}</h1>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Link href="/" className="flex items-center gap-1 hover:text-white">
              <Home size={16} />
              Trang chủ
            </Link>
            <span>/</span>
            <span>{category.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Sub-categories Carousel */}
        <div className="py-10 border-b border-gray-200">
          <div className="relative group/carousel">
            {/* Left Arrow - Only show when content overflows and on hover */}
            {showCarouselArrows && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-[#C59263] hover:shadow-xl transition-all opacity-0 group-hover/carousel:opacity-100"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Categories Container - Centered when not overflowing */}
            <div
              ref={scrollContainerRef}
              className={`flex gap-10 overflow-x-auto scrollbar-hide ${
                showCarouselArrows ? "px-16" : "justify-center"
              } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {displayCategories.map((subCat) => (
                <Link
                  key={subCat.id}
                  href={categoriesData[subCat.id] ? `/categories/${subCat.id}` : "#"}
                  className={`flex-shrink-0 text-center group/item ${
                    activeSubCategory === subCat.id ? "opacity-100" : ""
                  } select-none`}
                  onClick={(e) => {
                    if (hasDragged) {
                      e.preventDefault();
                      return;
                    }
                    setActiveSubCategory(subCat.id);
                  }}
                  draggable={false}
                >
                  <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-3 border-transparent group-hover/item:border-[#C59263] transition-all shadow-lg pointer-events-none">
                    <img
                      src={subCat.image}
                      alt={subCat.name}
                      className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                      draggable={false}
                    />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 group-hover/item:text-[#C59263] transition-colors line-clamp-2 max-w-[150px] mx-auto">
                    {subCat.name}
                  </h3>
                  {/* Product count / View detail with slide animation */}
                  <div className="h-6 mt-2 overflow-hidden">
                    <div className="transition-transform duration-300 group-hover/item:-translate-y-6">
                      <p className="text-sm text-gray-400 h-6 flex items-center justify-center">
                        {subCat.productCount} sản phẩm
                      </p>
                      <p className="text-sm text-[#C59263] font-medium h-6 flex items-center justify-center">
                        Xem chi tiết
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Arrow - Only show when content overflows and on hover */}
            {showCarouselArrows && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-[#C59263] hover:shadow-xl transition-all opacity-0 group-hover/carousel:opacity-100"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </div>
        </div>

        {/* Toolbar */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
          {/* Left: Filter toggle */}
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-[#C59263] transition-colors bg-white"
          >
            <SlidersHorizontal size={16} />
            Bộ lọc
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-[#C59263] text-white text-xs rounded-full flex items-center justify-center">
                {selectedPriceRanges.length +
                  selectedProductTypes.length +
                  selectedBrands.length +
                  selectedColors.length +
                  selectedMaterials.length}
              </span>
            )}
          </button>

          {/* Right: Sort options */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500 hidden sm:inline">Xếp theo:</span>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  sortBy === option.value
                    ? "bg-[#C59263] text-white"
                    : "text-gray-600 hover:text-[#C59263]"
                }`}
              >
                {sortBy === option.value && <span className="mr-1">●</span>}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm nào.</p>
              <Link href="/" className="text-[#C59263] hover:underline">
                Quay về trang chủ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Filter Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowFilters(false)}
      />

      {/* Filter Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Bộ lọc</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Price Range */}
          <div className="border-b border-gray-100 pb-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#C59263] mb-4">
              <span className="w-2 h-2 bg-[#C59263] rounded-full"></span>
              CHỌN MỨC GIÁ
            </h3>
            <div className="space-y-3">
              {priceRanges.map((range) => (
                <label
                  key={range.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(range.id)}
                    onChange={() =>
                      toggleFilter(range.id, selectedPriceRanges, setSelectedPriceRanges)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-[#C59263] focus:ring-[#C59263]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-[#C59263] transition-colors">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Product Type */}
          <div className="border-b border-gray-100 pb-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#C59263] mb-4">
              <span className="w-2 h-2 bg-[#C59263] rounded-full"></span>
              LOẠI SẢN PHẨM
            </h3>
            <div className="space-y-3">
              {productTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedProductTypes.includes(type.id)}
                    onChange={() =>
                      toggleFilter(type.id, selectedProductTypes, setSelectedProductTypes)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-[#C59263] focus:ring-[#C59263]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-[#C59263] transition-colors">
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="border-b border-gray-100 pb-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#C59263] mb-4">
              <span className="w-2 h-2 bg-[#C59263] rounded-full"></span>
              THƯƠNG HIỆU
            </h3>
            <div className="space-y-3">
              {brands.map((brand) => (
                <label
                  key={brand.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() =>
                      toggleFilter(brand.id, selectedBrands, setSelectedBrands)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-[#C59263] focus:ring-[#C59263]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-[#C59263] transition-colors">
                    {brand.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="border-b border-gray-100 pb-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#C59263] mb-4">
              <span className="w-2 h-2 bg-[#C59263] rounded-full"></span>
              MÀU SẮC
            </h3>
            <div className="space-y-3">
              {colors.map((color) => (
                <label
                  key={color.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      color.border ? "border border-gray-300" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColors.includes(color.id) && (
                      <svg
                        className={`w-3 h-3 ${
                          color.id === "white" || color.id === "beige"
                            ? "text-gray-800"
                            : "text-white"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      toggleFilter(color.id, selectedColors, setSelectedColors)
                    }
                    className="text-sm text-gray-600 group-hover:text-[#C59263] transition-colors"
                  >
                    {color.label}
                  </button>
                </label>
              ))}
            </div>
          </div>

          {/* Material */}
          <div className="pb-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#C59263] mb-4">
              <span className="w-2 h-2 bg-[#C59263] rounded-full"></span>
              CHẤT LIỆU
            </h3>
            <div className="space-y-3">
              {materials.map((material) => (
                <label
                  key={material.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(material.id)}
                    onChange={() =>
                      toggleFilter(material.id, selectedMaterials, setSelectedMaterials)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-[#C59263] focus:ring-[#C59263]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-[#C59263] transition-colors">
                    {material.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button
            onClick={clearAllFilters}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Xóa bộ lọc
          </button>
          <button
            onClick={() => setShowFilters(false)}
            className="flex-1 px-4 py-2.5 bg-[#C59263] text-white rounded-lg text-sm font-medium hover:bg-[#B08253] transition-colors"
          >
            Áp dụng
          </button>
        </div>
      </div>

      {/* Quick View Dialog */}
      <QuickViewDialog
        isOpen={!!quickViewProduct}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Custom scrollbar hide style */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;
