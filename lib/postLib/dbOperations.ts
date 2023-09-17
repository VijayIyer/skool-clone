import {dbConnect} from "@/lib/mongoClient";
import Post, {IPost} from "@/models/Post";
import User from "@/models/User";

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

export async function deletePost (postId: string) {
    await dbConnect();
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return {
                isDeleted: false,
                message: "Document not found!"
            };
        }
        return {
            isDeleted: true,
            message: "Document deleted successfully!",
            data: deletedPost,
        };
    } catch (error) {
        return {
            isDeleted: false,
            message: `Error deleting document!, error: ${error}`
        };
    }
}

export async function findUserById(user_id: string) {
    await dbConnect();
    try {
        const foundUser = await User.findById(user_id);
        if (!foundUser) {
            return {
                isFindUser: false,
                status: 422,
                message: 'Invalid user id!'
            }
        }
        return {
            isFindUser: true,
            status: 200,
            foundUser: foundUser,
        }
    } catch (error) {
        return {
            isFindUser: false,
            status: 500,
            message: `Error finding user: ${error}`
        }
    }
}

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