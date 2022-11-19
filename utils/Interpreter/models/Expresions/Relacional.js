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
    if(this.tipo === tipoOp.EQUALS) return {[this.operacionIzq]: { $eq: this.operacionDer.interpretar(arbol) }}        
    else if(this.tipo === tipoOp.GREATERTHAN) return {[this.operacionIzq]: { $gt: this.operacionDer.interpretar(arbol) }}
    else if(this.tipo === tipoOp.LESSTHAN) return {[this.operacionIzq]: { $lt: this.operacionDer.interpretar(arbol) }}
    else if(this.tipo === tipoOp.GREATEREQUALSTHAN) return {[this.operacionIzq]: { $gte: this.operacionDer.interpretar(arbol) }}
    else if(this.tipo === tipoOp.LESSEQUALSTHAN) return {[this.operacionIzq]: { $lte: this.operacionDer.interpretar(arbol) }}
    else if([tipoOp.NOTEQUALSTO, tipoOp.DIFERENTTO].includes(this.tipo)) return {[this.operacionIzq]: { $ne: this.operacionDer.interpretar(arbol) }}
    else if(this.tipo === tipoOp.ISNOTNULL) return {[this.operacionIzq]: { $ne: null }}
    else if(this.tipo === tipoOp.ISNULL) return {[this.operacionIzq]: { $eq: null }}
  }  
}

export const tipoOp = {
    EQUALS: 0,
    LESSTHAN: 1,
    GREATEREQUALSTHAN: 2,
    LESSEQUALSTHAN: 3,
    GREATERTHAN: 4,
    NOTEQUALSTO: 5,
    DIFERENTTO: 6,
    ISNOTNULL: 7,
    ISNULL: 8
}