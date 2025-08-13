import { Request, Response } from 'express';
import TimeStressOcurrence from '../models/TimeStressOcurrence';

class TimeStressOcurrenceController {
    // Obtener todas las ocurrencias de estrés temporal
    async getAll(req: Request, res: Response) {
        try {
            const timeStressOcurrences = await TimeStressOcurrence.find({});
            res.json(timeStressOcurrences);
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" });
        }
    }

    // Crear una nueva ocurrencia de estrés temporal
    async create(req: Request, res: Response) {
        try {
            const timeStressOcurrence = new TimeStressOcurrence(req.body);
            await timeStressOcurrence.save();
            res.status(201).json(timeStressOcurrence);
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" });
        }
    }
}

export default new TimeStressOcurrenceController();