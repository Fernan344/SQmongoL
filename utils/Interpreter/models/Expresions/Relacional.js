import { Instruccion } from '../Instructions/Abstract/Instruction';
import cloneDeep from 'lodash/cloneDeep'
import { analyzeKey } from '../../utils/join.analytics';
import { get } from 'lodash';

export default class Relacional extends Instruccion {
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
    const valueIzq = this.operacionIzq.setConfig(this.pipeline).interpretar(arbol)
    const valueDer = this.operacionDer?.setConfig(this.pipeline).interpretar(arbol)
    if(this.tipo === tipoOp.EQUALS) 
      if(!this.pipeline) return {[valueIzq]: { $eq: valueDer }}
      else return { $eq: [valueIzq, valueDer ] }      
    else if(this.tipo === tipoOp.GREATERTHAN) 
      if(!this.pipeline) return {[valueIzq]: { $gt: valueDer }}
      else return { $gt: [valueIzq, valueDer ] }   
    else if(this.tipo === tipoOp.LESSTHAN) 
      if(!this.pipeline) return {[valueIzq]: { $lt: valueDer }}
      else return { $lt: [valueIzq, valueDer ] }   
    else if(this.tipo === tipoOp.GREATEREQUALSTHAN) 
      if(!this.pipeline) return {[valueIzq]: { $gte: valueDer }}
      else return { $gte: [valueIzq, valueDer ] }   
    else if(this.tipo === tipoOp.LESSEQUALSTHAN) 
      if(!this.pipeline) return {[valueIzq]: { $lte: valueDer }}
      else return { $lte: [valueIzq, valueDer ] }   
    else if([tipoOp.NOTEQUALSTO, tipoOp.DIFERENTTO].includes(this.tipo)) 
      if(!this.pipeline) return {[valueIzq]: { $ne: valueDer }}
      else return { $ne: [valueIzq, valueDer ] }  
    else if(this.tipo === tipoOp.ISNOTNULL) 
      if(!this.pipeline) return {[valueIzq]: { $ne: null }}
      else return { $ne: [valueIzq, null ] } 
    else if(this.tipo === tipoOp.ISNULL)
      if(!this.pipeline) return {[valueIzq]: { $eq: null }}
      else return { $eq: [valueIzq, null ] } 
  }  

  analizar(arbol) {
    const cloneDer = cloneDeep(this.operacionDer);
    const cloneIzq = cloneDeep(this.operacionIzq);
    const derValue = cloneDer.interpretar(arbol);
    const izqValue = cloneIzq.interpretar(arbol);
    const dataIzq = analyzeKey(izqValue, this.foreign)
    const dataDer = analyzeKey(derValue, this.foreign)
    this.operacionIzq.valor = get(dataIzq, 'variable', this.operacionIzq.valor)
    this.operacionDer.valor = get(dataDer, 'variable', this.operacionDer.valor)
    return { let: {...get(dataIzq, 'let', {}), ...get(dataDer, 'let', {})}, local: get(dataIzq, 'local', get(dataDer, 'local')) }
  }

  setConfig(pipeline, foreign) {
    this.pipeline = pipeline
    this.foreign = foreign;
    return this
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