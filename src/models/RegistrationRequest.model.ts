import mongoose from 'mongoose';

const RegistrationRequestSchema = new mongoose.Schema(
  {
    // Basic Info
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },

    // calculated from dob
    age: { type: Number, required: false }, 
    
    gender: { type: String, required: true },
    profileImageLink: { type: String, required: true },

    // Contact Info
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    facebook: { type: String, required: true },

    // Educational Info
    educationLevel: { type: String, required: true },
    institution: { type: String, required: true },
    institutionIdImage: { type: String, required: true },

    // Volunteering Info
    whyJoin: { type: String, required: true },

    wantsLeadership: { type: String, required: true },
    preferredDepartment: { type: String, required: false },
    specificRole: { type: String, required: false },
    cvLink: { type: String, required: false },

    previousExperience: { type: String, required: true },
    workingLocation: { type: String, required: true },
    skills: { type: [String], required: true },
    timeCommitment: { type: String, required: true },

    // Future Goals & Scheduling
    interviewSchedule: { type: Date, required: true }, // Use Date type
    referralSource: { type: String, required: false },

    // Verification
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpiresAt: Date,   
    // Backend
    adminReplied: { type: Boolean, default: false }, 
    adminComment: { type: String, default: '' },
    status: {
        type: String,
        enum: ['pending', 'interview scheduled', 'accepted', 'rejected', 'withdrawn'],
        default: 'pending',
    },
  },
  { timestamps: true }
);


export default mongoose.models.RegistrationRequest ||
mongoose.model('Registration Request', RegistrationRequestSchema);