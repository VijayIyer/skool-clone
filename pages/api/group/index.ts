import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import {dbConnect} from '@/lib/mongoClient';
import { responseFormatter } from '@/lib/responseLib';
import Group from '@/models/Group';
import  UserGroupRelation  from '@/models/UserGroupRelation';

function getRandomID(name:string):string {
    let ID = name.split(" ").join("-") + "-";
    for(let i=0; i<4; i++){
        ID += Math.floor(Math.random() * 10).toString();
    }
    return ID
  }

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

  switch (req.method) {
    // create a new group
    case 'POST':
      try {
        const group = req.body;
        if(!group.name || !group.type || !group.userID) return (
          res
            .status(400)
            .json(responseFormatter(false, null, "miss valid data"))
        );;

        const name = group.name.toLowerCase();
        let groupID = getRandomID(name);
        while(await Group.findOne({gid: groupID})) {
            groupID = getRandomID(name);
        }
        const newGroup = new Group({
            gid: groupID,
            name: group.name,
            type: group.type,
            icon: null,
            description: null,
            about: {
              text: null,
              media: null
            }
        });
        const dbRes = await newGroup.save();
        const newUserGroupRelation = new UserGroupRelation({
          group: dbRes._id,
          user: new mongoose.Types.ObjectId(group.userID),
          role: "creator"
        });
        await newUserGroupRelation.save();
        return res.status(201).json(responseFormatter(true, { id: dbRes._id }));
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
            if(!req.query.userID || Array.isArray(req.query.userID)) return (
              res
                .status(400)
                .json(responseFormatter(false, null, "please input one user"))
            );;
            const userID = new mongoose.Types.ObjectId(req.query.userID);
            const relations = await UserGroupRelation.find({user: userID});
           
            const groups = await Promise.all(relations.map(async(relation)=>{
              const group = await Group.findById(relation.group);
              return group;
            }));
            return res.status(200).json(responseFormatter(true, {groups}))
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
