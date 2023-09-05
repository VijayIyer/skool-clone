import dbConnect from "@/lib/dbConnect";
import Post from "@/models/PostModel";
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
      Post.create(task).then((data) => {
        res.status(201).send(data);
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ err, msg: "something went wrong !" });
    }
  }
  