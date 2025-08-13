import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IHierarchy } from "./Hierarchy";
import { IConflict } from "./Conflict";
import { ISystem } from "./System";
import { INews } from "./News";

export interface IIntervention extends Document {
  interventionName: string;
  description: string;
  hierarchy: PopulatedDoc<IHierarchy & Document>[];
  strategicProject: string;
  internalSystem: PopulatedDoc<ISystem & Document>[];
  image: string;
  datasheet: Types.ObjectId;
  conflicts: PopulatedDoc<IConflict & Document>[];
  news: PopulatedDoc<INews & Document>[];
}

//TODO: Descomentar los campos que se necesiten e incluir relaciones con otras entidades
//TODO: Relacionar con Noticias
const InterventionSchema = new Schema(
  {
    interventionName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    hierarchy: {
      type: Types.ObjectId,
      ref: "Hierarchy",
      required: true,
    },
    strategicProject: {
      type: String,
      required: true,
    },
    internalSystem: {
      type: Types.ObjectId,
      ref: "System",
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    datasheet: {
      type: Types.ObjectId,
      ref: "InterventionDataSheet",
      default: null,
    },
    conflicts: [{ type: Schema.Types.ObjectId, ref: "Conflict" }],
    news: [{ type: Schema.Types.ObjectId, ref: "News" }],
  },
  { timestamps: true }
);

const Intervention = mongoose.model<IIntervention>(
  "Intervention",
  InterventionSchema
);

export default Intervention;
