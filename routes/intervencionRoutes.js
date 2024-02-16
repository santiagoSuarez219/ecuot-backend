import express from "express";
import {
  obtenerIntervenciones,
  obtenerIntervencion,
  nuevaIntervencion,
  editarIntervencion,
  eliminarIntervencion,
} from "../controllers/intervencionControllers.js";
import {
  checkAuth,
  esInvestigador,
  esEstudianteOrInvestigador,
} from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(obtenerIntervenciones)
  .post(checkAuth, esInvestigador, nuevaIntervencion);

router
  .route("/:id")
  .get(obtenerIntervencion)
  .put(checkAuth, esEstudianteOrInvestigador, editarIntervencion)
  .delete(checkAuth, esInvestigador, eliminarIntervencion);

export default router;
