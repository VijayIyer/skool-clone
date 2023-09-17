import {NextApiRequest, NextApiResponse} from "next";
import {findUserById, getPostById, handlePostExistValidation, handleUserValidation} from "@/lib/postLib";
import Post, {IPost} from "@/models/Post";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const {post_id, user_id, user_name, category} = req.body;

    const userObj = await findUserById(user_id);
    await handleUserValidation(userObj, user_name, res);

    const foundObj = await getPostById(post_id);
    await handlePostExistValidation(foundObj, res);

    const newPost: IPost = new Post({
        ...foundObj.foundPost.toObject(),
        category,
    })

    try {
        const returnedPost = await Post.findOneAndUpdate({_id: post_id}, newPost);
        await res.status(200).json({message: 'Post updated successfully!', post: returnedPost});
    } catch (error) {
        await res.status(500).json({message: 'Internal server error!'});
        return;
    }
}