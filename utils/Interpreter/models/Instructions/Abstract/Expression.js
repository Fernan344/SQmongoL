import { convertAlreadyPipelineExpr, convertNormalExpr, convertPipelineExpr } from "../../Expresions/utils/expr.util";
import { Instruccion } from "./Instruction";
import PromiseB from 'bluebird'

export class Expresion extends Instruccion {
    operacionIzq;
    operacionDer;
    tipo;

    pipeline = false;
    foreign;
    alReadyExpr = false;
  
    constructor(opI, opD, type, linea, columna) {
        super(linea, columna)
        this.operacionIzq = opI;
        this.operacionDer = opD;
        this.tipo = type;
    }

    async mapValues(ops, ast) {
        const values = []
        await PromiseB.each(ops, async (o) => {
            if(o) values.push(await o.setConfig(this.pipeline, this.foreign, this.alReadyExpr).exec(ast));
            else values.push(null);
        }) 
        return values;
    }

    async getExprValue(op, ops, ast) {        

        if(!this.alReadyExpr) {
            this.alReadyExpr = true;     
            const values = await this.mapValues(ops, ast);       
            return convertPipelineExpr(op, values)
        }

        const values = await this.mapValues(ops, ast); 
        return convertAlreadyPipelineExpr(op, values)
    }

    async getNormalExprValue(op, ops, ast) {
        const values = await this.mapValues(ops, ast);
        return convertNormalExpr(op, values)
    }

    setConfiguration(pipeline, foreign, alReadyExpr = false) {
        this.pipeline = pipeline;
        this.foreign = foreign;
        this.alReadyExpr = alReadyExpr;
    }
}