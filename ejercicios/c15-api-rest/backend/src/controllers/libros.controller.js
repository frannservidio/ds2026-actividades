import * as librosService from "../services/libros.service.js";

const idValido = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

export const listar = (_req, res) => res.json(librosService.obtenerLibros());

export const obtener = (req, res) => {
  if (!idValido(req.params.id)) return res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
  const libro = librosService.obtenerLibroPorId(Number(req.params.id));
  return libro ? res.json(libro) : res.status(404).json({ mensaje: "Libro no encontrado" });
};

export const crear = (req, res) => {
  const { titulo, autor, precio } = req.body;
  if (!titulo || !autor || !precio) return res.status(400).json({ mensaje: "titulo, autor y precio son obligatorios" });
  return res.status(201).json(librosService.crearLibro(req.body));
};

export const actualizar = (req, res) => {
  if (!idValido(req.params.id)) return res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
  const libro = librosService.actualizarLibro(Number(req.params.id), req.body);
  return libro ? res.json(libro) : res.status(404).json({ mensaje: "Libro no encontrado" });
};

export const eliminar = (req, res) => {
  if (!idValido(req.params.id)) return res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
  const libro = librosService.eliminarLibro(Number(req.params.id));
  return libro ? res.status(204).send() : res.status(404).json({ mensaje: "Libro no encontrado" });
};
