import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/http-error.js";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: "Datos invalidos",
      detalles: error.issues.map((issue) => ({
        campo: issue.path.join("."),
        mensaje: issue.message,
      })),
    });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      res.status(409).json({ error: "Ya existe un registro con ese valor" });
      return;
    }
    if (error.code === "P2025") {
      res.status(404).json({ error: "No encontrado" });
      return;
    }
    if (error.code === "P2003") {
      res.status(409).json({ error: "Hay registros relacionados" });
      return;
    }
  }

  console.error(error);
  res.status(500).json({ error: "Error interno del servidor" });
};
