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

    async interpretar(ast){
      const queryExecuteParams = {}
      const projectParams = this.selectParams === SelectType.ALL ? "{}" : this.transformSelectParams();
      const queryParts = [`db.getCollection("${this.tableName}")\n`]
      if(get(this.queryOptions, 'where')) {
        const whereOptions = get(this.queryOptions, 'where').interpretar(ast)
        set(queryExecuteParams, 'where', whereOptions)
        queryParts.push(`find(${JSON.stringify(whereOptions)})\n`)
      } else {
        set(queryExecuteParams, 'where', {})
        queryParts.push(`find({})\n`)
      }
      queryParts.push(`projection(${projectParams})\n`)
      if(get(this.queryOptions, 'orderBy')) {
        const orderByOptions = this.transformOrderOption(get(this.queryOptions, 'orderBy'))
        set(queryExecuteParams, 'sort', orderByOptions)
        queryParts.push(`sort(${orderByOptions})\n`)
      }
      if(get(this.queryOptions, 'limit')) {
        const limitOptions = get(this.queryOptions, 'limit').interpretar(ast)
        set(queryExecuteParams, 'limit', limitOptions)
        queryParts.push(`limit(${limitOptions})\n`)
      }
      ast.addTraduction(queryParts.join('.'))
      ast.actualizaConsola('Query was traduced.')
      if(!ast.getMode()) {
        const {db} = ast.getSchema();   
        const { where, sort, limit } = queryExecuteParams   
        const command = {}
        set(command, 'find', this.tableName)
        if(where) set(command, 'filter', where)
        if(sort) set(command, 'sort', sort)
        if(limit) set(command, 'limit', limit)
        set(command, 'projection', JSON.parse(projectParams))
        const result = await db.command(command);
        ast.addResult(get(result, 'cursor.firstBatch', []));
        ast.actualizaConsola(`Query was executed, returns ${result.length} fields.`);
      }
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