import mongoose, { Schema, Document, Types } from "mongoose";

export interface INews extends Document {
  newsName: string;
  description: string;
  newsDate: Date;
  intervention: Types.ObjectId;
}

export const NewsSchema = new Schema(
  {
    newsName: {
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
    newsDate: {
      type: Date,
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

const News = mongoose.model<INews>("News", NewsSchema);
export default News;
