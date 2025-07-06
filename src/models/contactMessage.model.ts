import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, },
        subject: { type: String, required: true, },
        userMessage: { type: String, required: true, },

        isVerified: { type: Boolean, default: false },
        verificationToken: String,
        verificationTokenExpiresAt: Date,   

        adminReplied: { type: Boolean, default: false }, 
        adminComment: { type: String, default: '' },
    },
    { timestamps: true }
);

const ContactMessage = mongoose.model('contactMessage', contactMessageSchema);
export default ContactMessage;