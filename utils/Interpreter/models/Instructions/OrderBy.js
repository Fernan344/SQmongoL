import { Instruccion } from "./Abstract/Instruction"
import set from "lodash/set"
import get from "lodash/get"

export default class OrderBy extends Instruccion {
    
    orderParams;
    pipeline;

    constructor(linea, columna, orderParams) {
        super(linea, columna)
        this.orderParams = orderParams
    }

    async interpretar(ast){            
        if(!this.orderParams || !this.orderParams.length) return []
        if(this.pipeline) return [this.aggregate(ast)];
        return this.normal(ast);
    }    

    aggregate (ast) {        
        return {
            $sort: this.transformOrderOption()
        }
    }

    normal (ast) {
        return JSON.stringify(this.transformOrderOption(), null, 2);
    }

    transformOrderOption() {        
        const orderParams = this.orderParams;
        const orderParamsParsed = {}
        orderParams.forEach((param) => {
          set(orderParamsParsed, get(param, 'key'), get(param, 'value'))
        })
        console.log(orderParamsParsed)
        return orderParamsParsed
        
    }

    setConfig(pipeline) {
        this.pipeline = pipeline
        return this
    }
}