import type { Request, Response } from "express";
import * as autoresService from "../services/autores.service.js";
import type { AutorActualizado, AutorNuevo } from "../types/autor.js";

const idValido = (id: string): boolean => Number.isInteger(Number(id)) && Number(id) > 0;

export const listar = (_req: Request, res: Response): void => {
  res.json(autoresService.obtenerAutores());
};

export const obtener = (req: Request<{ id: string }>, res: Response): void => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const autor = autoresService.obtenerAutorPorId(Number(req.params.id));
  if (!autor) {
    res.status(404).json({ mensaje: "Autor no encontrado" });
    return;
  }
  res.json(autor);
};

export const crear = (req: Request<object, object, AutorNuevo>, res: Response): void => {
  const { nombre, nacionalidad } = req.body;
  if (!nombre || !nacionalidad) {
    res.status(400).json({ mensaje: "nombre y nacionalidad son obligatorios" });
    return;
  }
  res.status(201).json(autoresService.crearAutor(req.body));
};

export const actualizar = (req: Request<{ id: string }, object, AutorActualizado>, res: Response): void => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const autor = autoresService.actualizarAutor(Number(req.params.id), req.body);
  if (!autor) {
    res.status(404).json({ mensaje: "Autor no encontrado" });
    return;
  }
  res.json(autor);
};

export const eliminar = (req: Request<{ id: string }>, res: Response): void => {
  if (!idValido(req.params.id)) {
    res.status(400).json({ mensaje: "El id debe ser un entero positivo" });
    return;
  }
  const autor = autoresService.eliminarAutor(Number(req.params.id));
  if (!autor) {
    res.status(404).json({ mensaje: "Autor no encontrado" });
    return;
  }
  res.status(204).send();
};
