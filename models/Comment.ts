import { Schema, model, Document } from 'mongoose';

// Define the Comment Schema
const commentSchema = new Schema({
  commentID: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  postID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

// Create the Comment model
export const CommentModel = model<Comment>('Comment', commentSchema);

// Comment interface
export interface Comment extends Document {
  commentID: Schema.Types.ObjectId;
  commentText: string;
  userID: Schema.Types.ObjectId;
  postID: Schema.Types.ObjectId;
}
