import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { IIntervention } from "./Intervention";

export interface IInterventionDataSheet extends Document {
  description: string;
  features: string;
  conflictivity: string;
  spatialization: string;
  intervention: PopulatedDoc<IIntervention & Document>;
}

const InterventionDataSheetSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    features: {
      type: String,
      required: true,
    },
    conflictivity: {
      type: String,
      required: true,
    },
    spatialization: {
      type: String,
      required: true,
    },
    intervention: {
      type: Types.ObjectId,
      ref: "Intervention",
      required: true,
    },
  },
  { timestamps: true }
);

const InterventionDataSheet = mongoose.model<IInterventionDataSheet>(
  "InterventionDataSheet",
  InterventionDataSheetSchema
);

export default InterventionDataSheet;
