"use strict";
async function obtenerUsuarios() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    const usuarios = await response.json();
    return usuarios;
}
function renderUsuarios(usuarios) {
    const lista = document.getElementById("lista-usuarios");
    usuarios.forEach((usuario) => {
        const li = document.createElement("li");
        li.textContent = `${usuario.name} - ${usuario.email}`;
        lista.appendChild(li);
    });
}
function mostrarError(mensaje) {
    const error = document.getElementById("error");
    error.textContent = mensaje;
    error.style.display = "block";
}
async function main() {
    const loading = document.getElementById("loading");
    loading.style.display = "block";
    try {
        const usuarios = await obtenerUsuarios();
        renderUsuarios(usuarios);
    }
    catch (error) {
        const mensaje = error instanceof Error ? error.message : "Error desconocido";
        mostrarError(mensaje);
    }
    finally {
        loading.style.display = "none";
    }
}
main();
