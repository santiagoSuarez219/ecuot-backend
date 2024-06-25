import type { Request, Response } from "express";
import InterventionDataSheet from "../models/InterventionDataSheet";

export class InterventionDataSheetController {
  static createInterventionDataSheet = async (req: Request, res: Response) => {
    try {
      const interventionDataSheet = new InterventionDataSheet({
        ...req.body,
        intervention: req.intervention._id,
      });
      req.intervention.datasheet = interventionDataSheet._id;
      await Promise.allSettled([
        interventionDataSheet.save(),
        req.intervention.save(),
      ]);
      res.send("Ficha de intervención creada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
