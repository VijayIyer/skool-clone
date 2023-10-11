import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  isUserEmailTaken,
  validateGenerateOtpInput,
} from "../../../lib/userLib";
import { responseFormatter } from "@/lib/responseLib";
import { createOtp, sendOtpEmail } from "@/lib/otpLib";
import { dbConnectWrapper } from "@/lib/dbConnectWrapper";

export async function createOtpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        // check that request contains an email property
        const validationResult = validateGenerateOtpInput(req.body);

        if (!validationResult.success) {
          return res
            .status(400)
            .json(responseFormatter(false, null, validationResult.message));
        }
        const { email, firstName, lastName } = req.body;
        if (await isUserEmailTaken(email)) {
          return res
            .status(400)
            .json(
              responseFormatter(
                false,
                null,
                "Email already in use. Please try another one"
              )
            );
        }

        const otp = await createOtp(email);
        const emailResult: {
          success: boolean;
          errorMessage?: string;
          data?: null;
        } = await sendOtpEmail(otp.otp, email);
        if (!emailResult.success)
          console.error(
            `Error sending otp verification email to ${email} : ${emailResult?.errorMessage}`
          );
        return res.status(201).json(responseFormatter(true, null));
      } catch (error) {
        console.error("Error during sign-up:", error);
        return res
          .status(500)

          .json(
            responseFormatter(
              false,
              null,
              "Unable to create an account in the database"
            )
          );
      }
    default:
      return res
        .status(405)
        .json(responseFormatter(false, null, "Method Not Allowed"));
  }
}

export default dbConnectWrapper(createOtpHandler);
