import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/mongoClient";
import { responseFormatter } from "@/lib/responseLib";
import { editUser, getUserById } from "@/lib/userLib/userApi";
import { generateHashPassword, validatePassword } from "@/lib/userLib";
import { compareHashPasswordWith } from "@/lib/userLib/hashPassword";

export default async function changePasswordHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
  } catch (e) {
    console.log("fail to connect with database", e);
    return (
      res
        .status(500)
        // .json({ success: false, message: 'Internal Server Error' });
        .json(responseFormatter(false, null, "Internal Server Error"))
    );
  }

  if (!req.headers.userId) {
    return res
      .status(401)
      .json(responseFormatter(false, null, "User not authenticated!"));
  }
  switch (req.method) {
    case "PUT":
      // replace with extracting userId from the request header or body
      const userId: string = req.headers?.userId;

      // get user using the userId obtained through token
      const { firstName, lastName, email, id } = await getUserById(userId);
      if (!id || !email) throw Error("Internal server error");
      const { oldPassword, newPassword } = req.body;
      // validate old password
      const isValidPassword = await compareHashPasswordWith(email, oldPassword);

      if (!isValidPassword) {
        return res
          .status(401)
          .json(responseFormatter(false, null, `Password does not match!`));
      }
      if (!validatePassword(newPassword)) {
        return res
          .status(500)
          .json(responseFormatter(false, null, `Password is not valid!`));
      }
      const newHashedPassword: string = await generateHashPassword(newPassword);
      const editUserResult = await editUser(id, {
        id,
        firstName,
        lastName,
        email,
        password: newHashedPassword,
      });
      const JWT_SECRET = process.env.JWT_SECRET;

      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in .env.local");
      }

      const token = jwt.sign({ id: id.toString(), email: email }, JWT_SECRET, {
        expiresIn: "2m",
      });
      res.status(200).json(responseFormatter(true, token, "Password updated!"));
      res.setHeader(
        "Set-Cookie",
        serialize("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
      );
      return res;
    default:
      return res
        .status(405)
        .json(responseFormatter(false, null, "Method Not Allowed"));
  }
}
