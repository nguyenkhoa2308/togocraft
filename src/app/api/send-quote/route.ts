import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { fullName, phone, email, message, items, totalPrice } = body;

    // Build product list HTML
    const productListHtml = items
      .map(
        (item: { name: string; price: string; selectedColor?: string }) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.selectedColor || "—"}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.price}</td>
        </tr>
      `
      )
      .join("");

    // Email HTML template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D97706, #C77A06); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Yêu cầu báo giá mới</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Từ website Everest Light</p>
        </div>

        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #4A3B32; border-bottom: 2px solid #D97706; padding-bottom: 10px;">
            Thông tin khách hàng
          </h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #666;">Họ và tên:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Số điện thoại:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #D97706;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email:</td>
              <td style="padding: 8px 0; color: #333;">${email || "Không cung cấp"}</td>
            </tr>
          </table>

          <h2 style="color: #4A3B32; border-bottom: 2px solid #D97706; padding-bottom: 10px;">
            Sản phẩm quan tâm
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #4A3B32; color: white;">
                <th style="padding: 12px; text-align: left;">Sản phẩm</th>
                <th style="padding: 12px; text-align: left;">Màu sắc</th>
                <th style="padding: 12px; text-align: left;">Đơn giá</th>
              </tr>
            </thead>
            <tbody>
              ${productListHtml}
            </tbody>
          </table>

          <div style="background: #D97706; color: white; padding: 15px; border-radius: 8px; text-align: right;">
            <strong>Tổng giá trị tham khảo: ${totalPrice}</strong>
          </div>

          ${
            message
              ? `
          <h2 style="color: #4A3B32; border-bottom: 2px solid #D97706; padding-bottom: 10px; margin-top: 20px;">
            Ghi chú từ khách hàng
          </h2>
          <p style="background: white; padding: 15px; border-radius: 8px; color: #333; line-height: 1.6;">
            ${message}
          </p>
          `
              : ""
          }
        </div>

        <div style="background: #4A3B32; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            Vui lòng liên hệ lại khách hàng trong thời gian sớm nhất!
          </p>
        </div>
      </div>
    `;

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Everest Light <onboarding@resend.dev>", // Change to your verified domain
      to: ["nhualaysangeverestlight@gmail.com"],
      subject: `[Báo giá] Yêu cầu từ ${fullName} - ${phone}`,
      html: emailHtml,
      replyTo: email || undefined,
    });

    if (error) {
      console.error("Email error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi gửi email" },
      { status: 500 }
    );
  }
}
