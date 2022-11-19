// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDB } from "../../config/Mongo/Connection"
import get from "lodash/get"
import { StatusCodes } from "http-status-codes";
import errorMidleware from '../../utils/Http/error-handler'

async function resources (req, res) {
    try{       
        const {db, uri} = req.body
        const connection = await getDB(db, uri);
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