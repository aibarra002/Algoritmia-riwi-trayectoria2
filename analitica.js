
const ventasDiarias = [
  320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
  480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
  710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];


function primeraVenta(ventas) {
  if (!ventas || ventas.length === 0) return null;
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

function ticketPromedio(ventas) {
  let total = 0;
  let ventasValidas = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
      ventasValidas += 1;
    }
  }
  if (ventasValidas === 0) return 0;
  return total / ventasValidas;
}



function totalCiudadCadena(ventas, ciudad) {
  const ciudadBuscada = ciudad.trim().toLowerCase();
  return ventas
    .map((v) => ({ ...v, ciudadNorm: v.ciudad.trim().toLowerCase() }))
    .filter((v) => v.cantidad > 0 && v.ciudadNorm === ciudadBuscada)
    .map((v) => v.cantidad * v.precio)
    .reduce((acum, val) => acum + val, 0);
}

function totalCiudadUnaPasada(ventas, ciudad) {
  let totalCiudad = 0;
  const ciudadBuscada = ciudad.trim().toLowerCase();
  for (const venta of ventas) {
    const ciudadRegistro = venta.ciudad.trim().toLowerCase();
    if (venta.cantidad > 0 && ciudadRegistro === ciudadBuscada) {
      totalCiudad += valorVenta(venta);
    }
  }
  return totalCiudad;
}

function resumenPorCiudad(ventas) {
  const ciudadesMap = new Map();
  for (const venta of ventas) {
    if (venta.cantidad <= 0) continue;
    const clave = venta.ciudad.trim().toLowerCase();
    if (!ciudadesMap.has(clave)) {
      const nombreLimpio = clave.charAt(0).toUpperCase() + clave.slice(1);
      ciudadesMap.set(clave, {
        Ciudad: nombreLimpio,
        Transacciones: 0,
        Unidades: 0,
        Total_COP: 0
      });
    }
    const registro = ciudadesMap.get(clave);
    registro.Transacciones += 1;
    registro.Unidades += venta.cantidad;
    registro.Total_COP += valorVenta(venta);
  }
  return Array.from(ciudadesMap.values());
}

function topProductosPorValor(ventas, limite = 5) {
  const productosMap = new Map();
  for (const venta of ventas) {
    if (venta.cantidad <= 0) continue;
    if (!productosMap.has(venta.producto)) {
      productosMap.set(venta.producto, {
        Producto: venta.producto,
        Unidades: 0,
        Ingresos_COP: 0
      });
    }
    const prod = productosMap.get(venta.producto);
    prod.Unidades += venta.cantidad;
    prod.Ingresos_COP += valorVenta(venta);
  }
  return Array.from(productosMap.values())
    .sort((a, b) => b.Ingresos_COP - a.Ingresos_COP)
    .slice(0, limite);
}
function clientesRecurrentesBruta(ventas) {
  const recurrentes = [];
  for (let i = 0; i < ventas.length; i++) {
    if (ventas[i].cantidad <= 0) continue;
    let conteo = 0;
    for (let j = 0; j < ventas.length; j++) {
      if (ventas[j].cantidad > 0 && ventas[j].cliente === ventas[i].cliente) {
        conteo++;
      }
    }
    if (conteo > 1) {
      let existe = false;
      for (let k = 0; k < recurrentes.length; k++) {
        if (recurrentes[k] === ventas[i].cliente) {
          existe = true;
          break;
        }
      }
      if (!existe) recurrentes.push(ventas[i].cliente);
    }
  }
  return recurrentes;
}
function clientesRecurrentesSet(ventas) {
  const vistos = new Set();
  const recurrentes = new Set();
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      if (vistos.has(venta.cliente)) {
        recurrentes.add(venta.cliente);
      } else {
        vistos.add(venta.cliente);
      }
    }
  }
  return Array.from(recurrentes);
}
function comprasPorCliente(ventas) {
  const conteo = new Map();
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      conteo.set(venta.cliente, (conteo.get(venta.cliente) || 0) + 1);
    }
  }
  return conteo;
}

function clientesRecurrentesMap(ventas) {
  const conteo = comprasPorCliente(ventas);
  const recurrentes = [];
  for (const [cliente, totalCompras] of conteo) {
    if (totalCompras > 1) {
      recurrentes.push(cliente);
    }
  }
  return recurrentes;
}

