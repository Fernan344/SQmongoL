export class Three {
    instrucciones;
    errores;
    consola;
    traduction;
    results;
    mode;
    schema;
    constructor(instrucciones, mode, connection = undefined, db = undefined) {
        this.instrucciones = instrucciones;
        this.traduction = '';
        this.consola = '';
        this.errores = [];
        this.mode = mode;
        this.results = [];
        this.schema = {connection, db}
    }
    getSchema() {
        return this.schema;
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
        this.tablaGlobal = value;
    }
}