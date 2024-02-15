import Intervencion from "../models/Intervencion.js";

const obtenerIntervenciones = async (req, res) => {};

const obtenerIntervencion = async (req, res) => {};

const nuevaIntervencion = async (req, res) => {
  const intervencion = new Intervencion(req.body);
  intervencion.creado_por = req.usuario.id;
  try {
    const intervencionAlmacenada = await intervencion.save();
    res.status(201).json(intervencionAlmacenada);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};

const editarIntervencion = async (req, res) => {};

const eliminarIntervencion = async (req, res) => {};

export {
  obtenerIntervenciones,
  obtenerIntervencion,
  nuevaIntervencion,
  editarIntervencion,
  eliminarIntervencion,
};
