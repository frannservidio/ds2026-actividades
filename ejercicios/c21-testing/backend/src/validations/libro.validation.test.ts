import { describe, expect, it } from "vitest";
import { idParamSchema, libroCreateSchema } from "./libro.validation.js";

const valido = { titulo: "Rayuela", precio: 7000, imagen: "/libro.jpg", descripcion: "Novela de Cortazar", autorId: 1 };
describe("schema de libro", () => {
  it("recorta espacios del titulo y conserva un libro valido", () => {
    expect(libroCreateSchema.parse({ ...valido, titulo: "  Rayuela  " })).toEqual(valido);
  });
  it.each([0, -5, 1.5])("rechaza precio %s", (precio) => {
    const resultado = libroCreateSchema.safeParse({ ...valido, precio });
    expect(resultado.success).toBe(false);
    if (!resultado.success) expect(resultado.error.issues).toEqual(expect.arrayContaining([expect.objectContaining({ path: ["precio"] })]));
  });
  it("convierte un id de ruta en numero", () => {
    expect(idParamSchema.parse({ id: "42" })).toEqual({ id: 42 });
  });
  it("rechaza un id que no representa un entero positivo", () => {
    expect(idParamSchema.safeParse({ id: "abc" }).success).toBe(false);
  });
});
