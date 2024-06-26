import { InterventionDataSheetController } from "../controllers/InterventionDataSheetController";
import { handleInputErrors } from "../middleware/validation";
import { body, param } from "express-validator";
import { Router } from "express";

const router = Router();

router.get("/", InterventionDataSheetController.getAllInterventionDataSheets);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("El id de la intervención no es válido"),
  handleInputErrors,
  InterventionDataSheetController.getInterventionDataSheetById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("El id de la intervención no es válido"),
  body("description").notEmpty().withMessage("La descripción es requerida"),
  body("image_description")
    .notEmpty()
    .withMessage("La imagen de la descripción es requerida"),
  body("features").notEmpty().withMessage("Las características son requeridas"),
  body("image_features")
    .notEmpty()
    .withMessage("La imagen de las características es requerida"),
  body("conflictivity")
    .notEmpty()
    .withMessage("La conflictividad es requerida"),
  body("image_conflictivity")
    .notEmpty()
    .withMessage("La imagen de la conflictividad es requerida"),
  body("spatialization")
    .notEmpty()
    .withMessage("La espacialización es requerida"),
  handleInputErrors,
  InterventionDataSheetController.updateInterventionDataSheet
);

export default router;
