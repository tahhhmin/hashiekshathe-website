import mongoose from "mongoose";

const CollaborateMessageSchema = new mongoose.Schema(
    {
        // Organisation details
        orgName: {type: String, required: true,},
        orgType: {type: String, required: true,},
        orgEmail: {type: String, required: true,},
        orgWebsiteLink: {type: String, required: false,},
        orgSocialLink: {type: String, required: false,},
        orgAddress: {type: String, required: true,},
        // Collaboration details
        collaborationDescription: {type: String, required: true,},
        proposedTimeline: {type: String, required: true,},
        collaborationGoals: {type: String, required: true,},
        // Sender details
        senderName: {type: String, required: true,},
        senderEmail: {type: String, required: true,},
        senderContactNumber: {type: String, required: true,},
        senderSocialLink: {type: String, required: false,},
        senderPosition: {type: String, required: true,},
        // Verification
        isVerified: { type: Boolean, default: false },
        verificationToken: String,
        verificationTokenExpiresAt: Date,   
        // Backend
        adminReplied: { type: Boolean, default: false }, 
        adminComment: { type: String, default: '' },
    },   
    {timestamps: true}
);

export default mongoose.models.CollaborateMessage ||
mongoose.model('Collaborate message', CollaborateMessageSchema);
