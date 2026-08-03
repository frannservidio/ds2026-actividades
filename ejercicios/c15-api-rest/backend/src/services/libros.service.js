/** @type {import("../types/libro.js").Libro[]} */
const libros = [
  {
    id: 1,
    titulo: "Deja de ser tu",
    autor: "Joe Dispenza",
    precio: "$15.900",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-RXJiImQaE2MXBM7haLVJ_XdNu1olqCmeqQ&s",
    descripcion: "Una propuesta para cambiar la mente y crear la vida que deseas.",
    destacado: true,
    disponible: true,
  },
  {
    id: 2,
    titulo: "Historias de divan",
    autor: "Gabriel Rolon",
    precio: "$12.500",
    imagen: "https://sbslibreria.vtexassets.com/arquivos/ids/5122700-1200-auto?v=638872526094230000&width=1200&height=auto&aspect=true",
    descripcion: "Ocho historias de pacientes que llegaron a terapia buscando respuestas.",
    destacado: true,
    disponible: true,
  },
];

export const obtenerLibros = () => libros;

export const obtenerLibroPorId = (id) => libros.find((libro) => libro.id === id);

export const crearLibro = (datos) => {
  const id = libros.length ? Math.max(...libros.map((libro) => libro.id)) + 1 : 1;
  const nuevoLibro = { id, ...datos };
  libros.push(nuevoLibro);
  return nuevoLibro;
};

export const actualizarLibro = (id, datos) => {
  const indice = libros.findIndex((libro) => libro.id === id);
  if (indice === -1) return undefined;
  libros[indice] = { ...libros[indice], ...datos, id };
  return libros[indice];
};

export const eliminarLibro = (id) => {
  const indice = libros.findIndex((libro) => libro.id === id);
  if (indice === -1) return undefined;
  return libros.splice(indice, 1)[0];
};
