import get from "lodash/get";
import { Instruccion } from "./Abstract/Instruction";
import { Double } from "mongodb";
import PromiseB from 'bluebird';
import flat from 'flat'

export default class InsertInto extends Instruccion {
    
    table;
    tableKeys;
    registers;

    constructor(table, tableKeys, registers, linea, columna) {
        super(linea, columna)
        this.table = table;
        this.tableKeys = tableKeys;
        this.registers = registers;
    }

    async exec(ast) {
        return this[ast.getAction()](ast)
    }

    async translate(ast) {
        const {values} = await this.execInsertInto(ast)
        const insertValue = JSON.stringify((values.length === 1 ? values[0] : values), null, 2);
        const traductionParts = [`db.getCollection("${await this.table.exec(ast)}").`,
            `${values.length === 1 ? 'insertOne(' : 'insertMany('}`,
            insertValue,
            `);`
        ]
        ast.addTraduction(traductionParts.join('\n'))
    }

    async interpret(ast){        
        const {values} = await this.execInsertInto(ast)                        
        try {                          
            const collection = db.collection(this.table);
            await collection.insertMany(values);
            ast.actualizaConsola(`${values.length} values inserted into ${this.table}`);
        } catch (e) {
            console.log(e.writeErrors[0].err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details)
            ast.actualizaConsola(`${values.length} values can not be inserted into ${this.table}`);
        }
    }

    async execInsertInto(ast) {
        const {db} = ast.getSchema();
        const validator = await this.getValidator(db);
        if(!this.tableKeys) {
            const registersExecuted = await this.registers.exec(ast);
            const values = await PromiseB.map(registersExecuted, async (reg) => {
                let object = {};
                const keys = Object.keys(flat(reg));
                await PromiseB.each(keys, async (key) => {                    
                    object = {
                        ...object,
                        [`${key}`]: this.convertValue(get(validator, key, {}), get(reg, key))
                    }
                })
                return flat.unflatten(object)
            })
            return {values}
        }

        const values = await PromiseB.map(this.registers, async (reg) => {
            let object = {};
            await PromiseB.each(reg, async (value, i) => {
                const key = await get(this.tableKeys, i).exec(ast)
                object = {
                    ...object,
                    [`${key}`]: this.convertValue(get(validator, key, {}), await value.exec(ast))
                }
            })
            return object
        })
        return {values}
    }

    convertValue(options, value) {
        if(get(options, 'bsonType') === 'date') return new Date(value);
        if(get(options, 'bsonType') === 'double') return new Double(value);
        return value
    }

    async getValidator(db) {        
        const filter = { name: { $regex: `^${this.table}$` } };
        if(!db) return {};
        const listCollections = await db.listCollections(filter);   
        const listCollectionArray = listCollections ? await listCollections.toArray() : [];
        const properties = get(listCollectionArray, '0.options.validator.$jsonSchema.properties', {})          
        return properties
    }
}