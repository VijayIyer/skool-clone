import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongoClient";
import { responseFormatter } from "@/lib/responseLib";
import { editUser, getUser } from "@/lib/userLib/userApi";
import { generateHashPassword } from "@/lib/userLib";

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
  // const token = req.headers.token;
  // if (!token) {
  //   return res
  //     .status(401)
  //     .json(responseFormatter(false, null, "User not authenticated!"));
  // }
  switch (req.method) {
    case "PUT":
      // replace with extracting userId from the request header or body
      const userId: string = "650a2d6c3b1cce33d832e383";

      const { firstName, lastName, email, password, id } = await getUser(
        userId
      );
      if (!password) throw Error("Error retrieving user password");
      const newPassword: string = await generateHashPassword(password);
      const editUserResult = await editUser(id, {
        id,
        firstName,
        lastName,
        email,
        password: newPassword,
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
