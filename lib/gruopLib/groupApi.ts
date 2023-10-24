import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/mongoClient';
import { responseFormatter } from '@/lib/responseLib';
import Group from '@/models/Group';
import UserGroupRelation from '@/models/UserGroupRelation';
import User from '@/models/User';

function getRandomID(name: string): string {
  let ID = name.split(" ").join("-") + "-";
  for (let i = 0; i < 4; i++) {
    ID += Math.floor(Math.random() * 10).toString();
  }
  return ID
}

export async function createGroup(group: { name: string; type: string }, userID: string) {
  // create gid based on name input
  const name = group.name.toLowerCase();
  let groupID = getRandomID(name);
  while (await Group.findOne({ gid: groupID })) {
    groupID = getRandomID(name);
  }
  // create data
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
    user: new mongoose.Types.ObjectId(userID),
    role: "creator"
  });
  await newUserGroupRelation.save();
  return dbRes._id;
}

export async function getGroupsUnderUser(userID: string) {
  const user = new mongoose.Types.ObjectId(userID);
  const relations = await UserGroupRelation.find({ user });

  const groups = await Promise.all(relations.map(async (relation) => {
    const group = await Group.findById(relation.group);
    return group;
  }));

  return groups
}

export async function getGroupAbout(gid: string) {
  const group = await Group.findOne({ gid });
  const groupMembers = await UserGroupRelation.find({ group: group._id });
  const memberNum = groupMembers.length;
  const creatorRelation = groupMembers.find(member => member.role === "creator");
  const creatorID = creatorRelation.user.toString();
  const creator = await User.findById(creatorID);
  // const creator = await User.find({});
  const { __v, ...groupAboutData} = group;
  return {
    group,
    memberNum,
    creator: {
      fullName: creator.fullName
    }
  }
}
