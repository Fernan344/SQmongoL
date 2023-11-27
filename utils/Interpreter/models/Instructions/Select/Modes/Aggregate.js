import { Instruccion } from "../../Abstract/Instruction"
import set from "lodash/set"
import get from "lodash/get"
import OrderBy from "../OrderBy/OrderBy";
import PromiseB from 'bluebird';
import flat from 'flat';
import { transformSelectParams } from "../utils/transform.util";

export default class SelectAggregate extends Instruccion {
    
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
      
      await this.generateAggregateQuery(queryExecuteParams, ast)

      const {db} = ast.getSchema();
      const coll = db.collection(this.tableName);
      const aggCursor = await coll.aggregate(get(queryExecuteParams, 'aggregates', []));
      const results = await aggCursor.toArray();
      ast.addResult(results);
      ast.actualizaConsola(`Query was executed, returns ${results.length} fields.`);
    }

    async translate(ast){
      
      const queryExecuteParams = {}

      const queryParts = [`db.getCollection("${this.tableName}")\n`]
      
      await this.generateAggregateQuery(queryExecuteParams, ast)

      queryParts.push(`aggregate(${
        JSON.stringify(get(queryExecuteParams, 'aggregates'), null, 2)
      })\n`)
      ast.addTraduction(queryParts.join('.'))
    }

    async generateAggregateQuery (queryExecuteParams, ast) {
      let aggregates = [

      ]
      
      const joins = await PromiseB.map(get(this.queryOptions, 'join', []), async (j) => await j.prepare(ast))
      
      const auxJoins = joins.map(j => ({table: j.alias || j.table, superior: j.principal}));
      ast.setRelatedTables(auxJoins);
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
            principalJoins = [...(await actualJoin.exec(ast)), ...principalJoins]
            joins.splice(i, 1);
            i = -1;
            continue;
          }
          await PromiseB.each(joins, async (j) => {
            if((actualJoin.principal) === (j.alias || j.table)){
              j.internalLookup = [...(await actualJoin.exec(ast)), ...j.internalLookup]
              joins.splice(i, 1);
              i = -1;
              return
            }
          })          
        }
      }     

      const matchAggregate = get(this.queryOptions, 'where') ? [
        {
          $match: await get(this.queryOptions, 'where').setConfig(true, undefined, false).exec(ast)
        }        
      ] : []

      const projectParams = this.selectParams === SelectType.ALL ? {} : await transformSelectParams(this.selectParams, this.tableName, ast);
      ast.settablaGlobal(projectParams);
      const groupAggregate = get(this.queryOptions, 'groupBy') ? await get(this.queryOptions, 'groupBy').exec(ast) : [];
           
      const sortIns = (new OrderBy(0, 0, get(this.queryOptions, 'orderBy')))
      sortIns.setConfig(true);
      const sortValue = await sortIns.exec(ast);
      
      const aggregateProject = [{
        $project: {
          _id: 0,
          ...(ast.gettablaGlobal())
        }
      }]
      
      aggregates = [...aggregates, ...principalJoins, ...matchAggregate, ...groupAggregate, ...aggregateProject, ...sortValue]
      
      set(queryExecuteParams, 'aggregates', aggregates);      
    }
}

export const SelectType = {
    ALL: "*"
}