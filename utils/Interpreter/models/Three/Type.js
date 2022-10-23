export default class Type {
    tipo;
  
    constructor(tipo) {      
      this.tipo = tipo;
    }
    getTipo() {
      return this.tipo;
    }
    setTipo(tipo) {
      this.tipo = tipo;
    }
}
  
export const DataType = {
    NUMBER: 0,
    CADENA: 1,
    BOOLEAN: 2,
    IDENTIFICADOR: 3,
    INDEFINIDO: 4
}