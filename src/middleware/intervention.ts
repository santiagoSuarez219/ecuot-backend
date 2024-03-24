import type { Request, Response, NextFunction } from "express";
import Intervention, { IIntervention } from "../models/Intervention";

declare global {
  namespace Express {
    interface Request {
      intervention: IIntervention;
    }
  }
}

export async function validateInterventionExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { interventionId } = req.params;
    const intervention = await Intervention.findById(interventionId);
    if (!intervention) {
      return res.status(404).json({ message: "Intervencion no encontrada" });
    }
    req.intervention = intervention;
    next();
  } catch (error) {
    res.status(500).json({ message: "Hubo un error" });
  }
}
