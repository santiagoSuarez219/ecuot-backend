import mongoose, { Schema, Document } from "mongoose";

export interface IIntervention extends Document {
  interventionName: string;
  hierarchy: string; // Jerarquia
  description: string;
  strategicProject: string; // Proyecto estratégico
  internalSystem: string;
  startDate: Date;
  // createdBy: Id de usuario
};

const InterventionSchema = new Schema({
  interventionName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hierarchy: {
    type: String,
    required: true,
  },
  description: {
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
  startDate: {
    type: Date,
    required: true,
  },
  // createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Intervention = mongoose.model<IIntervention>("Intervention", InterventionSchema);

export default Intervention;