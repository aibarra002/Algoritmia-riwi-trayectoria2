const ListaEnlazada = require("../src/ListaEnlazada");

function verificar(titulo, lista) {
  console.log("Tamaño:", lista.obtenerTamano());
  console.log("Cabeza:", lista.cabeza ? lista.cabeza.dato.motivo : null);
  console.log("Cola:", lista.cola ? lista.cola.dato.motivo : null);
  console.log("Datos:", lista.arreglo().map((d) => d.motivo));
}

const lista = new ListaEnlazada();


console.log("Eliminar en vacía:", lista.eliminar((a) => a.motivo === "Vacunación"));
verificar("1. Tras intentar eliminar en vacía", lista);

lista.agregarAlFinal({ fecha: "02/02", motivo: "Vacunación", costo: 85000 });
console.log("Eliminado único:", lista.eliminar((a) => a.motivo === "Vacunación"));
verificar("2. Tras eliminar el único nodo", lista);


lista.agregarAlFinal({ fecha: "02/02", motivo: "Vacunación", costo: 85000 });
lista.agregarAlFinal({ fecha: "15/03", motivo: "Control de peso", costo: 40000 });
lista.agregarAlFinal({ fecha: "20/05", motivo: "Limpieza dental", costo: 150000 });

lista.insertarDespuesDe(
  (a) => a.motivo === "Limpieza dental",
  { fecha: "01/06", motivo: "Desparasitación", costo: 35000 }
);
verificar("3. Tras insertar después de la cola", lista);

lista.eliminar((a) => a.motivo === "Vacunación");
verificar("4. Tras eliminar la cabeza", lista);

lista.eliminar((a) => a.motivo === "Desparasitación");
verificar("5. Tras eliminar la cola", lista);

console.log("Eliminar inexistente:", lista.eliminar((a) => a.motivo === "Cirugía"));
verificar("6. Tras intentar eliminar algo que no existe", lista);
