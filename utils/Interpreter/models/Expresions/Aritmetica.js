import { Expresion } from '../Instructions/Abstract/Expression';

export default class Aritmetico extends Expresion {

  constructor(tipo, opIzq, opDer, fila, columna) {
    super(opIzq, opDer, tipo, fila, columna);
  }
  
  async exec(ast) {
    return this[ast.getAction()](ast)
  }
  
  async interpret(ast) {            
    return this.execArithmetic(ast);
  }

  async translate(ast) {            
    return this.execArithmetic(ast);
  }

  async execArithmetic(ast) {
    const valueIzq = this.operacionIzq
    const valueDer = this.operacionDer

    const operators = [valueIzq, valueDer]

    if([
      tipoOp.SUMA,
      tipoOp.RESTA,
      tipoOp.MULTIPLICACION,
      tipoOp.DIVISION
    ].includes(this.tipo)) {
      return this.getExprValue(operations[this.tipo], operators, ast);
    }
  }

  setConfig(...params) {
    this.setConfiguration(...params);
    return this;
  }
}

export const tipoOp = {
    SUMA: 0,
    RESTA: 1,
    DIVISION: 2,
    MULTIPLICACION: 3
}

export const operations = {
  [tipoOp.SUMA]: '$add',
  [tipoOp.RESTA]: '$subtract',
  [tipoOp.MULTIPLICACION]: '$multiply',
  [tipoOp.DIVISION]: '$divide'
}