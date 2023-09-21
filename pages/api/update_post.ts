import dbConnect from "@/lib/dbConnect";
import Post from "@/models/PostModel";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== "PUT") {
    res.status(405).send({ msg: "Only GET request are allowed." });
    return;
  }
  const mongoose = require("mongoose");

  const id = new mongoose.Types.ObjectId(req.body.id);
  console.log("taskidad", id);
  const updateData = req.body.updateData;

  try {
    await dbConnect();
    const updatedTask = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).send(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "something went wrong !" });
  }
}
