import {dbConnect} from "@/lib/mongoClient";
import User from "@/models/User";

export async function findUserById(user_id: string) {
    await dbConnect();
    try {
        const foundUser = await User.findById(user_id);
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
        return {
            isFindUser: false,
            status: 500,
            message: `Error finding user: ${error}`
        }
    }
}