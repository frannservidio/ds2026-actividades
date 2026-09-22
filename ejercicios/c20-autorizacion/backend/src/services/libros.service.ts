import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../utils/http-error.js";
import type { LibroActualizado, LibroNuevo } from "../validations/libro.validation.js";

export type LibroListado = Prisma.LibroGetPayload<{ include: { autor: true } }>;
export type LibroDetalle = Prisma.LibroGetPayload<{ include: { autor: true; categorias: true } }>;

export const obtenerLibros = (): Promise<LibroListado[]> => prisma.libro.findMany({
  include: { autor: true },
  orderBy: { id: "asc" },
});

export const obtenerLibroPorId = (id: number): Promise<LibroDetalle | null> => prisma.libro.findUnique({
  where: { id },
  include: { autor: true, categorias: true },
});

export const crearLibro = async (datos: LibroNuevo): Promise<LibroDetalle> => {
  const autor = await prisma.autor.findUnique({ where: { id: datos.autorId } });
  if (!autor) throw new HttpError(400, "El autor no existe");

  return prisma.libro.create({
    data: datos,
    include: { autor: true, categorias: true },
  });
};

export const actualizarLibro = (id: number, datos: LibroActualizado) => prisma.libro.update({ where: { id }, data: datos });
export const eliminarLibro = (id: number) => prisma.libro.delete({ where: { id } });
