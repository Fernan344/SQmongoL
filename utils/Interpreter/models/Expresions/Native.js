import { Instruccion } from '../Instructions/Abstract/Instruction';
import { DataType } from '../Three/Type';
import get from 'lodash/get'
import toString from 'lodash/toString'

export default class Nativo extends Instruccion {
  valor;
  tipo;
  pipeline;  

  constructor(tipo, valor, fila, columna) {
    super(fila, columna);
    this.valor = valor;
    this.tipo = tipo;
  }

  interpretar(arbol) {
    if(this.tipo.getTipo() === DataType.NUMBER){
        return +this.valor;
    }else if(this.tipo.getTipo() === DataType.JSONKEY){
      const key = get(arbol.gettablaGlobal(), this.valor) || toString(this.valor)
      return this.pipeline ? key : this.clearKey(key);
    }else if(this.tipo.getTipo() === DataType.BOOLEAN){
      return this.valor;
    }else if(this.tipo.getTipo() === DataType.OBJECTID){
      return this.pipeline ? {$toObjectId: this.valor} : this.setObjectId(this.valor);
    }
  }

  setObjectId(ast, value) {
    const objectIdString = `ObjectId("${value}")`
    ast.addActionAfterInterpretation({action: 'clearCuotes', value: objectIdString})
    return objectIdString;
  }

  setConfig(pipeline) {
    this.pipeline = pipeline
    return this
  }

  clearKey(cadena) {
    // Verificar si la cadena comienza con $
    if (cadena.charAt(0) === '$') {
      // Eliminar el primer caracter ($)
      cadena = cadena.substring(1);
    }
    return cadena;
  }
}