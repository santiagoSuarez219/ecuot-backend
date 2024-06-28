import mongoose, { Schema, Document, Types } from "mongoose";

//TODO: Agregar todos los demas campos
export interface IConflict extends Document {
  conflictName: string;
  description: string;
  timeStressOccurrence: string;
  actorsInvolved: string;
  intervention: Types.ObjectId;
  image: string;
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
    timeStressOccurrence: {
      type: String,
      required: true,
    },
    actorsInvolved: {
      type: String,
      required: true,
    },
    intervention: {
      type: Types.ObjectId,
      ref: "Intervention",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Conflict = mongoose.model<IConflict>("Conflict", ConflictSchema);
export default Conflict;
