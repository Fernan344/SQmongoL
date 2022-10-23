import { Instruccion } from '../Instructions/Abstract/Instruction';
import { DataType } from '../Three/Type';

export default class Nativo extends Instruccion {
  valor;
  tipo;

  constructor(tipo, valor, fila, columna) {
    super(fila, columna);
    this.valor = valor;
    this.tipo = tipo;
  }

  interpretar(arbol) {
    if(this.tipo.getTipo() === DataType.NUMBER){
        return +this.valor;
    }else if(this.tipo.getTipo() === DataType.CADENA){
        return this.valor.toString();
    }else if(this.tipo.getTipo() === DataType.BOOLEAN){
      return this.valor;
    } 
  }
}