import { Router } from "express";
import { body, param } from "express-validator";

import { InterventionDataSheetController } from "../controllers/InterventionDataSheetController";
import { InterventionController } from "../controllers/InterventionController";
import { validateInterventionExists } from "../middleware/intervention";
import { ConflictController } from "../controllers/ConflictController";
import { validateConflictExists } from "../middleware/conflict";
import { handleInputErrors } from "../middleware/validation";
import { NewsController } from "../controllers/NewsController";
import { validateInterventionDataSheetExists } from "../middleware/interventionDataSheet";
import { validateNewsExists } from "../middleware/news";
import { authenticate } from "../middleware/auth";

const router = Router();
router.param("interventionId", validateInterventionExists);
router.param("interventionDataSheetId", validateInterventionDataSheetExists);
router.param("conflictId", validateConflictExists);
router.param("newsId", validateNewsExists);

router.post(
  "/",
  authenticate,
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
  handleInputErrors,
  InterventionController.createIntervention
);

router.get("/", InterventionController.getAllInterventions);

router.get("/latest", InterventionController.getLatestInterventions);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("El id de la intervención no es válido"),
  handleInputErrors,
  InterventionController.getInterventionById
);

router.put(
  "/:id",
  authenticate,
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
  handleInputErrors,
  InterventionController.updateIntervention
);

router.delete(
  "/:id",
  authenticate,
  param("id").isMongoId().withMessage("El id de la intervención no es válido"),
  handleInputErrors,
  InterventionController.deleteIntervention
);

// Routes for intervention data sheets
router.post(
  "/:interventionId/datasheet",
  authenticate,
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

router.delete(
  "/:interventionId/datasheet/:interventionDataSheetId",
  authenticate,
  param("interventionId")
    .isMongoId()
    .withMessage("El id de la intervención no es válido"),
  param("interventionDataSheetId")
    .isMongoId()
    .withMessage("El id de la intervención no es válido"),
  handleInputErrors,
  InterventionDataSheetController.deleteInterventionDataSheet
);

// Routes for conflicts
router.post(
  "/:interventionId/conflicts",
  authenticate,
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

router.delete(
  "/:interventionId/conflict/:conflictId",
  authenticate,
  param("interventionId")
    .isMongoId()
    .withMessage("El id de la intervención no es válido"),
  param("conflictId")
    .isMongoId()
    .withMessage("El id del conflicto no es válido"),
  handleInputErrors,
  ConflictController.deleteConflict
);

// Routes for news
router.post(
  "/:interventionId/news",
  authenticate,
  body("newsName").notEmpty().withMessage("El nombre es requerido"),
  body("description").notEmpty().withMessage("La descripción es requerida"),
  body("newsDate").notEmpty().withMessage("La fecha es requerida"),
  handleInputErrors,
  NewsController.createNews
);

router.delete(
  "/:interventionId/news/:newsId",
  authenticate,
  param("interventionId")
    .isMongoId()
    .withMessage("El id de la intervención no es válido"),
  param("newsId").isMongoId().withMessage("El id del conflicto no es válido"),
  handleInputErrors,
  NewsController.deleteNews
);

export default router;
