import { HttpStatusCodeError } from "../../utils/Http/HttpStatusCodeError";
import { StatusCodes } from "http-status-codes";
import get from 'lodash/get'

export const HttpMidleware = async (methods, req, res) => {
    const method = get(methods, req.method) || (async (req, res) => {
        throw new HttpStatusCodeError(StatusCodes.NOT_IMPLEMENTED)
    })
    await method(req, res);
}