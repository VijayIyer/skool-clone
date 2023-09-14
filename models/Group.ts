import { Schema, model, Document } from 'mongoose';

const groupSchema = new Schema({
    groupID: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    groupName: {
        type: String,
        required: true,
    },
    groupType: {
        type: String,
        required: true,
        enum: ["private", "public"],
        default: "public"
    },
    createdAt: {
        type: Date, 
        required: true, 
        default: Date.now
    },
    groupIcon: {
        type: String,
    },
    groupDescription: {
        text: {
            type: String,
        },
        Media: [{
            type: String,
        }]
    },
});

export const GroupModel = model<Group>('Group', groupSchema);

export interface Group extends Document {
    groupID: Schema.Types.ObjectId,
    groupName: String,
    groupType: String,
    createdAt: Date, 
    activeAt?: Date,
    groupIcon?: String,
    groupDescription?: String,
}