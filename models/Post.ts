import mongoose, { Schema } from 'mongoose';


export interface IPost extends mongoose.Document {
    title: string;
    content: string;
    author: string;
    userName: string;
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
    userName: { type: String, required: true },
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
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
            votes: [{type: Schema.Types.ObjectId, ref: 'User'}],
        }
    ],
    category: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, {timestamps: true});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema, 'posts');