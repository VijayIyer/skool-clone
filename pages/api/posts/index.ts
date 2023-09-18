import {NextApiRequest, NextApiResponse} from "next";
import {
    addNewPost,
    checkPostExist,
    deletePost,
    findUserById,
    getAllPosts,
    getImageArray,
    getPostById,
    getPostsByCategory,
    handlePostAuthorAuthorization,
    handlePostExistAuthorization,
    handlePostGroupAuthorization,
    updatePostById,
    uploadToCloudinary,
    validateCategoryUpdate,
    validateGetRequest,
    validateLikesUpdate,
    validateNewPost, validateOptionsUpdate,
    validatePostId,
    validateUpdatePost
} from "@/lib/postLib";
import Post, {IPost} from "@/models/Post";


export default async function postsHandler(req: NextApiRequest, res: NextApiResponse) {
    /**
     * !!! important !!!
     * user_id can be got from req.body after middleware
     * delete tempUserId after testing
     */
    const tempUserId = '6500d391ba83ebc13d48cea9'

    if (req.method === 'POST') {
        const {
            title,
            content,
            category,
            userId,
            poll = [],
            attachments = [],
        } = req.body;

        // validate the post data
        if (!validateNewPost(req.body).success) {
            await res.status(422).json({message: 'Invalid post data!'});
            return;
        }

        // check if the user is existed
        const userObj = await findUserById(userId);
        if (!userObj.isFindUser) {
            await res.status(userObj.status).json({message: userObj.message});
            return;
        }

        // check whether the attachments have image
        if (attachments.length > 0) {
            const imageArr = getImageArray(attachments);
            if (imageArr.length > 0) {
                const newImgArr = await uploadToCloudinary(imageArr, res);
                // @ts-ignore
                for (const imgObj of newImgArr) {
                    // @ts-ignore
                    attachments.filter(attachment => attachment.id === imgObj.id)[0].url = imgObj.url;
                }
            }

            // delete the id field, conflict with id field in db
            for (const attachment of attachments) {
                delete attachment.id;
            }
        }

        // create new post
        const newPost: IPost = new Post({
            title,
            content,
            category,
            comments: [],
            likes: [],
            poll,
            attachments,
            userName: `${userObj.foundUser.toObject().firstName} ${userObj.foundUser.toObject().lastName}` ,
            author: userId,
        });

        // save the post to db
        const result = await addNewPost(newPost);

        // check if the post is added successfully
        if (!result.isAdded) {
            await res.status(500).json({message: result.message});
            return;
        }

        // return the post data
        await res.status(200).json({message: 'Post created successfully!', data: result.data});
        return;

    } else if (req.method === 'PUT') {
        const {postId} = req.query;
        const {newPost} = req.body;

        /**
         * !!! important !!!
         * user_id can be got from req.body after middleware
         * delete tempUserId after testing
         */
        let userId = tempUserId;

        // validate the newPost data
        if (!validateUpdatePost(newPost).success) {
            await res.status(422).json({message: 'Invalid post data! ' + validateUpdatePost(newPost).error});
            return;
        }

        // check if the user is the author of the post
        const foundObj = await getPostById(postId);
        await handlePostAuthorAuthorization(foundObj, userId, res);

        // check whether the attachments have image
        const {attachments=[]} = newPost;
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

        // update the post
        const Post = ({
            ...newPost,
            attachments,
        });
        const result = await updatePostById(postId as string, Post);
        if (!result.isUpdated) {
            await res.status(500).json({message: result.message});
            return;
        } else {
            await res.status(200).json({message: 'Post updated successfully!', data: result.newData});
            return;
        }
    } else if (req.method === 'PATCH') {
        const {
            by,
            postId,
            category,
            option,
        } = req.query

        let result;

        /**
         * !!! important !!!
         * user_id can be got from req.body after middleware
         * delete tempUserId after testing
         */
        let userId = tempUserId;

        // validate the post data
        if (!validatePostId(postId).success) {
            await res.status(422).json({message: 'Invalid post data!'});
            return;
        }

        const foundObj = await getPostById(postId);
        const fountPost = foundObj.foundPost.toObject();

        switch (by) {
            case 'category':
                if (!validateCategoryUpdate(req.query).success) {
                    await res.status(422).json({message: 'Invalid post data!'});
                    return;
                }

                result = await updatePostById(postId as string, {category: category});
                if (!result.isUpdated) {
                    await res.status(500).json({message: result.message});
                    return;
                } else {
                    await res.status(200).json({message: 'Post updated successfully!', data: result.newData});
                    return;
                }

            case 'likes':
                if (!validateLikesUpdate(req.query).success) {
                    await res.status(422).json({message: 'Invalid post data!'});
                    return;
                }

                const {likes} = fountPost;
                const newLikes = likes.filter(like => like.toHexString() === userId).length > 0 ? likes.filter(like => like.toHexString() !== userId) : [...likes, userId]

                result = await updatePostById(postId as string, {likes: newLikes});
                if (!result.isUpdated) {
                    await res.status(500).json({message: result.message});
                    return;
                } else {
                    await res.status(200).json({message: 'Post updated successfully!', data: result.newData});
                    return;
                }

            case 'option':
               const {poll} = fountPost;
               if (!validateOptionsUpdate(req.query).success) {
                   await res.status(422).json({message: 'Invalid post data!'});
                   return;
               }

               // check if the option is valid
               if (poll.length === 0) {
                     await res.status(422).json({message: 'Invalid poll data!'});
                     return;
               }
               if (poll.length <= Number(option)) {
                   await res.status(422).json({message: 'Invalid poll data!'});
                   return;
               }

               const newPoll = poll.map((pollObj, index) => {
                   if (index === Number(option)) {
                       const {votes} = pollObj;
                       const newVotes = votes.filter(vote => vote === userId).length > 0 ? votes.filter(vote => vote !== userId) : [...votes, userId]
                       return {
                           ...pollObj,
                           votes: newVotes,
                       }
                   } else {
                       const {votes} = pollObj;
                       const newVotes = votes.filter(vote => vote === userId).length > 0 ? votes.filter(vote => vote !== userId) : [...votes]
                       return {
                           ...pollObj,
                           votes: newVotes,
                       }
                   }
               })

                result = await updatePostById(postId as string, {poll: newPoll});
                if (!result.isUpdated) {
                    await res.status(500).json({message: result.message});
                    return;
                } else {
                    await res.status(200).json({message: 'Post updated successfully!', data: result.newData});
                    return;
                }
            default:
                await res.status(404).json({message: 'Not found!'});
                return;
        }


    } else if (req.method === 'DELETE') {
        const {
            postId,
        } = req.query;

        /**
         * !!! important !!!
         * user_id can be got from req.body after middleware
         * delete tempUserId after testing
         */
        let userId = tempUserId;

        if (!validatePostId(postId).success) {
            await res.status(422).json({message: 'Invalid post data!'});
            return;
        }

        // check if post exist
        const foundDoc = await checkPostExist(postId as string);
        if (!foundDoc.isFound) {
            await res.status(foundDoc.state).json({message: foundDoc.message});
            return;
        }

        const author = (foundDoc.data as IPost).author.toString();

        /**
         * if the user is the admin in the group, then he can delete the post too.
         */
        if (author !== userId) {
            await res.status(401).json({message: "Unauthorized!"});
            return;
        } else {
            const deleteResult = await deletePost(postId as string);
            if (!deleteResult.isDeleted) {
                await res.status(500).json({message: deleteResult.message});
                return;
            } else {
                await res.status(200).json({message: "Post deleted successfully!"});
                return;
            }
        }
    } else if (req.method === 'GET') {
        const {
            by,
            group,
            page,
        } = req.query;
        let result;

        /**
         * !!! important !!!
         * user_id can be got from req.body after middleware
         * delete tempUserId after testing
         */
        let userId = tempUserId;

        if (!validateGetRequest(req.query).success) {
            await res.status(422).json({message: 'Invalid post data!'});
            return;
        }

        const userObj = await findUserById(userId);

        switch (by) {
            case 'all':
                // check if the page number is valid
                if (Number(page) < 1 || isNaN(Number(page))) {
                    await res.status(422).json({message: 'Invalid page number!'});
                    return;
                }

                // check if the user and group is valid
                // console.log(userObj.foundUser.toObject().groups, group as string)
                await handlePostGroupAuthorization(userObj, group as string, res);

                // get posts
                result = await getAllPosts(page as string);
                await handlePostExistAuthorization(result, res);
                return res.status(200).json(result.posts);

            case 'category':
                const { category } = req.query;
                // check if the page number is valid
                if (Number(page) < 1 || isNaN(Number(page))) {
                    await res.status(422).json({message: 'Invalid page number!'});
                    return;
                }

                // check if the user and group is valid
                await handlePostGroupAuthorization(userObj, group as string, res);

                // get posts
                result = await getPostsByCategory(category as string, page as string);
                await handlePostExistAuthorization(result, res);
                return res.status(200).json(result.posts);
            case 'one':
                const {postId} = req.query;
                const foundObj = await getPostById(postId as string);
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