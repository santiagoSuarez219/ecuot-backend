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

const router = Router();
router.param("interventionId", validateInterventionExists);
router.param("interventionDataSheetId", validateInterventionDataSheetExists);
router.param("conflictId", validateConflictExists);
router.param("newsId", validateNewsExists);

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
  body("image_description")
    .notEmpty()
    .withMessage(
      "La imagen de descripcion de la ficha de intervención es requerida"
    ),
  body("features")
    .notEmpty()
    .withMessage("Las características de la intervención son requeridas"),
  body("image_features")
    .notEmpty()
    .withMessage(
      "La imagen de características de la intervención es requerida"
    ),
  body("conflictivity")
    .notEmpty()
    .withMessage("La conflictividad de la intervención es requerida"),
  body("image_conflictivity")
    .notEmpty()
    .withMessage("La imagen de conflictividad de la intervención es requerida"),
  body("spatialization")
    .notEmpty()
    .withMessage("La espacialización de la intervención es requerida"),
  handleInputErrors,
  InterventionDataSheetController.createInterventionDataSheet
);

router.delete(
  "/:interventionId/datasheet/:interventionDataSheetId",
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
  body("image").notEmpty().withMessage("La imagen es requerida"),
  handleInputErrors,
  ConflictController.createConflict
);

router.delete(
  "/:interventionId/conflict/:conflictId",
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
  body("newsName").notEmpty().withMessage("El nombre es requerido"),
  body("description").notEmpty().withMessage("La descripción es requerida"),
  body("newsDate").notEmpty().withMessage("La fecha es requerida"),
  body("image").notEmpty().withMessage("La imagen es requerida"),
  handleInputErrors,
  NewsController.createNews
);

router.delete(
  "/:interventionId/news/:newsId",
  param("interventionId")
    .isMongoId()
    .withMessage("El id de la intervención no es válido"),
  param("newsId").isMongoId().withMessage("El id del conflicto no es válido"),
  handleInputErrors,
  NewsController.deleteNews
);

export default router;
