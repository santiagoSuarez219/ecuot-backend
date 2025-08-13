import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
import TimeStressOcurrenceController from "../controllers/TimeStressOcurrenceController";

const router = Router();

router.post(
    "/create-timestressocurrence",
    authenticate,
    body("timeStressOcurrenceName")
        .notEmpty()
        .withMessage("El nombre de la ocurrencia de estrés temporal es requerido"),
    handleInputErrors,
    TimeStressOcurrenceController.create
);

router.get("/", TimeStressOcurrenceController.getAll);

export default router;