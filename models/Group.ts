import { Schema, model, models } from 'mongoose';

const GroupSchema = new Schema({
    groupID: {
        type: String,
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
},{
    timestamps: true, 
});

const Group = models.Group || model<Group>("Group", GroupSchema);


interface Group extends Document {
    groupID: string,
    groupName: string,
    groupType: string,
    createdAt: Date, 
    activeAt?: Date,
    groupIcon?: string,
    groupDescription?: string,
}

export default Group;