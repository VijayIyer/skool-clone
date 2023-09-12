// pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Post, { IPost } from '@/models/Post';
import {dbConnect} from '@/lib/mongoClient';
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    const {title, content, category, user_id, user_name} = req.body;

    // return if required fields are missing
    if (!title || !content || !category || !user_id || !user_name) {
        await res.status(422).json({message: 'Title, content, and categories are required'});
        return;
    }

    await dbConnect();
    const foundUser = await User.findById(user_id);
    try {
        // return if user not found
        if (!foundUser) {
            console.log(`User ${user_id} not found!`);
            await res.status(404).json({message: "User not found!"});
            return;
        }

        // return if user name does not match
        const foundUserName = `${foundUser.firstname} ${foundUser.lastname}`;
        if (foundUserName !== req.body.user_name) {
            await res.status(401).json({message: "Unauthorized!"});
            return;
        }

        const {comments, likes} = req.body;
        if (comments.length !== 0 && likes.length !== 0) {
            await res.status(422).json({message: 'Then Length of Comments or likes are not 0, some one is trying to hack!'});
            return;
        }
    } catch (error) {
        // return if error finding user
        await res.status(500).json({message: `Error finding user! ${error}`});
        return;
    }

    const newPost: IPost = new Post({
        title,
        content,

    });

    // const { title, content, categories, attachments, poll } = req.body;
    //
    // const newPost: IPost = new Post({
    //     title,
    //     content,
    //     author: req.body.firstname,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     categories,
    //     attachments,
    //     poll,
    //     likes: [],
    //     comments: [],
    // });
    //
    // console.log(newPost)

    // try {
    //     await dbConnect();
    //     const savedPost = await newPost.save();
    //     res.status(201).send(savedPost._id);
    // } catch (error) {
    //     console.error('Error creating post:', error);
    //     res.status(500).send('Error creating post');
    // }
}

