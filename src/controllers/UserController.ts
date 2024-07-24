import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    try {
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
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
      const token = generateJWT({ id: userExists._id });
      res.send(token);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getDataUser = async (req: Request, res: Response) => {
    return res.json(req.user);
  };

  static getAllUsers = async (req: Request, res: Response) => {
    try {
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
      const users = await User.find({}).select("-userPassword");
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const { user } = req.body;
    try {
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
      const userExists = await User.findById(idUser);
      if (!userExists) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      if (userExists.user !== user) {
        const userExistsByUser = await User.findOne({ user });
        if (userExistsByUser) {
          const error = new Error("El usuario ya existe");
          return res.status(409).json({ error: error.message });
        }
      }
      userExists.userName = req.body.userName;
      userExists.userLastName = req.body.userLastName;
      userExists.user = req.body.user;
      userExists.rol = req.body.rol;
      await userExists.save();
      res.json("Usuario actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getUserById = async (req: Request, res: Response) => {
    const { idUser } = req.params;
    if (req.user.rol !== "researcher") {
      return res.status(403).json({ message: "No autorizado" });
    }
    try {
      const user = await User.findById(idUser).select("-userPassword");
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updatePassword = async (req: Request, res: Response) => {
    const { idUser } = req.params;
    try {
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
      const userExists = await User.findById(idUser);
      if (!userExists) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      userExists.userPassword = await hashPassword(req.body.userPassword);
      await userExists.save();
      res.json("Contraseña actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { idUser } = req.params;
    try {
      if (req.user.rol !== "researcher") {
        return res.status(403).json({ message: "No autorizado" });
      }
      const userExists = await User.findById(idUser);
      if (!userExists) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      await userExists.deleteOne();
      res.json("Usuario eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
