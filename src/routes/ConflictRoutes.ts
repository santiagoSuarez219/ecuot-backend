import { Router } from "express";
import { body, param } from "express-validator";
import { ConflictController } from "../controllers/ConflictController";
import { handleInputErrors } from "../middleware/validation";
import { validateInterventionExists } from "../middleware/intervention";
import { validateConflictExists } from "../middleware/conflict";
import { authenticate } from "../middleware/auth";

const router = Router();

router.param("interventionId", validateInterventionExists);
router.param("conflictId", validateConflictExists);

router.get("/", ConflictController.getAllConflicts);

router.get(
  "/:id",
  authenticate,
  param("id").isMongoId().withMessage("El id del conflicto no es válido"),
  handleInputErrors,
  ConflictController.getConflictById
);

router.put(
  "/:conflictId/intervention/:interventionId",
  authenticate,
  param("conflictId")
    .isMongoId()
    .withMessage("El id del conflicto no es válido"),
  param("interventionId")
    .isMongoId()
    .withMessage("El id de la intervención no es válido"),
  body("conflictName")
    .notEmpty()
    .withMessage("El nombre del conflicto es requerido"),
  body("description").notEmpty().withMessage("La descripción es requerida"),
  body("timeStressOccurrence")
    .notEmpty()
    .withMessage("El momento de la tensión es requerido"),
  body("actorsInvolved")
    .notEmpty()
    .withMessage("Los actores involucrados son requeridos"),
  body("image").notEmpty().withMessage("La imagen es requerida"),
  handleInputErrors,
  ConflictController.updateConflict
);

export default router;
