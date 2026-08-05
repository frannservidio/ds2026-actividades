import type { Request, Response } from "express";
import * as librosService from "../services/libros.service.js";
import type { LibroActualizado, LibroNuevo } from "../types/libro.js";

const idValido = (id: string): boolean => Number.isInteger(Number(id)) && Number(id) > 0;

export const listar = (_req: Request, res: Response): void => {
  res.json(librosService.obtenerLibros());
};

export const obtener = (req: Request<{ id: string }>, res: Response): void => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const libro = librosService.obtenerLibroPorId(Number(req.params.id));
  if (!libro) {
    res.status(404).json({ mensaje: "Libro no encontrado" });
    return;
  }
  res.json(libro);
};

export const crear = (req: Request<object, object, LibroNuevo>, res: Response): void => {
  const { titulo, autor, precio } = req.body;
  if (!titulo || !autor || !precio) {
    res.status(400).json({ mensaje: "titulo, autor y precio son obligatorios" });
    return;
  }
  res.status(201).json(librosService.crearLibro(req.body));
};

export const actualizar = (req: Request<{ id: string }, object, LibroActualizado>, res: Response): void => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const libro = librosService.actualizarLibro(Number(req.params.id), req.body);
  if (!libro) {
    res.status(404).json({ mensaje: "Libro no encontrado" });
    return;
  }
  res.json(libro);
};

export const eliminar = (req: Request<{ id: string }>, res: Response): void => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const libro = librosService.eliminarLibro(Number(req.params.id));
  if (!libro) {
    res.status(404).json({ mensaje: "Libro no encontrado" });
    return;
  }
  res.status(204).send();
};
