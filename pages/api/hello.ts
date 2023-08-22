// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await dbConnect();
  console.log(result);
  res.status(200).json({ name: "John Doe" });
}
