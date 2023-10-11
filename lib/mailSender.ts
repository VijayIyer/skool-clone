// utils/mailSender.js
import nodemailer from "nodemailer";
import { EmailConfig } from "../enums/EmailConfigEnum";

const gmailOptions = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_APP_SPECIFIC_PASSWORD,
  },
};

const selectConfig = (configName: EmailConfig) => {
  switch (configName) {
    case EmailConfig.GMAIL:
      return gmailOptions;
    default:
      return gmailOptions;
  }
};
type EmailContent = {
  subject: string;
  content: string;
};
const mailSender = async (
  email: string,
  config: EmailConfig,
  { subject, content }: EmailContent
) => {
  console.log(
    process.env.MAIL_HOST,
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_APP_SPECIFIC_PASSWORD
  );
  const emailConfig = selectConfig(config);
  try {
    // Create a Transporter to send emails
    const transporter = nodemailer.createTransport(emailConfig);
    // Send emails to users
    const info = await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: subject,
      html: content,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error: any) {
    console.log(error.message);
  }
};
export { mailSender };
