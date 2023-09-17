import type { NextApiRequest, NextApiResponse } from 'next';
import {
    findUserById,
    getPostById,
    handlePostContentRequiredValidation, handlePostPollValidation,
    handlePostAuthorValidation,
    handleUserValidation, uploadToCloudinary
} from "@/lib/postLib";
import Post, {IPost} from "@/models/Post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {post_id, new_post, user_id, user_name} = req.body;

    // check if the user is existed
    const userObj = await findUserById(user_id);
    await handleUserValidation(userObj, user_name, res);

    // check if the user is the author of the post
    const foundObj = await getPostById(post_id);
    await handlePostAuthorValidation(foundObj, user_id, res);

    const {title, content, category, poll=[], attachments=[]} = new_post;
    await handlePostContentRequiredValidation(title, content, category, user_id, user_name, res);
    await handlePostPollValidation(poll, res);

    if (attachments.length > 0) {
        const newAttachmentsArr = attachments.filter(attachment => attachment.id).filter(attachment => attachment.fileType === 'attachment');
        if (newAttachmentsArr.length > 0) {
            const newImgArr = await uploadToCloudinary(newAttachmentsArr, res);
            for (const imgObj of newImgArr) {
                newAttachmentsArr.filter(attachment => attachment.id === imgObj.id)[0].url = imgObj.url;
            }
            for (const attachment of attachments) {
                if (attachment.id) {
                    delete attachment.id;
                }
            }
        }
    }

    delete new_post.createAt;
    delete new_post.updateAt;

    const newPost: IPost = new Post({
        ...new_post,
        attachments,
    });

    try {
        const returnedPost = await Post.findOneAndUpdate({_id: post_id}, newPost)
        await res.status(200).json({message: 'Post updated successfully!', post: returnedPost});
        return;
    } catch (error) {
        await res.status(500).json({message: 'Internal server error!'});
        return;
    }
}