import mongoose from "mongoose";

const intervencionSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    fecha_inicio: {
      type: Date,
      default: Date.now, // Borrar en frontend
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
    creado_por: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    // comentario: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

const Intervencion = mongoose.model("Intervencion", intervencionSchema);

export default Intervencion;
