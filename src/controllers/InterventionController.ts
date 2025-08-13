import type { Request, Response } from "express";
import Intervention from "../models/Intervention";
import InterventionDataSheet from "../models/InterventionDataSheet";
import Conflict from "../models/Conflict";
import News from "../models/News";
import mongoose from "mongoose";

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
  // Método para migrar el campo internalSystem de string a ObjectID
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
  const { search, hierarchy, internalSystem } = req.query;

  const query: any = {};

  // Filtro por búsqueda en nombre o descripción (texto libre)
  if (search && typeof search === "string") {
    query.$or = [
      { interventionName: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Filtro por jerarquía (como ObjectId si es referencia)
  if (
    hierarchy &&
    typeof hierarchy === "string" &&
    mongoose.Types.ObjectId.isValid(hierarchy)
  ) {
    query.hierarchy = new mongoose.Types.ObjectId(hierarchy);
  }

  // Filtro por Sistema Interno (como ObjectId si es referencia)
  if (
    internalSystem &&
    typeof internalSystem === "string" &&
    mongoose.Types.ObjectId.isValid(internalSystem)
  ) {
    query.internalSystem = new mongoose.Types.ObjectId(internalSystem);
  }

  try {
    const interventions = await Intervention.find(query)
      .populate("internalSystem")
      .populate("hierarchy"); // solo si hierarchy es una referencia
    res.json(interventions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};

  static getLatestInterventions = async (req: Request, res: Response) => {
    try {
      // Get the lastest 3 interventions
      const interventions = await Intervention.find({})
        .sort({ createdAt: -1 })
        .limit(3)
        .populate("internalSystem");
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
