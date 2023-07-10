import { Instruccion } from "./Abstract/Instruction";

export default class CreateDatabase extends Instruccion {
    
    name;

    constructor(linea, columna, name) {
        super(linea, columna)
        this.name = name;
    }

    async interpretar(ast){
        const queryParts = [`use ${this.name};\n`]
        ast.addTraduction(queryParts.join('.'))
        if(!ast.getMode()) { 
            const {connection} = ast.getSchema();
            try {
                const newdb = await connection.db(this.name);
                ast.setSchemaProp({db: newdb});
                ast.actualizaConsola(`Database ${this.name} switched successfully.`);
            } catch (e) {
                ast.actualizaConsola(`Database ${this.name} can not be switched.`);
            }
        }
    }
}