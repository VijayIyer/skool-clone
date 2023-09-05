import dbConnect from "@/lib/dbConnect";
import Post from "@/models/PostModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send({ msg: "Only GET request are allowed." });
    return;
  }

  try {
    await dbConnect();
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "something went wrong !" });
  }
}
