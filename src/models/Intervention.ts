import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IConflict } from "./Conflict";
import { INews } from "./News";

export interface IIntervention extends Document {
  interventionName: string;
  description: string;
  hierarchy: string;
  strategicProject: string;
  internalSystem: string;
  image: string;
  datasheet: Types.ObjectId;
  conflicts: PopulatedDoc<IConflict & Document>[];
  news: PopulatedDoc<INews & Document>[];
  // createdBy: Id de usuario
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
      type: String,
      required: true,
    },
    strategicProject: {
      type: String,
      required: true,
    },
    internalSystem: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    datasheet: {
      type: Types.ObjectId,
      ref: "InterventionDataSheet",
      default: null,
    },
    conflicts: [{ type: Schema.Types.ObjectId, ref: "Conflict" }],
    news: [{ type: Schema.Types.ObjectId, ref: "News" }],
    // createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  { timestamps: true }
);

const Intervention = mongoose.model<IIntervention>(
  "Intervention",
  InterventionSchema
);

export default Intervention;
