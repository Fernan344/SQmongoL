import { Instruccion } from "./Abstract/Instruction"
import get from 'lodash/get'

export default class Join extends Instruccion {
    
    table;
    alias;
    operation;
    let;
    principal;
    internalLookup;

    constructor(linea, columna, from, alias, on) {
        super(linea, columna)
        this.table = from,
        this.alias = alias,
        this.operation = on;
        this.internalLookup = []
    }

    interpretar(ast){
        const extraLookup = this.internalLookup && this.internalLookup.length ? this.internalLookup : []
        const aggregate = 
        [
            {
                $lookup: {
                    from: this.table,
                    as: this.alias || this.table,
                    let: this.let,
                    pipeline: [
                        {
                            $match:
                            {
                                $expr: this.operation.interpretar(ast)
                            }
                        },
                        ...extraLookup
                    ]
                }
            },    
            {
                $unwind: `$${this.alias || this.table}`
            }
        ]        
        return aggregate;
    }

    prepare(ast) {
        const opData = this.operation.setConfig(true, this.alias || this.table).analizar(ast)
        this.let = get(opData, 'let', {})
        this.principal = get(opData, 'local', '')
        return this
    }
}