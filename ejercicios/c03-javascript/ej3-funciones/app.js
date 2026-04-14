function calcularPrecioFinal(monto, medioPago) {
  // Monto menor a $200: sin descuento
  if (monto < 200) {
    return monto;
  }

  // Mayor a $400: 40% off para todos
  if (monto > 400) {
    return monto * 0.6;
  }

  // Entre $200 y $400: depende del medio de pago
  switch (medioPago) {
    case "E": return monto * 0.7; // 30% off efectivo
    case "D": return monto * 0.8; // 20% off débito
    case "C": return monto * 0.9; // 10% off crédito
    default:  return monto;       // medio de pago inválido
  }
}

// Test
const pruebas = [
  { monto: 150, pago: "E" },  // sin descuento (menor a $200)
  { monto: 300, pago: "E" },  // 30% off → 210
  { monto: 300, pago: "D" },  // 20% off → 240
  { monto: 400, pago: "C" },  // 10% off → 360
  { monto: 500, pago: "D" },  // 40% off → 300
  { monto: 1000, pago: "E" }, // 40% off → 600
];

for (const { monto, pago } of pruebas) {
  const final = calcularPrecioFinal(monto, pago);
  console.log(`Monto: $${monto} | Pago: ${pago} | Final: $${final}`);
}