import { Instruccion } from '../Instructions/Abstract/Instruction';
import {DataType} from '../Three/Type';

export default class Logica extends Instruccion {
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

        let valueIzq = this.operacionIzq.interpretar(arbol);
        let valueDer = this.operacionDer.interpretar(arbol);
        
        if(this.tipo===tipoOp.AND){      
            return {
                $and: [
                    valueIzq,
                    valueDer
                ]
            }
        }
    }  
}

export const tipoOp = {
    AND: 0,
    OR: 1
}