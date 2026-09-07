import { prisma } from "../lib/prisma.js";
import type { AutorActualizado, AutorNuevo } from "../validations/autor.validation.js";

export const obtenerAutores = () => prisma.autor.findMany({ orderBy: { id: "asc" } });
export const obtenerAutorPorId = (id: number) => prisma.autor.findUnique({ where: { id } });
export const crearAutor = (datos: AutorNuevo) => prisma.autor.create({ data: datos });
export const actualizarAutor = (id: number, datos: AutorActualizado) => prisma.autor.update({ where: { id }, data: datos });
export const eliminarAutor = (id: number) => prisma.autor.delete({ where: { id } });
