import { NextApiRequest, NextApiResponse } from 'next';
import { CommentModel, Comment } from '../../models/Comment';
import { PostModel } from '../../models/PostModel';

// Example comments data
const comments = [
  { id: 1, content: 'Comment 1', userId: 1 },
  { id: 2, content: 'Comment 2', userId: 2 },
  // ...
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (query.id) {  // GET /api/comments/:id
        const commentId = parseInt(query.id as string, 10);
        const comment = comments.find((c) => c.id === commentId);
        if (!comment) {
          res.status(404).json({ message: 'Comment not found' });
        } else {
          res.status(200).json(comment);
        }
      } else {
        // GET /api/comments
        res.status(200).json(comments);
      }
      break;
    case 'POST': // POST /api/comments
      const { commentText, userId, postId } = req.body;
    
      // Create a new comment
      const newComment = new CommentModel({
        commentText: commentText,
        userID: userId,
        postID: postId,
      });
    
      // Save the comment to the database
      newComment.save()
        .then((comment: Comment) => {
          PostModel.findByIdAndUpdate(postId, { $push: { comments: comment._id } })
            .then(() => {
              res.status(201).json({ message: 'Comment created' });
            })
            .catch((error: any) => {
              res.status(500).json({ message: 'Failed to update post with comment', error });
            });
        })
        .catch((error: any) => {
          res.status(500).json({ message: 'Failed to create comment', error });
        });
      break;
    case 'PUT':  // PUT /api/comments/:id
      const putCommentId = parseInt(query.id as string, 10);
      const { commentText: putCommentText } = req.body;
    
      CommentModel.findByIdAndUpdate(putCommentId, { commentText: putCommentText })
        .then(() => {
          res.status(200).json({ message: 'Comment updated' });
        })
        .catch((error: any) => {
          res.status(500).json({ message: 'Failed to update comment', error });
        });
      break;
    case 'DELETE':  // DELETE /api/comments/:id
      const deleteCommentId = parseInt(query.id as string, 10);

      CommentModel.findByIdAndDelete(deleteCommentId)
        .then(() => {
          res.status(200).json({ message: 'Comment deleted' });
        })
        .catch((error: any) => {
          res.status(500).json({ message: 'Failed to delete comment', error });
        });
      break;
  }
}