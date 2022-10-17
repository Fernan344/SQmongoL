// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getConnectionsData } from "../../utils/Mongo/Connection"
import { StatusCodes } from "http-status-codes";
import errorMidleware from '../../utils/Http/error-handler'

async function connections (req, res) {
    try {
        const connections = await getConnectionsData();
        res.json(connections);
    } catch (err){
        errorMidleware(err, req, res)
    }
}

export default connections