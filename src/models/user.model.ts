import mongoose, { Schema } from "mongoose";

const socialLinksSchema = new Schema(
  {
    facebook: {
      type: String,
      trim: true,
      lowercase: true,
      match: /^https?:\/\//,
    },
    linkedin: {
      type: String,
      trim: true,
      lowercase: true,
      match: /^https?:\/\//,
    },
    instagram: {
      type: String,
      trim: true,
      lowercase: true,
      match: /^https?:\/\//,
    },
    personalWebsite: {
      type: String,
      trim: true,
      lowercase: true,
      match: /^https?:\/\//,
    },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    // OAuth-generated (required)
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, trim: true },

    // User-set credentials
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },

    phoneNumber: {
      type: String,
      trim: true,
      match: /^\+?[0-9\s\-]{7,15}$/,
      default: undefined,
    },
    dateOfBirth: { type: Date, default: undefined },
    address: { type: String, trim: true, default: undefined },
    gender: { type: String, enum: ["male", "female", "other"], default: undefined },

    // Admin and department info
    isAccVerified: { type: Boolean, default: false },

    isAdmin: { type: Boolean, default: false },
    adminAccess: { type: String, trim: true, default: undefined },

    isDeptMember: { type: Boolean, default: false },
    deptName: { type: String, trim: true, default: undefined },
    deptRole: { type: String, trim: true, default: undefined },

    isTeamMember: { type: Boolean, default: false },
    teamName: { type: String, trim: true, default: undefined },
    teamRole: { type: String, trim: true, default: undefined },

    // Stats and dates
    dateJoined: { type: Date, default: Date.now },
    totalTimeSpent: { type: Number, default: 0, min: 0 },
    totalTasksCompleted: { type: Number, default: 0, min: 0 },

    certifications: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: unknown[]) => arr.every(item => typeof item === "string"),
        message: "All certifications must be strings",
      },
    },
    milestones: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: unknown[]) => arr.every(item => typeof item === "string"),
        message: "All milestones must be strings",
      },
    },

    // Editable user info
    institution: { type: String, trim: true, default: undefined },
    educationLevel: { type: String, trim: true, default: undefined },
    skills: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: unknown[]) => arr.every(item => typeof item === "string"),
        message: "All skills must be strings",
      },
    },
    biography: { type: String, trim: true, default: undefined },

    socialLinks: { type: socialLinksSchema, default: () => ({}) },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
