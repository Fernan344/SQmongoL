import cloneDeep from 'lodash/cloneDeep'
import { analyzeKey } from '../../utils/join.analytics';
import { get, unary } from 'lodash';
import { Expresion } from '../Instructions/Abstract/Expression';

export default class Relacional extends Expresion {

  constructor(tipo, opIzq, opDer, fila, columna) {
    super(opIzq, opDer, tipo, fila, columna);
  }

  async exec(ast) {
    return this.execRelational(ast);
  }

  async interpret(ast) {
     
  }  

  async translate(ast) {

  }

  async execRelational(ast) {
    const unari = [this.operacionIzq, null];
    const binary = [this.operacionIzq, this.operacionDer]

    if([
      tipoOp.EQUALS,
      tipoOp.GREATERTHAN,
      tipoOp.LESSTHAN,
      tipoOp.GREATEREQUALSTHAN,
      tipoOp.LESSEQUALSTHAN,
      tipoOp.NOTEQUALSTO, 
      tipoOp.DIFERENTTO
    ].includes(this.tipo)) {
      if(!this.pipeline && !this.alReadyExpr) return this.getNormalExprValue(operations[this.tipo], binary, ast)
      else return this.getExprValue(operations[this.tipo], binary, ast)
    } else if ([             
      tipoOp.ISNOTNULL,
      tipoOp.ISNULL
    ].includes(this.tipo)) {
      if(!this.pipeline && !this.alReadyExpr) return this.getNormalExprValue(operations[this.tipo], unari, ast)
      else return this.getExprValue(operations[this.tipo], unari, ast)
    }    
  } 

  async analize(ast) {
    const cloneDer = cloneDeep(this.operacionDer);
    const cloneIzq = cloneDeep(this.operacionIzq);
    const derValue = await cloneDer.exec(ast);
    const izqValue = await cloneIzq.exec(ast);
    const dataIzq = analyzeKey(izqValue, this.foreign)
    const dataDer = analyzeKey(derValue, this.foreign)
    this.operacionIzq.valor = get(dataIzq, 'variable', this.operacionIzq.valor)
    this.operacionDer.valor = get(dataDer, 'variable', this.operacionDer.valor)
    return { let: {...get(dataIzq, 'let', {}), ...get(dataDer, 'let', {})}, local: get(dataIzq, 'local', get(dataDer, 'local')) }
  }

  setConfig(...params) {      
    this.setConfiguration(...params);
    return this;
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

const operations = {
  [tipoOp.EQUALS]: "$eq",
  [tipoOp.LESSTHAN]: "$lt",
  [tipoOp.GREATEREQUALSTHAN]: "$gte",
  [tipoOp.LESSEQUALSTHAN]: "$lte",
  [tipoOp.GREATERTHAN]: "$gt",
  [tipoOp.NOTEQUALSTO]: "$ne",
  [tipoOp.DIFERENTTO]: "$ne",
  [tipoOp.ISNOTNULL]: "$ne",
  [tipoOp.ISNULL]: "$eq"
}