import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongoClient";
type ResponseData = {
  message?: string;
};
export default function changePasswordHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "PUT") {
    console.log(req.body);
    res.status(401).json({ message: "Passwords do not match!" });
  } else {
    res.status(404).json({ message: "No such API route" });
  }
}
