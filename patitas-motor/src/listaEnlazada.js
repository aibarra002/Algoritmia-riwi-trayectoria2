 const nodo = require("../src/nodo");

class ListaEnlazada {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.tamano = 0;
  }

  agregarfinal(dato) {
    const nuevo = new nodo(dato);

    if (this.estaVacia()) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      this.cola.siguiente = nuevo;
      this.cola = nuevo;
    }

    this.tamano++;
  }
  agregarinicio(dato) {
    const nuevo = new nodo(dato);

    if (this.estaVacia()) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      nuevo.siguiente = this.cabeza;
      this.cabeza = nuevo;
    }

    this.tamano++;
  }

  recorrer(callback) {
    let actual = this.cabeza;
    while (actual !== null) {
      callback(actual.dato);
      actual = actual.siguiente;
    }
  }
  arreglo() {
    const resultado = [];
    this.recorrer((dato) => {
      resultado.push(dato);
    });
    return resultado;
  }

  estaVacia() {
    return this.tamano === 0;
  }

  obtenerTamanio() {
    return this.tamano;
  }
}

module.exports = ListaEnlazada;