import { Instruccion } from '../Instructions/Abstract/Instruction';

export default class Aritmetico extends Instruccion {
  operacionIzq;
  operacionDer;
  tipo;
  

  constructor(tipo, opIzq, opDer, fila, columna) {
    super(fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;
  }

  interpretar(arbol) {
            
        return null;
  }
}

export const tipoOp = {
    SUMA: 0,
    RESTA: 1,
    DIVISION: 2,
    MULTIPLICACION: 3
}