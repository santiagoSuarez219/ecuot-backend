import { Request, Response } from "express";
import System from "../models/System";

export class SystemController {
  static createSystem = async (req: Request, res: Response) => {
    try {
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
      const systemNew = new System(req.body);
      await systemNew.save();
      res.send("Sistema creado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getAllSystems = async (req: Request, res: Response) => {
    try {
      const systems = await System.find({});
      res.json(systems);
    } catch (error) {
      console.log(error);
    }
  };

  static updateSystem = async (req: Request, res: Response) => {
    const { idSystem } = req.params;
    try {
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
      const systemExists = await System.findById(idSystem);
      if (!systemExists) {
        return res.status(404).json({ message: "Sistema no encontrado" });
      }
      systemExists.systemName = req.body.systemName;
      await systemExists.save();
      res.json("Sistema actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getSystemById = async (req: Request, res: Response) => {
    const { idSystem } = req.params;
    try {
      const system = await System.findById(idSystem);
      if (!system) {
        return res.status(404).json({ message: "Sistema no encontrado" });
      }
      res.json(system);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteSystem = async (req: Request, res: Response) => {
    const { idSystem } = req.params;
    try {
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
      const systemExists = await System.findById(idSystem);
      if (!systemExists) {
        return res.status(404).json({ message: "Sistema no encontrado" });
      }
      await systemExists.deleteOne();
      res.json("Sistema eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
