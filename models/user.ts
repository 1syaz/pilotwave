import mongoose, { Document, model, models, Schema } from "mongoose";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

export const zUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required"),
});

interface IUser extends Document {
  _id: Types.ObjectId;
  fullname: string;
  email: string;
  password?: string;
  profileImage?: string;
  googleId?: string;
  isPasswordCorrect: (arg: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    googleId: { type: String, required: false, unique: true },
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
