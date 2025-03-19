import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISystem extends Document {
  systemName: string;
}

const SystemSchema = new Schema(
  {
    systemName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const System = mongoose.model<ISystem>("System", SystemSchema);

export default System;
