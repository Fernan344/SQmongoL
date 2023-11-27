import path from 'path';
import { HttpStatusCodeError } from '../../utils/Http/HttpStatusCodeError';
import { StatusCodes } from 'http-status-codes';
const fs = require('fs');

export const saveNewFile = (dirs, fileName, ext, fileContent, forceSave) => {
    
    const pathFile = path.join(...[...(!ext ? [path.dirname(path.join(...dirs))] : dirs), `${fileName}${!ext ? '' : ext}`]);
    
    if(fs.existsSync(pathFile) && !forceSave) {
        throw new HttpStatusCodeError(StatusCodes.CONFLICT, "File already exists")
    }
    fs.writeFileSync(pathFile, fileContent, 'utf8');
    return { path: pathFile, success: true, fileName: fileName };
}