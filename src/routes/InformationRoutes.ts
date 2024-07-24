import { Router } from "express";
import { body, param } from "express-validator";

import { InformationController } from "../controllers/InformationController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", InformationController.getAllInformation);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("El id del conflicto no es válido"),
  handleInputErrors,
  InformationController.getInformationById
);

router.put(
  "/:id",
  authenticate,
  param("id").isMongoId().withMessage("El id del conflicto no es válido"),
  body("aboutUs")
    .notEmpty()
    .withMessage("La información sobre nosotros es requerida"),
  handleInputErrors,
  InformationController.updateConflict
);

export default router;
