"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Home,
  Calendar,
  Clock,
  Eye,
  User,
  ChevronLeft,
  Facebook,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  ArrowRight,
  Tag,
  List,
} from "lucide-react";

// Helper function to extract headings and create TOC
const extractHeadings = (htmlContent: string) => {
  const headingRegex = /<h2>(.*?)<\/h2>/g;
  const headings: { id: string; title: string; originalTitle: string }[] = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const originalTitle = match[1];
    // Remove leading numbers like "1. " or "2. " from title
    const title = originalTitle.replace(/^\d+\.\s*/, "");
    const id = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    headings.push({ id, title, originalTitle });
  }

  return headings;
};

// Helper function to add IDs and numbering to headings in content
const addHeadingIds = (htmlContent: string, headings: { id: string; title: string; originalTitle: string }[]) => {
  let processedContent = htmlContent;

  headings.forEach(({ id, title, originalTitle }, index) => {
    const number = index + 1;
    // Wrap each section with a container div for better styling
    // Use originalTitle to find the heading in content, but display cleaned title
    processedContent = processedContent.replace(
      `<h2>${originalTitle}</h2>`,
      `</div><div class="article-section"><h2 id="${id}" class="scroll-mt-24"><span class="heading-number">${number}</span> ${title}</h2>`
    );
  });

  // Clean up: remove the first empty closing div and add opening/closing wrappers
  processedContent = processedContent.replace('</div><div class="article-section">', '<div class="article-section">');
  processedContent = processedContent + '</div>';

  return processedContent;
};

