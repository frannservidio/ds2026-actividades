// ===== Datos de libros destacados =====
const librosDestacados = [
    {
        id: 1,
        titulo: "Deja de ser tú",
        autor: "Joe Dispenza",
        descripcion: "En este libro, Joe Dispenza combina los campos de la física cuántica, la neurociencia y la biología para mostrarte cómo cambiar tu mente y crear la vida que deseás. Propone que podemos reprogramar nuestro cerebro abandonando los hábitos mentales que nos mantienen atrapados en el mismo ciclo.",
        precio: "$15.900",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-RXJiImQaE2MXBM7haLVJ_XdNu1olqCmeqQ&s"
    },
    {
        id: 2,
        titulo: "Historias de diván",
        autor: "Gabriel Rolón",
        descripcion: "Gabriel Rolón nos abre las puertas de su consultorio y comparte ocho historias reales de pacientes que llegaron a terapia buscando respuestas. Con una narrativa atrapante, el autor explora los rincones más profundos de la mente humana y las emociones que nos atraviesan.",
        precio: "$12.500",
        imagen: "https://sbslibreria.vtexassets.com/arquivos/ids/5122700-1200-auto?v=638872526094230000&width=1200&height=auto&aspect=true"
    },
    {
        id: 3,
        titulo: "El placebo eres tú",
        autor: "Joe Dispenza",
        descripcion: "Joe Dispenza explora el poder de la mente sobre el cuerpo y presenta evidencia científica de cómo los pensamientos y las emociones pueden transformar nuestra biología. Una guía práctica para entender cómo la actitud mental puede generar cambios reales en la salud.",
        precio: "$16.200",
        imagen: "https://sbslibreria.vtexassets.com/arquivos/ids/5704093-1200-auto?v=639120317790930000&width=1200&height=auto&aspect=true"
    },
    {
        id: 4,
        titulo: "Encuentros",
        autor: "Gabriel Rolón",
        descripcion: "Rolón reflexiona sobre el amor, el deseo y los vínculos humanos a partir de relatos clínicos y referencias culturales. Un libro que nos invita a pensar en las formas en que nos relacionamos con los demás y con nosotros mismos.",
        precio: "$13.800",
        imagen: "https://www.sbs.com.ar/encuentros--el-lado-b-del-amor----gabriel-rolon-9878223193/p?idsku=139772&gad_source=1&gad_campaignid=21533592162&gbraid=0AAAAADaGCLD24Y6yUZtoIecmF7UETBgXj&gclid=Cj0KCQjwh-HPBhCIARIsAC0p3cfayzCw7JnX3cd4NcdzVpn2xCIYA5wC20tlMPmURKHvHA_y2eIUoagaAlGoEALw_wcB"
    },
    {
        id: 5,
        titulo: "Hábitos atómicos",
        autor: "James Clear",
        descripcion: "James Clear presenta un sistema probado para construir buenos hábitos y eliminar los malos. Con estrategias prácticas basadas en evidencia científica, explica cómo pequeños cambios diarios pueden generar resultados extraordinarios a largo plazo.",
        precio: "$14.500",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_937573-MLU74994004700_032024-F.webp"
    },
    {
        id: 6,
        titulo: "El club de las 5 de la mañana",
        autor: "Robin Sharma",
        descripcion: "Robin Sharma propone una rutina matutina revolucionaria para maximizar la productividad y alcanzar el bienestar. A través de una historia envolvente, presenta la fórmula 20/20/20 que promete transformar tu día y tu vida.",
        precio: "$11.900",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_780462-MLU71630135141_092023-F.webp"
    }
];

// ===== Renderizar cards en index.html =====
function renderizarDestacados() {
    const container = document.getElementById("librosDestacados");
    if (!container) return;

    container.innerHTML = librosDestacados.map(libro => `
        <div class="col-md-4">
            <div class="card h-100">
                <img src="${libro.imagen}" class="card-img-top" alt="${libro.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${libro.titulo}</h5>
                    <p class="card-text text-muted">${libro.autor}</p>
                    <a href="libro.html?id=${libro.id}" class="btn btn-outline-dark">Ver más</a>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Cargar detalle en libro.html =====
function cargarDetalle() {
    const container = document.getElementById("detalleLibro");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const libro = librosDestacados.find(l => l.id === id);

    if (!libro) {
        container.innerHTML = `
            <div class="alert alert-warning">
                Libro no encontrado. <a href="catalogo.html">Volver al catálogo</a>
            </div>`;
        return;
    }

    document.title = `Librería - ${libro.titulo}`;

    container.innerHTML = `
        <div class="row g-4">
            <div class="col-md-5">
                <img src="${libro.imagen}" class="img-fluid rounded" alt="${libro.titulo}">
            </div>
            <div class="col-md-7">
                <h1>${libro.titulo}</h1>
                <h5 class="text-muted">${libro.autor}</h5>
                <p class="mt-3">${libro.descripcion}</p>
                <p class="fs-4 fw-bold text-success">${libro.precio}</p>
                <button class="btn btn-dark btn-lg me-2"><i class="bi bi-cart-plus"></i> Comprar</button>
                <a href="catalogo.html" class="btn btn-outline-secondary btn-lg"><i class="bi bi-arrow-left"></i> Volver al catálogo</a>
            </div>
        </div>
    `;
}

// ===== Búsqueda con Open Library =====
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

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
    renderizarDestacados();
    cargarDetalle();

    const input = document.getElementById("searchInput");
    if (input) {
        input.addEventListener("keyup", (e) => {
            if (e.key === "Enter") buscarLibros();
        });
    }
});
