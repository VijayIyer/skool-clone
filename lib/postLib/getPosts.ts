import {dbConnect} from "@/lib/mongoClient";
import Post from "@/models/Post";

export async function getAllPosts (page: string) {
    //change to other size later
    const pageSize = 10;
    const skip = (Number(page) - 1) * pageSize;

    await dbConnect();
    return Post.find({}).skip(skip).limit(pageSize).sort({createdAt: -1});
}

export async function getPostsByCategory (category: string, page: string) {
    const pageSize = 10;
    const skip = (Number(page) - 1) * pageSize;
    await dbConnect();
    return Post.find({category: category}).skip(skip).limit(pageSize).sort({createdAt: -1});
}

export async function getPostById (post_id: string) {
    await dbConnect();
    try {
        const foundPost = await Post.findById(post_id);
        if (!foundPost) {
            return {
                isFound: false,
                status: 404,
                message: "Document not found!"
            };
        }
        return {
            isFound: true,
            status: 200,
            foundPost: foundPost,
        };
    } catch (error) {
        return {
            isFound: false,
            status: 500,
            message: "Error finding document!"
        };
    }
}