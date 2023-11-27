import { Instruccion } from "../../Abstract/Instruction"
import OrderByNormal from "./Modes/Normal";
import OrderByAggregate from "./Modes/Aggregate";
import PromiseB from "bluebird"

export default class OrderBy extends Instruccion {
    
    orderParams;
    pipeline;

    constructor(linea, columna, orderParams) {
        super(linea, columna)
        this.orderParams = orderParams
    }

    async exec(ast) {
        return this[ast.getAction()](ast)
    }

    async interpret(ast) {            
        return this.execOrderBy(ast)
    }    

    async translate(ast) {
        return this.execOrderBy(ast)
    }

    async execOrderBy(ast) {
        if(!this.orderParams || !this.orderParams.length) return []
        if(this.pipeline) return (new OrderByAggregate(this.linea, this.columna, this.orderParams)).exec(ast)
        return (new OrderByNormal(this.linea, this.columna, this.orderParams)).exec(ast)
    }

    setConfig(pipeline) {
        this.pipeline = pipeline
        return this
    }
}