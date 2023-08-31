import type { NextApiRequest, NextApiResponse } from 'next';

import { generateHashPassword } from '../../lib/hashPassword';
import { createNewUser, isUserEmailTook } from '../../lib/userApi';
import dbConnect from '@/lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //connect with MongoDB database
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const user = JSON.parse(req.body);
        if (await isUserEmailTook(user.email)) {
          res
            .status(200)
            .json({ success: false, mesage: 'A user already used this email' });
          return;
        }

        const hashedPassword = await generateHashPassword(user.password);
        const dbRes = await createNewUser(
          user.first_name,
          user.last_name,
          user.email,
          hashedPassword
        );

        res.status(201).json({ success: false, data: dbRes });
      } catch (error) {
        res.status(500).send({ success: false, message: 'Unablle to sign up' });
      }
      break;
    default:
      res.status(405).send('Method Not Allowed');
      break;
  }
}
