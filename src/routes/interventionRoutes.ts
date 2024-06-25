import { Router } from "express";
import { body, param } from "express-validator";

import { InterventionDataSheetController } from "../controllers/InterventionDataSheetController";
import { InterventionController } from "../controllers/InterventionController";
import { validateInterventionExists } from "../middleware/intervention";
import { ConflictController } from "../controllers/ConflictController";
import { validateConflictExists } from "../middleware/conflict";
import { handleInputErrors } from "../middleware/validation";
import { NewsController } from "../controllers/NewsController";

const router = Router();
router.param("interventionId", validateInterventionExists);

router.post(
  "/",
  body("interventionName")
    .notEmpty()
    .withMessage("El nombre de la intervención es requerido"),
  body("description").notEmpty().withMessage("La descripción es requerida"),
  body("hierarchy").notEmpty().withMessage("La jerarquía es requerida"),
  body("strategicProject")
    .notEmpty()
    .withMessage("El proyecto estratégico es requerido"),
  body("internalSystem")
    .notEmpty()
    .withMessage("El sistema interno es requerido"),
  body("image").notEmpty().withMessage("La imagen es requerida"),
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
  body("hierarchy").notEmpty().withMessage("La jerarquía es requerida"),
  body("strategicProject")
    .notEmpty()
    .withMessage("El proyecto estratégico es requerido"),
  body("internalSystem")
    .notEmpty()
    .withMessage("El sistema interno es requerido"),
  body("image").notEmpty().withMessage("La imagen es requerida"),
  handleInputErrors,
  InterventionController.updateIntervention
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("El id de la intervención no es válido"),
  handleInputErrors,
  InterventionController.deleteIntervention
);

// Routes for intervention data sheets
router.post(
  "/:interventionId/datasheet",
  body("description")
    .notEmpty()
    .withMessage("La descripción de la ficha de intervención es requerida"),
  body("features")
    .notEmpty()
    .withMessage("Las características de la intervención son requeridas"),
  body("conflictivity")
    .notEmpty()
    .withMessage("La conflictividad de la intervención es requerida"),
  body("spatialization")
    .notEmpty()
    .withMessage("La espacialización de la intervención es requerida"),
  handleInputErrors,
  InterventionDataSheetController.createInterventionDataSheet
);

// Routes for conflicts
router.post(
  "/:interventionId/conflicts",
  body("conflictName")
    .notEmpty()
    .withMessage("El nombre del conflicto es requerido"),
  body("description")
    .notEmpty()
    .withMessage("La descripción del conflicto es requerida"),
  body("timeStressOccurrence")
    .notEmpty()
    .withMessage("El momento en el que se presenta la tension es requerido"),
  body("actorsInvolved")
    .notEmpty()
    .withMessage("Los actores involucrados son requeridos"),
  handleInputErrors,
  ConflictController.createConflict
);

// router.get(
//   "/:interventionId/conflicts",
//   ConflictController.getInterventionConflicts
// );

// router.param("conflictId", validateConflictExists);
// router.put(
//   "/:interventionId/conflicts/:conflictId",
//   param("conflictId")
//     .isMongoId()
//     .withMessage("El id de la intervención no es válido"),
//   ConflictController.updateConflict
// );

// router.delete(
//   "/:interventionId/conflicts/:conflictId",
//   ConflictController.deleteConflict
// );

// Routes for news
router.post(
  "/:interventionId/news",
  body("newsName")
    .notEmpty()
    .withMessage("El nombre de la noticia es requerido"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la noticia es requerida"),
  body("newsDate")
    .notEmpty()
    .withMessage("La fecha de la noticia es requerida"),
  handleInputErrors,
  NewsController.createNews
);

export default router;