// Mock articles data (same as in news page)
const articlesData = [
  {
    id: 1,
    slug: "xu-huong-trang-tri-nha-2024",
    title: "Xu hướng trang trí nhà cửa năm 2024: Thiên nhiên và bền vững",
    excerpt: "Khám phá những xu hướng trang trí nội thất hot nhất năm 2024, từ phong cách tối giản đến việc sử dụng vật liệu tự nhiên.",
    content: `
      <p>Năm 2024 đánh dấu sự trở lại mạnh mẽ của phong cách thiết kế nội thất gần gũi với thiên nhiên. Người tiêu dùng ngày càng quan tâm đến việc tạo ra không gian sống xanh, bền vững và thân thiện với môi trường.</p>

      <h2>1. Vật liệu tự nhiên lên ngôi</h2>
      <p>Mây, tre, gỗ tự nhiên và các loại sợi thực vật đang trở thành lựa chọn hàng đầu cho nội thất. Những vật liệu này không chỉ mang lại vẻ đẹp mộc mạc mà còn thể hiện ý thức bảo vệ môi trường của chủ nhân.</p>
      <p>Đặc biệt, các sản phẩm thủ công từ mây tre đan như giỏ đựng đồ, đèn trang trí, khay phục vụ... đang được ưa chuộng vì tính độc đáo và câu chuyện văn hóa đằng sau mỗi sản phẩm.</p>

      <h2>2. Tông màu đất và trung tính</h2>
      <p>Bảng màu năm 2024 tập trung vào các tông màu đất ấm áp như nâu đất, be, terracotta, xanh olive và xám đá. Những gam màu này tạo cảm giác thư thái, gần gũi với thiên nhiên.</p>
      <p>Kết hợp với ánh sáng tự nhiên và cây xanh, không gian sống trở nên tươi mới và tràn đầy năng lượng tích cực.</p>

      <h2>3. Phong cách tối giản có chủ đích</h2>
      <p>Khác với tối giản đơn thuần, xu hướng "intentional minimalism" nhấn mạnh việc lựa chọn kỹ càng từng món đồ. Mỗi vật dụng trong nhà đều có ý nghĩa và công năng rõ ràng.</p>
      <p>Người tiêu dùng ưu tiên chất lượng hơn số lượng, chọn những sản phẩm bền vững, có thể sử dụng lâu dài thay vì những món đồ rẻ tiền dễ hỏng.</p>

      <h2>4. Không gian đa chức năng</h2>
      <p>Với xu hướng làm việc tại nhà tiếp tục phát triển, các không gian đa chức năng trở nên quan trọng hơn bao giờ hết. Phòng khách có thể biến thành văn phòng, phòng ngủ có góc đọc sách và thư giãn.</p>
      <p>Các giải pháp lưu trữ thông minh như giỏ mây đa năng, kệ treo tường giúp tối ưu không gian mà vẫn đảm bảo thẩm mỹ.</p>

      <h2>5. Handmade và câu chuyện thương hiệu</h2>
      <p>Người tiêu dùng hiện đại không chỉ mua sản phẩm mà còn mua câu chuyện đằng sau nó. Các sản phẩm thủ công truyền thống, được làm bởi nghệ nhân địa phương ngày càng được trân trọng.</p>
      <p>Việc sở hữu một món đồ handmade là cách để kết nối với văn hóa, hỗ trợ cộng đồng và góp phần bảo tồn nghề truyền thống.</p>

      <h2>Kết luận</h2>
      <p>Xu hướng trang trí năm 2024 không chỉ là về thẩm mỹ mà còn phản ánh lối sống có trách nhiệm. Hãy bắt đầu từ những thay đổi nhỏ trong không gian sống của bạn để tạo ra một ngôi nhà vừa đẹp vừa bền vững.</p>
    `,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80",
    category: "Mẹo trang trí",
    categorySlug: "decoration-tips",
    author: "Nguyễn Thu Hà",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    authorBio: "Chuyên gia thiết kế nội thất với hơn 10 năm kinh nghiệm",
    date: "2024-01-15",
    readTime: 8,
    views: 2450,
    likes: 156,
    comments: 23,
    tags: ["trang trí", "nội thất", "xu hướng 2024", "bền vững", "thiên nhiên"],
  },
  {
    id: 2,
    slug: "cham-soc-san-pham-may-tre",
    title: "Hướng dẫn chăm sóc sản phẩm mây tre đúng cách",
    excerpt: "Bí quyết giữ cho các sản phẩm mây tre luôn đẹp và bền theo thời gian với những phương pháp đơn giản.",
    content: `
      <p>Sản phẩm mây tre là những tác phẩm thủ công tinh tế, cần được chăm sóc đúng cách để duy trì vẻ đẹp và độ bền theo thời gian. Dưới đây là những hướng dẫn chi tiết giúp bạn bảo quản sản phẩm mây tre một cách tốt nhất.</p>

      <h2>1. Vệ sinh thường xuyên</h2>
      <p>Dùng khăn mềm hoặc chổi lông mềm để phủi bụi hàng tuần. Tránh để bụi bẩn tích tụ lâu ngày vì sẽ khó làm sạch và có thể gây hư hại sợi mây.</p>
      <p>Khi cần làm sạch kỹ hơn, dùng khăn ẩm (không quá ướt) lau nhẹ theo chiều đan của sản phẩm, sau đó lau lại bằng khăn khô.</p>

      <h2>2. Tránh tiếp xúc trực tiếp với nước</h2>
      <p>Mây tre không nên ngâm nước hoặc để ở nơi quá ẩm ướt. Nếu sản phẩm bị ướt, hãy lau khô ngay và để ở nơi thoáng gió cho khô hoàn toàn.</p>
      <p>Độ ẩm cao có thể khiến mây bị mốc, trong khi quá khô có thể làm mây giòn và nứt.</p>

      <h2>3. Bảo vệ khỏi ánh nắng trực tiếp</h2>
      <p>Ánh nắng mặt trời kéo dài sẽ làm phai màu và khô sợi mây. Đặt sản phẩm ở nơi có ánh sáng gián tiếp hoặc sử dụng rèm cửa để bảo vệ.</p>

      <h2>4. Dưỡng ẩm định kỳ</h2>
      <p>Mỗi 3-6 tháng, bạn có thể thoa một lớp dầu olive loãng hoặc dầu dừa lên bề mặt sản phẩm để giữ cho sợi mây mềm mại và bóng đẹp.</p>
      <p>Dùng khăn mềm thấm dầu, lau nhẹ nhàng theo chiều đan, sau đó để khô tự nhiên.</p>

      <h2>5. Xử lý khi bị mốc</h2>
      <p>Nếu phát hiện mốc, dùng hỗn hợp nước và giấm theo tỷ lệ 1:1 để lau sạch vết mốc. Sau đó phơi ở nơi thoáng mát, có gió nhưng tránh ánh nắng trực tiếp.</p>

      <h2>6. Bảo quản đúng cách</h2>
      <p>Khi không sử dụng trong thời gian dài, gói sản phẩm trong giấy báo hoặc vải cotton, để ở nơi khô ráo, thoáng mát.</p>
      <p>Tránh đặt vật nặng lên sản phẩm mây tre để tránh biến dạng.</p>

      <h2>Kết luận</h2>
      <p>Với cách chăm sóc đúng đắn, sản phẩm mây tre có thể đồng hành cùng bạn trong nhiều năm, thậm chí trở thành vật kỷ niệm quý giá truyền qua các thế hệ.</p>
    `,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&auto=format&fit=crop&q=80",
    category: "Hướng dẫn",
    categorySlug: "guides",
    author: "Trần Minh Đức",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    authorBio: "Nghệ nhân mây tre với 20 năm kinh nghiệm làm nghề",
    date: "2024-01-10",
    readTime: 6,
    views: 1820,
    likes: 98,
    comments: 15,
    tags: ["chăm sóc", "mây tre", "bảo quản", "hướng dẫn"],
  },
  {
    id: 3,
    slug: "cau-chuyen-lang-nghe-phu-vinh",
    title: "Câu chuyện làng nghề Phú Vinh: Nơi khởi nguồn của nghệ thuật đan mây",
    excerpt: "Khám phá lịch sử và văn hóa của làng nghề mây tre đan truyền thống Phú Vinh với hơn 400 năm tuổi.",
    content: `
      <p>Làng Phú Vinh, thuộc xã Phú Nghĩa, huyện Chương Mỹ, Hà Nội là một trong những làng nghề mây tre đan lâu đời và nổi tiếng nhất Việt Nam. Với bề dày lịch sử hơn 400 năm, nơi đây không chỉ là cái nôi của nghề đan mây truyền thống mà còn là niềm tự hào của văn hóa thủ công Việt.</p>

      <h2>Lịch sử hình thành</h2>
      <p>Theo các cụ cao niên trong làng, nghề đan mây Phú Vinh bắt đầu từ thế kỷ 16, khi một vị tổ nghề đã mang kỹ thuật đan mây từ vùng Thanh Hóa về làng. Ban đầu, người dân chỉ đan những vật dụng đơn giản phục vụ đời sống như rổ, rá, thúng, mẹt.</p>
      <p>Qua thời gian, với sự sáng tạo và khéo léo của các thế hệ nghệ nhân, sản phẩm mây tre Phú Vinh ngày càng đa dạng và tinh xảo hơn.</p>

      <h2>Kỹ thuật đan truyền thống</h2>
      <p>Điểm đặc biệt của mây tre Phú Vinh nằm ở kỹ thuật đan "mắt cáo" độc đáo, tạo nên những hoa văn tinh tế mà ít làng nghề nào có thể bắt chước được.</p>
      <p>Nguyên liệu mây được tuyển chọn kỹ càng, qua nhiều công đoạn xử lý để đảm bảo độ dẻo dai và màu sắc đẹp. Mỗi sản phẩm hoàn thiện là kết quả của hàng chục giờ lao động tỉ mỉ.</p>

      <h2>Phú Vinh ngày nay</h2>
      <p>Hiện nay, làng Phú Vinh có hơn 1.500 hộ làm nghề, trong đó có nhiều gia đình đã truyền nghề qua 5-6 thế hệ. Sản phẩm của làng không chỉ tiêu thụ trong nước mà còn xuất khẩu sang nhiều quốc gia như Nhật Bản, Hàn Quốc, châu Âu và Mỹ.</p>
      <p>Năm 2013, nghề đan mây tre Phú Vinh được công nhận là Di sản văn hóa phi vật thể quốc gia, khẳng định giá trị văn hóa và nghệ thuật của làng nghề.</p>

      <h2>Thách thức và cơ hội</h2>
      <p>Dù vậy, làng nghề cũng đối mặt với nhiều thách thức như sự cạnh tranh từ hàng công nghiệp, nguồn nguyên liệu khan hiếm và lớp trẻ ít mặn mà với nghề truyền thống.</p>
      <p>Tuy nhiên, với xu hướng tiêu dùng xanh và yêu thích sản phẩm handmade, Phú Vinh đang có những cơ hội mới để phát triển và đưa sản phẩm ra thế giới.</p>

      <h2>Sứ mệnh của Togo Craft</h2>
      <p>Tại Togo Craft, chúng tôi tự hào là cầu nối giữa nghệ nhân Phú Vinh và người yêu thích đồ thủ công khắp nơi. Mỗi sản phẩm bạn sở hữu không chỉ là món đồ trang trí mà còn là cách bạn góp phần bảo tồn làng nghề truyền thống Việt Nam.</p>
    `,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=1200&auto=format&fit=crop&q=80",
    category: "Câu chuyện",
    categorySlug: "brand-story",
    author: "Lê Văn Hùng",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    authorBio: "Nhà nghiên cứu văn hóa làng nghề truyền thống Việt Nam",
    date: "2024-01-05",
    readTime: 10,
    views: 3200,
    likes: 245,
    comments: 42,
    tags: ["làng nghề", "Phú Vinh", "truyền thống", "văn hóa", "lịch sử"],
  },
  {
    id: 4,
    slug: "5-y-tuong-trang-tri-phong-khach",
    title: "5 ý tưởng trang trí phòng khách với sản phẩm mây tre",
    excerpt: "Gợi ý những cách kết hợp sản phẩm mây tre để tạo điểm nhấn ấn tượng cho không gian phòng khách.",
    content: `
      <p>Phòng khách là không gian quan trọng nhất trong ngôi nhà, nơi đón tiếp khách và sum họp gia đình. Sử dụng sản phẩm mây tre trong trang trí phòng khách sẽ mang đến vẻ đẹp tự nhiên, ấm cúng và độc đáo.</p>

      <h2>1. Đèn mây tre làm điểm nhấn</h2>
      <p>Một chiếc đèn thả trần bằng mây tre có thể biến đổi hoàn toàn không gian phòng khách. Khi bật đèn, ánh sáng xuyên qua các lỗ đan tạo nên hiệu ứng bóng đổ tuyệt đẹp trên tường và trần nhà.</p>
      <p>Chọn kích thước đèn phù hợp với diện tích phòng: đèn lớn cho phòng rộng, đèn nhỏ hoặc cụm đèn cho không gian vừa phải.</p>

      <h2>2. Giỏ mây đa chức năng</h2>
      <p>Giỏ mây không chỉ để lưu trữ mà còn là vật trang trí tuyệt vời. Bạn có thể đặt giỏ mây cạnh sofa để đựng chăn, gối trang trí hoặc sách báo.</p>
      <p>Một bộ 3 giỏ mây kích thước khác nhau đặt chồng lên nhau tạo thành góc decor độc đáo.</p>

      <h2>3. Khay mây trên bàn trà</h2>
      <p>Khay mây tre là phụ kiện hoàn hảo cho bàn trà. Bạn có thể đặt nến thơm, bình hoa nhỏ hoặc đồ uống trên khay, vừa tiện lợi vừa tạo điểm nhấn ấm áp.</p>

      <h2>4. Trang trí tường với mây tre</h2>
      <p>Các sản phẩm trang trí tường từ mây tre như đĩa treo, gương khung mây hay tấm decor đan tay sẽ làm bức tường trống trở nên sống động.</p>
      <p>Bạn có thể tạo gallery wall bằng cách kết hợp nhiều món đồ mây tre với kích thước và kiểu dáng khác nhau.</p>

      <h2>5. Chậu cây mây tre</h2>
      <p>Đặt cây xanh trong chậu mây tre sẽ nhân đôi cảm giác gần gũi với thiên nhiên. Chọn những cây dễ chăm sóc như xương rồng, kim tiền hoặc trầu bà để kết hợp với chậu mây.</p>

      <h2>Mẹo phối hợp</h2>
      <p>Để không gian hài hòa, hãy chọn các sản phẩm mây tre cùng tông màu hoặc có màu sắc bổ sung cho nhau. Không nên dùng quá nhiều đồ mây tre trong một không gian để tránh cảm giác rối mắt.</p>
    `,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80",
    category: "Mẹo trang trí",
    categorySlug: "decoration-tips",
    author: "Phạm Thị Lan",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    authorBio: "Interior Designer tại Studio Home Decor",
    date: "2024-01-02",
    readTime: 7,
    views: 1560,
    likes: 87,
    comments: 19,
    tags: ["phòng khách", "trang trí", "ý tưởng", "mây tre"],
  },
  {
    id: 5,
    slug: "qua-tang-y-nghia-dip-tet",
    title: "Gợi ý quà tặng ý nghĩa từ mây tre cho dịp Tết Nguyên Đán",
    excerpt: "Những món quà handmade độc đáo từ mây tre sẽ là lựa chọn hoàn hảo để gửi gắm tình cảm trong dịp Tết.",
    content: `
      <p>Tết Nguyên Đán là dịp để sum vầy và trao gửi yêu thương. Một món quà handmade từ mây tre không chỉ đẹp mắt mà còn mang ý nghĩa sâu sắc về sự trân trọng và gìn giữ giá trị truyền thống.</p>

      <h2>1. Khay bánh kẹo mây tre</h2>
      <p>Khay mây tre đựng bánh kẹo là món quà vừa đẹp vừa thiết thực. Người nhận có thể dùng để bày biện bánh mứt ngày Tết và sau đó tiếp tục sử dụng quanh năm.</p>

      <h2>2. Đèn lồng mây tre</h2>
      <p>Đèn lồng mây tre mang đến không khí Tết cổ truyền ấm cúng. Ánh sáng dịu nhẹ xuyên qua các sợi mây tạo nên bầu không khí lung linh, huyền ảo.</p>

      <h2>3. Giỏ quà tết handmade</h2>
      <p>Thay vì giỏ quà nhựa thông thường, hãy chọn giỏ quà mây tre thủ công. Sau khi tặng, người nhận có thể tái sử dụng giỏ để lưu trữ đồ vật trong nhà.</p>

      <h2>4. Bộ tách trà mây tre</h2>
      <p>Bộ khay đựng tách trà kèm lót ly bằng mây tre là món quà tinh tế dành cho những người yêu thích văn hóa trà đạo.</p>

      <h2>5. Hộp đựng phong bao lì xì</h2>
      <p>Hộp mây tre đựng lì xì là ý tưởng sáng tạo, vừa thể hiện sự trang trọng khi trao lì xì vừa là món quà lưu niệm độc đáo.</p>

      <h2>Cách chọn quà phù hợp</h2>
      <p>Khi chọn quà, hãy cân nhắc đến sở thích và không gian sống của người nhận. Với người yêu thích nấu nướng, khay bày biện là lựa chọn lý tưởng. Với người thích decor, đèn mây hay giỏ trang trí sẽ được đón nhận nồng nhiệt.</p>
    `,
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1200&auto=format&fit=crop&q=80",
    category: "Quà tặng",
    categorySlug: "gifts",
    author: "Nguyễn Thu Hà",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    authorBio: "Chuyên gia thiết kế nội thất với hơn 10 năm kinh nghiệm",
    date: "2023-12-28",
    readTime: 5,
    views: 2100,
    likes: 134,
    comments: 28,
    tags: ["quà tặng", "Tết", "ý nghĩa", "handmade"],
  },
  {
    id: 6,
    slug: "hanh-trinh-tu-lang-nghe",
    title: "Hành trình từ làng nghề đến sản phẩm hoàn thiện",
    excerpt: "Theo chân nghệ nhân làng nghề khám phá quy trình tạo ra những sản phẩm thủ công tinh xảo.",
    content: `
      <p>Mỗi sản phẩm mây tre đan đều mang trong mình một hành trình dài từ những bụi mây xanh mướt nơi vùng quê đến tay người tiêu dùng. Hãy cùng chúng tôi khám phá quy trình tạo ra những tác phẩm thủ công tinh xảo này.</p>

      <h2>1. Thu hoạch nguyên liệu</h2>
      <p>Mây được thu hoạch từ các vùng núi phía Bắc Việt Nam, nơi có khí hậu và thổ nhưỡng phù hợp nhất. Thợ thu hoạch phải chọn những cây mây đủ tuổi, có độ dẻo dai và màu sắc đẹp.</p>
      <p>Tre được chọn từ những bụi tre già, đảm bảo độ cứng và bền chắc cho sản phẩm cuối cùng.</p>

      <h2>2. Xử lý và sơ chế</h2>
      <p>Sau khi thu hoạch, mây và tre được ngâm nước, luộc để diệt mối mọt và làm mềm sợi. Quá trình này có thể kéo dài từ vài ngày đến vài tuần tùy loại nguyên liệu.</p>
      <p>Tiếp đó là công đoạn phơi khô tự nhiên dưới ánh nắng mặt trời, giúp nguyên liệu có độ bền và màu sắc tự nhiên đẹp nhất.</p>

      <h2>3. Chẻ và chuốt sợi</h2>
      <p>Đây là công đoạn đòi hỏi kỹ năng cao nhất. Nghệ nhân dùng dao chuyên dụng để chẻ mây, tre thành những sợi mảnh đều nhau.</p>
      <p>Mỗi sợi sau đó được chuốt mịn bằng tay, loại bỏ những phần thô ráp để đảm bảo sản phẩm hoàn thiện không làm xước tay người dùng.</p>

      <h2>4. Đan và tạo hình</h2>
      <p>Nghệ nhân bắt đầu đan theo các mẫu truyền thống hoặc thiết kế mới. Mỗi kiểu đan đòi hỏi kỹ thuật riêng và có thể mất từ vài giờ đến vài ngày để hoàn thành một sản phẩm.</p>
      <p>Những hoa văn tinh xảo như mắt cáo, hoa mai, lục giác... đều được đan hoàn toàn bằng tay.</p>

      <h2>5. Hoàn thiện và kiểm tra</h2>
      <p>Sản phẩm sau khi đan xong được cắt tỉa gọn gàng, xử lý các mối nối và kiểm tra kỹ lưỡng trước khi đóng gói.</p>
      <p>Một số sản phẩm được phủ lớp sơn bảo vệ tự nhiên để tăng độ bền và vẻ đẹp.</p>

      <h2>Kết luận</h2>
      <p>Mỗi sản phẩm mây tre là kết tinh của hàng giờ lao động tỉ mỉ và tình yêu nghề của người nghệ nhân. Khi sở hữu một món đồ thủ công, bạn đang góp phần gìn giữ làng nghề truyền thống Việt Nam.</p>
    `,
    image: "https://images.unsplash.com/photo-1523779105324-a5e28371ad9a?w=1200&auto=format&fit=crop&q=80",
    category: "Câu chuyện",
    categorySlug: "brand-story",
    author: "Trần Minh Đức",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    authorBio: "Nghệ nhân mây tre với 20 năm kinh nghiệm làm nghề",
    date: "2024-11-10",
    readTime: 6,
    views: 1800,
    likes: 112,
    comments: 25,
    tags: ["làng nghề", "quy trình", "thủ công", "nghệ nhân"],
  },
  {
    id: 7,
    slug: "tui-coi-phu-kien-ben-vung",
    title: "Túi cói - Phụ kiện thời trang bền vững",
    excerpt: "Xu hướng thời trang xanh và lý do túi cói đang trở thành lựa chọn yêu thích của nhiều người.",
    content: `
      <p>Trong bối cảnh ngành thời trang đang chuyển mình hướng đến sự bền vững, túi cói nổi lên như một lựa chọn hoàn hảo cho những ai quan tâm đến môi trường mà vẫn muốn giữ phong cách thời trang.</p>

      <h2>Túi cói - Xu hướng thời trang xanh</h2>
      <p>Túi cói được làm từ sợi cói tự nhiên, một loại thực vật mọc nhiều ở các vùng đầm lầy Việt Nam. Khác với túi nhựa hay túi da nhân tạo, túi cói hoàn toàn phân hủy sinh học và không gây ô nhiễm môi trường.</p>
      <p>Các thương hiệu thời trang cao cấp trên thế giới đã đưa túi cói vào các bộ sưu tập của mình, chứng minh rằng bền vững và thời trang có thể đi đôi với nhau.</p>

      <h2>Ưu điểm của túi cói</h2>
      <p><strong>Thân thiện môi trường:</strong> 100% từ nguyên liệu tự nhiên, không gây hại cho môi trường.</p>
      <p><strong>Độ bền cao:</strong> Sợi cói đan chặt tạo nên cấu trúc vững chắc, có thể sử dụng nhiều năm nếu bảo quản đúng cách.</p>
      <p><strong>Phong cách độc đáo:</strong> Mỗi chiếc túi có texture và màu sắc riêng, không chiếc nào giống chiếc nào.</p>
      <p><strong>Đa dạng kiểu dáng:</strong> Từ túi tote, túi đeo chéo đến clutch, túi cói phù hợp với mọi hoàn cảnh.</p>

      <h2>Cách phối đồ với túi cói</h2>
      <p>Túi cói rất dễ kết hợp với nhiều phong cách khác nhau. Với trang phục casual như quần jeans và áo phông, túi cói tote size lớn sẽ tạo nên vẻ năng động, trẻ trung.</p>
      <p>Đối với váy đầm mùa hè, túi cói đeo chéo nhỏ xinh sẽ hoàn thiện outfit một cách tinh tế.</p>

      <h2>Bảo quản túi cói</h2>
      <p>Để túi cói luôn đẹp, hãy tránh để túi tiếp xúc với nước quá nhiều. Sau khi sử dụng, nên phơi túi ở nơi thoáng mát, tránh ánh nắng trực tiếp.</p>

      <h2>Kết luận</h2>
      <p>Túi cói không chỉ là một món phụ kiện thời trang mà còn là cách bạn thể hiện lối sống có trách nhiệm với môi trường. Hãy thử sử dụng túi cói và cảm nhận sự khác biệt!</p>
    `,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&auto=format&fit=crop&q=80",
    category: "Mẹo trang trí",
    categorySlug: "decoration-tips",
    author: "Phạm Thị Lan",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    authorBio: "Interior Designer tại Studio Home Decor",
    date: "2024-11-08",
    readTime: 4,
    views: 950,
    likes: 67,
    comments: 12,
    tags: ["túi cói", "thời trang", "bền vững", "phụ kiện"],
  },
  {
    id: 8,
    slug: "cach-chon-den-may-tre",
    title: "Cách chọn đèn mây tre phù hợp với không gian",
    excerpt: "Hướng dẫn lựa chọn kích thước, kiểu dáng đèn mây tre phù hợp với từng không gian trong nhà.",
    content: `
      <p>Đèn mây tre không chỉ là nguồn sáng mà còn là điểm nhấn trang trí quan trọng trong không gian sống. Việc chọn đúng loại đèn sẽ giúp căn phòng trở nên ấm cúng và hài hòa hơn.</p>

      <h2>1. Xác định không gian cần chiếu sáng</h2>
      <p><strong>Phòng khách:</strong> Cần đèn có kích thước lớn hoặc trung bình, ánh sáng vàng ấm để tạo không gian thư giãn.</p>
      <p><strong>Phòng ăn:</strong> Đèn thả trần đặt ngay trên bàn ăn, kích thước vừa phải, tạo điểm nhấn cho bữa cơm gia đình.</p>
      <p><strong>Phòng ngủ:</strong> Đèn để bàn hoặc đèn treo nhỏ, ánh sáng dịu nhẹ, không quá chói.</p>

      <h2>2. Chọn kích thước phù hợp</h2>
      <p>Quy tắc chung: Đường kính đèn (cm) = (Chiều dài + Chiều rộng phòng)/10. Ví dụ: Phòng 4x5m nên chọn đèn đường kính khoảng 90cm.</p>
      <p>Đối với đèn thả trần, khoảng cách từ đáy đèn đến mặt bàn/sàn nên từ 75-90cm.</p>

      <h2>3. Chọn kiểu dáng</h2>
      <p><strong>Đèn cầu:</strong> Phù hợp với không gian hiện đại, tối giản.</p>
      <p><strong>Đèn nón/chóp:</strong> Mang đậm phong cách Á Đông, phù hợp với nội thất truyền thống.</p>
      <p><strong>Đèn hình trụ:</strong> Tạo ánh sáng tập trung, phù hợp đặt góc đọc sách.</p>

      <h2>4. Lưu ý về ánh sáng</h2>
      <p>Đèn mây tre có đặc điểm là ánh sáng xuyên qua các khe đan, tạo hiệu ứng bóng đổ đẹp mắt. Chọn bóng đèn LED ánh sáng vàng (2700-3000K) để tạo cảm giác ấm cúng.</p>
      <p>Công suất bóng đèn nên phù hợp với mục đích sử dụng: 5-9W cho đèn trang trí, 12-15W cho đèn chiếu sáng chính.</p>

      <h2>5. Kết hợp với nội thất</h2>
      <p>Đèn mây tre màu tự nhiên phù hợp với nội thất gỗ, màu trung tính. Nếu không gian có nhiều màu sắc, chọn đèn mây tre màu tối hoặc đèn có thiết kế đơn giản.</p>

      <h2>Kết luận</h2>
      <p>Một chiếc đèn mây tre được chọn đúng sẽ nâng tầm không gian sống của bạn. Hãy cân nhắc kỹ các yếu tố trên trước khi quyết định!</p>
    `,
    image: "https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=1200&auto=format&fit=crop&q=80",
    category: "Hướng dẫn",
    categorySlug: "guides",
    author: "Lê Văn Hùng",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    authorBio: "Nhà nghiên cứu văn hóa làng nghề truyền thống Việt Nam",
    date: "2024-11-01",
    readTime: 4,
    views: 1560,
    likes: 89,
    comments: 16,
    tags: ["đèn mây tre", "hướng dẫn", "trang trí", "nội thất"],
  },
];

