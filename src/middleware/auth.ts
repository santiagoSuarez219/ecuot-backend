import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error("No autorizado");
    return res.status(401).json({ error: error.message });
  }
  const token = bearer.split(" ")[1];

  try {
    const payload = verifyJWT(token);
    if (typeof payload === "object" && payload.id) {
      const user = await User.findById(payload.id).select(
        "userName userLastName user rol"
      );
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(500).json({ error: "Token no valido" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Token no valido" });
  }
};
