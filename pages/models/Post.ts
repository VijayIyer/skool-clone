import mongoose, { Schema, Document } from 'mongoose';
import { UserDocument } from './User';

export interface Post {
  userId: UserDocument['_id'];
  content: string;
  likes: number;
  comments: Schema.Types.ObjectId[];
  createdAt: Date;
}

export interface PostDocument extends Post, Document {}

const PostSchema = new Schema<Post>(
  {
    userId: { 
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: [{
      type: Schema.Types.ObjectId, 
      ref: 'Comment'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

const Post = mongoose.model<PostDocument>('Post', PostSchema);

export default Post;