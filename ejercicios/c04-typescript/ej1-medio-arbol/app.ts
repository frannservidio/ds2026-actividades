const inputAltura = document.querySelector("#altura") as HTMLInputElement;
const btnGenerar = document.querySelector("#btnGenerar") as HTMLButtonElement;
const resultado = document.querySelector("#resultado") as HTMLPreElement;
const error = document.querySelector("#error") as HTMLParagraphElement;

function generarMedioArbol(altura: number): string {
  let arbol: string = "";
  for (let i: number = 1; i <= altura; i++) {
    arbol += "*".repeat(i) + "\n";
  }
  return arbol;
}

btnGenerar.addEventListener("click", () => {
  error.textContent = "";
  resultado.textContent = "";

  const valor: string = inputAltura.value;
  const altura: number = parseInt(valor);

  if (valor === "" || isNaN(altura) || altura < 1) {
    error.textContent = "Por favor, ingresá un número válido mayor o igual a 1.";
    return;
  }

  resultado.textContent = generarMedioArbol(altura);
});