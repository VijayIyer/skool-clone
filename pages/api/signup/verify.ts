import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongoClient";
import {
  validateUserSignUpInput,
  generateHashPassword,
  createUser,
  isUserEmailTaken,
  deleteUsers,
} from "../../../lib/userLib";
import { responseFormatter } from "@/lib/responseLib";
import createOtp from "@/lib/otpLib/createOtp";
import sendOtpEmail from "@/lib/otpLib/sendOtpEmail";
import Otp from "@/models/Otp";
import User from "@/models/User";

export default async function verifyOtpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect with MongoDB database
  try {
    await dbConnect();
  } catch (e) {
    console.log("fail to connect with database", e);
    return res
      .status(500)

      .json(responseFormatter(false, null, "Internal Server Error"));
  }

  switch (req.method) {
    case "POST":
      try {
        const { otpId, submittedOtp, ...user } = req.body;

        const validationResult = validateUserSignUpInput(user);

        if (!validationResult.success) {
          return res
            .status(400)
            .json(responseFormatter(false, null, validationResult.message));
        }

        // const emailResult = await sendOtpEmail(user.email);
        const otp = await Otp.findById(otpId);
        if (!otp)
          return res
            .status(400)
            .json(responseFormatter(false, null, "No Otp found for email"));
        if (otp !== submittedOtp)
          return res
            .status(400)
            .json(responseFormatter(false, null, "Incorrect otp"));

        const newUser = new User({
          ...user,
        });
        await newUser.save();

        return res
          .status(201)
          .json(responseFormatter(true, { id: newUser._id }));
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
