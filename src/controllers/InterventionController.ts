import type { Request, Response } from "express";
import Intervention from "../models/Intervention";

export class InterventionController {
    static createIntervention = async (req: Request, res: Response) => {
        const intervention = new Intervention(req.body);
        try {
            await intervention.save();
            res.send("Intervencion creada correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    static getAllInterventions = async (req: Request, res: Response) => {
        res.send("Todos las intervenciones");
    }
}