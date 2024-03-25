import type { Request, Response, NextFunction } from "express";
import Conflict, { IConflict } from "../models/Conflict";

declare global {
  namespace Express {
    interface Request {
      conflict: IConflict;
    }
  }
}

export async function validateConflictExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { conflictId } = req.params;
    const conflict = await Conflict.findById(conflictId);
    if (!conflict) {
      return res.status(404).json({ message: "Conflicto no encontrado" });
    }
    req.conflict = conflict;
    next();
  } catch (error) {
    res.status(500).json({ message: "Hubo un error" });
  }
}
