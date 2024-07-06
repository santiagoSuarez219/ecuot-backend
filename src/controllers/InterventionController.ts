import type { Request, Response } from "express";
import Intervention from "../models/Intervention";
import InterventionDataSheet from "../models/InterventionDataSheet";
import Conflict from "../models/Conflict";
import News from "../models/News";

export class InterventionController {
  static createIntervention = async (req: Request, res: Response) => {
    const intervention = new Intervention(req.body);
    try {
      await intervention.save();
      res.send("Intervencion creada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getInterventionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const intervention = await Intervention.findById(id);
      if (!intervention) {
        return res.status(404).json({ message: "Intervencion no encontrada" });
      }
      res.json(intervention);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getAllInterventions = async (req: Request, res: Response) => {
    try {
      const interventions = await Intervention.find({});
      res.json(interventions);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
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
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteIntervention = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const intervention = await Intervention.findById(id);
      if (!intervention) {
        return res.status(404).json({ message: "Intervencion no encontrada" });
      }
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
      await Conflict.deleteMany({ intervention: intervention._id });
      await News.deleteMany({ intervention: intervention._id });
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
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
