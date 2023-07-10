import get from "lodash/get";
import { Instruccion } from "./Abstract/Instruction";
import { Double } from "mongodb";

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

    async interpretar(ast){        
        const {db} = ast.getSchema();
        const validator = await this.getValidator(db);
        const values = this.registers.map((reg) => {
            let object = {};
            reg.forEach((value, i) => {
                const key = get(this.tableKeys, i)
                object = {
                    ...object,
                    [`${key}`]: this.convertValue(get(validator, key, {}), value.interpretar(ast))
                }
            })
            return object
        })
        const insertValue = JSON.stringify((values.length === 1 ? values[0] : values), null, 2);
        const traductionParts = [`db.getCollection("${this.table}").`,
            `${values.length === 1 ? 'insertOne(' : 'insertMany('}`,
            insertValue,
            `);`
        ]
        ast.addTraduction(traductionParts.join('\n'))
        if(!ast.getMode()) {             
            try {                          
                const collection = db.collection(this.table);
                await collection.insertMany(values);
                ast.actualizaConsola(`${values.length} values inserted into ${this.table}`);
            } catch (e) {
                console.log(e.writeErrors[0].err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details)
                ast.actualizaConsola(`${values.length} values can not be inserted into ${this.table}`);
            }
        }
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