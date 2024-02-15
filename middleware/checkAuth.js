import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import Role from "../models/Role.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );
      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    const error = new Error("Token no valido");
    return res.status(401).json({ msg: error.message });
  }
  next();
};

const esInvestigador = async (req, res, next) => {
  try {
    const roles = await Role.find({ _id: { $in: req.usuario.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].nombre === "investigador") {
        return next();
      }
    }
    const error = new Error("No tienes permisos para realizar esta accion");
    return res.status(403).json({ msg: error.message });
  } catch (error) {
    console.log(error);
  }
};

export { checkAuth, esInvestigador };
