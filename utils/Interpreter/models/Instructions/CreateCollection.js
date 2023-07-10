import get from "lodash/get";
import set from 'lodash/set';
import { Instruccion } from "./Abstract/Instruction";

export default class CreateDatabase extends Instruccion {
    
    collectionName;
    parameters;

    constructor(collectionName, parameters, linea, columna) {
        super(linea, columna)
        this.collectionName = collectionName;
        this.parameters = parameters;
    }

    async interpretar(ast){
        const requiredFields = []
        this.parameters.forEach(p => { get(p, 'options.required') && requiredFields.push(get(p, 'key')) })
        const properties = {}
        this.parameters.forEach(p => { set(properties, p.key, p.type) })
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
        ast.addTraduction(`db.createCollection('${this.collectionName}', ${JSON.stringify(options, null, 2)});`)
        if(!ast.getMode()) { 
            const {db} = ast.getSchema();
            db.createCollection(this.collectionName, options);
            ast.actualizaConsola(`Collection ${this.collectionName} was created succesfully.`);
        }
    }
}