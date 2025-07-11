import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema(
    {
        facebook: { type: String, trim: true, lowercase: true, match: /^https?:\/\//, required: false },
        linkedin: { type: String, trim: true, lowercase: true, match: /^https?:\/\//, required: false },
        instagram: { type: String, trim: true, lowercase: true, match: /^https?:\/\//, required: false },
        youtube: { type: String, trim: true, lowercase: true, match: /^https?:\/\//, required: false },
        personalWebsite: { type: String, trim: true, lowercase: true, match: /^https?:\/\//, required: false },
    }, 
    { _id: false }
);

const userSchema = new mongoose.Schema(
    {
        // OAuth-generated
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        image: { type: String, trim: true, default: 'avatar.svg', required: false },

        // User-set credentials
        username: { type: String, required: true, unique: true, trim: true, lowercase: true },
        password: { type: String, required: false },

        resetToken: { type: String },
        resetTokenExpiry: { type: Date },
        // User Secrets
        phoneNumber: { type: String, trim: true, match: /^\+?[0-9\s\-]{7,15}$/, required: false },
        dateOfBirth: { type: Date, required: false },
        address: { type: String, trim: true, required: false },
        gender: { type: String, enum: ["male", "female", "other"], required: false },

        // Admin and department info
        isAdmin: { type: Boolean, default: false, required: true  },
        adminAccess: { type: String, default: "" },

        isDeptMember: { type: Boolean, default: false },
        deptName: { type: String, trim: true, default: "" },
        deptRole: { type: String, trim: true },

        isTeamMember: { type: Boolean, default: false },
        teamName: { type: String, trim: true },
        teamRole: { type: String, trim: true },

        // User profile
        isAccVerified: { type: Boolean, default: false, required: false },
        institution: { type: String, trim: true },
        educationLevel: { type: String, trim: true },
        skills: { type: [String] },
        biography: { type: String, trim: true },
        socialLinks: { type: socialLinksSchema, default: () => ({}) },

        // User profile statistics
        dateJoined: { type: Date, default: Date.now },
        totalHoursWorked: { type: Number, default: 0, min: 0 },
        totalTasksCompleted: { type: Number, default: 0, min: 0 },
        certifications: { type: [String], default: [] },
        milestones: { type: [String], default: [] },

        isBanned: { type: Boolean, default: false },
        banReason: { type: String, trim: true },

        isSuspended: { type: Boolean, default: false },
        suspensionReason: { type: String, trim: true },

        lastLogin: { type: Date },
        loginHistory: [
            {
                ip: String,
                location: String,
                device: String,
                loginAt: { type: Date, default: Date.now }
            }
        ],

        preferences: {
            newsletterSubscribed: { type: Boolean, default: true },
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
