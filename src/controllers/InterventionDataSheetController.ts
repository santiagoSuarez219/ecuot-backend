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

  static getAllInterventionDataSheets = async (req: Request, res: Response) => {
    try {
      const interventionsDataSheets = await InterventionDataSheet.find(
        {}
      ).populate("intervention");
      res.json(interventionsDataSheets);
    } catch (error) {
      console.log(error);
    }
  };

  static getInterventionDataSheetById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const interventionDataSheet = await InterventionDataSheet.findById(
        id
      ).populate("intervention");
      if (!interventionDataSheet) {
        return res.status(404).json({ message: "Intervencion no encontrada" });
      }
      res.json(interventionDataSheet);
    } catch (error) {
      console.log(error);
    }
  };

  static updateInterventionDataSheet = async (req: Request, res: Response) => {
    const { interventionId, interventionDataSheetId } = req.params;
    try {
      const interventionDataSheet = await InterventionDataSheet.findById(
        interventionDataSheetId
      );
      if (!interventionDataSheet) {
        return res
          .status(404)
          .json({ message: "Ficha de intervención no encontrada" });
      }
      interventionDataSheet.description = req.body.description;
      interventionDataSheet.image_description = req.body.image_description;
      interventionDataSheet.features = req.body.features;
      interventionDataSheet.image_features = req.body.image_features;
      interventionDataSheet.conflictivity = req.body.conflictivity;
      interventionDataSheet.image_conflictivity = req.body.image_conflictivity;
      interventionDataSheet.spatialization = req.body.spatialization;
      await interventionDataSheet.save();
      res.json("Ficha de intervención actualizada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteInterventionDataSheet = async (req: Request, res: Response) => {
    const { interventionDataSheetId } = req.params;
    try {
      const interventionDataSheet = await InterventionDataSheet.findById(
        interventionDataSheetId
      );
      if (!interventionDataSheet) {
        return res.status(404).json({ message: "Intervencion no encontrada" });
      }
      req.intervention.datasheet = null;
      await Promise.allSettled([
        interventionDataSheet.deleteOne(),
        req.intervention.save(),
      ]);
      res.json("Intervencion eliminada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
