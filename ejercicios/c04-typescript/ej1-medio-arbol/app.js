"use strict";
const inputAltura = document.querySelector("#altura");
const btnGenerar = document.querySelector("#btnGenerar");
const resultado = document.querySelector("#resultado");
const error = document.querySelector("#error");
function generarMedioArbol(altura) {
    let arbol = "";
    for (let i = 1; i <= altura; i++) {
        arbol += "*".repeat(i) + "\n";
    }
    return arbol;
}
btnGenerar.addEventListener("click", () => {
    error.textContent = "";
    resultado.textContent = "";
    const valor = inputAltura.value;
    const altura = parseInt(valor);
    if (valor === "" || isNaN(altura) || altura < 1) {
        error.textContent = "Por favor, ingresá un número válido mayor o igual a 1.";
        return;
    }
    resultado.textContent = generarMedioArbol(altura);
});
