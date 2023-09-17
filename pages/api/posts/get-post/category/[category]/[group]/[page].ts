import type { NextApiRequest, NextApiResponse } from 'next';
import {findUserById, handlePostGroupValidation, handleUserValidation, getPostsByCategory} from "@/lib/postLib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { category, group, page} = req.query;
    const {user_id, user_name} = req.body;

    // check if the page number is valid
    if (Number(page) < 1 || isNaN(Number(page))) {
        await res.status(422).json({message: 'Invalid page number!'});
        return;
    }

    // check if the user and group is valid
    const userObj = await findUserById(user_id);
    await handleUserValidation(userObj, user_name, res);
    await handlePostGroupValidation(userObj.foundUser.toObject().groups, group as string, res);


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
}