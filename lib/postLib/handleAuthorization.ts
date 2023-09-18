import type { NextApiResponse } from 'next';

export async function handlePostGroupAuthorization (userObj: string[], group: string, res: NextApiResponse) {
    if (!userObj.foundUser.toObject().groups.includes(group)) {
        await res.status(422).json({message: 'Invalid group!'});
        return;
    }
}

export async function handlePostAuthorAuthorization (foundObj:any, userId: string, res: NextApiResponse) {
    if (!foundObj.isFound) {
        const { message, status } = foundObj;
        await res.status(status).json({message});
        return;
    }
    const postAuthor = foundObj.foundPost.author.toString();
    if (postAuthor !== userId) {
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
