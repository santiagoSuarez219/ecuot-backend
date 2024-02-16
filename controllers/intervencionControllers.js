import Intervencion from "../models/Intervencion.js";

const obtenerIntervenciones = async (req, res) => {
  try {
    const intervenciones = await Intervencion.find()
      .populate("creado_por")
      .populate("actualizado_por");
    res.status(200).json(intervenciones);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};

const obtenerIntervencion = async (req, res) => {};

const nuevaIntervencion = async (req, res) => {
  const intervencion = new Intervencion(req.body);
  intervencion.creado_por = req.usuario.id;
  intervencion.actualizado_por = req.usuario.id;
  try {
    const intervencionAlmacenada = await intervencion.save();
    res.status(201).json(intervencionAlmacenada);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};

const editarIntervencion = async (req, res) => {
  const { id } = req.params;
  try {
    const intervencion = await Intervencion.findById(id);
    if (!intervencion) {
      return res.status(404).json({ msg: "Intervencion no encontrada" });
    }
    intervencion.nombre = req.body.nombre || intervencion.nombre;
    intervencion.fecha_inicio =
      req.body.fecha_inicio || intervencion.fecha_inicio;
    intervencion.jerarquia = req.body.jerarquia || intervencion.jerarquia;
    intervencion.descripcion = req.body.descripcion || intervencion.descripcion;
    intervencion.proyecto_estrategico =
      req.body.proyecto_estrategico || intervencion.proyecto_estrategico;
    intervencion.sistema_interno =
      req.body.sistema_interno || intervencion.sistema_interno;
    intervencion.actualizado_por = req.usuario.id;
    const intervencionActualizada = await intervencion.save();
    res.status(200).json(intervencionActualizada);
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error" });
  }
};

const eliminarIntervencion = async (req, res) => {};

export {
  obtenerIntervenciones,
  obtenerIntervencion,
  nuevaIntervencion,
  editarIntervencion,
  eliminarIntervencion,
};
