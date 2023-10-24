import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import {dbConnect} from '@/lib/mongoClient';
import { responseFormatter } from '@/lib/responseLib';
import Group from '@/models/Group';
import  UserGroupRelation  from '@/models/UserGroupRelation';
import { getGroupAbout } from '@/lib/gruopLib/groupApi';

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
  const gid = req.query.gid as string;
  const group = await Group.findOne({gid: gid});

  // check current user has authorization
  const adminRelation = await UserGroupRelation.findOne({gid: group._id, user: new mongoose.Types.ObjectId(adminID)});

  switch (req.method) {
    case 'POST':
      
      if(!adminRelation || adminRelation.role === "member") return res.status(403).json(responseFormatter(false, null, 'No authorization to update about info'));

      try {
       //update about
       const aboutData = req.body;
       // validate about data
       
       await Group.findOneAndUpdate({gid:gid}, {about: aboutData});      
       return res.status(200).json(responseFormatter(true, {id: group._id}));
        
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
    // find group about details
    case 'GET':
        if (group.hasOwnProperty('about')) {
            const about = await getGroupAbout(gid);
            return res.status(200).json(responseFormatter(true, {about}));
        } else {
            return res.status(404).json(responseFormatter(false, null, 'About info Not Found'));
        }

        
    default:
      return res
        .status(405)
        .json(responseFormatter(false, null, 'Method Not Allowed'));
  }
}
