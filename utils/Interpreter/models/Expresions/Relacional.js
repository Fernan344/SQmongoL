import { Instruccion } from '../Instructions/Abstract/Instruction';

export default class Relacional extends Instruccion {
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
        return {[this.operacionIzq]: this.operacionDer.interpretar(arbol)}        
    }  
}

export const tipoOp = {
    MAYOR: 0,
    MENOR: 1,
    MAYOR_IGUAL: 2,
    MENOR_IGUAL: 3,
    EQUALS: 4
}