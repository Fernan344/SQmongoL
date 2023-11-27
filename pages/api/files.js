
import { HttpMidleware } from "../../utils/Http/Middleware";
import { StatusCodes } from "http-status-codes";
import errorMidleware from '../../utils/Http/error-handler'
import { saveNewFile } from "../../src/api/file";

const POST = async (req, res) => {
    const { 
        fileName,
        dirs,
        content,
        forceSave,
        ext
    } = req.body;

    const response = saveNewFile(dirs, fileName, ext, content, forceSave);

    res.status(StatusCodes.OK).json(response)
}

async function httpMethods (req, res) {
    try {
        await HttpMidleware({POST}, req, res)
    } catch (err){
        errorMidleware(err, req, res)
    }
}

export default httpMethods