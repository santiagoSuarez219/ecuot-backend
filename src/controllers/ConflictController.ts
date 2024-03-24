import type { Request, Response } from "express";
import Conflict from "../models/Conflict";

//TODO: Cambiar los console.log por res.status(500).json() en los catch en producción

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
      const conflicts = await Conflict.find({});
      res.json(conflicts);
    } catch (error) {
      console.log(error);
    }
  };

  static getInterventionConflicts = async (req: Request, res: Response) => {
    try {
      const conflicts = await Conflict.find({
        intervention: req.intervention._id,
      }).populate("intervention");
      res.json(conflicts);
    } catch (error) {
      console.log(error);
    }
  };
}
