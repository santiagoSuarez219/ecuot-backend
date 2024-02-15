import mongoose from "mongoose";

const proyectoEstrategicoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const ProyectoEstrategico = mongoose.model(
  "ProyectoEstrategico",
  proyectoEstrategicoSchema
);

export default ProyectoEstrategico;
