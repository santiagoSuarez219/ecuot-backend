import type { Request, Response, NextFunction } from "express";
import News, { INews } from "../models/News";

declare global {
  namespace Express {
    interface Request {
      news: INews;
    }
  }
}

export async function validateNewsExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { newsId } = req.params;
    const news = await News.findById(newsId);
    if (!news) {
      return res
        .status(404)
        .json({ message: "Acontecimiento noticioso no encontrado" });
    }
    req.news = news;
    next();
  } catch (error) {
    res.status(500).json({ message: "Hubo un error" });
  }
}
