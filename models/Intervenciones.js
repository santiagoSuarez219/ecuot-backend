import mongoose from "mongoose";

const intervencionesSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  fecha_inicio: {
    type: Date,
    required: true,
  },
  jerarquia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jerarquia",
  },
  descripcion: {
    type: String,
  },
  proyecto_estrategico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProyectoEstrategico",
  },
  sistema_interno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SistemaInterno",
  },
  comentario: {
    type: String,
  },
});
