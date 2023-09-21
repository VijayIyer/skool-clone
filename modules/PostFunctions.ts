
import Post from "@/models/PostModel";
import { Schema } from "mongoose";
import dbConnect from "@/lib/dbConnect";
interface Attachment {
    id: string;
    fileName: string;
    fileType: string;
    url: string;
}

interface PollOption {
    option: string;
    votes: Schema.Types.ObjectId[];
}

export interface PostData {
    title: string;
    content: string;
    category: string;
    user_name: string;
    userId?: Schema.Types.ObjectId;
    likes?: number;
    createdAt?: Date;
    updatedAt?: Date;
    attachments?: Attachment[];
    poll?: PollOption[];
    comments?: Schema.Types.ObjectId[];
}

export async function createPost(post:PostData) {

    
    try{
        // await dbConnect();
        const res = Post.create(post)
        // console.log(res)
        return res
    }
   catch(err){
    throw err
   }

}