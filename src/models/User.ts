import mongoose, { Schema, Document, Types } from "mongoose";

//TODO: Agregar todos los demas campos
export interface IUser extends Document {
  userName: string;
  userLastName: string;
  user: string;
  userPassword: string;
  // confirmed: boolean;
  // token: string;
  // rol: string; //TODO: Cambiar a enum
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
      lowercase: true,
      trim: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
      trim: true,
    },
    // confirmed: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    // token: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