function comboRegaloBruta(catalogo, valor) {
  for (let i = 0; i < catalogo.length; i++) {
    for (let j = i + 1; j < catalogo.length; j++) {
      if (catalogo[i].precio + catalogo[j].precio === valor) {
        return [catalogo[i], catalogo[j]];
      }
    }
  }
  return null;
}
function comboRegalo(catalogo, valor) {
  const vistos = new Map();
  for (const item of catalogo) {
    const complemento = valor - item.precio;
    if (vistos.has(complemento)) {
      return [vistos.get(complemento), item];
    }
    if (!vistos.has(item.precio)) {
      vistos.set(item.precio, item);
    }
  }
  return null;
}

function productoEstrellaPorCiudad(ventas) {
  const ciudadesMap = new Map();
  for (const venta of ventas) {
    if (venta.cantidad <= 0) continue;
    const claveCiudad = venta.ciudad.trim().toLowerCase();
    if (!ciudadesMap.has(claveCiudad)) {
      const nombreLimpio = claveCiudad.charAt(0).toUpperCase() + claveCiudad.slice(1);
      ciudadesMap.set(claveCiudad, { ciudad: nombreLimpio, conteos: new Map() });
    }
    const datosCiudad = ciudadesMap.get(claveCiudad);
    datosCiudad.conteos.set(
      venta.producto,
      (datosCiudad.conteos.get(venta.producto) || 0) + 1
    );
  }

  const resultado = [];
  for (const [, datosCiudad] of ciudadesMap) {
    let productoEstrella = null;
    let maxApariciones = 0;
    for (const [producto, apariciones] of datosCiudad.conteos) {
      if (apariciones > maxApariciones) {
        maxApariciones = apariciones;
        productoEstrella = producto;
      }
    }
    resultado.push({
      Ciudad: datosCiudad.ciudad,
      Producto_Estrella: productoEstrella,
      Ventas_Registradas: maxApariciones
    });
  }
  return resultado;
}

function primerClienteUnico(ventas) {
  const frecuencias = comprasPorCliente(ventas);
  for (const venta of ventas) {
    if (venta.cantidad > 0 && frecuencias.get(venta.cliente) === 1) {
      return venta.cliente;
    }
  }
  return null;
}

function mejorSemanaBruta(dias, a = 7) {
  if (!dias || dias.length < k || k <= 0) return null;
  let maxTotal = -Infinity;
  let diaInicio = 1;
  for (let i = 0; i <= dias.length - a; i++) {
    let sumaActual = 0;
    for (let j = 0; j < a; j++) {
      sumaActual += dias[i + j];
    }
    if (sumaActual > maxTotal) {
      maxTotal = sumaActual;
      diaInicio = i + 1;
    }
  }
  return { diaInicio, total: maxTotal };
}

function mejorSemana(dias, k = 7) {
  if (!dias || dias.length < k || k <= 0) return null;
  let sumaVentana = 0;
  for (let i = 0; i < k; i++) {
    sumaVentana += dias[i];
  }
  let maxTotal = sumaVentana;
  let diaInicio = 1;

  for (let i = k; i < dias.length; i++) {
    sumaVentana = sumaVentana + dias[i] - dias[i - k];
    if (sumaVentana > maxTotal) {
      maxTotal = sumaVentana;
      diaInicio = i - k + 2;
    }
  }
  return { diaInicio, total: maxTotal };
}
function parMasCercano(catalogo, presupuesto) {
  if (!catalogo || catalogo.length < 2) return null;
  const ordenados = [...catalogo].sort((a, b) => a.precio - b.precio);
  let izquierda = 0;
  let derecha = ordenados.length - 1;
  let mejorSuma = -1;
  let mejorPar = null;

  while (izquierda < derecha) {
    const sumaActual = ordenados[izquierda].precio + ordenados[derecha].precio;
    if (sumaActual <= presupuesto) {
      if (sumaActual > mejorSuma) {
        mejorSuma = sumaActual;
        mejorPar = [ordenados[izquierda], ordenados[derecha]];
      }
      izquierda++;
    } else {
      derecha--;
    }
  }
  return mejorPar ? { productos: mejorPar, total: mejorSuma } : null;
}

module.exports = {
  ventasDiarias,
  primeraVenta,
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad: totalCiudadUnaPasada,
  totalCiudadCadena,
  totalCiudadUnaPasada,
  resumenPorCiudad,
  topProductosPorValor,
  clientesRecurrentesBruta,
  clientesRecurrentesSet,
  comprasPorCliente,
  clientesRecurrentesMap,
  comboRegaloBruta,
  comboRegalo,
  productoEstrellaPorCiudad,
  primerClienteUnico,
  mejorSemanaBruta,
  mejorSemana,
  parMasCercano
};