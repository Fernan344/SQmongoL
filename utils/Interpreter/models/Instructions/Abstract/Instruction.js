export class Instruccion {
    linea;
    columna;
  
    constructor(linea, columna) {
      this.linea = linea;
      this.columna = columna;
    }
  
    interpretar(any){
        throw new Error("Method 'interpretar()' must be implemented. Param: "+any);
    };
}