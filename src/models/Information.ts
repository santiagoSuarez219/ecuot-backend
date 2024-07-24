import mongoose, { Schema, Document, Types } from "mongoose";

export interface IInformation extends Document {
  aboutUs: string;
}

const InformationSchema = new Schema(
  {
    aboutUs: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Information = mongoose.model<IInformation>(
  "Information",
  InformationSchema
);

export default Information;
