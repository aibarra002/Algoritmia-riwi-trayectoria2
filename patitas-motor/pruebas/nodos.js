const nodo= require("../src/nodo")

const nodo1=new nodo({
    fecha:"02/02/26",
    motivo:"vacunacion",
    veterinario:"dra.rios",
    costo:85000,
})
const nodo2=new nodo({
    fecha:"15/03/26",
    motivo:"control de peso",
    veterinario:"dr.gomez",
    costo:40000,
})

const nodo3=new nodo({
    fecha:"20/05/26",
    motivo:"limpieza dental",
    veterinario:"dra.rios",
    costo:150000,
})
nodo1.siguiente =nodo2;
nodo2.siguiente =nodo3;
const cabeza =nodo1;
let actual = cabeza;
console.log("Historial clínico de Lola:");

while (actual !== null) {
  console.log(actual.dato);
  actual = actual.siguiente;
}
actual = cabeza;
let costoTotal = 0;

while (actual !== null) {
  costoTotal = costoTotal + actual.dato.costo;
  actual = actual.siguiente;
}

console.log("Costo total: $" + costoTotal);
