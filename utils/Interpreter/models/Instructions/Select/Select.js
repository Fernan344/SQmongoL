import has from "lodash/has";
import { Instruccion } from "../Abstract/Instruction"
import SelectAggregate from "./Modes/Aggregate";
import SelectNormal from "./Modes/Normal";
import omit from "lodash/omit";

export default class Select extends Instruccion {
    
    selectParams;
    tableName;
    queryOptions;

    constructor(linea, columna, selectParams, tableName) {
        super(linea, columna)
        this.selectParams = selectParams
        this.tableName = tableName
        this.queryOptions = {}
    }

    async exec(ast) {
      return this[ast.getAction()](ast)
    }

    async interpret(ast){
      await this.execSelect(ast);
    }

    async translate(ast){
      await this.execSelect(ast);
    }

    async execSelect(ast) {
      this.tableName = await this.tableName.exec(ast);
      const SelectClass = this.isAggregate() ? SelectAggregate : SelectNormal;
      const instance = new SelectClass(this.linea, this.columna, this.selectParams, this.tableName, omit(this.queryOptions, ['isAggregate']))
      await instance.exec(ast)
    }

    isAggregate() {
      return has(this.queryOptions, 'isAggregate') && this.queryOptions.isAggregate
    }

    setOptions(options){
      this.queryOptions = options
    }
}

export const SelectType = {
    ALL: "*"
}