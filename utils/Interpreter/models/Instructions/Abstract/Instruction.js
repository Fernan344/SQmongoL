export class Instruccion {
    linea;
    columna;
  
    constructor(linea, columna) {
      this.linea = linea;
      this.columna = columna;
    }
  
    interpretar(){
        throw new Error("Method 'interpretar()' must be implemented.");
    };
}