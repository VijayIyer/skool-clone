import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import {dbConnect} from '@/lib/mongoClient';
import { responseFormatter } from '@/lib/responseLib';
import Group from '@/models/Group';
import  UserGroupRelation  from '@/models/UserGroupRelation';

export default async function gidHandler(
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
  const {gid} = req.query
  const group = await Group.findOne({gid: gid});

  switch (req.method) {
    case 'POST':
      try {
        //update group details
        const groupData = req.body;
        await Group.findOneAndUpdate({gid:gid}, {...groupData});      
        return res.status(201).json(responseFormatter(true, {id: group._id}));
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
            const users = await UserGroupRelation.find({group: group._id});
            return res.status(200).json(responseFormatter(true, {group, users}))
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
