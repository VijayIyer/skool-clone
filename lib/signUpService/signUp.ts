const signUpServiceUrl = "/api/signup";
type SignUpServiceResult = {
  success: boolean;
  data?: any;
  errorMessage?: string;
};
type SignUpServiceInput = {
  otp: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
export async function signUpService(
  data: SignUpServiceInput
): Promise<SignUpServiceResult> {
  try {
    const response = await fetch(signUpServiceUrl, {
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
