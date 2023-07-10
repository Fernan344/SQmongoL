import { Instruccion } from "./Abstract/Instruction"
import set from "lodash/set"
import get from "lodash/get"
import OrderBy from "./OrderBy";

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
      const queryParts = [`db.getCollection("${this.tableName}")\n`]
      if(Object.keys(this.queryOptions).includes("join")) {
        await this.generateAggregateQuery(queryExecuteParams, queryParts, ast)
      } else await this.generateNormalQuery(queryExecuteParams, queryParts, ast)
    }

    async generateAggregateQuery (queryExecuteParams, queryParts, ast) {
      let aggregates = [

      ]
      
      const joins = get(this.queryOptions, 'join', []).map(j => j.prepare(ast));
      const auxJoins = joins.map(j => ({table: j.alias || j.table, superior: j.principal}));
      let principalJoins = []

      for(let i = 0; i < joins.length; i++) {
        const actualJoin = joins[i];
        let found = false;
        joins.forEach((j) => {
          if((actualJoin.alias || actualJoin.table) === j.principal){     
            found = true;
            return
          }
        })
        if(!found) {
          if(actualJoin.principal === this.tableName) {
            principalJoins = [...actualJoin.interpretar(ast), ...principalJoins]
            joins.splice(i, 1);
            i = -1;
            continue;
          }
          joins.forEach((j) => {
            if((actualJoin.principal) === (j.alias || j.table)){
              j.internalLookup = [...actualJoin.interpretar(ast), ...j.internalLookup]
              joins.splice(i, 1);
              i = -1;
              return
            }
          })          
        }
      }
      
      const projectParams = this.selectParams === SelectType.ALL ? {} : this.transformSelectParams(auxJoins);
      ast.settablaGlobal(projectParams);
      const aggregateProject = {
        $project: {
          _id: 0,
          ...projectParams
        }
      }

      const matchAggregate = get(this.queryOptions, 'where') ? [
        {
          $match: get(this.queryOptions, 'where').setConfig(false, undefined).interpretar(ast)
        }        
      ] : []

      const sortIns = (new OrderBy(0, 0, get(this.queryOptions, 'orderBy')))
      sortIns.setConfig(true);
      const sortValue = await sortIns.interpretar(ast);
      
      aggregates = [ ...aggregates, ...principalJoins, ...matchAggregate, aggregateProject, ...sortValue]
      
      queryParts.push(`aggregate(${
        JSON.stringify(aggregates, null, 2)
      })\n`)
      ast.addTraduction(queryParts.join('.'))

      if(!ast.getMode()) { 
        const {db} = ast.getSchema();
        const coll = db.collection(this.tableName);
        const aggCursor = await coll.aggregate(aggregates);
        const results = await aggCursor.toArray();
        ast.addResult(results);
        ast.actualizaConsola(`Query was executed, returns ${results.length} fields.`);
      }
    }

    async generateNormalQuery (queryExecuteParams, queryParts, ast) {      
      const projectParams = this.selectParams === SelectType.ALL ? {} : this.transformSelectParams();
      if(get(this.queryOptions, 'where')) {
        const whereOptions = get(this.queryOptions, 'where').interpretar(ast)
        set(queryExecuteParams, 'where', whereOptions)
        queryParts.push(`find(${JSON.stringify(whereOptions, null, 2)})\n`)
      } else {
        set(queryExecuteParams, 'where', {})
        queryParts.push(`find({})\n`)
      }
      queryParts.push(`projection(${JSON.stringify(projectParams, null, 2)})\n`)
      if(get(this.queryOptions, 'orderBy')) {
        const orderByOptions = (new OrderBy(0, 0, get(this.queryOptions, 'orderBy'))).interpretar(ast);
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
        set(command, 'projection', projectParams)
        const result = await db.command(command);
        const results = get(result, 'cursor.firstBatch', [])
        ast.addResult(results);
        ast.actualizaConsola(`Query was executed, returns ${results.length} fields.`);
      }
    }    

    transformSelectParams(auxJoins = []) {
      const selectParamsParsed = {}

      this.selectParams.forEach(p => {
        const base =  get(p, 'base')
        const parts = base.split(".");
        const lastPart = parts[parts.length - 1]
        const table = parts[0];
        const variable =  get(p, 'alias') || lastPart;
        let actual = auxJoins.find(j => (j.alias || j.table) === table) || {superior: this.tableName}        
        let newRoute = actual.table ? base : lastPart;
        while(actual.superior !== this.tableName){
          newRoute = `${actual.superior}.${newRoute}`
          actual = auxJoins.find(j => (j.alias || j.table) === actual.superior)
        }
        set(selectParamsParsed, variable, `$${newRoute}`);
      })

      return selectParamsParsed;
    }

    setOptions(options){
      this.queryOptions = options
    }
}

export const SelectType = {
    ALL: "*"
}