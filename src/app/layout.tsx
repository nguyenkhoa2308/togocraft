import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Pacifico,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { Footer, Header, NavigationBar, TopBar } from "@/components";
import { ServiceHighlights } from "@/components/home";
import Providers from "@/components/Providers";
import FloatingButtons from "@/components/ui/FloatingButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-pacifico",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Everest Light - Tấm Nhựa Lấy Sáng Polycarbonate Chuẩn Châu Âu",
  description:
    "Everest Light - Thương hiệu hàng đầu về tấm nhựa lấy sáng Polycarbonate cao cấp tại Việt Nam. Sản phẩm đạt chuẩn EU, chống tia UV, chịu va đập gấp 200 lần kính. Hotline: 0976 110 266",
  keywords:
    "everest light, tấm nhựa lấy sáng, tấm polycarbonate, polycarbonate đặc, polycarbonate rỗng, polycarbonate sóng, mái lấy sáng, tấm lợp lấy sáng, vật liệu xây dựng",
  authors: [{ name: "Everest Light" }],
  openGraph: {
    title: "Everest Light - Tấm Nhựa Lấy Sáng Polycarbonate Chuẩn Châu Âu",
    description:
      "Giải pháp lấy sáng thông minh, bền vững và thẩm mỹ cho mọi công trình. Sản phẩm đạt chuẩn EU, bảo hành rõ ràng, giao hàng toàn quốc. Hotline: 0976 110 266",
    type: "website",
    locale: "vi_VN",
    siteName: "Everest Light",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <Providers>
          <TopBar />
          <Header />
          <NavigationBar />

          <main className="min-h-screen">{children}</main>
          <ServiceHighlights />
          <FloatingButtons />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
