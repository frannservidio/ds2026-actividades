import type { Request, Response } from "express";
import * as librosService from "../services/libros.service.js";
import type { LibroActualizado, LibroNuevo } from "../types/libro.js";

const idValido = (id: string): boolean => Number.isInteger(Number(id)) && Number(id) > 0;

export const listar = async (_req: Request, res: Response): Promise<void> => {
  res.json(await librosService.obtenerLibros());
};

export const obtener = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const libro = await librosService.obtenerLibroPorId(Number(req.params.id));
  if (!libro) {
    res.status(404).json({ mensaje: "Libro no encontrado" });
    return;
  }
  res.json(libro);
};

export const crear = async (req: Request<object, object, LibroNuevo>, res: Response): Promise<void> => {
  const { titulo, autor, precio } = req.body;
  if (!titulo || !autor || !precio) {
    res.status(400).json({ mensaje: "titulo, autor y precio son obligatorios" });
    return;
  }
  res.status(201).json(await librosService.crearLibro(req.body));
};

export const actualizar = async (req: Request<{ id: string }, object, LibroActualizado>, res: Response): Promise<void> => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const existente = await librosService.obtenerLibroPorId(Number(req.params.id));
  if (!existente) {
    res.status(404).json({ mensaje: "Libro no encontrado" });
    return;
  }
  const libro = await librosService.actualizarLibro(Number(req.params.id), req.body);
  res.json(libro);
};

export const eliminar = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const existente = await librosService.obtenerLibroPorId(Number(req.params.id));
  if (!existente) {
    res.status(404).json({ mensaje: "Libro no encontrado" });
    return;
  }
  await librosService.eliminarLibro(Number(req.params.id));
  res.status(204).send();
};
