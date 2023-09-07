import mongoose, { Schema, Document } from 'mongoose';

import { UserDocument } from './User';

export interface IPost extends Document {
  title: string;

  content: string;

  author: UserDocument['firstname'];

  createdAt: Date;

  updatedAt: Date;

  attachments: { fileName: string; fileType: string; url: string }[];

  poll: { options: string[]; results: { option: string; votes: number }[] };

  categories: string[];

  likes: number;

  comments: Schema.Types.ObjectId[];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },

  content: { type: String, required: true },

  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  createdAt: { type: Date, required: true, default: Date.now },

  updatedAt: { type: Date, default: Date.now },

  attachments: [
    {
      fileName: { type: String },
      fileType: { type: String },
      url: { type: String },
    },
  ],

  poll: {
    options: [{ type: String }],
    results: [
      {
        option: { type: String },
        votes: { type: Number },
      },
    ],
  },

  categories: { type: [String], required: true },

  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model<IPost>('Post', PostSchema, 'posts');
