import mongoose from "mongoose";

export const ROLES = ["investigador", "estudiante", "usuario"];

const roleSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Role", roleSchema);
