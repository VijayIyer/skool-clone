import { dbConnect } from "@/lib/mongoClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { compareHashPasswordWith } from "@/lib/userLib/hashPassword";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "@/lib/userLib/userApi";
import { responseFormatter } from "@/lib/responseLib";
import { serialize } from "cookie";

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

        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
          throw new Error("JWT_SECRET is not defined in .env.local");
        }

        const token = jwt.sign(
          { id: user._id.toString(), email: user.email },
          JWT_SECRET,
          {
            expiresIn: "2m",
          }
        );

        res.setHeader(
          "Set-Cookie",
          serialize("jwt", token, {
            httpOnly: true,
            secure: true, // turns on only if served over HTTPS
            sameSite: "strict",
            path: "/"
          })
        );
        res.status(200).json(responseFormatter(true, user._id));

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
