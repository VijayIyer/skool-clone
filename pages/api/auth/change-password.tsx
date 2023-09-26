import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/mongoClient";
import { responseFormatter } from "@/lib/responseLib";
import { editUser, getUserById } from "@/lib/userLib/userApi";
import { generateHashPassword, validatePassword } from "@/lib/userLib";
import { compareHashPasswordWith } from "@/lib/userLib/hashPassword";
import { serialize } from "cookie";
import generateJwtToken from "@/lib/jwtLib/generateToken";
import { isTokenIssuedBeforePasswordChange } from "@/lib/jwtLib/tokenValidation";
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
  if (!req.headers.userid) {
    return res
      .status(401)
      .json(responseFormatter(false, null, "User not authenticated!"));
  }
  switch (req.method) {
    case "PUT":
      // replace with extracting userId from the request header or body
      const userId: string = req.headers.userid;
      const iat: string = req.headers.iat;
      // get user using the userId obtained through token
      const { firstName, lastName, email, id, passwordChangedAt } =
        await getUserById(userId);
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
      if (isTokenIssuedBeforePasswordChange(passwordChangedAt, iat)) {
        return res
          .status(401)
          .json(
            responseFormatter(
              false,
              null,
              "Invalid token! Token expired or invalidated"
            )
          );
      }
      const newHashedPassword: string = await generateHashPassword(newPassword);
      try {
        const editUserResult = await editUser(id, {
          id,
          firstName,
          lastName,
          email,
          password: newHashedPassword,
          passwordChangedAt,
        });
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json(responseFormatter(false, null, "Internal server error"));
      }

      const token = generateJwtToken({ id, email });
      if (!token)
        return res
          .status(500)
          .json(responseFormatter(false, null, "Internal server error"));
      res.setHeader(
        "Set-Cookie",
        serialize("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
      );
      res.status(200).json(responseFormatter(true, token, "Password updated!"));
      break;
    default:
      return res
        .status(405)
        .json(responseFormatter(false, null, "Method Not Allowed"));
  }
}
