import { prisma } from "../lib/prisma.js";
import type { LibroActualizado, LibroNuevo } from "../types/libro.js";

export const obtenerLibros = () => prisma.libro.findMany({ orderBy: { id: "asc" } });
export const obtenerLibroPorId = (id: number) => prisma.libro.findUnique({ where: { id } });
export const crearLibro = (datos: LibroNuevo) => prisma.libro.create({ data: datos });
export const actualizarLibro = (id: number, datos: LibroActualizado) => prisma.libro.update({ where: { id }, data: datos });
export const eliminarLibro = (id: number) => prisma.libro.delete({ where: { id } });
