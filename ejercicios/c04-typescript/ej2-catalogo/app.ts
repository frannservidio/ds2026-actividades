interface Libro {
  isbn: string;
  titulo: string;
  autor: string;
  precio: number;
  disponible: boolean;
  genero?: string;
}

const catalogo: Libro[] = [
  { isbn: "001", titulo: "El Aleph", autor: "Borges", precio: 2500, disponible: true, genero: "Ficción" },
  { isbn: "002", titulo: "Rayuela", autor: "Cortázar", precio: 3000, disponible: false, genero: "Novela" },
  { isbn: "003", titulo: "Ficciones", autor: "Borges", precio: 2800, disponible: true },
  { isbn: "004", titulo: "Bestiario", autor: "Cortázar", precio: 2200, disponible: true, genero: "Cuentos" },
  { isbn: "005", titulo: "Martín Fierro", autor: "Hernández", precio: 1800, disponible: false },
];

const filtroAutor = document.querySelector("#filtroAutor") as HTMLInputElement;
const btnFiltrar = document.querySelector("#filtrar") as HTMLButtonElement;
const btnDisponibles = document.querySelector("#mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.querySelector("#mostrarTodos") as HTMLButtonElement;
const listado = document.querySelector("#listado") as HTMLUListElement;
const stats = document.querySelector("#stats") as HTMLParagraphElement;

function buscarPorAutor(autor: string): Libro[] {
  return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
  return catalogo.filter(libro => libro.disponible);
}

function precioPromedio(libros: Libro[]): number {
  if (libros.length === 0) return 0;
  const total: number = libros.reduce((sum, libro) => sum + libro.precio, 0);
  return total / libros.length;
}

function renderizar(libros: Libro[]): void {
  listado.innerHTML = "";
  libros.forEach(libro => {
    const li: HTMLLIElement = document.createElement("li");
    li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio} ${libro.disponible ? "✅" : "❌"}`;
    listado.appendChild(li);
  });
  stats.textContent = `Cantidad: ${libros.length} | Precio promedio: $${precioPromedio(libros).toFixed(2)}`;
}

btnFiltrar.addEventListener("click", () => {
  renderizar(buscarPorAutor(filtroAutor.value));
});

btnDisponibles.addEventListener("click", () => {
  renderizar(librosDisponibles());
});

btnTodos.addEventListener("click", () => {
  renderizar(catalogo);
});

renderizar(catalogo);

export {};