import { DataType } from '../Three/Type';
import get from 'lodash/get';
import { ObjectId } from 'mongodb'
import toString from 'lodash/toString';
import { Expresion } from '../Instructions/Abstract/Expression';
import PromiseB from 'bluebird'
import set from 'lodash/set'

export default class Nativo extends Expresion {
  valor;

  constructor(tipo, valor, fila, columna) {
    super(null, null, tipo, fila, columna);
    this.valor = valor;
  }

  async exec(ast) {
    return this.execNative(ast);
  }
  
  async interpret(ast) {
    if(this.tipo.getTipo() === DataType.OBJECTID){
      return new ObjectId(this.valor)
    }
  }

  async translate(ast) {
    if(this.tipo.getTipo() === DataType.OBJECTID){
      return this.setObjectId(ast, this.valor);
    }
  }

  async execNative(ast) {
    if(this.tipo.getTipo() === DataType.NUMBER){
      return +this.valor;
    }else if(this.tipo.getTipo() === DataType.BOOLEAN){
      return this.valor;
    }else if(this.tipo.getTipo() === DataType.OBJECTID){
      return this.pipeline ? { $toObjectId: this.valor } : this[ast.getAction()](ast);
    }else if(this.tipo.getTipo() === DataType.IDENTIFICADOR){  
      const key = get(ast.gettablaGlobal(), this.valor) || ast.getFullPath(this.valor) || toString(this.valor)
      return key;
    }else if(this.tipo.getTipo() === DataType.ALIAS){      
      const key = toString(this.valor)
      return this.pipeline ? key : this.clearKey(key);
    }else if([DataType.JSONKEY, DataType.CADENA].includes(this.tipo.getTipo())) {
      return this.valor.toString();
    }else if(this.tipo.getTipo() === DataType.JSONARR){
      const values = []
      await PromiseB.each(this.valor, async (val) => {
        values.push(await val.exec(ast));
      })
      return values;
    }else if(this.tipo.getTipo() === DataType.JSONOBJ){
      const keys = Object.keys(this.valor);
      const obj = {}
      await PromiseB.each(keys, async (k) => {
        set(obj, k, await get(this.valor, k).exec(ast));
      })
      return obj;
    }
  }

  setObjectId(ast, value) {
    const objectIdString = `ObjectId('${value}')`
    ast.addActionAfterInterpretation({action: 'clearCuotes', value: objectIdString})
    return objectIdString;
  }

  clearKey(cadena) {
    if (cadena.charAt(0) === '$') {
      cadena = cadena.substring(1);
    }
    return cadena;
  }

  setConfig(...params) {
    this.setConfiguration(...params);
    return this;
  }

  changeType(newType) {
    this.tipo = newType;
    return this;
  }
}