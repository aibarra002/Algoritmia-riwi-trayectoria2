function generarVentas(n) {
  const catalogo = [
    { producto: "Origen Huila 500 g", precio: 42000 },
    { producto: "Origen Nariño 250 g", precio: 26000 },
    { producto: "Origen Sierra 500 g", precio: 45000 },
    { producto: "Prensa francesa", precio: 95000 },
    { producto: "Molino manual", precio: 120000 }
  ];

  const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];
  const maxClientes = Math.max(1, Math.floor(n / 3));
  const ventasGeneradas = [];

  for (let i = 1; i <= n; i++) {
    const item = catalogo[Math.floor(Math.random() * catalogo.length)];

    const ciudadElegida = ciudades[Math.floor(Math.random() * ciudades.length)];

    const numCliente = Math.floor(Math.random() * maxClientes) + 1;

    const codigoCliente = numCliente < 10 ? `C0${numCliente}` : `C${numCliente}`;

    const cantidad = Math.floor(Math.random() * 5) + 1;

    const dia = ((i - 1) % 30) + 1;

    const diaTexto = dia < 10 ? `0${dia}` : `${dia}`;

    ventasGeneradas.push({

      id: i,

      fecha: `2026-09-${diaTexto}`,

      cliente: codigoCliente,

      producto: item.producto,

      ciudad: ciudadElegida,

      cantidad: cantidad,
      
      precio: itemElegido.precio
    });
  }

  return ventasGeneradas;
}

module.exports = { generarVentas };