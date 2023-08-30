import type { NextApiRequest, NextApiResponse } from 'next';

import { generateHashPassword } from '../../lib/hashPassword';
import { createUser } from '../../lib/userApi';
// import User from '../../models/User';
import dbConnect from '@/lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const user = JSON.parse(req.body);
        const hashedPassword = await generateHashPassword(user.password);
        const dbRes = await createUser(
          user.first_name,
          user.last_name,
          user.email,
          hashedPassword
        );

        res.status(201).json({ data: dbRes });
      } catch (error) {
        res.status(500).json({ message: 'Unablle to  sign up' });
      }
      break;
    default:
      res.status(405).send('Method Not Allowed');
      break;
  }
}
