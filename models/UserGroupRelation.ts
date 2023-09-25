import { Schema, model, models } from 'mongoose';

const UserGroupRelationSchema = new Schema({
    groupID: {
        type: String,
        ref: 'Group'
    },
    email: {
        type: String,
        ref: 'User'
    },
    role: {
        type: String,
        enum: ["creator", "admin", "member"],
        default: "member"
    }
}, {
    timestamps: true
});

const UserGroupRelation = models.UserGroupRelation || model<UserGroupRelation>('UserGroupRelation', UserGroupRelationSchema);

interface UserGroupRelation extends Document {
    groupID: string,
    userID: string,
    role: string
}

export default UserGroupRelation;