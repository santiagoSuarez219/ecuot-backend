import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { IIntervention } from "./Intervention";

export interface IInterventionDataSheet extends Document {
  description: string;
  image_description: string;
  features: string;
  image_features: string;
  conflictivity: string;
  image_conflictivity: string;
  spatialization: string;
  intervention: PopulatedDoc<IIntervention & Document>;
}

const InterventionDataSheetSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    image_description: {
      type: String,
    },
    features: {
      type: String,
      required: true,
    },
    image_features: {
      type: String,
    },
    conflictivity: {
      type: String,
      required: true,
    },
    image_conflictivity: {
      type: String,
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
