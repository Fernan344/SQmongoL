export class Instruccion {
    linea;
    columna;
    translation;
  
    constructor(linea, columna) {
      this.linea = linea;
      this.columna = columna;
    }
  
    interpret(any){
      throw new Error("Method 'interpret()' must be implemented. Param: "+any);
    };

    translate(any){
      throw new Error("Method 'translate()' must be implemented. Param: "+any);
    }

    traduct
}