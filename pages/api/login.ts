import { dbConnect } from "@/lib/mongoClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { compareHashPasswordWith } from "@/lib/userLib/hashPassword";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "@/lib/userLib/userApi";
import { responseFormatter } from "@/lib/responseLib";
import { serialize } from "cookie";
import generateJwtToken from "@/lib/jwtLib/generateToken";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      await dbConnect();

      const { email, password } = req.body;

      try {
        const user = await findUserByEmail(email);

        if (!user) {
          return res
            .status(401)
            .json(responseFormatter(false, null, "User not found"));
        }

        const isMatch = await compareHashPasswordWith(email, password);
        if (!isMatch) {
          return res
            .status(401)
            .json(responseFormatter(false, null, "Invalid credentials"));
        }

        const token = generateJwtToken({
          id: user._id.toString(),
          email: user.email,
        });

        res.setHeader(
          "Set-Cookie",
          serialize("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
        );
        res.status(200).json(responseFormatter(true, null));

        return res;
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json(responseFormatter(false, null, "Server error"));
      }
    default:
      return res
        .status(405)
        .json(responseFormatter(false, null, "Method Not Allowed"));
  }
}
