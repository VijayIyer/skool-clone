import dbConnect from "@/lib/dbConnect";
import Post from "@/models/PostModel";
import { createPost } from "@/modules/PostFunctions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== "POST") {
      res.status(405).send({ msg: "Only post request are allowed." });
      return;
    }
    const task = req.body;
    console.log(task)
    try {
      await dbConnect();
      const dbRes = await createPost(task)
      return res.status(201).json({ success: true, data: dbRes });
    } catch (err) {
      console.log(err);
      res.status(400).send({ err, msg: "something went wrong !" });
    }
  }
  