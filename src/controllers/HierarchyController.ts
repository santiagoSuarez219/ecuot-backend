import { Request, Response } from 'express';
import Hierarchy from '../models/Hierarchy';

class HierarchyController {
    // Obtener todas las jerarquías
    async getAll(req: Request, res: Response) {
        try {
            const hierarchies = await Hierarchy.find({})
            res.json(hierarchies);
        } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
        }
    }

    // Crear una nueva jerarquía
    async create(req: Request, res: Response) {
        try {
            const hierarchy = new Hierarchy(req.body);
            await hierarchy.save();
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" });
        }
    }
}

export default new HierarchyController();