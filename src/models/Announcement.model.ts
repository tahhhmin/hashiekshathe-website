import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
    {
        title: {type: String, required: true,},
        subtitle: {type: String, required: true,},
        description: {type: String, required: true,},
        links: { type: [String], required: false, },
        date: { type: Date, default: Date.now, },
    },   
    {timestamps: true}
);

export default mongoose.models.Announcement ||
mongoose.model('Announcement', AnnouncementSchema);