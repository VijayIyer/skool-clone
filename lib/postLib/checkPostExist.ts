import Post, {IPost} from "@/models/Post";
import {dbConnect} from "@/lib/mongoClient";

export async function checkPostExist (postId: string) {
    await dbConnect();
    try {
        const foundDoc = await Post.findById(postId);
        if (!foundDoc) {
            return {
                isFound: false,
                state: 404,
                message: "Document not found!"
            };
        }
        return {
            isFound: true,
            state: 200,
            data: foundDoc as IPost,
        };
    } catch (error) {
        return {
            isFound: false,
            state: 500,
            message: "Error finding document!"
        };
    }
}