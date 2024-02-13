import express from "express";
import { registrar } from "../controllers/usuarioController.js";

const router = express.Router();

// Autenticacion, registro y confirmacion de usuarios
router.post("/", registrar); // Crear usuario

export default router;
