import { Schema, model, Document } from 'mongoose';

const UserGroupRelationSchema = new Schema({
    groupID: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        required: true,
        enum: ["creator", "admin", "member"],
        default: "member"
    },
    joinedAt: {
        type: Date, 
        required: true, 
        default: Date.now 
    }
});

export const UserUserGroupRelationRelationModel = model<UserGroupRelation>('UserGroupRelation', UserGroupRelationSchema);

export interface UserGroupRelation extends Document {
    groupID: Schema.Types.ObjectId,
    userID: Schema.Types.ObjectId,
    role: string
}