import { Router } from "express";
import { body, param } from "express-validator";
import { UserController } from "../controllers/UserController";
import { handleInputErrors } from "../middleware/validation";
// import { validateInterventionExists } from "../middleware/intervention";
// import { validateConflictExists } from "../middleware/conflict";

const router = Router();
// router.param("interventionId", validateInterventionExists);

//TODO: Implementar el resto de validacion de datos
router.post(
  "/",
  body("userName").notEmpty().withMessage("El nombre es requerido"),
  body("userLastName").notEmpty().withMessage("El apellido es requerido"),
  body("userEmail").notEmpty().withMessage("El email es requerido"),
  handleInputErrors,
  UserController.createUser
);

router.get("/", UserController.getAllUsers);

// router.get(
//   "/:id",
//   param("id").isMongoId().withMessage("El id de la intervención no es válido"),
//   handleInputErrors,
//   InterventionController.getInterventionById
// );

// router.put(
//   "/:id",
//   param("id").isMongoId().withMessage("El id de la intervención no es válido"),
//   body("interventionName")
//     .notEmpty()
//     .withMessage("El nombre de la intervención es requerido"),
//   body("description").notEmpty().withMessage("La descripción es requerida"),
//   body("strategicProject")
//     .notEmpty()
//     .withMessage("El proyecto estratégico es requerido"),
//   handleInputErrors,
//   InterventionController.updateIntervention
// );

// router.delete(
//   "/:id",
//   param("id").isMongoId().withMessage("El id de la intervención no es válido"),
//   handleInputErrors,
//   InterventionController.deleteIntervention
// );

export default router;
