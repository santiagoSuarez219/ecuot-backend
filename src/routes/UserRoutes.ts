import { Router } from "express";
import { body, param } from "express-validator";
import { UserController } from "../controllers/UserController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-account",
  body("userName").notEmpty().withMessage("El nombre es requerido"),
  body("userLastName").notEmpty().withMessage("El apellido es requerido"),
  body("user").notEmpty().withMessage("El usuario es requerido"),
  body("userPassword")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.userPassword) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  }),
  body("rol").notEmpty().withMessage("El rol es requerido"),
  handleInputErrors,
  UserController.createUser
);

router.post(
  "/login",
  body("user").notEmpty().withMessage("El usuario es requerido"),
  body("userPassword").notEmpty().withMessage("La contraseña es requerida"),
  handleInputErrors,
  UserController.login
);

router.get("/", UserController.getAllUsers);
router.get("/:idUser", UserController.getUserById);

router.put(
  "/update-user/:idUser",
  param("idUser").isMongoId().withMessage("El id del usuario no es valido"),
  body("userName").notEmpty().withMessage("El nombre es requerido"),
  body("userLastName").notEmpty().withMessage("El apellido es requerido"),
  body("user").notEmpty().withMessage("El usuario es requerido"),
  body("rol").notEmpty().withMessage("El rol es requerido"),
  handleInputErrors,
  UserController.updateUser
);

router.post(
  "/update-password/:idUser",
  param("idUser").isMongoId().withMessage("El id del usuario no es valido"),
  body("userPassword")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.userPassword) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  }),
  handleInputErrors,
  UserController.updatePassword
);

export default router;
