import { get } from 'lodash';
import { Instruccion } from '../Instructions/Abstract/Instruction';

export default class Logica extends Instruccion {
  operacionIzq;
  operacionDer;
  tipo;
  pipeline;
  foreign;
  local;
  

  constructor(tipo, opIzq, opDer, fila, columna) {
    super(fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;
    this.pipeline = false;
    this.foreign = undefined;
    this.local = undefined;
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
        }else if(this.tipo===tipoOp.NOT){      
            return {
                $not: [
                    valueIzq
                ]
            }
        }else if(this.tipo===tipoOp.OR){      
            return {
                $or: [
                    valueIzq,
                    valueDer
                ]
            }
        }        
    }  

    analizar(ast) {
        const dataIzq = this.operacionIzq.setConfig(true, this.foreign).analizar(ast);
        const dataDer = this.operacionDer.setConfig(true, this.foreign).analizar(ast);
        return { let: {...get(dataIzq, 'let', {}), ...get(dataDer, 'let')}, local: get(dataIzq, 'local', get(dataDer, 'local')) }
    }

    setConfig(pipeline, foreign) {
        this.pipeline = pipeline
        this.foreign = foreign;
        return this
    }
}

export const tipoOp = {
    AND: 0,
    OR: 1,
    NOT: 2
}