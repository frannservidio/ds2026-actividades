// Sin DB: authenticate, authorize y validate rechazan antes de llegar a Prisma.
import request from "supertest";
import jwt from "jsonwebtoken";
import { describe, expect, it } from "vitest";
import app from "../app.js";
import { JWT_SECRET } from "../config/env.js";

const token = (rol: "ADMIN" | "CLIENTE") => jwt.sign({ id: 1, rol }, JWT_SECRET, { expiresIn: "1h" });
describe("matriz de permisos de libros sin DB", () => {
  it("POST sin token: 401 antes de validar body", async () => {
    const res = await request(app).post("/api/libros").send({});
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Falta el token" });
  });
  it("POST CLIENTE: 403 antes de validar body", async () => {
    const res = await request(app).post("/api/libros").set("Authorization", `Bearer ${token("CLIENTE")}`).send({});
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: "No tenes permiso para esta operacion" });
  });
  it("POST ADMIN con body invalido: 400", async () => {
    const res = await request(app).post("/api/libros").set("Authorization", `Bearer ${token("ADMIN")}`).send({ precio: -5 });
    expect(res.status).toBe(400);
    expect(res.body.detalles).toEqual(expect.arrayContaining([expect.objectContaining({ campo: "precio" })]));
  });
  it("ruta inexistente responde JSON 404", async () => {
    const res = await request(app).get("/api/no-existe");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Ruta no encontrada" });
  });
});
