import { Schema, model, models } from 'mongoose';

const GroupSchema = new Schema({
    gid: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["private", "public"],
        default: "public"
    },
    icon: {
        type: String,
    },
    description: {
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