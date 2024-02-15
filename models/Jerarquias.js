import mongoose from "mongoose";

const jerarquiaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Jerarquia = mongoose.model("Jerarquia", jerarquiaSchema);

export default Jerarquia;
