import type { NextApiRequest, NextApiResponse } from 'next';
import Post, { IPost } from '@/models/Post';
import {
    findUserById,
    uploadToCloudinary,
    handleUserValidation,
    handlePostContentRequiredValidation, handlePostEmptyContentValidation, handlePostPollValidation, getImageArray
} from "@/lib/postLib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // check if required content is valid
    const {title, content, category, user_id, user_name} = req.body;
    await handlePostContentRequiredValidation(title, content, category, user_id, user_name, res);

    // check if empty content is valid
    const {comments, likes} = req.body;
    await handlePostEmptyContentValidation(comments, likes, res);

    //check if poll content is valid
    const {poll=[]} = req.body;
    await handlePostPollValidation(poll, res);

    // check if user is valid
    const userObj = await findUserById(user_id);
    await handleUserValidation(userObj, user_name, res)

    const {attachments=[]} = req.body;
    if (attachments.length > 0) {
        const imageArr = getImageArray(attachments);
        const newImgArr = await uploadToCloudinary(imageArr, res);
        // @ts-ignore
        for (const imgObj of newImgArr) {
            // @ts-ignore
            attachments.filter(attachment => attachment.id === imgObj.id)[0].url = imgObj.url;
        }

        for (const attachment of attachments) {
            delete attachment.id;
        }
    }

    const newPost: IPost = new Post({
        title,
        content,
        category,
        comments,
        likes,
        poll,
        attachments,
        user_name,
        author: user_id,
    });

    try {
        await newPost.save();
    } catch (error) {
        console.log(error);
        await res.status(500).json({message: 'Creating post failed, please try again.'});
        return;
    }

    await res.status(200).json({message: 'OK'});
    return;
}

