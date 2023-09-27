import { Schema, model, models } from 'mongoose';

const UserGroupRelationSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
    group: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    role: string
}

export default UserGroupRelation;