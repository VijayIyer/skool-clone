import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongoClient";
import { responseFormatter } from "@/lib/responseLib";
import { editUser, getUser } from "@/lib/userLib/userApi";
import { generateHashPassword, validatePassword } from "@/lib/userLib";
import comparePasswords from "@/lib/userLib/comparePassword";

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

  // if (!req.headers.userId) {
  //   return res
  //     .status(401)
  //     .json(responseFormatter(false, null, "User not authenticated!"));
  // }
  switch (req.method) {
    case "PUT":
      // replace with extracting userId from the request header or body
      const userId: string = "650b3203d8f631888523aee1";

      // get user using the userId obtained through token
      const {
        firstName,
        lastName,
        email,
        password: oldHashedPassword,
        id,
      } = await getUser(userId);

      if (!oldHashedPassword) throw Error("Internal server error");

      const { oldPassword, newPassword } = req.body;
      // validate old password
      const isValidPassword = await comparePasswords(
        oldHashedPassword,
        oldPassword
      );

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

      return res
        .status(200)
        .json(responseFormatter(true, editUserResult, "Password updated!"));
    default:
      return res
        .status(405)
        .json(responseFormatter(false, null, "Method Not Allowed"));
  }
}
