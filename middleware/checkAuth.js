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
    const rol = await Role.find({ _id: { $in: req.usuario.rol } });
    if (rol !== "investigador") {
      const error = new Error("No tienes permisos para realizar esta accion");
      return res.status(403).json({ msg: error.message });
    }
    return next();
  } catch (error) {
    console.log(error);
  }
};

const esEstudianteOrInvestigador = async (req, res, next) => {
  try {
    const rol = await Role.find({ _id: { $in: req.usuario.rol } });
    if (
      roles.filter(
        (role) => role.nombre === "estudiante" || role.nombre === "investigador"
      ).length === 0
    ) {
      const error = new Error("No tienes permisos para realizar esta accion");
      return res.status(403).json({ msg: error.message });
    }
    return next();
  } catch (error) {
    console.log(error);
  }
};

export { checkAuth, esInvestigador, esEstudianteOrInvestigador };
