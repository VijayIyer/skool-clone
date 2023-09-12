import { dbConnect } from "@/lib/mongoClient";
import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

type Data = {
    message?: string;
    data?: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { userId, postId } = req.query;
    console.log(userId, postId);
    await dbConnect();
    let foundDoc = null;

    try {
        foundDoc = await Post.findById(postId);
        if (!foundDoc) {
            console.log(`Document ${postId} not found!`);
            await res.status(404).json({ message: "Document not found!" });
            return;
        }
    } catch (error) {
        console.log("Error:", error)
        await res.status(500).json({message: "Error finding document!"});
        return;
    }
    const author = foundDoc.author;

    /**
     * if the user is the admin in the group, then he can delete the post.
     */
    // if (author !== userId) {
    //     await res.status(401).json({message: "Unauthorized!"});
    //     return;
    // } else {
    //     try {
    //         await Post.findByIdAndDelete(postId);
    //     } catch (error) {
    //         console.log("Error:", error)
    //         await res.status(500).json({message: "Error deleting document!"});
    //         return;
    //     }
    // }

    await res.status(200).json({data: foundDoc});
}