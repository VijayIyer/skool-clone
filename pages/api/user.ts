import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Post received');
  } else {
    console.log('Post fails');
  }
  res.status(200).send('Post received');
}
