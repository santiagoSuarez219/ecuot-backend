import express from "express";
import { registrar, autenticar } from "../controllers/usuarioController.js";

const router = express.Router();

// Autenticacion, registro y confirmacion de usuarios
router.post("/", registrar); // Crear usuario
router.post("/login", autenticar);

export default router;
