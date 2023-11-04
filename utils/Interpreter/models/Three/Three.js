import flat from 'flat'
import deepCopy from 'lodash/cloneDeep'

export class Three {
    instrucciones;
    errores;
    consola;
    traduction;
    results;
    mode;
    schema;
    tablaGlobal;
    oldTablaGlobal;
    tableName;
    afterInterpretation;
    action;
    relatedTables;

    constructor(instrucciones, mode, connection = undefined, db = undefined, uri = undefined) {
        this.instrucciones = instrucciones;
        this.traduction = '';
        this.consola = '';
        this.errores = [];
        this.mode = mode;
        this.action = !mode ? 'interpret' : 'translate';
        this.results = [];
        this.schema = {connection, db, uri}
        this.tablaGlobal = {}
        this.tableName = ""
        this.afterInterpretation = [];
    }

    reInit() {
        this.settablaGlobal({});
        this.setTableName("");
        this.setRelatedTables(undefined);
        this.oldTablaGlobal = undefined;
    }

    setAction(action) {
        this.action = action;
    }
    getAction() {
        return this.action;
    }
    addActionAfterInterpretation ({action, value}) {
        this.afterInterpretation.push({action, value});
    }
    
    getSchema() {
        return this.schema;
    }
    setSchemaProp(props) {
        this.schema = {...this.schema, ...props};
    }

    getMode() {
        return this.mode;
    }

    getconsola() {
        return this.consola;
    }
    setconsola(value) {
        this.consola = value;
    }
    actualizaConsola(uptodate) {
        this.consola = `${this.consola}${uptodate}\n`;
    }

    addResult(resultado){
        this.results.push(resultado)
    }
    getResults(){
        return this.results;
    }

    getTraduction() {
        this.afterInterpretation.forEach((value) => {
            if(value.action === 'clearCuotes') {
                this.traduction = this.traduction.replace(`"${value.value}"`, `${value.value}`);
            }
        })
        return this.traduction
    }    
    setTraduction(traduction) {
        this.traduction = traduction;
    }
    addTraduction(uptodate) {
        this.traduction = `${this.traduction}\n${uptodate}\n`;
    }    

    getinstrucciones() {
        return this.instrucciones;
    }
    setinstrucciones(value) {
        this.instrucciones = value;
    }

    getErrores() {
        return this.errores;
    }
    seterrores(value) {
        this.errores = value;
    }

    gettablaGlobal() {
        return this.tablaGlobal;
    }
    settablaGlobal(value) {
        this.tablaGlobal = flat.unflatten(value);
    }
    getOldTableGlobal() {
        return this.oldTablaGlobal;
    }
    setOldTableGlobal(value) {        
        this.oldTablaGlobal = flat.unflatten(value);
    }

    setTableName(tableName) {
        this.tableName = tableName;
    }
    setRelatedTables(tables) {
        this.relatedTables = tables;
    }
    getRelatedTables() {
        return this.relatedTables;
    }

    getFullPath(variable) {
        let path = ``;
        const tableToFind = variable.split('.');
        let actualTable = tableToFind[0];

        if(!this.relatedTables||tableToFind.length === 1) return null;

        while(true) {
            const table = this.relatedTables.find(rt => rt.table === actualTable);
            if(!table) break;

            path = `${table.table}.${path}`;
            actualTable = table.superior || "";
        }
        tableToFind.splice(0, 1);
        return `$${path}${tableToFind.map(t => t).join('.')}`
    }
}