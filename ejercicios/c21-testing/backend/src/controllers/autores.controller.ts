import type { Request, Response } from "express";
import * as autoresService from "../services/autores.service.js";
import type { AutorActualizado, AutorNuevo } from "../validations/autor.validation.js";

export const listar = async (_req: Request, res: Response): Promise<void> => {
  res.json(await autoresService.obtenerAutores());
};

export const obtener = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const autor = await autoresService.obtenerAutorPorId(Number(req.params.id));
  if (!autor) {
    res.status(404).json({ mensaje: "Autor no encontrado" });
    return;
  }
  res.json(autor);
};

export const crear = async (req: Request<object, object, AutorNuevo>, res: Response): Promise<void> => {
  res.status(201).json(await autoresService.crearAutor(req.body));
};

export const actualizar = async (req: Request<{ id: string }, object, AutorActualizado>, res: Response): Promise<void> => {
  const autor = await autoresService.actualizarAutor(Number(req.params.id), req.body);
  res.json(autor);
};

export const eliminar = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  await autoresService.eliminarAutor(Number(req.params.id));
  res.status(204).send();
};
