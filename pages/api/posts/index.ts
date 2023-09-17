import {NextApiRequest, NextApiResponse} from "next";
import {
    checkPostExist,
    deletePost,
    findUserById,
    getAllPosts,
    getImageArray,
    getPostById,
    getPostsByCategory,
    handlePostAuthorAuthorization,
    handlePostContentRequiredAuthorization,
    handlePostEmptyContentAuthorization,
    handlePostExistAuthorization,
    handlePostGroupAuthorization,
    handlePostPollAuthorization,
    handleUserAuthorization,
    uploadToCloudinary
} from "@/lib/postLib";
import Post, {IPost} from "@/models/Post";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user_id, user_name } = req.cookies;
    if (!user_id || !user_name) {
        await res.status(401).json({message: 'Unauthorized!'});
        return;
    }

    if (req.method === 'POST') {
        const {
            title,
            content,
            category,
            comments,
            likes,
            poll = [],
            attachments = [],
        } = req.query;
        await handlePostContentRequiredAuthorization(title, content, category, user_id, user_name, res);

        // check if empty content is valid
        await handlePostEmptyContentAuthorization(comments, likes, res);

        //check if poll content is valid
        await handlePostPollAuthorization(poll, res);

        // check if user is valid
        const userObj = await findUserById(user_id);
        await handleUserAuthorization(userObj, user_name, res)

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
    } else if (req.method === 'PUT') {
        const {post_id,} = req.query;
        const {new_post} = req.body;

        // check if the user is existed
        const userObj = await findUserById(user_id);
        await handleUserAuthorization(userObj, user_name, res);

        // check if the user is the author of the post
        const foundObj = await getPostById(post_id);
        await handlePostAuthorAuthorization(foundObj, user_id, res);

        const {title, content, category, poll=[], attachments=[]} = new_post;
        await handlePostContentRequiredAuthorization(title, content, category, user_id, user_name, res);
        await handlePostPollAuthorization(poll, res);

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
    } else if (req.method === 'PATCH') {
        const {
            post_id,
            category
        } = req.query;

        const userObj = await findUserById(user_id);
        await handleUserAuthorization(userObj, user_name, res);

        const foundObj = await getPostById(post_id);
        await handlePostExistAuthorization(foundObj, res);

        try {
            const returnedPost = await Post.findOneAndUpdate({_id: post_id}, {category: category});
            await res.status(200).json({message: 'Post updated successfully!', post: returnedPost});
        } catch (error) {
            await res.status(500).json({message: 'Internal server error!'});
            return;
        }
    } else if (req.method === 'DELETE') {
        const {
            postId,
        } = req.query;

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
        if (author !== user_id) {
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
    } else if (req.method === 'GET') {
        const {
            by,
            group,
            page,
        } = req.query;

        const userObj = await findUserById(user_id);
        await handleUserAuthorization(userObj, user_name, res);

        switch (by) {
            case 'all':
                // check if the page number is valid
                if (Number(page) < 1 || isNaN(Number(page))) {
                    await res.status(422).json({message: 'Invalid page number!'});
                    return;
                }

                // check if the user and group is valid
                await handlePostGroupAuthorization(userObj.foundUser.toObject().groups, group as string, res);

                // get posts
                try {
                    const posts = await getAllPosts(page as string);
                    await res.status(200).json({posts});
                    return;
                } catch (e) {
                    await res.status(500).json({message: 'Internal server error!'});
                    return;
                }
            case 'category':
                const { category } = req.query;
                // check if the page number is valid
                if (Number(page) < 1 || isNaN(Number(page))) {
                    await res.status(422).json({message: 'Invalid page number!'});
                    return;
                }

                // check if the user and group is valid
                await handlePostGroupAuthorization(userObj.foundUser.toObject().groups, group as string, res);


                // get posts
                try {
                    /**
                     * !!! important !!!
                     * post should be got by category and group
                     */
                    const posts = await getPostsByCategory(category as string, page as string);
                    await res.status(200).json({posts});
                    return;
                } catch (e) {
                    await res.status(500).json({message: 'Internal server error!'});
                    return;
                }
            case 'one':
                const {post_id} = req.query;

                console.log(post_id);
                const foundObj = await getPostById(post_id);
                await handlePostExistAuthorization(foundObj, res);

                return res.status(200).json(foundObj.foundPost);
            default:
                await res.status(404).json({message: 'Not found!'});
                return;
        }
    } else {
        await res.status(405).json({message: `Method ${req.method} not allowed`});
        return;
    }
}