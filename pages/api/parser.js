// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import parser from '../../utils/Interpreter/gramar'
import { Three } from '../../utils/Interpreter/models/Three/Three';
import { StatusCodes } from "http-status-codes";
import errorMidleware from '../../utils/Http/error-handler'

export default function parse (req, res) {
  try {
    const { code, onlyTranslate } = req.body;  
    const ast = new Three(parser.parse(code))
    for (let i of ast.getinstrucciones()) {     
      i.interpretar(ast)
    }
    res.status(200).json({traduction: ast.getTraduction()})
  }catch (err){
    errorMidleware(err, req, res)
  }
}