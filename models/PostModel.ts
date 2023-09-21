import { Schema, models, model } from "mongoose";

const taskSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: 'General Discussion'
  },  
  user_name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }, 
  attachments: [{
    id: String,
    fileName: String,
    fileType: String,
    url: String,
  }],
  poll: [{
    option: String,
    votes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
},{
  timestamps:true
});
const Post = models.Task || model("Task", taskSchema);
export default Post;
// import { Schema, models, model } from "mongoose";
// const taskSchema = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   likes: {
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
// const Post = models.Task || model("Task", taskSchema);
// export default Post;
