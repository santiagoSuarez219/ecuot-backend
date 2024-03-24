import type { Request, Response } from "express";
import Conflict from "../models/Conflict";

//TODO: Cambiar los console.log por res.status(500).json() en los catch en producción
//TODO: Implementar metodo para obtener un conflicto por el id

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

  static updateConflict = async (req: Request, res: Response) => {
    try {
      const { conflictId } = req.params;
      const conflict = await Conflict.findById(conflictId);
      if (!conflict) {
        return res.status(404).json({ message: "Conflicto no encontrado" });
      }
      if (
        conflict.intervention.toString() !== req.intervention._id.toString()
      ) {
        return res.status(403).json({
          message: "No tienes permisos para actualizar este conflicto",
        });
      }
      conflict.conflictName = req.body.conflictName;
      conflict.description = req.body.description;
      await conflict.save();
      res.send("Conflicto actualizado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteConflict = async (req: Request, res: Response) => {
    try {
      const { conflictId } = req.params;
      const conflict = await Conflict.findById(conflictId, req.body);
      if (!conflict) {
        return res.status(404).json({ message: "Conflicto no encontrado" });
      }
      req.intervention.conflicts = req.intervention.conflicts.filter(
        (conflict) => conflict.toString() !== conflictId
      );
      await Promise.allSettled([conflict.deleteOne(), req.intervention.save()]);
      res.send("Conflicto eliminado correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
