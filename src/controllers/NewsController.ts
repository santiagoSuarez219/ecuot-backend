import type { Request, Response } from "express";
import News from "../models/News";

export class NewsController {
  static createNews = async (req: Request, res: Response) => {
    try {
      const news = new News({
        ...req.body,
        intervention: req.intervention._id,
      });
      req.intervention.news.push(news._id);
      await Promise.allSettled([news.save(), req.intervention.save()]);
      res.send("Acontecimiento noticiooo creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
