const { performance } = require("perf_hooks");
const { generarVentas } = require("./generador");
const {
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  totalCiudadCadena,
  totalCiudadUnaPasada,
  clientesRecurrentesBruta,
  clientesRecurrentesSet,
  clientesRecurrentesMap,
  mejorSemanaBruta,
  mejorSemana
} = require("./analitica");

function primeraVentaContada(ventas, c) {
  c.ops++;
  return ventas.length > 0 ? ventas[0] : null;
}

function totalVendidoContado(ventas, c) {
  let total = 0;
  for (const v of ventas) {
    c.ops += 2;
    if (v.cantidad > 0) total += v.cantidad * v.precio;
  }
  return total;
}

function ventaMayorContada(ventas, c) {
  let mayor = null;
  let max = -1;
  for (const v of ventas) {
    c.ops += 2;
    if (v.cantidad > 0) {
      const val = v.cantidad * v.precio;
      c.ops++;
      if (val > max) {
        max = val;
        mayor = v;
      }
    }
  }
  return mayor;
}

function totalPorCiudadContado(ventas, ciudad, c) {
  let total = 0;
  const buscada = ciudad.trim().toLowerCase();
  for (const v of ventas) {
    c.ops += 3;
    if (v.cantidad > 0 && v.ciudad.trim().toLowerCase() === buscada) {
      total += v.cantidad * v.precio;
    }
  }
  return total;
}
const tamanosOps = [100, 1000, 10000, 100000];
const tablaOps = [];

for (const n of tamanosOps) {
  const muestra = generarVentas(n);
  const c1 = { ops: 0 }, c2 = { ops: 0 }, c3 = { ops: 0 }, c4 = { ops: 0 };
  primeraVentaContada(muestra, c1);
  totalVendidoContado(muestra, c2);
  ventaMayorContada(muestra, c3);
  totalPorCiudadContado(muestra, "Medellín", c4);

  tablaOps.push({
    n,
    "primeraVenta O(1)": c1.ops,
    "totalVendido O(n)": c2.ops,
    "ventaMayor O(n)": c3.ops,
    "totalPorCiudad O(n)": c4.ops
  });
}

console.log("=== 1. CONTEO DE OPERACIONES POR TAMAÑO (MINI RETO 5) ===");
console.table(tablaOps);

function medirMs(fn, ...args) {
  const t0 = performance.now();
  fn(...args);
  return performance.now() - t0;
}

const tablaBenchmark = [];
for (const n of [10000, 100000]) {
  const muestra = generarVentas(n);

  const msRecBruta = n <= 10000 ? medirMs(clientesRecurrentesBruta, muestra) : null;
  const msRecSet = medirMs(clientesRecurrentesSet, muestra);
  const msRecMap = medirMs(clientesRecurrentesMap, muestra);
  const msCad = medirMs(totalCiudadCadena, muestra, "Medellín");
  const msUna = medirMs(totalCiudadUnaPasada, muestra, "Medellín");

  const msV01 = n <= 10000
    ? medirMs(totalVendido, muestra) + medirMs(unidadesVendidas, muestra) + medirMs(ventaMayor, muestra) + medirMs(ticketPromedio, muestra) + msCad + msRecBruta
    : null;

  const msV10 =
    medirMs(totalVendido, muestra) +
    medirMs(unidadesVendidas, muestra) +
    medirMs(ventaMayor, muestra) +
    medirMs(ticketPromedio, muestra) +
    msUna +
    msRecSet;

  tablaBenchmark.push({
    n,
    "Recurrentes O(n²)": msRecBruta ? `${msRecBruta.toFixed(2)} ms` : "Omitido (>15s)",
    "Recurrentes Set O(n)": `${msRecSet.toFixed(2)} ms`,
    "Recurrentes Map O(n)": `${msRecMap.toFixed(2)} ms`,
    "Ciudad Cadena": `${msCad.toFixed(2)} ms`,
    "Ciudad 1-Pasada": `${msUna.toFixed(2)} ms`,
    "Total v0.1": msV01 ? `${msV01.toFixed(2)} ms` : "Omitido (>15s)",
    "Total v1.0": `${msV10.toFixed(2)} ms`
  });
}

console.log("\n=== 2. BENCHMARK DE OPTIMIZACIONES Y VERSIONES (MINI RETOS 6-12) ===");
console.table(tablaBenchmark);

const dias100k = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 600) + 200);
console.log("\n=== 3. VENTANA DESLIZANTE vs BRUTA (100.000 DÍAS, k=7) ===");
console.table([
  {
    Algoritmo: "mejorSemanaBruta O(n*k)",
    Tiempo_ms: Number(medirMs(mejorSemanaBruta, dias100k, 7).toFixed(3))
  },
  {
    Algoritmo: "mejorSemana Ventana O(n)",
    Tiempo_ms: Number(medirMs(mejorSemana, dias100k, 7).toFixed(3))
  }
]);