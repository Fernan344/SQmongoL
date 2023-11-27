
import { HttpMidleware } from "../../utils/Http/Middleware";
import { StatusCodes } from "http-status-codes";
import errorMidleware from '../../utils/Http/error-handler'
import { buildDirectoryTree } from "../../src/api/directory";

const POST = async (req, res) => {
    const url = req.body.actualDir
    const response = await buildDirectoryTree(url);
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