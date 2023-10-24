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
        type: String,
    },
    about: {
        text: {
            type: String,
        },
        media: [{
            type: String,
        }]
    },
},{
    timestamps: true, 
});

const Group = models.Group || model<Group>("Group", GroupSchema);


interface Group extends Document {
    gid: string,
    name: string,
    type: string,
    icon?: null | string,
    description?: null|string,
    about?: {
        text: null | string,
        media: null | string[]
    },
}

export default Group;