import Otp from "@/models/Otp";
import otpGenerator from "otp-generator";
type Otp = {
  email: String;
};
export async function createOtp(email: Otp) {
  try {
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const newOtp = new Otp({
      email,
      otp,
    });
    await newOtp.save();
    return newOtp;
  } catch (err) {
    console.error(err);
    return null;
  }
}
