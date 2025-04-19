import mongoose, { Document, model, models, Schema } from "mongoose";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

export const zUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required"),
});

export interface IConnectedAccounts {
  provider: ("instagram" | "facebook" | "x" | "linkedin")[];
  author: string;
  expiresIn: number;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  fullname: string;
  email: string;
  password?: string;
  profileImage?: string;
  googleId?: string;
  connectedAccounts: IConnectedAccounts[];
  isPasswordCorrect: (arg: string) => Promise<boolean>;
}

const connectedAccountSchema = new Schema(
  {
    provider: { type: String, required: true },
    author: { type: String, required: true },
    expiresIn: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    googleId: { type: String, required: false },
    connectedAccounts: {
      type: [connectedAccountSchema],
      default: [],
    },
    profileImage: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.password && user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (inputPassword: string) {
  return await bcrypt.compare(inputPassword, this.password);
};

export const User =
  (models.User as mongoose.Model<IUser>) || model<IUser>("User", userSchema);
