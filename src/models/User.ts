import { Schema, model, Document } from "mongoose";
import validator from "validator";

export interface IUser {
  email: string;
  fullname: string;
  password: string;
  confirmed: boolean;
  avatar?: string;
  confirm_hash?: string;
  last_seen?: Date;
}

export type IUserDocument = IUser & Document;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: "Email address is required!",
      validate: [validator.isEmail, "Invalid email"],
      unique: true,
    },
    fullname: {
      type: String,
      required: "Name is required!",
    },
    password: {
      type: String,
      required: "Password is required!",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUserDocument>("User", UserSchema);
