// middlewares/auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
// import { verifyJWT } from '../../utils/jwt';

export default function authMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Get JWT token from header
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).end();
      }

      // Verify and decode token
      // const decoded = await verifyJWT(token);

      // Attach user to request
      req.userId = decoded.sub as string;

    } catch (error) {
      return res.status(401).end();
    }

    // Call route handler
    return handler(req, res); 
  };

}