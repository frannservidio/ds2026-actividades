import type { Request, Response } from "express";
import * as librosService from "../services/libros.service.js";
import type { LibroActualizado, LibroNuevo } from "../validations/libro.validation.js";

export const listar = async (_req: Request, res: Response): Promise<void> => {
  res.json(await librosService.obtenerLibros());
};

export const obtener = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const libro = await librosService.obtenerLibroPorId(Number(req.params.id));
  if (!libro) {
    res.status(404).json({ mensaje: "Libro no encontrado" });
    return;
  }
  res.json(libro);
};

export const crear = async (req: Request<object, object, LibroNuevo>, res: Response): Promise<void> => {
  res.status(201).json(await librosService.crearLibro(req.body));
};

export const actualizar = async (req: Request<{ id: string }, object, LibroActualizado>, res: Response): Promise<void> => {
  const libro = await librosService.actualizarLibro(Number(req.params.id), req.body);
  res.json(libro);
};

export const eliminar = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  await librosService.eliminarLibro(Number(req.params.id));
  res.status(204).send();
};
