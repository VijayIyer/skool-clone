import type { NextApiRequest, NextApiResponse } from "next";
import {IPost} from "@/models/Post";
import {checkPostExist, deletePost} from "@/lib/postLib";

type Data = {
    message?: string;
    data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { userId, postId } = req.body;

    // check if post exist
    const foundDoc = await checkPostExist(postId as string);
    if (!foundDoc.isFound) {
        await res.status(foundDoc.state).json({message: foundDoc.message});
        return;
    }

    const author = (foundDoc.data as IPost).author.toString();

    /**
     * if the user is the admin in the group, then he can delete the post.
     * get author data from db
     */
    if (author !== userId) {
        await res.status(401).json({message: "Unauthorized!"});
        return;
    } else {
        const deleteResult = await deletePost(postId as string);
        if (!deleteResult || !deleteResult.isDeleted) {
            if (!deleteResult) {
                await res.status(500).json({message: "Error deleting document!"});
                return;
            }
            await res.status(500).json({message: deleteResult.message});
            return;
        }
        await res.status(200).json({message: "Post deleted successfully!"});
        return;
    }
}