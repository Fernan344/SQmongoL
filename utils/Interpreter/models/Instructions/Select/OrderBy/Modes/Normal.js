import { Instruccion } from "../../../Abstract/Instruction"
import set from "lodash/set"
import get from "lodash/get"
import PromiseB from 'bluebird'
import { transformOrderOption } from "../../utils/transform.util";

export default class OrderByNormal extends Instruccion {
    
    orderParams;
    pipeline;

    constructor(linea, columna, orderParams) {
        super(linea, columna)
        this.orderParams = orderParams
    }

    async exec(ast) {
        return this[ast.getAction()](ast)
    }

    async interpret(ast){            
        return this.normal(ast);
    }    

    async translate(ast){ 
        return this.normal(ast);
    }

    async normal (ast) {
        return transformOrderOption(ast, this.orderParams);
    }

    setConfig(pipeline) {
        this.pipeline = pipeline
        return this
    }
}