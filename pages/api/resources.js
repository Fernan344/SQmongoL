// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createDB, connect, testConnection, getDBList } from "../../config/Mongo/Connection"
import get from "lodash/get"
import { StatusCodes } from "http-status-codes";
import errorMidleware from '../../utils/Http/error-handler'

async function resources (req, res) {
    try{       
        const connection = await getDB();
        if(!connection){
            res.json([])
            return
        }
        connection.listCollections().toArray(function(err, names) {   
            if(!err) {
                res.json(names)
            }else{            
                res.json([])
            }
        });
    }catch (err){
        errorMidleware(err, req, res)
    }
}

export default resources