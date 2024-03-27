import { Request, Response } from "express";
import User from "../models/User";

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    const user = new User(req.body);
    try {
      await user.save();
      res.send("Usuario creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  };
}
