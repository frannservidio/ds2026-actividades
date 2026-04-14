// --- Función 1: clasificarNota ---
function clasificarNota(nota) {
  if (nota < 4) {
    return "Desaprobado";
  } else if (nota < 8) { 
    return "Aprobado";
  } else {
    return "Promocionado";
  }
}

// --- Función 2: diaDeLaSemana ---
function diaDeLaSemana(numero) {
  let dia;
  switch (numero) {
    case 1: dia = "Lunes"; break;
    case 2: dia = "Martes"; break;
    case 3: dia = "Miércoles"; break;
    case 4: dia = "Jueves"; break;
    case 5: dia = "Viernes"; break;
    case 6: dia = "Sábado (fin de semana)"; break;
    case 7: dia = "Domingo (fin de semana)"; break;
    default: return "Día inválido";
  }
  return dia;
}

console.log("--- clasificarNota ---");
console.log(`Nota 2  → ${clasificarNota(2)}`);   // Desaprobado
console.log(`Nota 4  → ${clasificarNota(4)}`);   // Aprobado
console.log(`Nota 7  → ${clasificarNota(7)}`);   // Aprobado
console.log(`Nota 8  → ${clasificarNota(8)}`);   // Promocionado
console.log(`Nota 10 → ${clasificarNota(10)}`);  // Promocionado

console.log("\n--- diaDeLaSemana ---");
console.log(`Día 1 → ${diaDeLaSemana(1)}`);  // Lunes
console.log(`Día 3 → ${diaDeLaSemana(3)}`);  // Miércoles
console.log(`Día 6 → ${diaDeLaSemana(6)}`);  // Sábado (fin de semana)
console.log(`Día 7 → ${diaDeLaSemana(7)}`);  // Domingo (fin de semana)
console.log(`Día 9 → ${diaDeLaSemana(9)}`);  // Día inválido
console.log(`Día 0 → ${diaDeLaSemana(0)}`);  // Día inválido