import type { Request, Response, NextFunction } from "express";
import InterventionDataSheet, {
  IInterventionDataSheet,
} from "../models/InterventionDataSheet";

declare global {
  namespace Express {
    interface Request {
      interventionDataSheet: IInterventionDataSheet;
    }
  }
}

export async function validateInterventionDataSheetExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { interventionDataSheetId } = req.params;
    const interventionDataSheet = await InterventionDataSheet.findById(
      interventionDataSheetId
    );
    if (!interventionDataSheet) {
      return res.status(404).json({ message: "Ficha no encontrada" });
    }
    req.interventionDataSheet = interventionDataSheet;
    next();
  } catch (error) {
    res.status(500).json({ message: "Hubo un error" });
  }
}
