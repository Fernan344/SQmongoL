import { Instruccion } from "../../Abstract/Instruction"
import get from 'lodash/get';
import set from 'lodash/set';
import omit from 'lodash/omit';
import flat from 'flat';
import cloneDeep from 'lodash/cloneDeep';
import PromiseB from 'bluebird'

export default class OrderBy extends Instruccion {
    
    groupParams;

    constructor(linea, columna, groupParams) {
        super(linea, columna)
        this.groupParams = groupParams
    }

    async exec(ast) {
        return this[ast.getAction()](ast)
    }

    async interpret(ast) {            
        return this.execGroupBy(ast)
    }    

    async translate(ast) {
        return this.execGroupBy(ast)
    }

    async execGroupBy(ast) {    
        const groupValues = []
        await PromiseB.each(this.groupParams, async (gp) => {
            groupValues.push(await gp.exec(ast));
        })
        
        let globalTable = ast.gettablaGlobal()
        const globalTableValues = Object.values(flat(globalTable))
        const globalTableKeys = Object.keys(flat(globalTable))
        
        let groupByResultSet;
        if(globalTableValues.includes('$$GroupBy')) {
            globalTableKeys.forEach(k => {
                const globalValue = get(globalTable, k)
                if(globalValue === '$$GroupBy') {
                    groupByResultSet = k;
                    globalTable = omit(globalTable, [groupByResultSet]);
                    return;
                }
            })
        }
        
        const newGlobalTable = {
            _id: 0
        }

        const group = {
            _id: {},
            ...(groupByResultSet ? {
                [groupByResultSet]: {
                    $addToSet: {

                    }
                }
            }: {                
            })
        }        
        
        for(let i = 0; i < globalTableKeys.length; i++) {
            const param = globalTableKeys[i]
            const value = get(globalTable, param)
            if(groupValues.includes(param) || groupValues.includes(value)) {               
                set(group, `_id.${param}`, value);
                set(group, param, { $first: value });
                set(newGlobalTable, param, `$${param}`);
            }else{
                if(groupByResultSet) {
                    set(group, `${groupByResultSet}.$addToSet.${param}`, value);
                    set(newGlobalTable, groupByResultSet, `$${groupByResultSet}`)
                } else {
                    set(group, param, { $first: value });
                    set(newGlobalTable, param, `$${param}`)
                }
            }
        }
        
        ast.setOldTableGlobal(cloneDeep(ast.gettablaGlobal()));
        ast.settablaGlobal(newGlobalTable);

        return [{
            $group: group
        }]
    }
}