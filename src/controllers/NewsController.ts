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
      res.send("Acontecimiento noticioso creado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getAllNews = async (req: Request, res: Response) => {
    try {
      const news = await News.find({}).populate("intervention");
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getNewsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const news = await News.findById(id).populate("intervention");
      if (!news) {
        return res
          .status(404)
          .json({ message: "Acontecimiento noticioso no encontrado" });
      }
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateNews = async (req: Request, res: Response) => {
    const { newsId } = req.params;
    try {
      const news = await News.findById(newsId);
      if (!news) {
        return res
          .status(404)
          .json({ message: "Acontecimiento noticioso no encontrado" });
      }
      news.newsName = req.body.newsName;
      news.description = req.body.description;
      news.newsDate = req.body.newsDate;
      news.intervention = req.body.intervention;
      news.image = req.body.image;
      await news.save();
      res.json("Acontecimiento noticioso actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteNews = async (req: Request, res: Response) => {
    try {
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
      req.intervention.news = req.intervention.news.filter(
        (news) => news.toString() !== req.news._id.toString()
      );
      await Promise.allSettled([req.news.deleteOne(), req.intervention.save()]);
      res.send("Acontecimiento noticioso eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
