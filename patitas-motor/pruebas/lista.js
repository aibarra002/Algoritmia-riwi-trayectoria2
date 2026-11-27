const ListaEnlazada = require("../src/listaEnlazada");

function verificarEstado( lista) {
  console.log("Tamaño:", lista.obtenerTamano());
  console.log("Cabeza:", lista.cabeza ? lista.cabeza.dato.motivo : null);
  console.log("Cola:", lista.cola ? lista.cola.dato.motivo : null);
  console.log("Lista:", lista.arreglo().map((a) => a.motivo));
}
const historial1 = new ListaEnlazada();
historial1.agregarfinal({ fecha: "02/02", motivo: "Vacunación", costo: 85000 });
verificarEstado("Final en lista vacía", historial1);

historial1.agregarfinal({ fecha: "15/03", motivo: "Control de peso", costo: 40000 });
verificarEstado("Final con 1 nodo", historial1);


historial1.agregarfinal({ fecha: "20/05", motivo: "Limpieza dental", costo: 150000 });
verificarEstado("Final con varios nodos", historial1);

const historial2 = new ListaEnlazada();

historial2.agregarinicio({ fecha: "20/05", motivo: "Limpieza dental", costo: 150000 });
verificarEstado("Inicio en lista vacía", historial2);

historial2.agregarinicio({ fecha: "15/03", motivo: "Control de peso", costo: 40000 });
verificarEstado("Inicio con 1 nodo", historial2);

historial2.agregarinicio({ fecha: "02/02", motivo: "Vacunación", costo: 85000 });
verificarEstado("Inicio con varios nodos", historial2);

let total = 0;
historial1.recorrer((atencion) => {
  total += atencion.costo;
});
console.log("\nCosto total calculado con recorrer(): $" + total);