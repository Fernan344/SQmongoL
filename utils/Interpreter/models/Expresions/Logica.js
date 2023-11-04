import { get } from 'lodash';
import { Expresion } from '../Instructions/Abstract/Expression';

export default class Logica extends Expresion { 

    constructor(tipo, opIzq, opDer, fila, columna) {
        super(opIzq, opDer, tipo, fila, columna);
    }

    async exec(ast) {
        return this.execLogic(ast)
    }

    async interpret(ast) {

             
    }  

    async translate(ast) {

    }

    async execLogic(ast) {
        const unari = [this.operacionIzq];
        const binary = [this.operacionIzq, this.operacionDer]
        
        if(this.tipo===tipoOp.AND){      
            return this.getExprValue("$and", binary, ast)
        }else if(this.tipo===tipoOp.NOT){      
            return this.getExprValue("$not", unari, ast)
        }else if(this.tipo===tipoOp.OR){      
            return this.getExprValue("$or", binary, ast)
        }   
    }

    async analize(ast) {
        const dataIzq = await this.operacionIzq.setConfig(true, this.foreign, this.alReadyExpr).analize(ast);
        const dataDer = await this.operacionDer.setConfig(true, this.foreign, this.alReadyExpr).analize(ast);
        return { let: {...get(dataIzq, 'let', {}), ...get(dataDer, 'let')}, local: get(dataIzq, 'local', get(dataDer, 'local')) }
    }    

    setConfig(...params) {      
        this.setConfiguration(...params);
        return this;
    }
}

export const tipoOp = {
    AND: 0,
    OR: 1,
    NOT: 2
}