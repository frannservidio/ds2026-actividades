import type { Request, Response } from "express";
import * as authService from "../services/auth.service.js";
import type { Login, Registro } from "../validations/auth.validation.js";

export const registrar = async (
  req: Request<object, object, Registro>,
  res: Response,
): Promise<void> => {
  res.status(201).json(await authService.registrar(req.body));
};

export const login = async (
  req: Request<object, object, Login>,
  res: Response,
): Promise<void> => {
  const resultado = await authService.login(req.body);
  if (!resultado) {
    res.status(401).json({ error: "Credenciales invalidas" });
    return;
  }

  res.json(resultado);
};

export const yo = async (req: Request, res: Response): Promise<void> => {
  const usuario = await authService.buscarPorId(req.usuario!.id);
  if (!usuario) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return;
  }

  res.json(usuario);
};
