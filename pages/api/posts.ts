// pages/api/posts.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Post from '../models/Post';
import authMiddleware from '../middlewares/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  switch(req.method) {
    case 'POST':
      await createPost(req, res);
      break;
  }

};

export default authMiddleware(handler);

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {

  // Validate input
  if(!req.body.content) {
    return res.status(400).json({message: 'Content is required'});
  }

  // Get authenticated user
  const userId = req.userId; 

  try {
    // Create new post
    const post = await Post.create({
      content: req.body.content,
      userId,
      likes: 0, 
      comments: []
    });

    res.status(201).json(post);

  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error creating post'});
  }

};