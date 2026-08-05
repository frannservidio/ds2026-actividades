import type { Autor, AutorActualizado, AutorNuevo } from "../types/autor.js";

const autores: Autor[] = [
  { id: 1, nombre: "Joe Dispenza", nacionalidad: "Estadounidense" },
  { id: 2, nombre: "Gabriel Rolon", nacionalidad: "Argentina" },
  { id: 3, nombre: "James Clear", nacionalidad: "Estadounidense" },
  { id: 4, nombre: "Robin Sharma", nacionalidad: "Canadiense" },
];

export const obtenerAutores = (): Autor[] => autores;
export const obtenerAutorPorId = (id: number): Autor | undefined => autores.find((autor) => autor.id === id);

export const crearAutor = (datos: AutorNuevo): Autor => {
  const id = autores.length ? Math.max(...autores.map((autor) => autor.id)) + 1 : 1;
  const nuevoAutor = { id, ...datos };
  autores.push(nuevoAutor);
  return nuevoAutor;
};

export const actualizarAutor = (id: number, datos: AutorActualizado): Autor | undefined => {
  const indice = autores.findIndex((autor) => autor.id === id);
  if (indice === -1) return undefined;
  autores[indice] = { ...autores[indice], ...datos, id };
  return autores[indice];
};

export const eliminarAutor = (id: number): Autor | undefined => {
  const indice = autores.findIndex((autor) => autor.id === id);
  if (indice === -1) return undefined;
  return autores.splice(indice, 1)[0];
};
