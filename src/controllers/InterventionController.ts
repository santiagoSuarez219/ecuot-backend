import type { Request, Response } from "express";
import Intervention from "../models/Intervention";

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
      const intervention = await Intervention.findById(id).populate(
        "conflicts"
      );
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
      intervention.strategicProject = req.body.strategicProject;
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
      // TODO: Realizar validaciones de seguridad
      await intervention.deleteOne();
      res.json("Intervencion eliminada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
