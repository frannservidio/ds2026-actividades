import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { describe, expect, it, vi } from "vitest";
import { JWT_SECRET } from "../config/env.js";
import { authenticate, authorize } from "./auth.middleware.js";

function mocks(usuario?: Request["usuario"], authorization?: string) {
  const req = { usuario, headers: { authorization } } as Request;
  const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
  const next = vi.fn();
  return { req, res, next, response: res as unknown as Response };
}
describe("authorize", () => {
  it("sin usuario responde 401 y no continua", () => {
    const { req, res, next, response } = mocks();
    authorize("ADMIN")(req, response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
  it("CLIENTE recibe 403 aunque este autenticado", () => {
    const { req, res, next, response } = mocks({ id: 2, rol: "CLIENTE" });
    authorize("ADMIN")(req, response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "No tenes permiso para esta operacion" });
    expect(next).not.toHaveBeenCalled();
  });
  it("ADMIN continua exactamente una vez", () => {
    const { req, res, next, response } = mocks({ id: 1, rol: "ADMIN" });
    authorize("ADMIN")(req, response, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
describe("authenticate", () => {
  it("lee un token firmado y asigna el usuario", () => {
    const token = jwt.sign({ id: 7, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
    const { req, next, response } = mocks(undefined, `Bearer ${token}`);
    authenticate(req, response, next);
    expect(req.usuario).toEqual({ id: 7, rol: "CLIENTE" });
    expect(next).toHaveBeenCalledTimes(1);
  });
  it.each([
    [JWT_SECRET, -1, "Token expirado"],
    ["otra-firma", 3600, "Token invalido"],
  ] as const)("rechaza token: %s / %s", (secret, expiresIn, error) => {
    const token = jwt.sign({ id: 1, rol: "ADMIN" }, secret, { expiresIn });
    const { req, res, next, response } = mocks(undefined, `Bearer ${token}`);
    authenticate(req, response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error });
    expect(next).not.toHaveBeenCalled();
  });
});
