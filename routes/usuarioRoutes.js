import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
  obtenerUsuarios,
} from "../controllers/usuarioController.js";
import { checkAuth, esInvestigador } from "../middleware/checkAuth.js";

const router = express.Router();

// Autenticacion, registro y confirmacion de usuarios
router.route("/").get(obtenerUsuarios).post(registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get("/perfil", checkAuth, perfil);

export default router;
