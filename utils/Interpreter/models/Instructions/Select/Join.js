import { Instruccion } from "../Abstract/Instruction"
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

    async exec(ast) {
        return this[ast.getAction()](ast)
    }

    async interpret(ast){
        return this.getJoinData(ast);
    }

    async translate(ast) {
        return this.getJoinData(ast);
    }

    async getJoinData(ast) {
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
                            $match: await this.operation.exec(ast)
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

    async prepare(ast) {
        this.alias = this.alias ? await this.alias.exec(ast) : undefined;
        this.table = this.table ? await this.table.exec(ast) : undefined;
        const opData = await this.operation.setConfig(true, this.alias || this.table, false).analize(ast)
        this.let = get(opData, 'let', {})
        this.principal = get(opData, 'local', '')
        return this
    }
}