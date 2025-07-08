import User from "@/models/user.model";

interface CreateUserData {
  name: string;
  email: string;
  username: string;
  image?: string;
  phoneNumber?: string;
  dateOfBirth?: Date | string;
  address?: string;
  gender?: "male" | "female" | "other";
  isAdmin?: boolean;
  // add other optional fields as needed
}

interface UpdateUserData {
  name?: string;
  username?: string;
  phoneNumber?: string;
  dateOfBirth?: Date | string;
  address?: string;
  gender?: "male" | "female" | "other";
  institution?: string;
  educationLevel?: string;
  skills?: string[];
  biography?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    personalWebsite?: string;
  };
  // add other editable fields
}

export async function createUser(userData: CreateUserData) {
  const user = new User(userData);
  await user.save();
  return user;
}

export async function getUserById(id: string) {
  return User.findById(id);
}

export async function updateUser(id: string, updateData: UpdateUserData) {
  const allowedUpdates = [
    "name",
    "username",
    "phoneNumber",
    "dateOfBirth",
    "address",
    "gender",
    "institution",
    "educationLevel",
    "skills",
    "biography",
    "socialLinks",
  ];

  const updates: Partial<UpdateUserData> = {};

  for (const key of allowedUpdates) {
    if (key in updateData && updateData[key as keyof UpdateUserData] !== undefined) {
      updates[key as keyof UpdateUserData] = updateData[key as keyof UpdateUserData]!;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  return updatedUser;
}

export async function deleteUser(id: string) {
  return User.findByIdAndDelete(id);
}
