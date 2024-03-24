import type { Request, Response } from "express";
import Conflict from "../models/Conflict";

export class ConflictController {
  static createConflict = async (req: Request, res: Response) => {
    try {
      const conflict = new Conflict({
        ...req.body,
        intervention: req.intervention._id,
      });
      req.intervention.conflicts.push(conflict._id);
      await Promise.allSettled([conflict.save(), req.intervention.save()]);
      res.send("Conflicto creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllConflicts = async (req: Request, res: Response) => {
    try {
      const interventions = await Conflict.find({});
      res.json(interventions);
    } catch (error) {
      console.log(error);
    }
  };
}
