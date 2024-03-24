import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { IConflict } from "./Conflict";

const hierarchy = {
  CIUDAD: "Ciudad",
  BARRIAL_SUBURBANO: "BarrialSuburbano",
  ZONA_CORREGIMENTAL: "ZonaCorregimental",
  METROPOLITANO_REGIONAL: "metropolitanoRegional",
} as const;

export type Hierarchy = (typeof hierarchy)[keyof typeof hierarchy];

export interface IIntervention extends Document {
  interventionName: string;
  hierarchy: Hierarchy; // Jerarquia
  description: string;
  strategicProject: string; // Proyecto estratégico
  //internalSystem: string;
  //startDate: Date;
  conflicts: PopulatedDoc<IConflict & Document>[];
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
    hierarchy: {
      type: String,
      enum: Object.values(hierarchy),
      // required: true,
      default: hierarchy.CIUDAD, //TODO: Eliminar parametro por defecto cuando se implemente en el frontend
    },
    description: {
      type: String,
      required: true,
    },
    strategicProject: {
      type: String,
      required: true,
    },
    // internalSystem: {
    //   type: String,
    //   required: true,
    // },
    // startDate: {
    //   type: Date,
    //   required: true,
    // },
    // createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
    conflicts: [{ type: Schema.Types.ObjectId, ref: "Conflict" }],
  },
  { timestamps: true }
);

const Intervention = mongoose.model<IIntervention>(
  "Intervention",
  InterventionSchema
);

export default Intervention;
