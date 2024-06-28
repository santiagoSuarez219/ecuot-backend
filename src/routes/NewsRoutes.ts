import { Router } from "express";
import { body, param } from "express-validator";
import { ConflictController } from "../controllers/ConflictController";
import { handleInputErrors } from "../middleware/validation";
import { validateInterventionExists } from "../middleware/intervention";
import { validateNewsExists } from "../middleware/news";
import { NewsController } from "../controllers/NewsController";

const router = Router();

router.param("interventionId", validateInterventionExists);
router.param("newsId", validateNewsExists);

router.get("/", NewsController.getAllNews);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("El id del conflicto no es válido"),
  handleInputErrors,
  NewsController.getNewsById
);

router.put(
  "/:newsId/intervention/:interventionId",
  param("newsId").isMongoId().withMessage("El id del conflicto no es válido"),
  param("interventionId")
    .isMongoId()
    .withMessage("El id de la intervención no es válido"),
  body("newsName").notEmpty().withMessage("El nombre es requerido"),
  body("description").notEmpty().withMessage("La descripción es requerida"),
  body("newsDate").notEmpty().withMessage("La fecha es requerida"),
  body("image").notEmpty().withMessage("La imagen es requerida"),
  handleInputErrors,
  NewsController.updateNews
);

export default router;
