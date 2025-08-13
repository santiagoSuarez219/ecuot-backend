import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
import HierarchyController from "../controllers/HierarchyController";

const router = Router();

router.post(
    "/create-hierarchy",
    authenticate,
    body("hierarchyName")
        .notEmpty()
        .withMessage("El nombre de la jerarquía es requerido"),
    handleInputErrors,
  HierarchyController.create
);

router.get("/", HierarchyController.getAll);

export default router;
