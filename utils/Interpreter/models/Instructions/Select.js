import { Instruccion } from "./Abstract/Instruction"

export default class Select extends Instruccion {
    
    selectParams;
    tableName;
    whereParams;

    constructor(linea, columna, selectParams, tableName) {
        super(linea, columna)
        this.selectParams = selectParams
        this.tableName = tableName
    }

    interpretar(ast){
      console.log(this.selectParams)
    }
}

export const SelectType = {
    ALL: "*"
}