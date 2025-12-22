"use client";

import React, { useState } from "react";
import { ProductDetail, Review } from "@/types/product";
import { Star, CheckCircle, ShoppingBag } from "lucide-react";

interface ProductTabsProps {
  product: ProductDetail;
  reviews?: Review[];
  hasPurchased?: boolean; // Người dùng đã mua sản phẩm này chưa
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  reviews = [],
  hasPurchased = false,
}) => {
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  // Tính điểm trung bình
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  // Đếm số lượng mỗi mức sao
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((r) => r.rating === star).length
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gửi đánh giá lên server
    console.log({ rating: reviewRating, comment: reviewComment });
    setReviewComment("");
    setReviewRating(5);
  };

  const renderStars = (rating: number, size: number = 16) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
    );
  };
  const [activeTab, setActiveTab] = useState<
    "description" | "guide" | "reviews"
  >("description");

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Tabs and Content */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          {/* Tabs Header */}
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 px-1 mr-8 font-bold text-sm uppercase tracking-wide transition-colors whitespace-nowrap ${
                activeTab === "description"
                  ? "border-b-2 border-[#C59263] text-[#C59263]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Mô tả sản phẩm
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`pb-4 px-1 mr-8 font-bold text-sm uppercase tracking-wide transition-colors whitespace-nowrap ${
                activeTab === "guide"
                  ? "border-b-2 border-[#C59263] text-[#C59263]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Hướng dẫn mua hàng
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 px-1 font-bold text-sm uppercase tracking-wide transition-colors whitespace-nowrap ${
                activeTab === "reviews"
                  ? "border-b-2 border-[#C59263] text-[#C59263]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Đánh giá
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === "description" && (
              <div className="text-gray-600 leading-relaxed space-y-4">
                <h3 className="font-bold text-lg text-[#4A3B32] mb-2">
                  {product.name}
                </h3>
                {product.description ? (
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                ) : (
                  <p>Đang cập nhật mô tả...</p>
                )}

                <div className="mt-6">
                  <p className="mb-2">
                    Thiết kế <strong>dáng chữ U hiện đại</strong>, điểm xuyết
                    hoa văn thêu tay nhẹ nhàng giúp chiếc túi vừa thanh lịch vừa
                    độc đáo – phù hợp cho nhiều phong cách thời trang: từ dạo
                    phố, du lịch, đến các buổi tiệc nhẹ.
                  </p>
                  <p className="mb-2">
                    Chất liệu <strong>cỏ Kouna và mây tự nhiên</strong> mang đến
                    cảm giác gần gũi, thân thiện môi trường nhưng vẫn giữ được
                    độ bền, nhẹ và thoáng khí.
                  </p>
                  <p className="mt-4 mb-2">
                    Không chỉ là một món phụ kiện thời trang, túi Kouna còn là{" "}
                    <strong>
                      tuyên ngôn về lối sống xanh, thời trang bền vững và tôn
                      trọng thiên nhiên.
                    </strong>
                  </p>
                  <p>
                    Hoàn hảo để làm <strong>quà tặng thủ công</strong> cho người
                    thân, bạn bè hoặc những ai yêu thích phong cách tự nhiên,
                    mộc mạc nhưng tinh tế.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "guide" && (
              <div className="text-gray-600">
                <h3 className="font-bold text-lg text-[#4A3B32] mb-4">
                  Hướng dẫn mua hàng
                </h3>
                <p>Nội dung hướng dẫn mua hàng đang được cập nhật...</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-gray-600">
                {/* Rating Summary */}
                <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-gray-200">
                  {/* Average Rating */}
                  <div className="text-center md:text-left">
                    <div className="text-5xl font-bold text-[#4A3B32] mb-2">
                      {averageRating.toFixed(1)}
                    </div>
                    {renderStars(Math.round(averageRating), 20)}
                    <p className="text-sm text-gray-500 mt-2">
                      {reviews.length} đánh giá
                    </p>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star, index) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm w-12">{star} sao</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{
                              width:
                                reviews.length > 0
                                  ? `${(ratingCounts[index] / reviews.length) * 100}%`
                                  : "0%",
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-8">
                          {ratingCounts[index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Write Review Form - Chỉ hiện khi đã mua hàng */}
                {hasPurchased ? (
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <h4 className="font-bold text-[#4A3B32] mb-4">
                      Viết đánh giá của bạn
                    </h4>
                    <form onSubmit={handleSubmitReview}>
                      {/* Star Rating Input */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Đánh giá của bạn
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1 transition-transform hover:scale-110"
                            >
                              <Star
                                size={28}
                                className={
                                  star <= (hoverRating || reviewRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Comment */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nhận xét
                        </label>
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          rows={4}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C59263] focus:border-transparent resize-none text-gray-800 placeholder:text-gray-400 bg-white"
                          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-[#C59263] hover:bg-[#A67B4D] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                      >
                        Gửi đánh giá
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="mb-8 pb-8 border-b border-gray-200 bg-gray-50 rounded-lg p-6 text-center">
                    <ShoppingBag size={40} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium">
                      Bạn cần mua sản phẩm này để có thể đánh giá
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Chỉ những khách hàng đã mua sản phẩm mới có thể viết đánh giá
                    </p>
                  </div>
                )}

                {/* Reviews List */}
                <div>
                  <h4 className="font-bold text-[#4A3B32] mb-4">
                    Tất cả đánh giá ({reviews.length})
                  </h4>

                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-100 pb-6 last:border-0"
                        >
                          <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-[#E8DCCF] flex items-center justify-center text-[#4A3B32] font-semibold flex-shrink-0">
                              {review.userAvatar ? (
                                <img
                                  src={review.userAvatar}
                                  alt={review.userName}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                review.userName.charAt(0).toUpperCase()
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-[#4A3B32]">
                                  {review.userName}
                                </span>
                                {review.isVerifiedPurchase && (
                                  <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                    <CheckCircle size={12} />
                                    Đã mua hàng
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                {renderStars(review.rating, 14)}
                                <span className="text-sm text-gray-500">
                                  {review.date}
                                </span>
                              </div>

                              <p className="text-gray-600">{review.comment}</p>

                              {/* Review Images */}
                              {review.images && review.images.length > 0 && (
                                <div className="flex gap-2 mt-3">
                                  {review.images.map((img, idx) => (
                                    <img
                                      key={idx}
                                      src={img}
                                      alt={`Review ${idx + 1}`}
                                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      Chưa có đánh giá nào cho sản phẩm này.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Detailed Info Table - Sticky */}
        <div className="lg:col-span-1 lg:sticky lg:top-20 order-1 lg:order-2">
          <h3 className="font-bold text-lg text-[#4A3B32] mb-4 uppercase">
            Thông tin chi tiết
          </h3>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold text-gray-700 w-1/3 bg-gray-100">
                    Chất liệu
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Cỏ Kouna tự nhiên & mây tre kết hợp thêu tay thủ công
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-100">
                    Kỹ thuật
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Đan thủ công kết hợp thêu hoa văn trang trí tinh xảo
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-100">
                    Kiểu dáng
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Dáng chữ U (U-Shaped) thanh lịch, có quai cầm
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-100">
                    Màu sắc
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Tự nhiên, điểm nhấn hoa văn thêu tay nhiều màu
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-100">
                    Kích thước
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Khoảng 35 x 30 x 12 cm (có thể chênh lệch nhẹ do thủ công)
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-100">
                    Trọng lượng
                  </td>
                  <td className="py-3 px-4 text-gray-600">Khoảng 400-500g</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-100">
                    Đặc điểm nổi bật
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Thân thiện môi trường, nhẹ, bền, hoa văn thêu tay tinh tế,
                    phong cách thủ công độc đáo
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-100">
                    Công dụng
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Phụ kiện thời trang, túi xách du lịch, túi decor hoặc quà
                    tặng thủ công cao cấp
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-100">
                    Bảo quản
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Lau nhẹ bằng khăn khô hoặc ẩm, giữ nơi khô ráo, tránh ánh
                    nắng trực tiếp và môi trường ẩm
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-100">
                    Xuất xứ
                  </td>
                  <td className="py-3 px-4 text-gray-600">Thủ công Việt Nam</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
