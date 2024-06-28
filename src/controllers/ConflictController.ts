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
      const conflicts = await Conflict.find({}).populate("intervention");
      res.json(conflicts);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  // static getInterventionConflicts = async (req: Request, res: Response) => {
  //   try {
  //     const conflicts = await Conflict.find({
  //       intervention: req.intervention._id,
  //     }).populate("intervention");
  //     res.json(conflicts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      conflict.intervention = req.intervention._id;
      conflict.image = req.body.image;

      await conflict.save();
      res.json("Conflicto actualizado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteConflict = async (req: Request, res: Response) => {
    try {
      req.intervention.conflicts = req.intervention.conflicts.filter(
        (conflict) => conflict.toString() !== req.conflict._id.toString()
      );
      await Promise.allSettled([
        req.conflict.deleteOne(),
        req.intervention.save(),
      ]);
      res.send("Conflicto eliminado correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
