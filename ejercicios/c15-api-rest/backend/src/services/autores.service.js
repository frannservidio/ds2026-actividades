/** @type {import("../types/autor.js").Autor[]} */
const autores = [
  { id: 1, nombre: "Joe Dispenza", nacionalidad: "Estadounidense" },
  { id: 2, nombre: "Gabriel Rolon", nacionalidad: "Argentina" },
  { id: 3, nombre: "James Clear", nacionalidad: "Estadounidense" },
];

export const obtenerAutores = () => autores;

export const obtenerAutorPorId = (id) => autores.find((autor) => autor.id === id);

export const crearAutor = (datos) => {
  const id = autores.length ? Math.max(...autores.map((autor) => autor.id)) + 1 : 1;
  const nuevoAutor = { id, ...datos };
  autores.push(nuevoAutor);
  return nuevoAutor;
};

export const actualizarAutor = (id, datos) => {
  const indice = autores.findIndex((autor) => autor.id === id);
  if (indice === -1) return undefined;
  autores[indice] = { ...autores[indice], ...datos, id };
  return autores[indice];
};

export const eliminarAutor = (id) => {
  const indice = autores.findIndex((autor) => autor.id === id);
  if (indice === -1) return undefined;
  return autores.splice(indice, 1)[0];
};
