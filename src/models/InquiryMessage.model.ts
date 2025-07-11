import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
    {
        // Message info
        email: { type: String, required: true },
        subject: { type: String, required: true },
        userMessage: { type: String, required: true },
        // Verification
        isVerified: { type: Boolean, default: false },
        verificationToken: String,
        verificationTokenExpiresAt: Date,
        // Backend
        adminReplied: { type: Boolean, default: false },
        adminComment: { type: String, default: '' },
    },
    { timestamps: true }
);

const ContactMessage = mongoose.model('Contact messages', contactMessageSchema);

export default ContactMessage;
