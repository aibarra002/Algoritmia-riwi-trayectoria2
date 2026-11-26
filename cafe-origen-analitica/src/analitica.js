
const ventas = require("./datos");
const ventasDiarias = [
  320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
  480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
  710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];


function primeraVenta(ventas) {
  return ventas[0];
}

function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
    }
  }
  return total;
}

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      unidades += venta.cantidad;
    }
  }
  return unidades;
}

function ventaMayor(ventas) {
  let mayor = null;
  let maxValor = -1;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      const valorActual = valorVenta(venta);
      if (valorActual > maxValor) {
        maxValor = valorActual;
        mayor = venta;
      }
    }
  }
  return mayor;
}
/*console.table([primeraVenta(ventas)]);
console.table([valorVenta(ventas[0]), valorVenta(ventas[7])]);*/
console.
