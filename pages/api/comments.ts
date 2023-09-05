// pages/api/comments.js

import { NextApiRequest, NextApiResponse } from 'next';

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
      if (query.id) {
        // GET /api/comments/:id
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
    case 'POST':
      // POST /api/comments
      // Implement logic to create a new comment
      res.status(201).json({ message: 'Comment created' });
      break;
    case 'PUT':
      // PUT /api/comments/:id
      // Implement logic to update an existing comment
      res.status(200).json({ message: 'Comment updated' });
      break;
    case 'DELETE':
      // DELETE /api/comments/:id
      // Implement logic to delete an existing comment
      res.status(200).json({ message: 'Comment deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}