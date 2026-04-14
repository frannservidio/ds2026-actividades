const numeros = [12, 7, 25, 3, 18, 9, 31, 14];

let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (const num of numeros) {
  suma += num;
  if (num > mayor) mayor = num;
  if (num < menor) menor = num;
}

const promedio = suma / numeros.length;

console.log(`Array: [${numeros.join(", ")}]`);
console.log(`Suma total: ${suma}`);
console.log(`Promedio: ${promedio}`);
console.log(`Mayor: ${mayor}`);
console.log(`Menor: ${menor}`);

function generarAsteriscos(n) {
  let resultado = "";
  for (let i = 0; i < n; i++) {
    resultado += "*";
  }
  return resultado;
}

console.log("\n--- generarAsteriscos ---");
console.log(`generarAsteriscos(5) → "${generarAsteriscos(5)}"`);
console.log(`generarAsteriscos(3) → "${generarAsteriscos(3)}"`);
console.log(`generarAsteriscos(8) → "${generarAsteriscos(8)}"`);
console.log(`generarAsteriscos(0) → "${generarAsteriscos(0)}"`);