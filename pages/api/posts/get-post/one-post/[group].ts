import {NextApiRequest, NextApiResponse} from "next";
import {
    findUserById,
    getPostById,
    handlePostExistValidation,
    handleUserValidation
} from "@/lib/postLib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {group} = req.query;
    const {user_id, user_name, post_id} = req.body;

    const userObj = await findUserById(user_id);
    await handleUserValidation(userObj, user_name, res);

    const foundObj = await getPostById(post_id);
    await handlePostExistValidation(foundObj, res);

    return res.status(200).json(foundObj.foundPost);
}