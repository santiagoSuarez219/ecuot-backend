import mongoose, { Schema, Document, Types } from "mongoose";

const roles = {
  RESEARCHER: "researcher",
  ASSISTANT: "assistant",
} as const;

export type Role = (typeof roles)[keyof typeof roles];

//TODO: Agregar todos los demas campos
export interface IUser extends Document {
  userName: string;
  userLastName: string;
  user: string;
  userPassword: string;
  rol: Role;
}

export const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userLastName: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
      trim: true,
    },
    rol: {
      type: String,
      enum: Object.values(roles),
      default: roles.ASSISTANT,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
