import { EmailConfig } from "../../enums/EmailConfigEnum";
import { mailSender } from "../mailSender";
import { validateEmail } from "../userLib";

export async function sendOtpEmail(otp: string, to: string) {
  if (!validateEmail(to)) return false;
  try {
    const result = await mailSender(to, EmailConfig.GMAIL, {
      subject: `${otp} is your Skool verification code`,
      content: `${otp} is your verification code`,
    });
    return result;
  } catch (err) {
    console.error(`Error sending email: ${err}`);
    return false;
  }
}
