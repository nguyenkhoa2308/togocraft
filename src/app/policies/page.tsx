import React from "react";
import { Shield, Truck, RefreshCcw, Lock } from "lucide-react";
import { PageHero } from "@/components/ui";

const PoliciesPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <PageHero
        title="Chính Sách"
        subtitle="Cam kết của chúng tôi với khách hàng"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=80"
      />

      {/* Quick Links */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#shipping"
              className="px-6 py-2 bg-[#D97706] text-white rounded-full hover:bg-[#B45309] transition-colors"
            >
              Vận chuyển
            </a>
            <a
              href="#return"
              className="px-6 py-2 bg-[#D97706] text-white rounded-full hover:bg-[#B45309] transition-colors"
            >
              Đổi trả
            </a>
            <a
              href="#warranty"
              className="px-6 py-2 bg-[#D97706] text-white rounded-full hover:bg-[#B45309] transition-colors"
            >
              Bảo hành
            </a>
            <a
              href="#privacy"
              className="px-6 py-2 bg-[#D97706] text-white rounded-full hover:bg-[#B45309] transition-colors"
            >
              Bảo mật
            </a>
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
                Sudes Craft giao hàng toàn quốc, bao gồm cả các vùng sâu, vùng
                xa. Thời gian giao hàng tùy thuộc vào địa điểm nhận hàng.
              </p>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Phí vận chuyển
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Miễn phí vận chuyển cho đơn hàng từ 500.000đ trở lên</li>
                <li>
                  Phí vận chuyển 30.000đ cho đơn hàng dưới 500.000đ (nội thành
                  Hà Nội)
                </li>
                <li>
                  Phí vận chuyển 50.000đ - 100.000đ cho các tỉnh thành khác (tùy
                  khu vực)
                </li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Thời gian giao hàng
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Nội thành Hà Nội: 1-2 ngày làm việc</li>
                <li>Các tỉnh thành lân cận: 2-3 ngày làm việc</li>
                <li>Các tỉnh thành khác: 3-5 ngày làm việc</li>
                <li>Vùng sâu, vùng xa: 5-7 ngày làm việc</li>
              </ul>

              <div className="mt-6 p-4 bg-[#FDF6E9] rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Lưu ý:</strong> Thời gian giao hàng có thể thay đổi
                  tùy theo tình hình thực tế và điều kiện thời tiết, giao thông.
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
                Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ
                ngày nhận hàng với các điều kiện sau:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng</li>
                <li>Còn đầy đủ bao bì, nhãn mác, hóa đơn mua hàng</li>
                <li>Sản phẩm bị lỗi do nhà sản xuất</li>
                <li>
                  Sản phẩm không đúng như mô tả hoặc nhầm lẫn trong quá trình
                  giao hàng
                </li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Các trường hợp không được đổi trả
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Sản phẩm đã qua sử dụng hoặc bị hư hỏng do người mua</li>
                <li>Sản phẩm không còn nguyên vẹn bao bì, nhãn mác</li>
                <li>Quá thời hạn 7 ngày kể từ ngày nhận hàng</li>
                <li>
                  Sản phẩm thuộc chương trình khuyến mãi đặc biệt (trừ lỗi do
                  nhà sản xuất)
                </li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Quy trình đổi trả
              </h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>
                  Liên hệ bộ phận chăm sóc khách hàng qua hotline hoặc email
                </li>
                <li>Cung cấp thông tin đơn hàng và lý do đổi trả</li>
                <li>Đóng gói sản phẩm cẩn thận và gửi lại theo hướng dẫn</li>
                <li>
                  Chúng tôi sẽ kiểm tra và xử lý trong vòng 3-5 ngày làm việc
                </li>
              </ol>

              <div className="mt-6 p-4 bg-[#FDF6E9] rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Lưu ý:</strong> Chi phí vận chuyển đổi trả do Sudes
                  Craft chịu trong trường hợp sản phẩm bị lỗi. Các trường hợp
                  khác, khách hàng vui lòng chịu phí vận chuyển.
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
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Sản phẩm đèn mây tre: Bảo hành 6 tháng</li>
                <li>Giỏ, khay, kệ mây tre: Bảo hành 3 tháng</li>
                <li>Đồ decor, trang trí: Bảo hành 3 tháng</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Điều kiện bảo hành
              </h3>
              <p className="text-gray-700 mb-4">
                Sản phẩm được bảo hành khi đáp ứng các điều kiện sau:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Còn trong thời gian bảo hành</li>
                <li>Có phiếu bảo hành hoặc hóa đơn mua hàng</li>
                <li>
                  Lỗi do nhà sản xuất (gãy, nứt không do tác động ngoại lực)
                </li>
                <li>Sử dụng đúng mục đích và theo hướng dẫn</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Không áp dụng bảo hành
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Hư hỏng do tác động ngoại lực, va đập mạnh</li>
                <li>Hư hỏng do sử dụng không đúng mục đích</li>
                <li>Hư hỏng do thiên tai, hỏa hoạn, ngập nước</li>
                <li>
                  Sản phẩm đã được sửa chữa tại nơi không phải là Sudes Craft
                </li>
                <li>Mất, rách phiếu bảo hành hoặc không có hóa đơn</li>
              </ul>
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
                Chúng tôi thu thập thông tin cá nhân của bạn khi bạn:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Đăng ký tài khoản trên website</li>
                <li>Đặt hàng hoặc mua sản phẩm</li>
                <li>Đăng ký nhận bản tin, khuyến mãi</li>
                <li>Liên hệ với bộ phận chăm sóc khách hàng</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Sử dụng thông tin
              </h3>
              <p className="text-gray-700 mb-4">
                Thông tin của bạn được sử dụng để:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Xử lý đơn hàng và giao hàng</li>
                <li>Cung cấp dịch vụ chăm sóc khách hàng</li>
                <li>Gửi thông tin khuyến mãi, sản phẩm mới (nếu bạn đồng ý)</li>
                <li>Cải thiện chất lượng dịch vụ và trải nghiệm người dùng</li>
                <li>Tuân thủ các quy định pháp luật</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Bảo vệ thông tin
              </h3>
              <p className="text-gray-700 mb-4">
                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn bằng các biện
                pháp:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Mã hóa thông tin thanh toán và dữ liệu nhạy cảm</li>
                <li>Sử dụng tường lửa và hệ thống bảo mật tiên tiến</li>
                <li>Giới hạn quyền truy cập thông tin khách hàng</li>
                <li>Đào tạo nhân viên về bảo mật thông tin</li>
              </ul>

              <h3 className="text-xl font-bold text-[#4A3B32] mb-4 mt-6">
                Chia sẻ thông tin
              </h3>
              <p className="text-gray-700 mb-4">
                Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của
                bạn với bên thứ ba, trừ các trường hợp:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Với đơn vị vận chuyển để giao hàng</li>
                <li>Với cổng thanh toán để xử lý giao dịch</li>
                <li>Theo yêu cầu của cơ quan pháp luật có thẩm quyền</li>
                <li>Với sự đồng ý của bạn</li>
              </ul>

              <div className="mt-6 p-4 bg-[#FDF6E9] rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Liên hệ:</strong> Nếu bạn có bất kỳ thắc mắc nào về
                  chính sách bảo mật, vui lòng liên hệ với chúng tôi qua email:
                  privacy@sudescraft.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoliciesPage;
