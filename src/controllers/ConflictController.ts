import type { Request, Response } from "express";
import Conflict from "../models/Conflict";
import Intervention from "../models/Intervention";
import mongoose from "mongoose";

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
    const { search, intervention, timeStressOccurrence } = req.query;

    const query: any = {};

    if (search && typeof search === "string") {
      query.$or = [
        { newsName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (intervention && typeof intervention === "string" &&
          mongoose.Types.ObjectId.isValid(intervention)
        ) {
          query.intervention = new mongoose.Types.ObjectId(intervention);
    }

    if (timeStressOccurrence && typeof timeStressOccurrence === "string" &&
          mongoose.Types.ObjectId.isValid(timeStressOccurrence)
        ) {
          query.timeStressOccurrence = new mongoose.Types.ObjectId(timeStressOccurrence);
    }

    try {
      const conflicts = await Conflict.find(query).populate("intervention");
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
      const intervention = await Intervention.findById(conflict.intervention);

      conflict.conflictName = req.body.conflictName;
      conflict.description = req.body.description;
      conflict.timeStressOccurrence = req.body.timeStressOccurrence;
      conflict.actorsInvolved = req.body.actorsInvolved;
      conflict.image = req.body.image;
      conflict.intervention = req.intervention._id;

      const existsConflict = req.intervention.conflicts.find(
        (conflict) => conflict.toString() === conflictId.toString()
      );

      if (!existsConflict) {
        req.intervention.conflicts.push(conflict._id);
      }

      intervention.conflicts = intervention.conflicts.filter(
        (conflict) => conflict.toString() !== conflictId.toString()
      );

      await Promise.allSettled([
        conflict.save(),
        intervention.save(),
        req.intervention.save(),
      ]);

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
        req.intervention.save(),
        req.conflict.deleteOne(),
      ]);
      res.send("Conflicto eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
