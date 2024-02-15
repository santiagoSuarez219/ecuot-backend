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
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
    },
    proyecto_estrategico: {
      type: String,
      trim: true,
    },
    sistema_interno: {
      type: String,
      trim: true,
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
