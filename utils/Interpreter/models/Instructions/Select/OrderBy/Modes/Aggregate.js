import { Instruccion } from "../../../Abstract/Instruction"
import set from "lodash/set"
import get from "lodash/get"
import PromiseB from 'bluebird'
import flat from 'flat'
import { getObjectKeyValues } from "../../utils/arrays.util"
import { transformOrderOption } from "../../utils/transform.util"

export default class OrderByAggregate extends Instruccion {
    
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
        return [await this.aggregate(ast)];
    }    

    async translate(ast) {
        return [await this.aggregate(ast)];
    }

    async aggregate (ast) {        
        return {
            $sort: await transformOrderOption(ast, this.orderParams)
        }
    }    

    setConfig(pipeline) {
        this.pipeline = pipeline
        return this
    }
}