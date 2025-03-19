import { Router } from "express";
import { body, param } from "express-validator";
import { SystemController } from "../controllers/SystemController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
  "/create-system",
  authenticate,
  body("systemName").notEmpty().withMessage("El nombre es requerido"),
  handleInputErrors,
  SystemController.createSystem
);

router.get("/", SystemController.getAllSystems);
router.get("/:idSystem", SystemController.getSystemById);

router.put(
  "/update-system/:idSystem",
  authenticate,
  param("idSystem").isMongoId().withMessage("El id del sistema no es valido"),
  body("systemName").notEmpty().withMessage("El nombre es requerido"),
  handleInputErrors,
  SystemController.updateSystem
);

router.delete(
  "/:idSystem",
  authenticate,
  param("idSystem").isMongoId().withMessage("El id del sistema no es valido"),
  handleInputErrors,
  SystemController.deleteSystem
);

export default router;
