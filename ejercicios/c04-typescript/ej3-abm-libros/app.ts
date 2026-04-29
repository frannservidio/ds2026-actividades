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
];

const inputTitulo = document.querySelector("#titulo") as HTMLInputElement;
const inputAutor = document.querySelector("#autor") as HTMLInputElement;
const inputPrecio = document.querySelector("#precio") as HTMLInputElement;
const inputGenero = document.querySelector("#genero") as HTMLInputElement;
const inputDisponible = document.querySelector("#disponible") as HTMLInputElement;
const btnAgregar = document.querySelector("#btnAgregar") as HTMLButtonElement;
const errorForm = document.querySelector("#errorForm") as HTMLDivElement;

const filtroAutor = document.querySelector("#filtroAutor") as HTMLInputElement;
const btnFiltrar = document.querySelector("#filtrar") as HTMLButtonElement;
const btnDisponibles = document.querySelector("#mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.querySelector("#mostrarTodos") as HTMLButtonElement;
const listado = document.querySelector("#listado") as HTMLUListElement;
const stats = document.querySelector("#stats") as HTMLParagraphElement;

function agregarLibro(libro: Libro): void {
  catalogo.push(libro);
  renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
  const index: number = catalogo.findIndex(libro => libro.isbn === isbn);
  if (index !== -1) {
    catalogo.splice(index, 1);
    renderizar(catalogo);
  }
}

function validarFormulario(): Libro | null {
  const titulo: string = inputTitulo.value.trim();
  const autor: string = inputAutor.value.trim();
  const precio: number = parseFloat(inputPrecio.value);
  const genero: string = inputGenero.value.trim();
  const disponible: boolean = inputDisponible.checked;

  if (titulo === "" || autor === "" || isNaN(precio) || precio <= 0) {
    errorForm.textContent = "Completá título, autor y un precio mayor a 0.";
    return null;
  }

  const libro: Libro = {
    isbn: "AUTO-" + Date.now(),
    titulo,
    autor,
    precio,
    disponible,
  };

  if (genero !== "") {
    libro.genero = genero;
  }

  return libro;
}

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
    li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio} ${libro.disponible ? "✅" : "❌"} `;
    const btnEliminar: HTMLButtonElement = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarLibro(libro.isbn));
    li.appendChild(btnEliminar);
    listado.appendChild(li);
  });
  stats.textContent = `Cantidad: ${libros.length} | Precio promedio: $${precioPromedio(libros).toFixed(2)}`;
}

btnAgregar.addEventListener("click", () => {
  errorForm.textContent = "";
  const libro: Libro | null = validarFormulario();
  if (libro === null) return;
  agregarLibro(libro);
  inputTitulo.value = "";
  inputAutor.value = "";
  inputPrecio.value = "";
  inputGenero.value = "";
  inputDisponible.checked = true;
});

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