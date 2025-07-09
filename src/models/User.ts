import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  isAdmin: boolean;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    image: String,
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Avoid model overwrite on hot reload
export const User = models.User || model<IUser>("User", UserSchema);
