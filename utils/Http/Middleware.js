import {HTTP_METHODS} from "../../utils/Http/enums"
import { HttpStatusCodeError } from "../../utils/Http/HttpStatusCodeError";
import { StatusCodes } from "http-status-codes";

export const HttpMidleware = async (methods, req, res) => {
    const { GET, POST, PATCH, PUT } = methods
    if(req.method === HTTP_METHODS.GET && GET) {
        await GET(req, res);
    }else if(req.method === HTTP_METHODS.POST && POST) {
        await POST(req, res);
    }else if(req.method === HTTP_METHODS.PATCH && PATCH) {
        await PATCH(req, res);
    }else if(req.method === HTTP_METHODS.PUT && PUT) {
        await PUT(req, res);
    }else{
        throw new HttpStatusCodeError(StatusCodes.NOT_IMPLEMENTED)
    }
}