// Related articles (exclude current)
const getRelatedArticles = (currentSlug: string, category: string) => {
  // Get articles from the same category first
  const sameCategory = articlesData.filter(
    (article) => article.slug !== currentSlug && article.categorySlug === category
  );

  // If we have enough articles from the same category, return them
  if (sameCategory.length >= 3) {
    return sameCategory.slice(0, 3);
  }

  // Otherwise, fill with other articles
  const otherArticles = articlesData.filter(
    (article) => article.slug !== currentSlug && article.categorySlug !== category
  );

  return [...sameCategory, ...otherArticles].slice(0, 3);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const NewsDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [activeSection, setActiveSection] = useState<string>("");

  const article = articlesData.find((a) => a.slug === slug);

  // Extract headings and process content
  const { headings, processedContent } = useMemo(() => {
    if (!article) return { headings: [], processedContent: "" };
    const headings = extractHeadings(article.content);
    const processedContent = addHeadingIds(article.content, headings);
    return { headings, processedContent };
  }, [article]);

  // Scroll to top when page loads or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Track active section on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-6">Bài viết không tồn tại</p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-[#C59263] text-white px-6 py-3 rounded-lg hover:bg-[#A67B5B] transition-colors"
          >
            <ChevronLeft size={18} />
            Quay lại tin tức
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(slug, article.categorySlug);

  return (
    <>
      {/* SEO Meta Tags - In a real app, use next/head or metadata export */}
      <title>{`${article.title} | Togo Craft`}</title>
      <meta name="description" content={article.excerpt} />
      <meta name="keywords" content={article.tags.join(", ")} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.excerpt} />
      <meta property="og:image" content={article.image} />
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={article.date} />
      <meta property="article:author" content={article.author} />
      <meta property="article:section" content={article.category} />

      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Banner */}
        <div className="relative h-[400px] md:h-[500px]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Breadcrumb */}
          <div className="absolute top-6 left-0 right-0">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Link href="/" className="flex items-center gap-1 hover:text-white">
                  <Home size={16} />
                  Trang chủ
                </Link>
                <span>/</span>
                <Link href="/news" className="hover:text-white">
                  Tin tức
                </Link>
                <span>/</span>
                <Link href={`/news?category=${article.categorySlug}`} className="hover:text-white">
                  {article.category}
                </Link>
              </div>
            </div>
          </div>

          {/* Title on image */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container mx-auto px-4 pb-8">
              <Link
                href={`/news?category=${article.categorySlug}`}
                className="inline-block bg-[#C59263] text-white text-sm px-4 py-1.5 rounded-full mb-4 hover:bg-[#A67B5B] transition-colors"
              >
                {article.category}
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-tight">
                {article.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mt-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <img
                    src={article.authorAvatar}
                    alt={article.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>{formatDate(article.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>{article.readTime} phút đọc</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye size={16} />
                  <span>{article.views.toLocaleString()} lượt xem</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <article className="flex-1 min-w-0">
              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium italic border-l-4 border-[#C59263] pl-4">
                {article.excerpt}
              </p>

              {/* Table of Contents */}
              {headings.length > 0 && (
                <nav className="bg-[#FDF6E9] rounded-xl p-5 mb-8 border border-[#F0E6D2]">
                  <div className="flex items-center gap-2 mb-4">
                    <List size={20} className="text-[#C59263]" />
                    <h2 className="font-bold text-gray-800 text-lg">Mục lục</h2>
                  </div>
                  <ol className="space-y-2 list-decimal list-inside">
                    {headings.map(({ id, title }) => (
                      <li key={id} className="text-gray-600">
                        <button
                          onClick={() => scrollToSection(id)}
                          className={`text-left hover:text-[#C59263] transition-colors ${
                            activeSection === id ? "text-[#C59263] font-semibold" : ""
                          }`}
                        >
                          {title}
                        </button>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Article Content */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={18} className="text-gray-400" />
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/news?tag=${tag}`}
                      className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm hover:bg-[#FFF7ED] hover:text-[#C59263] transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                    <span>{article.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle size={20} />
                    <span>{article.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#C59263] transition-colors">
                    <Bookmark size={20} />
                    <span>Lưu</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Chia sẻ:</span>
                  <button className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Facebook size={18} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Author Box */}
              <div className="mt-10 bg-[#FDF6E9] rounded-2xl p-6 flex gap-5">
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm text-[#C59263] font-medium mb-1">Tác giả</p>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{article.author}</h3>
                  <p className="text-gray-600 text-sm">{article.authorBio}</p>
                  <Link
                    href={`/news?author=${article.author}`}
                    className="inline-flex items-center gap-1 text-[#C59263] text-sm font-medium mt-3 hover:gap-2 transition-all"
                  >
                    Xem tất cả bài viết
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-96 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-8">
              {/* Back to News */}
              <Link
                href="/news"
                className="flex items-center gap-2 text-gray-600 hover:text-[#C59263] transition-colors"
              >
                <ChevronLeft size={18} />
                <span className="font-medium">Quay lại tin tức</span>
              </Link>

              {/* Related Articles */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-5">Bài viết liên quan</h3>
                <div className="space-y-5">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/news/${related.slug}`}
                      className="flex gap-4 group"
                    >
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 line-clamp-2 group-hover:text-[#C59263] transition-colors text-sm">
                          {related.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1.5">
                          {formatDate(related.date)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-5">Thẻ phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                  {["trang trí", "mây tre", "handmade", "nội thất", "bền vững", "hướng dẫn", "quà tặng"].map((tag) => (
                    <Link
                      key={tag}
                      href={`/news?tag=${tag}`}
                      className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm hover:bg-[#FFF7ED] hover:text-[#C59263] transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-[#C59263] to-[#A67B5B] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Đăng ký nhận tin</h3>
                <p className="text-white/80 text-sm mb-4">
                  Nhận bài viết mới nhất qua email
                </p>
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 placeholder-white/50 text-white text-sm focus:outline-none focus:border-white/40 mb-3"
                />
                <button className="w-full bg-white text-[#C59263] font-semibold py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                  Đăng ký
                </button>
              </div>
              </div>
            </aside>
            </div>
          </div>
        </div>

        {/* More Articles Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Có thể bạn quan tâm</h2>
              <Link
                href="/news"
                className="text-[#C59263] font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                Xem tất cả
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articlesData.slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-[#C59263] font-medium">{item.category}</span>
                    <h3 className="font-semibold text-gray-800 mt-1 line-clamp-2 group-hover:text-[#C59263] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">{formatDate(item.date)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetailPage;
