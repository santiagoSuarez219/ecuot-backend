import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { ITimeStressOcurrence } from "./TimeStressOcurrence";

export interface IConflict extends Document {
  conflictName: string;
  description: string;
  timeStressOccurrence: PopulatedDoc<ITimeStressOcurrence & Document>[];
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
      type: Types.ObjectId,
      ref: "TimeStressOcurrence",
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
      default: "",
    },
  },
  { timestamps: true }
);

const Conflict = mongoose.model<IConflict>("Conflict", ConflictSchema);
export default Conflict;
