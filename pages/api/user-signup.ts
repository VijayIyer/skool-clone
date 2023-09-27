import type { NextApiRequest, NextApiResponse } from 'next';
import {dbConnect} from '@/lib/mongoClient';
import {
  validateUserSignUpInput,
  generateHashPassword,
  createUser,
  isUserEmailTaken,
  deleteUsers,
} from '../../lib/userLib';
import { responseFormatter } from '@/lib/responseLib';

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect with MongoDB database
  try {
    await dbConnect();
  } catch (e) {
    console.log('fail to connect with database', e);
    return (
      res
        .status(500)
        // .json({ success: false, message: 'Internal Server Error' });
        .json(responseFormatter(false, null, 'Internal Server Error'))
    );
  }
  // // deleteUsers();

  switch (req.method) {
    case 'POST':
      try {
        const user = req.body;
        // console.log('typeof', typeof user);
        // console.log('user:', user);

        const validationResult = validateUserSignUpInput(user);

        if (!validationResult.success) {
          return (
            res
              .status(400)
              // .json({ success: false, message: validationResult.message });
              .json(responseFormatter(false, null, validationResult.message))
          );
        }

        if (await isUserEmailTaken(user.email)) {
          // return res.status(400).json({
          //   success: false,
          //   message: 'A user already used this email',
          // });
          return res
            .status(400)
            .json(
              responseFormatter(false, null, 'A user already used this email')
            );
        }

        const hashedPassword = await generateHashPassword(user.password);
        const dbRes = await createUser(
          user.firstName,
          user.lastName,
          user.email,
          hashedPassword
        );

        // return res.status(201).json({ success: true, data: { id: dbRes._id } });
        return res.status(201).json(responseFormatter(true, { id: dbRes._id }));
      } catch (error) {
        console.error('Error during sign-up:', error);
        return res
          .status(500)

          .json(
            responseFormatter(
              false,
              null,
              'Unable to create an account in the database'
            )
          );
      }
    default:
      return res
        .status(405)
        .json(responseFormatter(false, null, 'Method Not Allowed'));
  }
}
