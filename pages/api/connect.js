// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createDB, connect } from "../../utils/Mongo/Connection"
import get from "lodash/get"
import { StatusCodes } from "http-status-codes";
import errorMidleware from '../../utils/Http/error-handler'

async function connectCluster (req, res) {
    try{
        const { uri } = req.body 
        await connect(uri)
        const result = await createDB("sqml-test")
        if(get(result, 'error')) {
            console.log(get(result, 'error'));
            res.status(401).json().send()
            return
        }
        res.status(200).json();
    }catch (err){
        errorMidleware(err, req, res)
    }
}

export default connectCluster