import mongoose, { Schema, Document, Types } from "mongoose";

//TODO: Agregar todos los demas campos
export interface IConflict extends Document {
  conflictName: string;
  description: string;
  intervention: Types.ObjectId;
}

export const ConflictSchema = new Schema(
  {
    conflictName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    intervention: {
      type: Schema.Types.ObjectId,
      ref: "Intervention",
      required: true,
    },
  },
  { timestamps: true }
);

const Conflict = mongoose.model<IConflict>("Conflict", ConflictSchema);
export default Conflict;
