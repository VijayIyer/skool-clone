import type { NextApiResponse } from 'next';

import {checkUserNameMatch} from "@/lib/postLib/utils";
import {
    checkNewPostPollContent,
    checkNewPostRequiredContent,
    checkNewPostRequiredEmptyContent
} from "@/lib/postLib/checkNewPostContent";

export async function handleUserAuthorization (userObj:any, user_name: string, res: NextApiResponse) {
    if (!userObj.isFindUser) {
        const { message, status } = userObj;
        await res.status(status).json({message});
        return;
    }
    const foundUser = userObj.foundUser;
    if (!checkUserNameMatch(user_name, foundUser)) {
        await res.status(422).json({message: 'User name does not match!'});
        return;
    }
}

export async function handlePostContentRequiredAuthorization (title: string, content: string, category: string, user_id: string, user_name: string, res: NextApiResponse) {
    const isValidContent = checkNewPostRequiredContent(title, content, category, user_id, user_name);
    if (!isValidContent.isValid) {
        const { message} = isValidContent;
        await res.status(422).json({message});
        return;
    }
}

export async function handlePostEmptyContentAuthorization (comments: string[], likes: string[], res: NextApiResponse) {
    const isEmptyContent = checkNewPostRequiredEmptyContent(comments, likes);
    if (!isEmptyContent.isEmpty) {
        const { message } = isEmptyContent;
        await res.status(422).json({message});
        return;
    }
}

export async function handlePostPollAuthorization (poll: any[], res: NextApiResponse) {
    if (poll.length === 1) {
        await res.status(422).json({message: 'Only one poll is not allowed!'});
        return;
    }
    if (poll.length > 1) {
        const isValidPoll = checkNewPostPollContent(poll);
        if (!isValidPoll.isValid) {
            const { message } = isValidPoll;
            await res.status(422).json({message});
            return;
        }
    }
}

export async function handlePostGroupAuthorization (userGroups: string[], group: string, res: NextApiResponse) {
    if (!userGroups.includes(group)) {
        await res.status(422).json({message: 'Invalid group!'});
        return;
    }
}

export async function handlePostAuthorAuthorization (foundObj:any, user_id: string, res: NextApiResponse) {
    if (!foundObj.isFound) {
        const { message, status } = foundObj;
        await res.status(status).json({message});
        return;
    }
    const postAuthor = foundObj.foundPost.author.toString();
    if (postAuthor !== user_id) {
        await res.status(422).json({message: 'User id does not match!'});
        return;
    }
}

export async function handlePostExistAuthorization (foundObj:any, res: NextApiResponse) {
    if (!foundObj.isFound) {
        const { message, status } = foundObj;
        await res.status(status).json({message});
        return;
    }
}