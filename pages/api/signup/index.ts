import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongoClient";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import {
  validateUserSignUpInput,
  generateHashPassword,
  createUser,
  isUserEmailTaken,
  deleteUsers,
} from "../../../lib/userLib";
import { responseFormatter } from "@/lib/responseLib";
import { getLatestOtpForEmail } from "@/lib/otpLib";
import { dbConnectWrapper } from "@/lib/dbConnectWrapper";
import generateJwtToken from "@/lib/jwtLib/generateToken";
import { Model } from "mongoose";
import User from "@/models/User";

export async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        const { otp, ...user } = req.body;

        const validationResult = validateUserSignUpInput(user);

        if (!validationResult.success) {
          return res
            .status(400)
            .json(responseFormatter(false, null, validationResult.message));
        }

        if (await isUserEmailTaken(user.email)) {
          return res
            .status(400)
            .json(
              responseFormatter(false, null, "A user already used this email")
            );
        }

        const { email, password, ...rest } = user;
        const latestOtp = await getLatestOtpForEmail(email);

        if (
          // TODO:create a method to validate that otp sent in request is all numbers
          parseInt(otp) !== latestOtp
        ) {
          console.log(`retunign 400`);
          res
            .status(400)
            .json(responseFormatter(false, null, "The Otp is not valid"));
          return;
        }

        const { firstName, lastName } = rest;

        // FIXME: Replace below code block for generating token with call to method generateToken, which is not yet merged
        const hashedPassword = await generateHashPassword(user.password);
        const newUser = await createUser(
          firstName,
          lastName,
          email,
          hashedPassword
        );
        const token = await generateJwtToken({
          id: newUser._id,
          email: newUser.email,
        });
        res.status(201).json(
          responseFormatter(true, {
            message: `New user with email ${user.email} signed up!`,
          })
        );
        res.setHeader(
          "Set-Cookie",
          serialize("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
        );
        return res;
      } catch (error: any) {
        console.error("Error during sign-up:", error.message);
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
export default dbConnectWrapper(signUpHandler);
