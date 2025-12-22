import React from "react";
import { Shield, Truck, RefreshCcw, Lock, Phone } from "lucide-react";
import { PageHero } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";

const contactInfo = {
  phone: "0976.110.266",
  email: "nhualaysangeverestlight@gmail.com",
  zalo: "https://zalo.me/0976110266",
};

const PoliciesPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <PageHero
        title="Chính Sách"
        subtitle="Cam kết của Everest Light với khách hàng"
        backgroundImage="/images/banners/tam-lop-dac.jpg"
      />

      {/* Quick Links */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#shipping"
              className="px-6 py-2 bg-[#D97706] text-white rounded-full hover:bg-[#B45309] transition-colors"
            >
              Vận chuyển
            </Link>
            <Link
              href="#return"
              className="px-6 py-2 bg-[#D97706] text-white rounded-full hover:bg-[#B45309] transition-colors"
            >
              Đổi trả
            </Link>
            <Link
              href="#warranty"
              className="px-6 py-2 bg-[#D97706] text-white rounded-full hover:bg-[#B45309] transition-colors"
            >
              Bảo hành
            </Link>
            <Link
              href="#privacy"
              className="px-6 py-2 bg-[#D97706] text-white rounded-full hover:bg-[#B45309] transition-colors"
            >
              Bảo mật
            </Link>
          </div>
        </div>
      </section>

      {/* Policies Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Shipping Policy */}
          <div id="shipping" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#D97706] rounded-full flex items-center justify-center">
                <Truck className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#4A3B32]">
                Chính Sách Vận Chuyển
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-[#4A3B32] mb-4">
                Phạm vi giao hàng
              </h3>
              <p className="text-gray-700 mb-4">
                Everest Light giao hàng toàn quốc với đội xe chuyên dụng vận
                chuyển tấm lợp Polycarbonate. Đảm bảo hàng hóa được bảo vệ an
                toàn trong quá trình vận chuyển.
              </p>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Phí vận chuyển
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Miễn phí vận chuyển</strong> cho đơn hàng từ 50m² trở
                  lên trong nội thành Hà Nội
                </li>
                <li>
                  Đơn hàng dưới 50m²: Phí vận chuyển tính theo khoảng cách thực
                  tế
                </li>
                <li>
                  Các tỉnh thành khác: Báo giá theo khối lượng và địa điểm giao
                  hàng
                </li>
                <li>
                  Hỗ trợ vận chuyển bằng xe container cho đơn hàng lớn (dự án,
                  công trình)
                </li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Thời gian giao hàng
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Nội thành Hà Nội: 1-2 ngày làm việc</li>
                <li>Các tỉnh phía Bắc: 2-4 ngày làm việc</li>
                <li>Các tỉnh miền Trung: 4-6 ngày làm việc</li>
                <li>Các tỉnh miền Nam: 5-7 ngày làm việc</li>
                <li>
                  Đơn hàng số lượng lớn: Thời gian theo thỏa thuận với khách
                  hàng
                </li>
              </ul>

              <div className="mt-6 p-4 bg-[#FDF6E9] rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Lưu ý:</strong> Tấm Polycarbonate là vật liệu có kích
                  thước lớn, cần xe chuyên dụng. Vui lòng liên hệ hotline{" "}
                  <Link
                    href={`tel:${contactInfo.phone.replace(/\./g, "")}`}
                    className="text-[#D97706] font-semibold hover:underline"
                  >
                    {contactInfo.phone}
                  </Link>{" "}
                  để được tư vấn phương án vận chuyển phù hợp nhất.
                </p>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div id="return" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#C59263] rounded-full flex items-center justify-center">
                <RefreshCcw className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#4A3B32]">
                Chính Sách Đổi Trả
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-[#4A3B32] mb-4">
                Điều kiện đổi trả
              </h3>
              <p className="text-gray-700 mb-4">
                Everest Light chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ
                ngày nhận hàng với các điều kiện sau:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Sản phẩm còn nguyên vẹn, chưa qua lắp đặt hoặc cắt gọt</li>
                <li>Còn đầy đủ bao bì, màng bảo vệ, hóa đơn mua hàng</li>
                <li>Sản phẩm bị lỗi do nhà sản xuất (rạn, nứt, ố vàng...)</li>
                <li>
                  Sản phẩm không đúng quy cách, màu sắc, độ dày như đã đặt hàng
                </li>
                <li>Nhầm lẫn trong quá trình xuất kho, giao hàng</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Các trường hợp không được đổi trả
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Sản phẩm đã được lắp đặt hoặc cắt theo yêu cầu</li>
                <li>
                  Hư hỏng do vận chuyển không đúng cách (do khách hàng tự vận
                  chuyển)
                </li>
                <li>
                  Hư hỏng do bảo quản không đúng hướng dẫn (để ngoài trời, chồng
                  đè...)
                </li>
                <li>Quá thời hạn 7 ngày kể từ ngày nhận hàng</li>
                <li>Sản phẩm đặt theo yêu cầu riêng (kích thước đặc biệt)</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Quy trình đổi trả
              </h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>
                  Liên hệ hotline{" "}
                  <Link
                    href={`tel:${contactInfo.phone.replace(/\./g, "")}`}
                    className="text-[#D97706] font-semibold"
                  >
                    {contactInfo.phone}
                  </Link>{" "}
                  hoặc{" "}
                  <Link
                    href={contactInfo.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D97706] font-semibold"
                  >
                    Zalo
                  </Link>{" "}
                  để thông báo
                </li>
                <li>
                  Cung cấp thông tin đơn hàng, hình ảnh sản phẩm và lý do đổi
                  trả
                </li>
                <li>Nhân viên kỹ thuật sẽ kiểm tra và xác nhận</li>
                <li>
                  Đóng gói sản phẩm cẩn thận và chờ đội vận chuyển đến nhận
                </li>
                <li>
                  Xử lý đổi trả trong vòng 3-5 ngày làm việc sau khi nhận hàng
                </li>
              </ol>

              <div className="mt-6 p-4 bg-[#FDF6E9] rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Lưu ý:</strong> Chi phí vận chuyển đổi trả do Everest
                  Light chịu trong trường hợp sản phẩm bị lỗi hoặc giao sai. Các
                  trường hợp khác, khách hàng chịu chi phí vận chuyển.
                </p>
              </div>
            </div>
          </div>

          {/* Warranty Policy */}
          <div id="warranty" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#8B4513] rounded-full flex items-center justify-center">
                <Shield className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#4A3B32]">
                Chính Sách Bảo Hành
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-[#4A3B32] mb-4">
                Thời gian bảo hành
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#D97706] text-white">
                      <th className="border border-gray-200 px-4 py-3 text-left">
                        Loại sản phẩm
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-left">
                        Thời gian bảo hành
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">
                        Tấm Polycarbonate đặc (Solid Sheet)
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-[#D97706]">
                        15 năm
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">
                        Tấm Polycarbonate rỗng (Multiwall)
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-[#D97706]">
                        10 năm
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">
                        Tấm Polycarbonate sóng (Corrugated)
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-[#D97706]">
                        10 năm
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">
                        Phụ kiện lắp đặt
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-[#D97706]">
                        12 tháng
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Nội dung bảo hành
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Bảo hành không ố vàng:</strong> Tấm giữ nguyên độ
                  trong suốt, không ngả màu trong suốt thời gian bảo hành
                </li>
                <li>
                  <strong>Bảo hành không giòn gãy:</strong> Tấm giữ nguyên độ
                  dẻo dai, chịu lực va đập tốt
                </li>
                <li>
                  <strong>Bảo hành độ truyền sáng:</strong> Đảm bảo độ truyền
                  sáng giảm không quá 10% so với ban đầu
                </li>
                <li>
                  <strong>Bảo hành lớp UV:</strong> Lớp chống tia UV không bong
                  tróc, đảm bảo hiệu quả bảo vệ
                </li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Điều kiện bảo hành
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Còn trong thời gian bảo hành</li>
                <li>Có phiếu bảo hành hoặc hóa đơn mua hàng</li>
                <li>
                  Lắp đặt đúng kỹ thuật (mặt có lớp UV hướng lên trên, khoảng
                  cách xà gồ đúng quy định)
                </li>
                <li>Bảo quản và sử dụng đúng hướng dẫn của nhà sản xuất</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Không áp dụng bảo hành
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  Lắp đặt sai kỹ thuật (lắp ngược mặt UV, không để khe giãn
                  nở...)
                </li>
                <li>Hư hỏng do tác động ngoại lực mạnh (cây đổ, vật rơi...)</li>
                <li>Hư hỏng do thiên tai, hỏa hoạn, bão lũ</li>
                <li>
                  Sử dụng trong môi trường hóa chất ăn mòn không được khuyến cáo
                </li>
                <li>Tự ý sửa chữa, thay đổi kết cấu sản phẩm</li>
                <li>Mất phiếu bảo hành và không có hóa đơn mua hàng</li>
              </ul>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Cam kết Everest Light:</strong> Sản phẩm được sản xuất
                  trên dây chuyền chuẩn Châu Âu, đạt tiêu chuẩn ISO & CE. Chúng
                  tôi cam kết bảo hành trọn đời về chất lượng tư vấn và hỗ trợ
                  kỹ thuật.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div id="privacy" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#A0522D] rounded-full flex items-center justify-center">
                <Lock className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#4A3B32]">
                Chính Sách Bảo Mật
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-[#4A3B32] mb-4">
                Thu thập thông tin
              </h3>
              <p className="text-gray-700 mb-4">
                Chúng tôi thu thập thông tin của quý khách khi:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Gửi yêu cầu báo giá hoặc đặt hàng</li>
                <li>Đăng ký nhận thông tin sản phẩm mới, khuyến mãi</li>
                <li>Liên hệ tư vấn qua hotline, Zalo, Messenger</li>
                <li>Để lại thông tin tại các hội chợ, triển lãm</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Sử dụng thông tin
              </h3>
              <p className="text-gray-700 mb-4">
                Thông tin của quý khách được sử dụng để:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Xử lý yêu cầu báo giá và đơn hàng</li>
                <li>Tư vấn kỹ thuật và hỗ trợ lựa chọn sản phẩm phù hợp</li>
                <li>Thông báo tình trạng đơn hàng và giao hàng</li>
                <li>
                  Gửi thông tin khuyến mãi, sản phẩm mới (nếu quý khách đồng ý)
                </li>
                <li>Chăm sóc khách hàng sau bán hàng</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Bảo vệ thông tin
              </h3>
              <p className="text-gray-700 mb-4">
                Everest Light cam kết bảo vệ thông tin của quý khách bằng các
                biện pháp:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Không chia sẻ thông tin khách hàng cho bên thứ ba</li>
                <li>Bảo mật thông tin liên hệ và lịch sử giao dịch</li>
                <li>Giới hạn quyền truy cập thông tin khách hàng</li>
                <li>Đào tạo nhân viên về bảo mật thông tin</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Chia sẻ thông tin
              </h3>
              <p className="text-gray-700 mb-4">
                Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin của quý
                khách với bên thứ ba, trừ các trường hợp:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Với đơn vị vận chuyển để giao hàng</li>
                <li>Theo yêu cầu của cơ quan pháp luật có thẩm quyền</li>
                <li>Với sự đồng ý của quý khách</li>
              </ul>

              <div className="mt-6 p-4 bg-[#FDF6E9] rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Liên hệ:</strong> Nếu quý khách có bất kỳ thắc mắc nào
                  về chính sách bảo mật, vui lòng liên hệ với chúng tôi qua
                  email:{" "}
                  <Link
                    href={`mailto:${contactInfo.email}`}
                    className="text-[#D97706] font-semibold hover:underline"
                  >
                    {contactInfo.email}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-[#4A3B32] to-[#6B5344] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Cần hỗ trợ thêm?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Đội ngũ tư vấn Everest Light luôn sẵn sàng giải đáp mọi thắc mắc
              của quý khách về sản phẩm và chính sách.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`tel:${contactInfo.phone.replace(/\./g, "")}`}
                className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#C77A06] text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                <Phone size={20} />
                {contactInfo.phone}
              </Link>
              <Link
                href={contactInfo.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0068FF] hover:bg-[#0054CC] text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                <Image
                  src="/icons/zalo_icon.svg"
                  alt="Zalo"
                  width={24}
                  height={24}
                />
                Zalo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Gửi yêu cầu tư vấn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoliciesPage;
