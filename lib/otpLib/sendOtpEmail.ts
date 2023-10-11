import { EmailConfig } from "../../enums/EmailConfigEnum";
import { mailSender } from "../mailSender";
import { validateEmail } from "../userLib";

export async function sendOtpEmail(
  otp: string,
  recieverEmail: string
): Promise<{
  success: boolean;
  errorMessage?: string;
  data?: any;
}> {
  if (!validateEmail(recieverEmail))
    return { success: false, errorMessage: `Email not in correct format!` };
  try {
    const result = await mailSender(recieverEmail, EmailConfig.GMAIL, {
      subject: `${otp} is your Skool verification code`,
      content: `
      <>
      <h3>Confirm your email address</h3>
      <p>${otp} is your verification code</p>
      </>`,
    });
    return { success: result.success, data: result.data };
  } catch (err) {
    console.error(`Error sending email: ${err}`);
    return {
      success: false,
      errorMessage: `Error sending email to recipient - ${recieverEmail} : ${err}`,
    };
  }
}
