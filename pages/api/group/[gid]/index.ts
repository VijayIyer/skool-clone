import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/mongoClient';
import { responseFormatter } from '@/lib/responseLib';
import Group from '@/models/Group';
import UserGroupRelation from '@/models/UserGroupRelation';
import { isValidUpdateData } from '@/lib/gruopLib/groupDataValidate';

export default async function gidHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.headers.userid) return res.status(401).json(responseFormatter(false, null, 'Miss User Auth in the request'));
  // get user ID from headers
  const userID: string = req.headers.userid as string;

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
  const { gid } = req.query
  const group = await Group.findOne({ gid: gid });

  switch (req.method) {
    case 'POST':
      try {
        const relation = await UserGroupRelation.findOne({ group: group._id, user: userID });
        if (relation.role === "member") return res.status(403).json(responseFormatter(false, null, 'This user has no authorization.'));
        //update group details
        const groupData = req.body;
        // validate group update data
        if (isValidUpdateData(groupData, group)) {
          // update group data
          await Group.findOneAndUpdate({ gid: gid }, { ...groupData });
          return res.status(200).json(responseFormatter(true, { id: group._id }));
        } else {
          return res.status(400).json(responseFormatter(false, null, 'Invalid updated input group data'));
        }
      } catch (error) {
        return res
          .status(500)
          .json(
            responseFormatter(
              false,
              null,
              'Fail to update group'
            )
          );
      }

    // find group details
    case 'GET':
      try {
        // show group details and people in this group
        const users = await UserGroupRelation.find({ group: group._id });
        return res.status(200).json(responseFormatter(true, { group, users }))
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
