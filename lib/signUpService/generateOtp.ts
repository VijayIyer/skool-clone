const generateOtpUrl = "/api/signup/generateOtp";
type GenerateOtpOptionsType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
type GenerateOtpResultType = {
  success: boolean;
  data?: any;
  errorMessage?: string;
};
export async function generateOtpService(
  data: GenerateOtpOptionsType
): Promise<GenerateOtpResultType> {
  try {
    const response = await fetch(generateOtpUrl, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response?.ok === true) return { success: true, data: response.json() };
    else if (response?.status === 400)
      return {
        success: false,
        errorMessage: `${response?.statusText} Please try again.`,
      };
    else
      return {
        success: false,
        errorMessage: "Failed to generate otp for submitted data",
      };
  } catch (err: any) {
    console.error(err);
    return { success: false, errorMessage: err };
  }
}
export async function generateOtpMockService(
  data: GenerateOtpOptionsType
): Promise<GenerateOtpResultType> {
  return {
    success: true,
  };
}
