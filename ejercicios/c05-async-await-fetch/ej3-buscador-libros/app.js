"use strict";
function obtenerElementos() {
    return {
        input: document.getElementById("busqueda"),
        boton: document.getElementById("btn-buscar"),
        resultados: document.getElementById("resultados"),
        error: document.getElementById("error"),
        loading: document.getElementById("loading"),
    };
}
async function buscarLibros(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.docs.slice(0, 10);
}
function renderLibros(libros, contenedor) {
    contenedor.innerHTML = "";
    if (libros.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }
    libros.forEach((libro) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        const titulo = document.createElement("h3");
        titulo.textContent = libro.title;
        tarjeta.appendChild(titulo);
        if (libro.author_name) {
            const autor = document.createElement("p");
            autor.textContent = `Autor: ${libro.author_name.join(", ")}`;
            tarjeta.appendChild(autor);
        }
        if (libro.first_publish_year) {
            const anio = document.createElement("p");
            anio.textContent = `Año: ${libro.first_publish_year}`;
            tarjeta.appendChild(anio);
        }
        contenedor.appendChild(tarjeta);
    });
}
function init() {
    const { input, boton, resultados, error, loading } = obtenerElementos();
    boton.addEventListener("click", async () => {
        const query = input.value.trim();
        error.style.display = "none";
        resultados.innerHTML = "";
        if (!query) {
            error.textContent = "Ingresá un término de búsqueda.";
            error.style.display = "block";
            return;
        }
        loading.style.display = "block";
        try {
            const libros = await buscarLibros(query);
            renderLibros(libros, resultados);
        }
        catch (err) {
            const mensaje = err instanceof Error ? err.message : "Error desconocido";
            error.textContent = mensaje;
            error.style.display = "block";
        }
        finally {
            loading.style.display = "none";
        }
    });
}
init();
