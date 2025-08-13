import mongoose, { Schema, Document, Types } from "mongoose";

export interface IHierarchy extends Document {
  hierarchyName: string;
}

const HierarchySchema = new Schema(
  {
    hierarchyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Hierarchy = mongoose.model<IHierarchy>("Hierarchy", HierarchySchema);

export default Hierarchy;
