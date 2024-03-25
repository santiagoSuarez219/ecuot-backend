import { Router } from "express";
import { body, param } from "express-validator";
import { InterventionController } from "../controllers/InterventionController";
import { ConflictController } from "../controllers/ConflictController";
import { handleInputErrors } from "../middleware/validation";
import { validateInterventionExists } from "../middleware/intervention";
import { validateConflictExists } from "../middleware/conflict";

const router = Router();
router.param("interventionId", validateInterventionExists);

//TODO: Implementar el resto de validacion de datos
router.post(
  "/",
  body("interventionName")
    .notEmpty()
    .withMessage("El nombre de la intervención es requerido"),
  body("description").notEmpty().withMessage("La descripción es requerida"),
  body("strategicProject")
    .notEmpty()
    .withMessage("El proyecto estratégico es requerido"),
  handleInputErrors,
  InterventionController.createIntervention
);
router.get("/", InterventionController.getAllInterventions);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("El id de la intervención no es válido"),
  handleInputErrors,
  InterventionController.getInterventionById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("El id de la intervención no es válido"),
  body("interventionName")
    .notEmpty()
    .withMessage("El nombre de la intervención es requerido"),
  body("description").notEmpty().withMessage("La descripción es requerida"),
  body("strategicProject")
    .notEmpty()
    .withMessage("El proyecto estratégico es requerido"),
  handleInputErrors,
  InterventionController.updateIntervention
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("El id de la intervención no es válido"),
  handleInputErrors,
  InterventionController.deleteIntervention
);

// Routes for conflicts
// TODO: Implementar el resto de validacion de datos al igual que en las rutas de intervenciones. VIDEO 462
router.post("/:interventionId/conflicts", ConflictController.createConflict);

router.get(
  "/:interventionId/conflicts",
  ConflictController.getInterventionConflicts
);

router.param("conflictId", validateConflictExists);
router.put(
  "/:interventionId/conflicts/:conflictId",
  param("conflictId")
    .isMongoId()
    .withMessage("El id de la intervención no es válido"),
  ConflictController.updateConflict
);

router.delete(
  "/:interventionId/conflicts/:conflictId",
  ConflictController.deleteConflict
);

export default router;
