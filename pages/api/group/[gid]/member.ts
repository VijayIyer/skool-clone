import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import {dbConnect} from '@/lib/mongoClient';
import { responseFormatter } from '@/lib/responseLib';
import Group from '@/models/Group';
import  UserGroupRelation  from '@/models/UserGroupRelation';

export default async function groupMemberHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(!req.headers.userid) return res.status(401).json(responseFormatter(false, null, 'Miss User Auth in the request'));
  // get user ID from headers
  const adminID: string = req.headers.userid as string;

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
  const {gid} = req.query
  const group = await Group.findOne({gid: gid});

  switch (req.method) {
    case 'POST':
      // check current user has authorization to update members in the group
      const adminRelation = await UserGroupRelation.findOne({gid: group._id, user: new mongoose.Types.ObjectId(adminID)});
      if(!adminRelation || adminRelation.role === "member") return res.status(403).json(responseFormatter(false, null, 'No authorization to update members in this group'));

      try {
        // manipulate people in this group, should request with user _id
        const userID = new mongoose.Types.ObjectId(req.body.userID);
        let role = req.body.role?req.body.role:"member";
        if(await UserGroupRelation.findOne({
            group: group._id,
            user: userID
        })) {
            await UserGroupRelation.findOneAndUpdate({group:group._id, user:userID}, {role});
            return res.status(200).json(responseFormatter(true, {group: group._id, user: userID, role}));
        } else {
            // add user
            const newUserGroupRelation = new UserGroupRelation({
                group: group._id,
                user: userID,
                role
              });
            await newUserGroupRelation.save();
            return res.status(201).json(responseFormatter(true, {group: group._id, user: userID, role}));
        }
        
        
      } catch (error) {
        return res
          .status(500)
          .json(
            responseFormatter(
              false,
              null,
              'Fail to add/update this user in the group'
            )
          );
      }
    // find group member details
    case 'GET':
        try {
            const users = await UserGroupRelation.find({group: group._id});
            return res.status(200).json(responseFormatter(true, {users}))
        } catch (error) {
          return res
            .status(500)

            .json(
              responseFormatter(
                false,
                null,
                'Find no member in group'
              )
            );
        }
    default:
      return res
        .status(405)
        .json(responseFormatter(false, null, 'Method Not Allowed'));
  }
}
