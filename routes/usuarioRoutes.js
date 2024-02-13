import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
} from "../controllers/usuarioController.js";

const router = express.Router();

// Autenticacion, registro y confirmacion de usuarios
router.post("/", registrar); // Crear usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);

export default router;
