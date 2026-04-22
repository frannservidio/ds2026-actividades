"use strict";
const catalogo = [
    { isbn: "001", titulo: "El Aleph", autor: "Borges", precio: 2500, disponible: true, genero: "Ficción" },
    { isbn: "002", titulo: "Rayuela", autor: "Cortázar", precio: 3000, disponible: false, genero: "Novela" },
    { isbn: "003", titulo: "Ficciones", autor: "Borges", precio: 2800, disponible: true },
    { isbn: "004", titulo: "Bestiario", autor: "Cortázar", precio: 2200, disponible: true, genero: "Cuentos" },
    { isbn: "005", titulo: "Martín Fierro", autor: "Hernández", precio: 1800, disponible: false },
];
const filtroAutor = document.querySelector("#filtroAutor");
const btnFiltrar = document.querySelector("#filtrar");
const btnDisponibles = document.querySelector("#mostrarDisponibles");
const btnTodos = document.querySelector("#mostrarTodos");
const listado = document.querySelector("#listado");
const stats = document.querySelector("#stats");
function buscarPorAutor(autor) {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(libro => libro.disponible);
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    const total = libros.reduce((sum, libro) => sum + libro.precio, 0);
    return total / libros.length;
}
function renderizar(libros) {
    listado.innerHTML = "";
    libros.forEach(libro => {
        const li = document.createElement("li");
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
