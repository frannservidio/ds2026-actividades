import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

type Rol = "ADMIN" | "CLIENTE";
type PayloadToken = { id: number; rol: Rol };

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Falta el token" });
    return;
  }

  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as PayloadToken;
    req.usuario = { id: payload.id, rol: payload.rol };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token expirado" });
      return;
    }

    res.status(401).json({ error: "Token invalido" });
  }
};

export const authorize = (...roles: Rol[]) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.usuario) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }

  if (!roles.includes(req.usuario.rol)) {
    res.status(403).json({ error: "No tenes permiso para esta operacion" });
    return;
  }

  next();
};
