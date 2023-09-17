import Post from "@/models/Post";
import {dbConnect} from "@/lib/mongoClient";

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