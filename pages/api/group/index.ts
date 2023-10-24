import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/mongoClient';
import { responseFormatter } from '@/lib/responseLib';
import { createGroup, getGroupsUnderUser } from '@/lib/gruopLib/groupApi';

export default async function groupHandler(
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
        .json(responseFormatter(false, null, 'Internal Server Error'))
    );
  }

  if (!req.headers.userid) return res.status(401).json(responseFormatter(false, null, 'Miss User Auth in the request'));
  // get user ID from headers
  const userID: string = req.headers.userid as string;

  switch (req.method) {
    // create a new group
    case 'POST':
      try {
        const group = req.body;
        if (!group.name || !group.type) return (
          res
            .status(400)
            .json(responseFormatter(false, null, "miss valid data in request body"))
        );

        // create a group and group-user relation
        const groupID = await createGroup(group, userID);
        return res.status(201).json(responseFormatter(true, { id: groupID }));
      } catch (error) {
        return res
          .status(500)

          .json(
            responseFormatter(
              false,
              null,
              'Fail to create group'
            )
          );
      }
    // find groups that user has, show these on the left select of navbar
    case 'GET':
      try {
        // need user._id on the client and deliver with request
        const groups = await getGroupsUnderUser(userID);
        return res.status(200).json(responseFormatter(true, { groups }))
      } catch (error) {
        return res
          .status(500)

          .json(
            responseFormatter(
              false,
              null,
              'Find no match group'
            )
          );
      }
    default:
      return res
        .status(405)
        .json(responseFormatter(false, null, 'Method Not Allowed'));
  }
}
