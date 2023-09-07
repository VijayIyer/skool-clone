// pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Post, { IPost } from '@/models/Post';
import connectDb from '@/lib/dbConnect';

connectDb();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await handlePostRequest(req, res);
      break;

    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, categories, attachments, poll } = req.body;

  if (!title || !content || !categories) {
    return res.status(422).send('Title, content, and categories are required');
  }

  const newPost: IPost = new Post({
    title,
    content,
    author: req.body.firstname,
    createdAt: new Date(),
    updatedAt: new Date(),
    categories,
    attachments,
    poll,
    likes: [],
    comments: [],
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).send(savedPost._id);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Error creating post');
  }
}
