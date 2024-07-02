import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    try {
      const { userPassword, user } = req.body;
      const userExists = await User.findOne({ user });
      if (userExists) {
        const error = new Error("El usuario ya existe");
        return res.status(409).json({ error: error.message });
      }
      const userNew = new User(req.body);
      // Hash password
      userNew.userPassword = await hashPassword(userPassword);
      await userNew.save();
      res.send("Usuario creado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { userPassword, user } = req.body;
      const userExists = await User.findOne({ user });
      if (!userExists) {
        const error = new Error("El usuario no existe");
        return res.status(409).json({ error: error.message });
      }
      const isPasswordCorrect = await checkPassword(
        userPassword,
        userExists.userPassword
      );
      if (!isPasswordCorrect) {
        const error = new Error("La contraseña es incorrecta");
        return res.status(401).json({ error: error.message });
      }
      res.send("Usuario logueado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
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
