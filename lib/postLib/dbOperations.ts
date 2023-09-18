import {dbConnect, dbDisconnect} from "@/lib/mongoClient";
import Post, {IPost} from "@/models/Post";
import User from "@/models/User";

export async function checkPostExist (postId: string) {
    await dbConnect();
    try {
        const foundDoc = await Post.findById(postId);
        await dbDisconnect()
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
        await dbDisconnect()
        return {
            isFound: false,
            state: 500,
            message: "Error finding document!"
        };
    }
}

export async function addNewPost (newPost) {
    await dbConnect();
    try {
        const result = await newPost.save();
        await dbDisconnect();
        return {
            isAdded: true,
            data: result,
        }
    } catch (error) {
        await dbDisconnect();
        return {
            isAdded: false,
            message: "Creating post failed, please try again."
        }
    }


}

export async function deletePost (postId: string) {
    await dbConnect();
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        await dbDisconnect()
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
        await dbDisconnect()
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
        await dbDisconnect()
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
        await dbDisconnect()
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
    try {
        const result =  await Post.find({}).skip(skip).limit(pageSize).sort({createdAt: -1});
        await dbDisconnect();
        return {
            isFound: true,
            status: 200,
            posts: result,
        }
    } catch (error) {
        await dbDisconnect();
        return {
            isFound: false,
            status: 500,
            message: `Internal server error! ${error}`
        }
    }
}

export async function getPostsByCategory (category: string, page: string) {
    const pageSize = 10;
    const skip = (Number(page) - 1) * pageSize;
    await dbConnect();
    try {
        const result = await Post.find({category: category}).skip(skip).limit(pageSize).sort({createdAt: -1});
        await dbDisconnect();
        return {
            isFound: true,
            status: 200,
            posts: result,
        }
    } catch (error) {
        await dbDisconnect();
        return {
            isFound: false,
            status: 500,
            message: `Internal server error! ${error}`
        }
    }
}

export async function getPostById (post_id: string) {
    await dbConnect();
    try {
        const foundPost = await Post.findById(post_id);
        await dbDisconnect();
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
        await dbDisconnect();
        return {
            isFound: false,
            status: 500,
            message: "Error finding document!"
        };
    }
}

export async function updatePostById (postId: string, newPost) {
    await dbConnect();
    try {
        const result = await Post.findOneAndUpdate({_id: postId}, newPost, {new: true});
        await dbDisconnect();
        return {
            isUpdated: true,
            status: 200,
            message: 'Post updated successfully!',
            newData: result,
        }
    } catch (error) {
        await dbDisconnect();
        return {
            isUpdated: true,
            status: 500,
            message: 'Internal server error!',
        }
    }
}