import mongoose, {Schema} from "mongoose";

const GroupSchema = new Schema({
    groupId: {
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
        enum: ['public', 'private'],
        default: 'public',
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    groupIcon: {
        type: String,
    },
    groupDescription: {
        text: { type : String },
        Media: [{ type: String }]
    }
});

export default mongoose.models.Group || mongoose.model('Group', GroupSchema);