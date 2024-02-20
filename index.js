import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarBD from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import intevencionRoutes from "./routes/intervencionRoutes.js";
import { createRoles } from "./helpers/initialSetup.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarBD();
createRoles();

const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/intervenciones", intevencionRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
