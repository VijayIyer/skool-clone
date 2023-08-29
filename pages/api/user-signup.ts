import type { NextApiRequest, NextApiResponse } from 'next';

import { generateHashPassword } from '../../lib/hashPassword';
import { createUser } from '../../lib/userApi';
// import User from '../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      console.log('sign up get api');
      break;
    case 'POST':
      try {
        const user = JSON.parse(req.body);
        const hashedPassword = await generateHashPassword(user.password);
        // console.log(hashedPassword);
        // console.log(user);
        const dbRes = await createUser(
          user.first_name,
          user.last_name,
          user.email,
          hashedPassword
        );

        // const newUser = new User({
        //   firstname: user.first_name,
        //   lastname: user.last_name,
        //   email: user.email,
        //   password: hashedPassword,
        // });
        // const message = await newUser.save();

        res.status(201).json({ data: dbRes });
      } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
      }
      break;
    default:
      res.status(405).send('Method Not Allowed');
      break;
  }
}
