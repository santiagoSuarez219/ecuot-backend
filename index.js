import express from "express";
import dotenv from "dotenv";
import conectarBD from "./config/db.js";

const app = express();

dotenv.config();

conectarBD();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
