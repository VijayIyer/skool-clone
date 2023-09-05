import dbConnect from "@/lib/dbConnect";
import Post from "@/models/PostModel";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== "DELETE") {
      res.status(405).send({ msg: "Only GET request are allowed." });
      return;
    }
    const mongoose = require("mongoose");
  
    const task_id = new mongoose.Types.ObjectId(req.body.id);
    console.log("taskidad", task_id);
    try {
      await dbConnect();
      const result = await Post.find({ _id: task_id });
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send({ err, msg: "something went wrong !" });
    }
  }