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
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getAllConflicts = async (req: Request, res: Response) => {
    try {
      const conflicts = await Conflict.find({}).populate("intervention");
      res.json(conflicts);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getConflictById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const conflict = await Conflict.findById(id).populate("intervention");
      if (!conflict) {
        return res.status(404).json({ message: "Conflicto no encontrado" });
      }
      res.json(conflict);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateConflict = async (req: Request, res: Response) => {
    const { conflictId } = req.params;
    try {
      const conflict = await Conflict.findById(conflictId);
      if (!conflict) {
        return res.status(404).json({ message: "Conflicto no encontrado" });
      }
      conflict.conflictName = req.body.conflictName;
      conflict.description = req.body.description;
      conflict.timeStressOccurrence = req.body.timeStressOccurrence;
      conflict.actorsInvolved = req.body.actorsInvolved;
      conflict.intervention = req.body.intervention;
      conflict.image = req.body.image;

      await conflict.save();
      res.json("Conflicto actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteConflict = async (req: Request, res: Response) => {
    try {
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
      req.intervention.conflicts = req.intervention.conflicts.filter(
        (conflict) => conflict.toString() !== req.conflict._id.toString()
      );
      await Promise.allSettled([
        req.conflict.deleteOne(),
        req.intervention.save(),
      ]);
      res.send("Conflicto eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
