import { Router } from "express";
import { body, param } from "express-validator";
import { InterventionController } from "../controllers/InterventionController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

//TODO: Implementar el resto de validacion de datos
router.post(
  "/",
  body("interventionName")
    .notEmpty()
    .withMessage("El nombre de la intervención es requerido"),
  body("description").notEmpty().withMessage("La descripción es requerida"),
  body("strategicProject")
    .notEmpty()
    .withMessage("El proyecto estratégico es requerido"),
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
  body("strategicProject")
    .notEmpty()
    .withMessage("El proyecto estratégico es requerido"),
  handleInputErrors,
  InterventionController.updateIntervention
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("El id de la intervención no es válido"),
  handleInputErrors,
  InterventionController.deleteIntervention
);

export default router;
