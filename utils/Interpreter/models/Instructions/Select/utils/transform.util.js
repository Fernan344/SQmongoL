import PromiseB from 'bluebird';
import get from 'lodash/get';
import set from 'lodash/set';
import isString from 'lodash/isString';
import flat from 'flat'
import { getObjectKeyValues } from './arrays.util';

export const transformSelectParams = async (selectParams, tableName, ast) => {
    const selectParamsParsed = {}
    let unnamedColumns = 0;

    await PromiseB.each(selectParams, async (p) => {
      const base = await get(p, 'base').setConfig(false, false, true).exec(ast)      
      const aliasTable = get(p, 'alias')
      if(aliasTable) {
        const aliasValue = await aliasTable.exec(ast);  
        set(selectParamsParsed, aliasValue, base);
      } else if(isString(base)) {
        set(selectParamsParsed, base, ast.getFullPath(base));
      } else {
        set(selectParamsParsed, unnamedColumns === 0 ? 'unnamed_column' : `unnamed_column_${unnamedColumns}`, base);
        unnamedColumns++;
      }        
    })
    const flattenParsed = selectParamsParsed //flat(selectParamsParsed);
    return flattenParsed
}

export const transformOrderOption = async (ast, orderQueryParams) => {        
  const orderParams = orderQueryParams;
  const orderParamsParsed = {}
  
  const oldKeyValues = getObjectKeyValues(ast.getOldTableGlobal())
  const currentKeyValues = getObjectKeyValues(ast.gettablaGlobal())
  
  await PromiseB.each(orderParams, async (param) => {
      const currentKey = get(param, 'key')
      
      const searchParam = ast.getFullPath(currentKey)
      
      let key = currentKey;
      if(currentKeyValues.values.includes(searchParam)) {
          const currentIndex = currentKeyValues.values.indexOf(searchParam);
          key = currentKeyValues.keys[currentIndex];
      } else if (oldKeyValues.values.includes(searchParam)) {
          const currentIndex = oldKeyValues.values.indexOf(searchParam);
          key = oldKeyValues.keys[currentIndex];
      } else {
          key = currentKey;
      }
      
      set(orderParamsParsed, key, get(param, 'value'))
  })
  return flat(orderParamsParsed)
}