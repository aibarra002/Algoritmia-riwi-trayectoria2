 const { performance } = require("perf_hooks");
const ventasReales = require("./datos");
const catalogo = require("./catalogo");
const { generarVentas } = require("./generador");
const {
  ventasDiarias,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  resumenPorCiudad,
  topProductosPorValor,
  clientesRecurrentesSet,
  comboRegalo,
  productoEstrellaPorCiudad,
  primerClienteUnico,
  mejorSemana,
  parMasCercano
} = require("./analitica");

const argN = Number(process.argv[2]);
const esSimulacion = Number.isInteger(argN) && argN > 0;
const datos = esSimulacion ? generarVentas(argN) : ventasReales;
const fuente = esSimulacion
  ? `Simulación sintética (${argN.toLocaleString("es-CO")} ventas)`
  : `Muestra histórica Día 1 (${ventasReales.length} ventas)`;

const tInicio = performance.now();

const total = totalVendido(datos);
const unidades = unidadesVendidas(datos);
const mayor = ventaMayor(datos);
const ticket = ticketPromedio(datos);
const ciudades = resumenPorCiudad(datos);
const topProductos = topProductosPorValor(datos, 5);
const recurrentes = clientesRecurrentesSet(datos);
const estrellas = productoEstrellaPorCiudad(datos);
const clienteCupon = primerClienteUnico(datos);
const combo87k = comboRegalo(catalogo, 87000);
const sugerenciaCorp = parMasCercano(catalogo, 100000);
const mejorRacha = mejorSemana(ventasDiarias, 7);

const tFin = performance.now();
console.log("  CAFÉ ORIGEN — REPORTE EJECUTIVO DE ANALÍTICA v1.0");
console.log(`  Fuente de datos: ${fuente}`);

console.log("1. INDICADORES GENERALES");
console.table([
  {
    Total_Vendido_COP: total,
    Unidades_Vendidas: unidades,
    Ticket_Promedio_COP: Number(ticket.toFixed(2)),
    ID_Venta_Mayor: mayor ? mayor.id : null,
    Valor_Venta_Mayor_COP: mayor ? mayor.cantidad * mayor.precio : 0
  }
]);

console.log("2. DESEMPEÑO POR CIUDAD");
console.table(ciudades);

console.log("3. TOP PRODUCTOS POR INGRESO");
console.table(topProductos);

console.log("4. PRODUCTO ESTRELLA POR CIUDAD (MAYOR FRECUENCIA)");
console.table(estrellas);

console.log("5. FIDELIZACIÓN DE CLIENTES");
console.table([
  {
    Total_Clientes_Recurrentes: recurrentes.length,
    Muestra_Recurrentes: recurrentes.slice(0, 8).join(", ") || "Ninguno",
    Primer_Cliente_Unico_Cupon: clienteCupon || "Ninguno"
  }
]);

console.log("6. RECOMENDACIONES COMERCIALES Y RENDIMIENTO TEMPORAL");
console.table([
  {
    Estrategia: "Combo Tarjeta Regalo ($87.000)",
    Sugerencia: combo87k
      ? `${combo87k[0].producto} + ${combo87k[1].producto}`
      : "Sin combinación"
  },
  {
    Estrategia: "Par Corporativo Presupuesto ($100.000)",
    Sugerencia: sugerenciaCorp
      ? `${sugerenciaCorp.productos[0].producto} + ${sugerenciaCorp.productos[1].producto} ($${sugerenciaCorp.total})`
      : "Sin combinación"
  },
  {
    Estrategia: "Mejor Semana Septiembre (7 días)",
    Sugerencia: mejorRacha
      ? `Inicia día ${mejorRacha.diaInicio} — Total: $${mejorRacha.total} mil COP`
      : "Datos insuficientes"
  }
]);

console.log(`Tiempo total de ejecución v1.0: ${(tFin - tInicio).toFixed(2)} ms`);