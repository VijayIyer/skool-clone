import mongoose, { Schema } from 'mongoose';


export interface IPost extends mongoose.Document {
    title: string;
    content: string;
    author: string;
    user_name: string;
    createdAt: Date;
    updatedAt: Date;
    attachments: { fileName: string; fileType: string; url: string }[];
    poll: [{ option: string; votes: string[] }];
    category: string;
    likes: number;
    comments: Schema.Types.ObjectId[];
}

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    user_name: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    attachments: [
        {
            fileName: { type: String },
            fileType: { type: String },
            url: { type: String },
        },
    ],
    poll: [
        {
            option: { type: String },
            votes: [{type: String}],
        }
    ],
    category: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema, 'posts');