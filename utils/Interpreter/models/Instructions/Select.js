import { Instruccion } from "./Abstract/Instruction"
import set from "lodash/set"
import get from "lodash/get"

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

    interpretar(ast){
      const projectParams = this.selectParams === SelectType.ALL ? "{}" : this.transformSelectParams();
      const queryParts = [`db.getCollection("${this.tableName}")\n`]
      if(get(this.queryOptions, 'where')) queryParts.push(`find(${JSON.stringify(get(this.queryOptions, 'where').interpretar(ast))})\n`)
      else queryParts.push(`find({})\n`)
      queryParts.push(`projection(${projectParams})\n`)
      if(get(this.queryOptions, 'orderBy')) queryParts.push(`sort(${this.transformOrderOption(get(this.queryOptions, 'orderBy'))})\n`)
      if(get(this.queryOptions, 'limit')) queryParts.push(`limit(${get(this.queryOptions, 'limit').interpretar(ast)})\n`)
      ast.addTraduction(queryParts.join('.'))
    }

    transformOrderOption(orderParams) {
      const orderParamsParsed = {}
      orderParams.forEach((param) => {
        set(orderParamsParsed, get(param, 'key'), get(param, 'value'))
      })
      return JSON.stringify(orderParamsParsed);
    }

    transformSelectParams() {
      const selectParamsParsed = {}
      this.selectParams.forEach((param) => {
        set(selectParamsParsed, param, true)
      })
      return JSON.stringify(selectParamsParsed);
    }

    setOptions(options){
      this.queryOptions = options
    }
}

export const SelectType = {
    ALL: "*"
}