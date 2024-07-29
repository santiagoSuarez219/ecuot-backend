import type { Request, Response } from "express";
import Information from "../models/Information";

export class InformationController {
  static getAllInformation = async (req: Request, res: Response) => {
    try {
      const information = await Information.find();
      res.json(information);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getInformationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const information = await Information.findById(id);
      if (!information) {
        return res.status(404).json({ message: "Informacion no encontrada" });
      }
      res.json(information);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateConflict = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const information = await Information.findById(id);
      if (!information) {
        return res.status(404).json({ message: "Conflicto no encontrado" });
      }
      information.aboutUs = req.body.aboutUs;
      await information.save();
      res.json("Informacion actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
