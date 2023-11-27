import { Instruccion } from "../../Abstract/Instruction"
import set from "lodash/set"
import get from "lodash/get"
import OrderBy from "../OrderBy/OrderBy";
import { transformSelectParams } from "../utils/transform.util";

export default class SelectNormal extends Instruccion {
    
    selectParams;
    tableName;
    queryOptions;

    constructor(linea, columna, selectParams, tableName, queryOptions) {
      super(linea, columna)
      this.selectParams = selectParams
      this.tableName = tableName
      this.queryOptions = queryOptions || {}
    }

    async exec(ast) {
      return this[ast.getAction()](ast)
    }

    async interpret(ast){
      const queryExecuteParams = {}
      
      await this.generateNormalQuery(queryExecuteParams, ast)
      const { db } = ast.getSchema();   
      const { find, sort, limit, projection } = queryExecuteParams   
      
      let table = await db.collection(this.tableName).find(find || {});
      table = await table.sort(sort || {});
      table = await table.limit(limit || 100);
      table = await table.project(projection);

      const results = await table.toArray();
      ast.addResult(results);
      ast.actualizaConsola(`Query was executed, returns ${results.length} fields.`);
    }

    async translate(ast){
      const queryExecuteParams = {}
      const queryParts = [`db.getCollection("${this.tableName}")\n`]
      await this.generateNormalQuery(queryExecuteParams, ast)      

      Object.keys(queryExecuteParams).forEach((param) => {
        queryParts.push(`${param}(${JSON.stringify(get(queryExecuteParams, param), null, 2)})\n`) 
      })
        
      ast.addTraduction(queryParts.join('.'))
      ast.actualizaConsola('Query was traduced.')
    }

    async generateNormalQuery (queryExecuteParams, ast) {      
      const projectParams = this.selectParams === SelectType.ALL ? {} : await transformSelectParams(this.selectParams, this.tableName, ast);
      ast.settablaGlobal(projectParams);
      
      if(get(this.queryOptions, 'where')) {
        const whereOptions = await get(this.queryOptions, 'where').exec(ast)        
        set(queryExecuteParams, 'find', whereOptions)
      } else {
        set(queryExecuteParams, 'find', {})
      }
      
      set(queryExecuteParams, 'projection', projectParams)
      
      if(get(this.queryOptions, 'orderBy')) {
        const orderByOptions = await (new OrderBy(0, 0, get(this.queryOptions, 'orderBy'))).exec(ast);
        set(queryExecuteParams, 'sort', orderByOptions)        
      }

      if(get(this.queryOptions, 'limit')) {
        const limitOptions = await get(this.queryOptions, 'limit').exec(ast)
        set(queryExecuteParams, 'limit', limitOptions)
      }      
    }  
}

export const SelectType = {
    ALL: "*"
}