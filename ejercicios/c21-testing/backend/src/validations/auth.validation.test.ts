import { expect, it } from "vitest";
import { loginSchema, registroSchema } from "./auth.validation.js";

it("normaliza email pero no modifica password", () => {
  expect(loginSchema.parse({ email: "  ADMIN@LIBRERIA.TEST ", password: " clave " }))
    .toEqual({ email: "admin@libreria.test", password: " clave " });
});
it("login requiere password pero no exige fortaleza de registro", () => {
  expect(loginSchema.safeParse({ email: "a@b.com", password: "x" }).success).toBe(true);
  expect(loginSchema.safeParse({ email: "a@b.com", password: "" }).success).toBe(false);
});
it("registro rechaza una password debil", () => {
  expect(registroSchema.safeParse({ nombre: "Ana", email: "a@b.com", password: "x" }).success).toBe(false);
});
