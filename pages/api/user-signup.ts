import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import { validateUserSignUpInput } from '../../lib/validation';
import { generateHashPassword } from '../../lib/hashPassword';
import {
  createNewUser,
  isUserEmailTaken,
  deleteUsers,
} from '../../lib/userApi';

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect with MongoDB database
  await dbConnect();
  // deleteUsers();

  switch (req.method) {
    case 'POST':
      try {
        const user = JSON.parse(req.body);
        console.log('user:', user);

        const validationResult = validateUserSignUpInput(user);

        if (!validationResult.success) {
          return res
            .status(400)
            .json({ success: false, message: validationResult.message });
        }

        if (await isUserEmailTaken(user.email)) {
          return res.status(400).json({
            success: false,
            message: 'A user already used this email',
          });
        }

        const hashedPassword = await generateHashPassword(user.password);
        const dbRes = await createNewUser(
          user.first_name,
          user.last_name,
          user.email,
          hashedPassword
        );

        return res.status(201).json({ success: true, data: dbRes });
      } catch (error) {
        console.error('Error during sign-up:', error);
        return res
          .status(500)
          .json({ success: false, message: 'Unable to sign up' });
      }
    default:
      return res.status(405).send('Method Not Allowed');
  }
}
