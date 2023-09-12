// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from "@/lib/mongoClient";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

console.log("Test about the Pull Request");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await dbConnect();
  res.status(200).json({ name: "John Doe" });
}


