// utils/mailSender.js
import nodemailer from "nodemailer";

const mailSender = async (email: string, title: string, body: string) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: "www.sandeepdev.me - Sandeep Singh",
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error: any) {
    console.log(error.message);
  }
};
module.exports = mailSender;
