import type { Request, Response } from "express";
import * as autoresService from "../services/autores.service.js";
import type { AutorActualizado, AutorNuevo } from "../types/autor.js";

const idValido = (id: string): boolean => Number.isInteger(Number(id)) && Number(id) > 0;

export const listar = async (_req: Request, res: Response): Promise<void> => {
  res.json(await autoresService.obtenerAutores());
};

export const obtener = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const autor = await autoresService.obtenerAutorPorId(Number(req.params.id));
  if (!autor) {
    res.status(404).json({ mensaje: "Autor no encontrado" });
    return;
  }
  res.json(autor);
};

export const crear = async (req: Request<object, object, AutorNuevo>, res: Response): Promise<void> => {
  const { nombre, nacionalidad } = req.body;
  if (!nombre || !nacionalidad) {
    res.status(400).json({ mensaje: "nombre y nacionalidad son obligatorios" });
    return;
  }
  res.status(201).json(await autoresService.crearAutor(req.body));
};

export const actualizar = async (req: Request<{ id: string }, object, AutorActualizado>, res: Response): Promise<void> => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const existente = await autoresService.obtenerAutorPorId(Number(req.params.id));
  if (!existente) {
    res.status(404).json({ mensaje: "Autor no encontrado" });
    return;
  }
  const autor = await autoresService.actualizarAutor(Number(req.params.id), req.body);
  res.json(autor);
};

export const eliminar = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const existente = await autoresService.obtenerAutorPorId(Number(req.params.id));
  if (!existente) {
    res.status(404).json({ mensaje: "Autor no encontrado" });
    return;
  }
  await autoresService.eliminarAutor(Number(req.params.id));
  res.status(204).send();
};
