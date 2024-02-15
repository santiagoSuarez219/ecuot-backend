import express from "express";
import {
  obtenerIntervenciones,
  obtenerIntervencion,
  nuevaIntervencion,
  editarIntervencion,
  eliminarIntervencion,
} from "../controllers/intervencionControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(obtenerIntervenciones).post(checkAuth, nuevaIntervencion);

router
  .route("/:id")
  .get(obtenerIntervencion)
  .put(checkAuth, editarIntervencion)
  .delete(checkAuth, eliminarIntervencion);

export default router;
