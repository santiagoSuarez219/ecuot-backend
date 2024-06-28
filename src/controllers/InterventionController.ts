import type { Request, Response } from "express";
import Intervention from "../models/Intervention";
import InterventionDataSheet from "../models/InterventionDataSheet";
import Conflict from "../models/Conflict";

export class InterventionController {
  static createIntervention = async (req: Request, res: Response) => {
    const intervention = new Intervention(req.body);
    try {
      await intervention.save();
      res.send("Intervencion creada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getInterventionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // const intervention = await Intervention.findById(id).populate(
      //   "conflicts"
      // );
      const intervention = await Intervention.findById(id);
      if (!intervention) {
        return res.status(404).json({ message: "Intervencion no encontrada" });
      }
      res.json(intervention);
    } catch (error) {
      console.log(error);
    }
  };

  static getAllInterventions = async (req: Request, res: Response) => {
    try {
      const interventions = await Intervention.find({});
      res.json(interventions);
    } catch (error) {
      console.log(error);
    }
  };

  static updateIntervention = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const intervention = await Intervention.findById(id);
      if (!intervention) {
        return res.status(404).json({ message: "Intervencion no encontrada" });
      }
      intervention.interventionName = req.body.interventionName;
      intervention.description = req.body.description;
      intervention.hierarchy = req.body.hierarchy;
      intervention.strategicProject = req.body.strategicProject;
      intervention.internalSystem = req.body.internalSystem;
      intervention.image = req.body.image;
      await intervention.save();
      res.json("Intervencion actualizada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteIntervention = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const intervention = await Intervention.findById(id);
      if (!intervention) {
        return res.status(404).json({ message: "Intervencion no encontrada" });
      }
      await Conflict.deleteMany({ intervention: intervention._id });
      if (intervention.datasheet !== null) {
        const datasheet = await InterventionDataSheet.findById(
          intervention.datasheet
        );
        if (datasheet) {
          await Promise.allSettled([
            datasheet.deleteOne(),
            intervention.deleteOne(),
          ]);
        }
      } else {
        await intervention.deleteOne();
      }
      res.json("Intervencion eliminada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
