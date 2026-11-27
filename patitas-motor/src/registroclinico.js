const ListaEnlazada = require("./ListaEnlazada");

class RegistroClinico {
  constructor() {
    this.historiales = new Map();
  }

  registrarAtencion(mascota, atencion) {
 
    if (!this.historiales.has(mascota)) {
      this.historiales.set(mascota, new ListaEnlazada());
    }

    this.historiales.get(mascota).agregarAlFinal(atencion);
  }

  obtenerHistorial(mascota) {
    return this.historiales.get(mascota) || null;
  }

  obtenerPacientes() {
    return Array.from(this.historiales.keys());
  }
}

module.exports = RegistroClinico;