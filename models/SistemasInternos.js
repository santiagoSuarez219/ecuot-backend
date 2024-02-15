import mongoose from "mongoose";

const sistemaInternoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const SistemaInterno = mongoose.model("SistemaInterno", sistemaInternoSchema);

export default SistemaInterno;
