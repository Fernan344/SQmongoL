// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createDB, connect, testConnection, getDBList } from "../../utils/Mongo/Connection"
import get from "lodash/get"
import { HttpMidleware } from "../../utils/Http/Middleware";
import { StatusCodes } from "http-status-codes";
import errorMidleware from '../../utils/Http/error-handler'
import { HttpStatusCodeError } from "../../utils/Http/HttpStatusCodeError";


const POST = async (req, res) => {
    const { uri } = req.body 
    const response = await testConnection(uri)
    if(get(response, 'success')) { res.status(StatusCodes.NO_CONTENT).json(); return };
    throw new HttpStatusCodeError(StatusCodes.BAD_REQUEST, 'Connection can not be established')
}

const PATCH = async (req, res) => {
    const { uri } = req.body 
    const response = await connect(uri)
    if(get(response, 'success')) {res.status(StatusCodes.NO_CONTENT).json(); return}
    throw new HttpStatusCodeError(StatusCodes.BAD_REQUEST, 'Connection can not be established')    
}

const PUT = async (req, res) => {
    const { dbName } = req.body
    const result = await createDB(dbName)
    if(get(result, 'error')) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json()
        return
    }else{
        res.status(StatusCodes.OK).json()
        return
    }
}

const GET = async (req, res) => {
    const response = await getDBList();
    res.status(StatusCodes.OK).json(get(response, 'dbs', []))
}

async function connectCluster (req, res) {
    try {
        await HttpMidleware({GET, POST, PATCH, PUT}, req, res)
    } catch (err){
        errorMidleware(err, req, res)
    }
}

export default connectCluster