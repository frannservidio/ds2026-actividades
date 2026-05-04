// Búsqueda de libros con Open Library API

const API_URL = "https://openlibrary.org/search.json";

async function buscarLibros() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const resultados = document.getElementById("resultados");
    resultados.innerHTML = '<div class="text-center py-5"><div class="spinner-border" role="status"></div><p class="mt-2">Buscando...</p></div>';

    try {
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(query)}&limit=12`);
        const data = await response.json();
        mostrarResultados(data.docs);
    } catch (error) {
        resultados.innerHTML = '<div class="alert alert-danger">Error al buscar libros. Intentá de nuevo.</div>';
    }
}

function mostrarResultados(libros) {
    const resultados = document.getElementById("resultados");

    if (!libros || libros.length === 0) {
        resultados.innerHTML = '<div class="alert alert-warning">No se encontraron resultados.</div>';
        return;
    }

    let html = '<div class="row g-4">';
    libros.forEach(libro => {
        const titulo = libro.title || "Sin título";
        const autor = libro.author_name ? libro.author_name[0] : "Autor desconocido";
        const coverId = libro.cover_i;
        const imgSrc = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : "https://placehold.co/200x300?text=Sin+portada";

        html += `
            <div class="col-md-4 col-lg-3">
                <div class="card h-100">
                    <img src="${imgSrc}" class="card-img-top" alt="${titulo}" style="height: 300px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text text-muted">${autor}</p>
                        <a href="libro.html" class="btn btn-outline-dark">Ver más</a>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    resultados.innerHTML = html;
}

// Buscar con Enter
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("searchInput");
    if (input) {
        input.addEventListener("keyup", (e) => {
            if (e.key === "Enter") buscarLibros();
        });
    }
});
