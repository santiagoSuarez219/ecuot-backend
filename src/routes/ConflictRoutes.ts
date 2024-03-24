import { Router } from "express";
import { body, param } from "express-validator";
import { ConflictController } from "../controllers/ConflictController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.get("/", ConflictController.getAllConflicts);

export default router;
