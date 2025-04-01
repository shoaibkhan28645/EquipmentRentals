import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Make sure to export the POST function
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      rentalPeriod,
      message,
      categoryName,
      categoryId,
    } = data;

    console.log("Received rental request:", { name, email, categoryName });

    // Configure Nodemailer with Gmail credentials
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Equipment Rental" <${process.env.EMAIL_USER}>`,
      to: process.env.RENTAL_EMAIL,
      subject: `New Rental Request: ${categoryName}`,
      html: `
        <h2>New Equipment Rental Request</h2>
        <p><strong>Equipment:</strong> ${categoryName}</p>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Rental Period:</strong> ${rentalPeriod}</p>
        <p><strong>Additional Information:</strong></p>
        <p>${message || "No additional information provided."}</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send rental request",
      },
      { status: 500 }
    );
  }
}
