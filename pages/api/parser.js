// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import parser from '../../utils/Interpreter/gramar'
import { Three } from '../../utils/Interpreter/models/Three/Three';
import { getDB, getConnection } from '../../config/Mongo/Connection'
import errorMidleware from '../../utils/Http/error-handler'

export default async function parse (req, res) {
  try {
    const { code, onlyTranslate, uri, db } = req.body; 
    const database = onlyTranslate ? undefined : await getDB(uri, db);
    const connection = onlyTranslate ? undefined : await getConnection(uri); 
    const ast = new Three(parser.parse(code), onlyTranslate, connection, database, uri);    
    for (let i of ast.getinstrucciones()) {     
      await i.interpretar(ast)
    }    
    res.status(200).json({traduction: ast.getTraduction(), results: ast.getResults(), console: ast.getconsola()})
  }catch (err){
    console.error(`Error at line ${err.line}, column ${err.column}: expected ${err.expected}`);
    errorMidleware(err, req, res)
  }
}