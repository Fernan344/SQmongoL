import get from "lodash/get";
import set from 'lodash/set';
import { Instruccion } from "./Abstract/Instruction";
import PromiseB from 'bluebird'

export default class CreateDatabase extends Instruccion {
    
    collectionName;
    parameters;

    constructor(collectionName, parameters, linea, columna) {
        super(linea, columna)
        this.collectionName = collectionName;
        this.parameters = parameters;
    }

    async exec(ast) {
        return this[ast.getAction()](ast)
    } 

    async translate(ast) {
        const {options, indexes, primaryKeys} = await this.execCreateCollection(ast);
        
        ast.addTraduction(`db.createCollection('${this.collectionName}', ${JSON.stringify(options, null, 2)});`)
        
        const createIndex = (key) => [
            `db.getCollection("${this.collectionName}").`,
            `createIndex(`,
            `${JSON.stringify(key)},`,
            `{ unique: true }`
            `)`,
            ``
        ].join('\n')

        indexes.forEach(i => { ast.addTraduction(createIndex({[i]: 1})) });

        const primaryKey = {}
        primaryKeys.forEach(k => { primaryKey[k] = 1 });
        ast.addTraduction(createIndex(primaryKey))
    }

    async interpret(ast) {
        const {options, indexes, primaryKeys} = await this.execCreateCollection(ast);
        
        const {db} = ast.getSchema();
        db.createCollection(this.collectionName, options);
        ast.actualizaConsola(`Collection ${this.collectionName} was created succesfully.`);        
    
        const collection = db.collection(this.collectionName);

        await PromiseB.each(indexes, async (i) => {
            await collection.createIndex({[i]: 1}, {unique: true});
            ast.actualizaConsola(`Unique index ${i} was created`);
        })

        const primaryKey = {}
        primaryKeys.forEach(k => { primaryKey[k] = 1 });

        await collection.createIndex(primaryKey, {unique: true});
        ast.actualizaConsola(`Primary key index ${JSON.stringify(primaryKey)} was created`);
    }

    async execCreateCollection(ast) {
        const requiredFields = []
        const properties = {}
        const indexes = []
        const primaryKeys = []
        await PromiseB.each(this.parameters, async (p) => { 
            set(properties, p.key, p.type) 
            if(get(p, 'options.required')) requiredFields.push(get(p, 'key'))
            if(get(p, 'options.default')) set(properties, p.key, await p.options.default.exec(ast))
            if(get(p, 'options.unique')) indexes.push(p.key)
            if(get(p, 'options.index')) primaryKeys.push(p.key)
        })
        const options = {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: requiredFields,
                    properties: properties
                }
            },
            validationAction: "error",
            validationLevel: "strict"
        }
        return { 
            options,
            indexes,
            primaryKeys
        }
    }
}