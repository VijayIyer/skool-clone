import OTP from "@/models/Otp";

export async function getLatestOtpForEmail(email: string) {
  try {
    const result = await OTP.findOne(
      { email },
      {},
      { sort: { createdAt: -1 } }
    );
    if (result.length === 0) {
      throw new Error(`no OTP found for email - ${email}`);
    }
    return result[0].otp;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error finding latest otp");
  }
}
