import * as autoresService from "../services/autores.service.js";

const idValido = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

export const listar = (_req, res) => res.json(autoresService.obtenerAutores());

export const obtener = (req, res) => {
  if (!idValido(req.params.id)) return res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
  const autor = autoresService.obtenerAutorPorId(Number(req.params.id));
  return autor ? res.json(autor) : res.status(404).json({ mensaje: "Autor no encontrado" });
};

export const crear = (req, res) => {
  const { nombre, nacionalidad } = req.body;
  if (!nombre || !nacionalidad) return res.status(400).json({ mensaje: "nombre y nacionalidad son obligatorios" });
  return res.status(201).json(autoresService.crearAutor(req.body));
};

export const actualizar = (req, res) => {
  if (!idValido(req.params.id)) return res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
  const autor = autoresService.actualizarAutor(Number(req.params.id), req.body);
  return autor ? res.json(autor) : res.status(404).json({ mensaje: "Autor no encontrado" });
};

export const eliminar = (req, res) => {
  if (!idValido(req.params.id)) return res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
  const autor = autoresService.eliminarAutor(Number(req.params.id));
  return autor ? res.status(204).send() : res.status(404).json({ mensaje: "Autor no encontrado" });
};
